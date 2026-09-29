'use client';

import { useEffect, useRef, useState } from 'react';
import type { CommitteeMember, CommitteeTeam, YearCommittee } from '@/types/committee';
import { resolveSrc } from '@/lib/imageUtils';
import CommitteeQuickNav from './CommitteeQuickNav';

const FLIP_DURATION_MS = 600;
const LOGO_VISIBLE_MS = 120;

function GreenScreenPhoto({ src, alt }: { src: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.src = src;
    image.onload = () => {
      if (cancelled || !canvasRef.current) return;
      const canvas = canvasRef.current;
      const size = 512;
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');
      if (!context) return;
      const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);
      context.drawImage(image, (image.naturalWidth - sourceSize) / 2, (image.naturalHeight - sourceSize) / 2, sourceSize, sourceSize, 0, 0, size, size);

      try {
        const frame = context.getImageData(0, 0, size, size);
        for (let index = 0; index < frame.data.length; index += 4) {
          const red = frame.data[index];
          const green = frame.data[index + 1];
          const blue = frame.data[index + 2];
          if (green > 90 && green > red * 1.25 && green > blue * 1.25) {
            const strength = Math.min(1, (green - Math.max(red, blue)) / 60);
            frame.data[index + 3] = Math.round(255 * (1 - strength));
          }
        }
        context.putImageData(frame, 0, 0);
      } catch {
        setFailed(true);
      }
    };
    image.onerror = () => setFailed(true);
    return () => { cancelled = true; };
  }, [src]);

  if (failed) return <img src={src} alt={alt} loading="lazy" />;
  return <canvas ref={canvasRef} role="img" aria-label={alt} />;
}

function FlipPortrait({ member, trigger, staticMobile }: { member: CommitteeMember; trigger: number; staticMobile: boolean }) {
  const [showPhoto, setShowPhoto] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!trigger || reducedMotion || staticMobile) return undefined;
    setShowPhoto(false);
    const timer = window.setTimeout(() => setShowPhoto(true), FLIP_DURATION_MS + LOGO_VISIBLE_MS);
    return () => window.clearTimeout(timer);
  }, [trigger, reducedMotion, staticMobile]);

  const imageSrc = resolveSrc(member.image);
  return (
    <div className="committee-flip-container">
      <div className={`committee-flip-inner ${showPhoto || staticMobile ? 'is-photo' : ''}`}>
        <div className="committee-flip-face committee-flip-logo"><img src="/desoc-logo.png" alt="DESOC logo" draggable={false} /></div>
        <div className="committee-flip-face committee-flip-photo">
          {imageSrc ? <GreenScreenPhoto src={imageSrc} alt={member.name} /> : <span>{member.name.slice(0, 1)}</span>}
        </div>
      </div>
    </div>
  );
}

function formatFacultyName(name: string) {
  const parts = name.split(' ');
  if (name.startsWith('Dr. Prof.')) return ['Dr.', parts.slice(1, -1).join(' '), parts.at(-1) ?? ''];
  return parts;
}

