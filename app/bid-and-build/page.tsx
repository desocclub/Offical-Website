'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/navigation/Footer';
import {
  fetchCurrentAuction,
  fetchTeamById,
  validateTeam,
  placeBid as apiPlaceBid,
  submitTeamDeliverable,
  startAuction,
  nextAuctionAsset,
  fetchAdminTeams,
  createAdminTeam,
} from '@/lib/api';
import type { Team, CurrentAuction, Asset } from '@/types/bidAndBuild';

const TEAM_STORAGE_KEY = 'desoc_bid_build_team_id';

const formatTimer = (ms: number): string => {
  const seconds = Math.max(0, Math.ceil(ms / 1000));
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
};

export default function BidAndBuildPage() {
  const [teamId, setTeamId] = useState<string>('');
  const [authForm, setAuthForm] = useState({ email: '', teamName: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [team, setTeam] = useState<Team | null>(null);
  const [auction, setAuction] = useState<CurrentAuction | null>(null);
  const [auctionCompleted, setAuctionCompleted] = useState(false);

  const [bidAmount, setBidAmount] = useState('');
  const [bidLoading, setBidLoading] = useState(false);
  const [bidFeedback, setBidFeedback] = useState('');

  const [clockMs, setClockMs] = useState(0);

  const [submissionFile, setSubmissionFile] = useState<File | null>(null);
  const [figmaLink, setFigmaLink] = useState('');
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionFeedback, setSubmissionFeedback] = useState('');

  const [adminKey, setAdminKey] = useState('');
  const [adminDuration, setAdminDuration] = useState(45);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminFeedback, setAdminFeedback] = useState('');
  const [teamsView, setTeamsView] = useState<Team[]>([]);
  const [adminTeamForm, setAdminTeamForm] = useState({
    teamName: '',
    email: '',
    coins: 1000,
  });

  // Client-side initialization for localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(TEAM_STORAGE_KEY);
      if (stored) {
        setTeamId(stored);
      }
    } catch {
      // Storage unavailable or disabled
    }
  }, []);

  const highestBidAmount = auction?.highestBid?.amount || 0;
  const minBid = auction ? (highestBidAmount ? highestBidAmount + 1 : auction.basePrice) : 0;
  const enteredBid = Number(bidAmount || 0);

  const isMyTeamLeading = useMemo(() => {
    if (!team || !auction?.highestBid?.teamId) return false;
    return String(auction.highestBid.teamId) === String(team.id || team._id);
  }, [team, auction]);

  const bidValidationMessage = useMemo(() => {
    if (!auction?.isRunning) return 'Auction is not active yet';
    if (!team) return 'Validate your team first';
    if (!bidAmount) return 'Enter bid amount';
    if (Number.isNaN(enteredBid)) return 'Bid must be a number';
    if (enteredBid < minBid) return `Bid must be >= ${minBid}`;
    if (enteredBid > team.coins) return 'Bid exceeds available coins';
    return '';
  }, [auction, bidAmount, enteredBid, minBid, team]);

  const bidDisabled = !!bidValidationMessage || bidLoading || isMyTeamLeading;

  const refreshState = async () => {
    try {
      const [auctionData, teamData] = await Promise.all([
        fetchCurrentAuction(),
        teamId ? fetchTeamById(teamId).catch(() => null) : Promise.resolve(null),
      ]);
      setAuction(auctionData.currentAuction);
      setAuctionCompleted(!!auctionData.completed);
      setTeam(teamData);

      if (auctionData.currentAuction?.auctionEndsAt) {
        setClockMs(new Date(auctionData.currentAuction.auctionEndsAt).getTime() - Date.now());
      } else {
        setClockMs(0);
      }
    } catch (err) {
      console.error('BidAndBuild refreshState error:', err);
    }
  };

  useEffect(() => {
    refreshState();
  }, [teamId]);

  useEffect(() => {
    const poll = setInterval(() => {
      refreshState();
    }, 2000);

    const ticker = setInterval(() => {
      setClockMs((prev) => Math.max(0, prev - 1000));
    }, 1000);

    return () => {
      clearInterval(poll);
      clearInterval(ticker);
    };
  }, [teamId]);

  const handleValidateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const data = await validateTeam({
        email: authForm.email.trim(),
        teamName: authForm.teamName.trim(),
      });

      const nextTeamId = data.team.id || data.team._id || '';
      localStorage.setItem(TEAM_STORAGE_KEY, nextTeamId);
      setTeamId(nextTeamId);
      setTeam(data.team);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Validation failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const placeBid = async () => {
    const currentTeamId = team?.id || team?._id;
    if (bidDisabled || !auction || !currentTeamId) return;
    setBidLoading(true);
    setBidFeedback('');

    try {
      await apiPlaceBid({
        teamId: currentTeamId,
        assetId: auction.assetId,
        amount: enteredBid,
      });

      setBidAmount('');
      setBidFeedback('Bid placed successfully.');
      await refreshState();
    } catch (err) {
      setBidFeedback(err instanceof Error ? err.message : 'Bid failed');
    } finally {
      setBidLoading(false);
    }
  };

  const submitDesign = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentTeamId = team?.id || team?._id;
    if (!currentTeamId) return;

    if (!submissionFile && !figmaLink.trim()) {
      setSubmissionFeedback('Upload a file or enter a Figma link.');
      return;
    }

    setSubmissionLoading(true);
    setSubmissionFeedback('');

    try {
      const payload = new FormData();
      if (submissionFile) payload.append('submissionFile', submissionFile);
      if (figmaLink.trim()) payload.append('figmaLink', figmaLink.trim());

      await submitTeamDeliverable(currentTeamId, payload);

      setSubmissionFeedback('Design submitted successfully.');
      await refreshState();
    } catch (err) {
      setSubmissionFeedback(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setSubmissionLoading(false);
    }
  };

  const handleStartAuction = async () => {
    setAdminLoading(true);
    setAdminFeedback('');
    try {
      await startAuction(adminDuration, adminKey.trim() || undefined);
      setAdminFeedback('Admin action completed: Auction started.');
      await refreshState();
    } catch (err) {
      setAdminFeedback(err instanceof Error ? err.message : 'Admin action failed');
    } finally {
      setAdminLoading(false);
    }
  };

  const handleNextAsset = async () => {
    setAdminLoading(true);
    setAdminFeedback('');
    try {
      await nextAuctionAsset(adminKey.trim() || undefined);
      setAdminFeedback('Admin action completed: Next asset queued.');
      await refreshState();
    } catch (err) {
      setAdminFeedback(err instanceof Error ? err.message : 'Admin action failed');
    } finally {
      setAdminLoading(false);
    }
  };

  const loadTeamsView = async () => {
    try {
      const teams = await fetchAdminTeams(adminKey.trim() || undefined);
      setTeamsView(teams || []);
    } catch (err) {
      setAdminFeedback(err instanceof Error ? err.message : 'Failed to load teams');
    }
  };

  const registerTeamFromAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminFeedback('');

    try {
      const res = await createAdminTeam(
        {
          teamName: adminTeamForm.teamName.trim(),
          email: adminTeamForm.email.trim(),
          coins: Number(adminTeamForm.coins || 1000),
        },
        adminKey.trim() || undefined
      );

      setAdminFeedback(`Team ${res.team.teamName} registered successfully.`);
      setAdminTeamForm({ teamName: '', email: '', coins: 1000 });
      await loadTeamsView();
    } catch (err) {
      setAdminFeedback(err instanceof Error ? err.message : 'Failed to register team');
    } finally {
      setAdminLoading(false);
    }
  };

  const logoutTeam = () => {
    try {
      localStorage.removeItem(TEAM_STORAGE_KEY);
    } catch {
      // ignore
    }
    setTeamId('');
    setTeam(null);
    setAuthForm({ email: '', teamName: '' });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="relative">
        <div className="fixed inset-0 -z-10" style={{ background: 'linear-gradient(130deg, #000 0%, #170303 40%, #350707 100%)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(circle at 20% 10%, rgba(239,68,68,0.16), transparent 35%)' }} />
        <div className="fixed inset-0 -z-10" style={{ background: 'radial-gradient(circle at 85% 80%, rgba(127,29,29,0.18), transparent 35%)' }} />

        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-28">
          <div className="mb-8 sm:mb-10 flex items-center justify-between gap-3">
            <Link href="/genesis/events/bid-and-build" className="text-gray-400 hover:text-red-300 text-sm transition-colors">
              {'<'} Back to Event Details
            </Link>
            {team ? (
              <button
                type="button"
                onClick={logoutTeam}
                className="px-4 py-2 border border-white/15 rounded-full text-xs uppercase tracking-wider text-gray-300 hover:border-red-400/50 cursor-pointer"
              >
                Switch Team
              </button>
            ) : null}
          </div>

          <section className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-5 sm:p-7 mb-8 shadow-[0_18px_40px_rgba(0,0,0,0.5),0_0_20px_rgba(220,38,38,0.12)]">
            <h1 className="heading-title-6 text-primary font-medium-510 uppercase tracking-[-0.022em] mb-2">Bid & Build Arena</h1>
            <p className="text-tertiary text-sm sm:text-base max-w-3xl">
              Teams start with 1000 coins. Bid strategically on each asset, win what you need, and submit your final design after the auction closes.
            </p>
          </section>

          {!team && (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="rounded-2xl border border-red-500/20 bg-red-950/20 p-5 sm:p-6">
                <h2 className="heading-h2 text-primary font-medium-510 text-xl tracking-[-0.022em] mb-2">Team Access Validation</h2>
                <p className="text-tertiary text-sm mb-5">
                  Only registered Bid & Build teams can enter. Validate using team email or team name.
                </p>
                <form onSubmit={handleValidateTeam} className="space-y-4">
                  <input
                    type="email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Team email"
                    className="w-full rounded-xl bg-black/45 border border-white/15 px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="text"
                    value={authForm.teamName}
                    onChange={(e) => setAuthForm((prev) => ({ ...prev, teamName: e.target.value }))}
                    placeholder="Team name"
                    className="w-full rounded-xl bg-black/45 border border-white/15 px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500"
                  />
                  {authError ? <p className="text-red-400 text-xs">{authError}</p> : null}
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full rounded-full bg-linear-to-r from-red-700 to-red-600 text-white text-sm font-bold uppercase tracking-wider px-5 py-3 hover:from-red-600 hover:to-red-500 disabled:opacity-60 cursor-pointer"
                  >
                    {authLoading ? 'Validating...' : 'Enter Event Dashboard'}
                  </button>
                </form>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <h3 className="text-white text-lg font-semibold mb-3">Live Auction Status</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {auction?.assetName
                    ? `Current asset: ${auction.assetName}`
                    : auctionCompleted
                    ? 'Auction completed'
                    : 'Waiting for admin to start auction'}
                </p>
                <div className="text-red-300 text-3xl font-black tracking-widest">{formatTimer(clockMs)}</div>
              </div>
            </section>
          )}

          {team && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <section className="xl:col-span-4 space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <h2 className="text-white text-lg font-semibold mb-4">Team Dashboard</h2>
                  <div className="space-y-3">
                    <div className="text-gray-400 text-sm">Team Name</div>
                    <div className="text-white font-bold text-xl">{team.teamName}</div>
                    <div className="h-px bg-white/10" />
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Coins Balance</span>
                      <span className="text-amber-300 font-bold">{team.coins}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Timer</span>
                      <span className="text-red-300 font-bold tracking-widest">{formatTimer(clockMs)}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">Owned Assets</h3>
                  {team.assets?.length ? (
                    <ul className="space-y-2 text-sm">
                      {team.assets.map((asset: Asset | string, idx: number) => {
                        const name = typeof asset === 'string' ? asset : asset.name;
                        const key = typeof asset === 'string' ? `${asset}-${idx}` : (asset._id || asset.id || idx);
                        return (
                          <li key={key} className="rounded-lg border border-red-500/20 bg-black/30 px-3 py-2 text-gray-200">
                            {name}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No assets yet.</p>
                  )}
                </div>
              </section>

              <section className="xl:col-span-8 space-y-6">
                <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-5 sm:p-6 transition-all duration-300">
                  <h2 className="text-white text-xl font-bold mb-3">Current Auction Item</h2>

                  {auction ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="rounded-xl border border-white/10 bg-black/35 p-3">
                          <p className="text-gray-400 text-xs uppercase tracking-wider">Asset Name</p>
                          <p className="text-white text-sm font-semibold mt-1">{auction.assetName}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/35 p-3">
                          <p className="text-gray-400 text-xs uppercase tracking-wider">Base Price</p>
                          <p className="text-white text-sm font-semibold mt-1">{auction.basePrice}</p>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/35 p-3">
                          <p className="text-gray-400 text-xs uppercase tracking-wider">Current Highest</p>
                          <p className="text-white text-sm font-semibold mt-1">
                            {highestBidAmount || '-'}
                            {auction.highestBid?.teamName ? ` (${auction.highestBid.teamName})` : ''}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/35 p-4">
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">Place Your Bid</p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="number"
                            min={minBid}
                            value={bidAmount}
                            onChange={(e) => {
                              setBidAmount(e.target.value);
                              setBidFeedback('');
                            }}
                            className="flex-1 rounded-lg bg-black/45 border border-white/15 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
                            placeholder={`Min ${minBid}`}
                          />
                          <button
                            type="button"
                            onClick={placeBid}
                            disabled={bidDisabled}
                            className="rounded-lg bg-linear-to-r from-red-700 to-red-600 px-5 py-2.5 text-white text-sm font-bold uppercase tracking-wide disabled:opacity-50 cursor-pointer"
                          >
                            {bidLoading ? 'Placing...' : 'Place Bid'}
                          </button>
                        </div>

                        {isMyTeamLeading ? (
                          <p className="text-green-400 text-xs mt-2">You are highest bidder.</p>
                        ) : null}
                        {bidValidationMessage && !isMyTeamLeading ? (
                          <p className="text-amber-300 text-xs mt-2">{bidValidationMessage}</p>
                        ) : null}
                        {bidFeedback ? (
                          <p className={`text-xs mt-2 ${bidFeedback.toLowerCase().includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                            {bidFeedback}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No active auction item right now.</p>
                  )}
                </div>

                {(auctionCompleted || !auction) && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                    <h3 className="text-white text-xl font-bold mb-2">Submit Your Design</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Auction has ended. Submit final design as image/PDF or share your Figma link.
                    </p>

                    <form onSubmit={submitDesign} className="space-y-3">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,application/pdf"
                        onChange={(e) => setSubmissionFile(e.target.files?.[0] || null)}
                        className="w-full text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-red-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-600"
                      />
                      <input
                        type="url"
                        value={figmaLink}
                        onChange={(e) => setFigmaLink(e.target.value)}
                        placeholder="https://www.figma.com/file/..."
                        className="w-full rounded-lg bg-black/45 border border-white/15 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
                      />
                      <button
                        type="submit"
                        disabled={submissionLoading}
                        className="rounded-full bg-linear-to-r from-red-700 to-red-600 px-5 py-2.5 text-white text-sm font-bold uppercase tracking-wide disabled:opacity-60 cursor-pointer"
                      >
                        {submissionLoading ? 'Submitting...' : 'Submit Design'}
                      </button>
                    </form>

                    {team.submission?.submittedAt ? (
                      <p className="text-green-400 text-xs mt-3">Submission received. You can re-submit to update.</p>
                    ) : null}
                    {submissionFeedback ? (
                      <p className={`text-xs mt-3 ${submissionFeedback.toLowerCase().includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                        {submissionFeedback}
                      </p>
                    ) : null}
                  </div>
                )}

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <h3 className="text-white text-lg font-semibold mb-4">Admin Control (Basic)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="password"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      placeholder="Optional admin key"
                      className="rounded-lg bg-black/45 border border-white/15 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                    <input
                      type="number"
                      min={30}
                      max={60}
                      value={adminDuration}
                      onChange={(e) => setAdminDuration(Number(e.target.value || 45))}
                      className="rounded-lg bg-black/45 border border-white/15 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <form onSubmit={registerTeamFromAdmin} className="rounded-xl border border-white/10 bg-black/25 p-4 mb-4">
                    <p className="text-gray-300 text-xs uppercase tracking-wider mb-3">Register Team (Admin)</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={adminTeamForm.teamName}
                        onChange={(e) => setAdminTeamForm((prev) => ({ ...prev, teamName: e.target.value }))}
                        placeholder="Team name"
                        className="rounded-lg bg-black/45 border border-white/15 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
                        required
                      />
                      <input
                        type="email"
                        value={adminTeamForm.email}
                        onChange={(e) => setAdminTeamForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Team email"
                        className="rounded-lg bg-black/45 border border-white/15 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
                        required
                      />
                      <input
                        type="number"
                        min={0}
                        value={adminTeamForm.coins}
                        onChange={(e) => setAdminTeamForm((prev) => ({ ...prev, coins: Number(e.target.value || 0) }))}
                        placeholder="Coins"
                        className="rounded-lg bg-black/45 border border-white/15 px-4 py-2.5 text-white text-sm focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={adminLoading}
                      className="mt-3 rounded-full border border-red-500/40 text-red-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-red-500/10 disabled:opacity-50 cursor-pointer"
                    >
                      Add Team
                    </button>
                  </form>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      disabled={adminLoading}
                      onClick={handleStartAuction}
                      className="rounded-full border border-red-500/40 text-red-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-red-500/10 disabled:opacity-50 cursor-pointer"
                    >
                      Start Auction
                    </button>
                    <button
                      type="button"
                      disabled={adminLoading}
                      onClick={handleNextAsset}
                      className="rounded-full border border-red-500/40 text-red-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-red-500/10 disabled:opacity-50 cursor-pointer"
                    >
                      Next Asset
                    </button>
                    <button
                      type="button"
                      disabled={adminLoading}
                      onClick={loadTeamsView}
                      className="rounded-full border border-white/20 text-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:border-red-500/40 disabled:opacity-50 cursor-pointer"
                    >
                      View Teams
                    </button>
                  </div>

                  {adminFeedback ? <p className="text-xs text-amber-300 mt-3">{adminFeedback}</p> : null}

                  {teamsView.length > 0 ? (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm text-gray-300">
                        <thead>
                          <tr className="text-gray-500 border-b border-white/10">
                            <th className="py-2 pr-2">Team</th>
                            <th className="py-2 pr-2">Coins</th>
                            <th className="py-2 pr-2">Assets</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamsView.map((row) => {
                            const key = row.id || row._id || row.teamName;
                            const assetsText = (row.assets || [])
                              .map((a: Asset | string) => (typeof a === 'string' ? a : a.name))
                              .join(', ') || '-';
                            return (
                              <tr key={key} className="border-b border-white/5">
                                <td className="py-2 pr-2">{row.teamName}</td>
                                <td className="py-2 pr-2">{row.coins}</td>
                                <td className="py-2 pr-2">{assetsText}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