function MemberReveal({ member, leadership = false, nameBelow = false, align = 'left', faculty = false }: { member: CommitteeMember; leadership?: boolean; nameBelow?: boolean; align?: 'left' | 'right'; faculty?: boolean }) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [flipTrigger, setFlipTrigger] = useState(0);
  const [staticMobile, setStaticMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setStaticMobile(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const reveal = () => {
    if (staticMobile) return;
    setIsRevealed(true);
    setFlipTrigger((value) => value + 1);
  };
  const hide = () => { if (!staticMobile) setIsRevealed(false); };
  const nameClass = faculty ? 'text-[clamp(1.25rem,2.15vw,2.1rem)]' : leadership ? 'text-[clamp(1.7rem,3vw,3.2rem)]' : 'text-[clamp(1.5rem,2.5vw,2.5rem)]';
  const lines = faculty ? formatFacultyName(member.name) : [member.name];
  const displayName = <>{lines.map((line, index) => <span key={`${line}-${index}`} className="block">{line}</span>)}</>;
  const nameVisible = isRevealed || staticMobile;

  return (
    <button
      type="button"
      aria-label={`Reveal ${member.name}, ${member.role}`}
      aria-pressed={isRevealed}
      onMouseEnter={staticMobile ? undefined : reveal}
      onMouseLeave={hide}
      onFocus={staticMobile ? undefined : reveal}
      onBlur={hide}
      onClick={() => { if (!staticMobile) { setIsRevealed((value) => !value); setFlipTrigger((value) => value + 1); } }}
      className={`relative flex w-full items-center gap-4 rounded-sm py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#ef3b67] focus-visible:ring-offset-4 focus-visible:ring-offset-black ${leadership ? 'md:min-h-[17rem]' : 'min-h-[21rem] flex-col justify-center text-center'} ${nameBelow ? 'justify-center text-center' : ''}`}
    >
      {leadership && !nameBelow && !staticMobile && align === 'left' && <span className={`hidden flex-1 text-left text-balance font-black uppercase leading-[0.82] tracking-[-0.055em] text-white [text-shadow:0_8px_26px_rgba(0,0,0,0.7)] transition-all duration-500 md:block ${nameClass} ${isRevealed ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}>{displayName}</span>}

      <div className="flex shrink-0 flex-col items-center text-center">
        <div className={`rounded-full border border-[#ef3b67]/60 p-1.5 shadow-[0_0_0_6px_rgba(188,0,52,0.09)] ${leadership ? '' : 'scale-90 sm:scale-100'}`}>
          <FlipPortrait member={member} trigger={flipTrigger} staticMobile={staticMobile} />
        </div>
        <p className="mt-4 border-t border-[#bc0034]/65 pt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f47a98] sm:text-sm">{member.role}</p>
      </div>

      {(nameBelow || !leadership || staticMobile) && <span className={`mt-2 text-balance font-black uppercase leading-[0.84] tracking-[-0.05em] text-white [text-shadow:0_8px_26px_rgba(0,0,0,0.72)] transition-all duration-500 ${nameClass} ${nameVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>{displayName}</span>}

      {leadership && !nameBelow && !staticMobile && align === 'right' && <span className={`hidden flex-1 text-left text-balance font-black uppercase leading-[0.82] tracking-[-0.055em] text-white [text-shadow:0_8px_26px_rgba(0,0,0,0.7)] transition-all duration-500 md:block ${nameClass} ${isRevealed ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>{displayName}</span>}
    </button>
  );
}

function TeamFrame({ team, isCore = false }: { team: CommitteeTeam; isCore?: boolean }) {
  const leadership = isCore || team.id === 'faculty' ? team.members : team.members.filter((member) => /(head|coordinator)/i.test(member.role));
  const members = isCore || team.id === 'faculty' ? [] : team.members.filter((member) => !/(head|coordinator)/i.test(member.role));
  const isTp = team.id === 'tp';
  const threeAcross = members.length === 3;

  return (
    <section id={team.id} className="scroll-mt-28 px-5 py-12 sm:px-8 md:py-16 lg:px-12">
      <div className="mx-auto max-w-[90rem] overflow-hidden border border-[#bc0034]/45 bg-[linear-gradient(135deg,rgba(188,0,52,0.07),transparent_36%,rgba(255,255,255,0.018))] px-5 py-7 sm:px-8 md:px-10">
        <header className="mb-7 border-l-2 border-[#bc0034] pl-5 sm:mb-8 sm:pl-7"><p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#ef3b67]">DESOC Club</p><h2 className="text-4xl font-black uppercase leading-[0.88] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl">{team.title}</h2></header>
        {leadership.length > 0 && <div className="mb-6 border border-white/10 bg-black/25 px-4 py-4 sm:px-6 md:px-8"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f47a98]">Leadership</p><div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 md:gap-x-10">{leadership.map((member, index) => { const centered = leadership.length % 2 === 1 && index === leadership.length - 1; return <div key={member.id} className={centered ? 'md:col-span-2 md:w-1/2 md:justify-self-center' : ''}><MemberReveal member={member} leadership nameBelow={isTp && centered} align={index % 2 === 0 ? 'left' : 'right'} faculty={team.id === 'faculty'} /></div>; })}</div></div>}
        {members.length > 0 && <div className="border border-white/10 bg-black/25 px-4 py-4 sm:px-6 md:px-8"><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f47a98]">Team Members</p><div className={`grid grid-cols-1 gap-x-8 gap-y-3 ${threeAcross ? 'lg:grid-cols-3 lg:gap-x-5' : 'md:grid-cols-2 md:gap-x-10'}`}>{members.map((member, index) => { const centered = !threeAcross && members.length % 2 === 1 && index === members.length - 1; return <div key={member.id} className={centered ? 'md:col-span-2 md:w-1/2 md:justify-self-center' : ''}><MemberReveal member={member} /></div>; })}</div></div>}
      </div>
    </section>
  );
}

export default function Committee2026View({ yearData }: { yearData: YearCommittee }) {
  const teams = yearData.teams ?? [];
  const faculty = teams.find((team) => team.id === 'faculty');
  const core = teams.find((team) => team.id === 'core');
  const departments = teams.filter((team) => !['faculty', 'core'].includes(team.id));
  return <div className="overflow-x-clip bg-black pb-12 text-white"><CommitteeQuickNav /><header id="committee-top" className="relative overflow-hidden scroll-mt-28 px-5 pb-10 pt-28 sm:px-8 md:pt-32 lg:px-12"><div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#bc0034] to-transparent" /><div className="mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(32rem,1.1fr)]"><div><p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-[#ef3b67]">DESOC · KKWIEER</p><h1 className="text-5xl font-black uppercase leading-[0.77] tracking-[-0.07em] text-white sm:text-7xl md:text-8xl lg:text-9xl">Committee<span className="block pt-2 text-[#bc0034]">{yearData.label}</span></h1><p className="mt-5 max-w-xl border-l border-white/20 pl-4 text-sm leading-relaxed text-gray-400 sm:text-base">The people shaping DESOC’s next chapter in design, technology, and community.</p></div><img src="/text-logo.png" alt="DESOC — Computer Science and Design Club" className="committee-wordmark mx-auto block h-auto w-full max-w-[42rem] object-contain lg:justify-self-end" /></div></header>{faculty && <TeamFrame team={faculty} />}{core && <TeamFrame team={core} isCore />}{departments.map((team) => <TeamFrame key={team.id} team={team} />)}</div>;
}
