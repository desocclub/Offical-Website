'use client';

import { useEffect, useRef, useState } from 'react';
import type { CommitteeMember, CommitteeTeam, YearCommittee } from '@/types/committee';
import { resolveSrc } from '@/lib/imageUtils';
import CommitteeQuickNav from './CommitteeQuickNav';

const FLIP_DURATION_MS = 600;
const LOGO_VISIBLE_MS = 120;
const THREE_MEMBER_ROW_TEAMS = ['editorial', 'tp', 'gda'];

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
      const context = canvas.getContext('2d');

      if (!context) return;

      const size = 512;
      canvas.width = size;
      canvas.height = size;

      const sourceSize = Math.min(image.naturalWidth, image.naturalHeight);

      context.drawImage(
        image,
        (image.naturalWidth - sourceSize) / 2,
        (image.naturalHeight - sourceSize) / 2,
        sourceSize,
        sourceSize,
        0,
        0,
        size,
        size,
      );

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

    return () => {
      cancelled = true;
    };
  }, [src]);

  if (failed) {
    return <img src={src} alt={alt} loading="lazy" />;
  }

  return <canvas ref={canvasRef} role="img" aria-label={alt} />;
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.66H9.35V8.98h3.41v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.38 4.27 5.47v6.28ZM5.33 7.41a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm-1.78 13.04h3.57V8.98H3.55v11.47Z" />
    </svg>
  );
}

/*
  If a direct LinkedIn profile URL is added in committee data, it will use that.
  Otherwise it opens a LinkedIn people search for that member.
*/
function getLinkedInHref(member: CommitteeMember) {
  if (member.linkedin) return member.linkedin;

  return `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(
    `${member.name} DESOC KKWIEER`,
  )}`;
}

function useMobileView() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(query.matches);

    update();
    query.addEventListener('change', update);

    return () => query.removeEventListener('change', update);
  }, []);

  return isMobile;
}

function FlipPortrait({
  member,
  trigger,
  staticMobile,
}: {
  member: CommitteeMember;
  trigger: number;
  staticMobile: boolean;
}) {
  const [showPhoto, setShowPhoto] = useState(true);

  useEffect(() => {
    if (!trigger || staticMobile) return undefined;

    setShowPhoto(false);

    const timer = window.setTimeout(() => {
      setShowPhoto(true);
    }, FLIP_DURATION_MS + LOGO_VISIBLE_MS);

    return () => window.clearTimeout(timer);
  }, [trigger, staticMobile]);

  const imageSrc = resolveSrc(member.image);

  return (
    <div className="committee-flip-container">
      <div className={`committee-flip-inner ${showPhoto || staticMobile ? 'is-photo' : ''}`}>
        <div className="committee-flip-face committee-flip-logo">
          <img src="/desoc-logo.png" alt="DESOC logo" draggable={false} />
        </div>

        <div className="committee-flip-face committee-flip-photo">
          {imageSrc ? (
            <GreenScreenPhoto src={imageSrc} alt={member.name} />
          ) : (
            <span>{member.name.slice(0, 1)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function formatFacultyName(name: string) {
  const parts = name.split(' ');

  if (name.startsWith('Dr. Prof.')) {
    return ['Dr.', parts.slice(1, -1).join(' '), parts.at(-1) ?? ''];
  }

  return parts;
}

function NameBlock({
  member,
  faculty = false,
  visible,
  compact = false,
  singleLine = false,
}: {
  member: CommitteeMember;
  faculty?: boolean;
  visible: boolean;
  compact?: boolean;
  singleLine?: boolean;
}) {
  const lines = faculty && !singleLine ? formatFacultyName(member.name) : [member.name];

  return (
    <div
      className={`text-balance font-black uppercase leading-[0.84] tracking-[-0.05em] text-white [text-shadow:0_8px_26px_rgba(0,0,0,0.72)] ${
        faculty
          ? 'text-[clamp(1.7rem,3vw,3.2rem)]'
          : compact
            ? 'text-[clamp(1.15rem,1.8vw,1.75rem)]'
            : 'text-[clamp(1.45rem,2.5vw,2.5rem)]'
      } ${singleLine ? 'whitespace-nowrap text-[clamp(1.1rem,5vw,1.45rem)]' : ''} transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      }`}
    >
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="block">
          {line}
        </span>
      ))}
    </div>
  );
}

function LinkedInButton({ member }: { member: CommitteeMember }) {
  return (
    <a
      href={getLinkedInHref(member)}
      target="_blank"
      rel="noreferrer"
      aria-label={`${member.name} on LinkedIn`}
      className="mt-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#ef3b67]/60 text-[#f47a98] transition-colors hover:bg-[#bc0034] hover:text-white focus-visible:bg-[#bc0034] focus-visible:text-white focus-visible:outline-none"
    >
      <LinkedInIcon />
    </a>
  );
}

function CoreMember({
  member,
  index,
  nameBelow,
  faculty = false,
  namesVisible,
  flipTrigger,
}: {
  member: CommitteeMember;
  index: number;
  nameBelow: boolean;
  faculty?: boolean;
  namesVisible: boolean;
  flipTrigger: number;
}) {
  const isMobile = useMobileView();
  const nameVisible = isMobile || namesVisible;

  const showNameOnLeft = !nameBelow && index % 2 === 0;
  const showNameOnRight = !nameBelow && index % 2 !== 0;

  return (
    <article
      className={`relative flex min-h-[19rem] w-full items-center justify-center gap-4 py-4 text-center ${
        faculty ? 'md:min-h-[25rem]' : 'md:min-h-[17rem]'
      } ${nameBelow ? 'md:justify-center' : 'md:text-left'}`}
    >
      {showNameOnLeft && !isMobile && (
        <div className="hidden flex-1 self-stretch items-center text-left md:flex">
          <NameBlock member={member} faculty={faculty} visible={nameVisible} />
        </div>
      )}

      <div className="flex shrink-0 flex-col items-center text-center">
        <div className="rounded-full border border-[#ef3b67]/60 p-1.5 shadow-[0_0_0_6px_rgba(188,0,52,0.09)]">
          <FlipPortrait
            member={member}
            trigger={flipTrigger}
            staticMobile={isMobile}
          />
        </div>

        <p className="mt-4 border-t border-[#bc0034]/65 pt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f47a98] sm:text-sm">
          {member.role}
        </p>

        {nameBelow && !isMobile && (
          <div className="mt-3">
            <NameBlock member={member} faculty={faculty} visible={nameVisible} />
          </div>
        )}

        {isMobile && (
          <div className="mt-3">
            <NameBlock
              member={member}
              faculty={false}
              visible
              singleLine
            />
          </div>
        )}

        <LinkedInButton member={member} />
      </div>

     {showNameOnRight && !isMobile && (
  <div
    className={`hidden flex-1 self-stretch items-center text-left md:flex ${
      faculty ? 'md:translate-x-4' : ''
    }`}
  >
    <NameBlock member={member} faculty={faculty} visible={nameVisible} />
  </div>
)}
    </article>
  );
}

function DepartmentMember({
  member,
  namesVisible,
  flipTrigger,
}: {
  member: CommitteeMember;
  namesVisible: boolean;
  flipTrigger: number;
}) {
  const isMobile = useMobileView();

  return (
    <article className="flex min-h-[20rem] flex-col items-center justify-center py-4 text-center">
      <div className="rounded-full border border-[#ef3b67]/60 p-1.5 shadow-[0_0_0_6px_rgba(188,0,52,0.09)]">
        <FlipPortrait
          member={member}
          trigger={flipTrigger}
          staticMobile={isMobile}
        />
      </div>

      <p className="mt-4 border-t border-[#bc0034]/65 pt-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f47a98] sm:text-sm">
        {member.role}
      </p>

      <div className="mt-3">
        <NameBlock
          member={member}
          visible={isMobile || namesVisible}
          compact
          singleLine={isMobile}
        />
      </div>

      <LinkedInButton member={member} />
    </article>
  );
}

function TeamFrame({
  team,
  isCore = false,
}: {
  team: CommitteeTeam;
  isCore?: boolean;
}) {
  const [namesVisible, setNamesVisible] = useState(false);
  const [flipTrigger, setFlipTrigger] = useState(0);
  const isMobile = useMobileView();

  const isFaculty = team.id === 'faculty';
  const isThreeMemberRow = THREE_MEMBER_ROW_TEAMS.includes(team.id);
  const isDepartment = !isCore && !isFaculty;

  const revealSection = () => {
    if (isMobile) return;

    setNamesVisible(true);
    setFlipTrigger((value) => value + 1);
  };

  const hideSection = () => {
    if (!isMobile) setNamesVisible(false);
  };

  return (
    <section id={team.id} className="scroll-mt-28 px-5 py-12 sm:px-8 md:py-16 lg:px-12">
      <div
        onMouseEnter={revealSection}
        onMouseLeave={hideSection}
        className="mx-auto max-w-[90rem] overflow-hidden border border-[#bc0034]/45 bg-[linear-gradient(135deg,rgba(188,0,52,0.07),transparent_36%,rgba(255,255,255,0.018))] px-5 py-7 sm:px-8 md:px-10"
      >
        <header className="mb-7 border-l-2 border-[#bc0034] pl-5 sm:mb-8 sm:pl-7">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#ef3b67]">
            DESOC Club
          </p>

          <h2 className="text-4xl font-black uppercase leading-[0.88] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl">
            {team.title}
          </h2>
        </header>

        {isDepartment ? (
          <div
            className={`grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 sm:gap-x-10 ${
              isThreeMemberRow ? 'lg:grid-cols-3 lg:gap-x-5' : ''
            }`}
          >
            {team.members.map((member, index) => {
              const isLastOddMember =
                !isThreeMemberRow &&
                team.members.length % 2 === 1 &&
                index === team.members.length - 1;

              return (
                <div
                  key={member.id}
                  className={
                    isLastOddMember
                      ? 'sm:col-span-2 sm:w-1/2 sm:justify-self-center'
                      : ''
                  }
                >
                  <DepartmentMember
                    member={member}
                    namesVisible={namesVisible}
                    flipTrigger={flipTrigger}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2 md:gap-x-10">
            {team.members.map((member, index) => {
              const isLastCoreMember =
                isCore && index === team.members.length - 1;

              return (
                <div
                  key={member.id}
                  className={
                    isLastCoreMember
                      ? 'md:col-span-2 md:w-1/2 md:justify-self-center'
                      : ''
                  }
                >
                  <CoreMember
                    member={member}
                    index={index}
                    nameBelow={isLastCoreMember}
                    faculty={isFaculty}
                    namesVisible={namesVisible}
                    flipTrigger={flipTrigger}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default function Committee2026View({
  yearData,
}: {
  yearData: YearCommittee;
}) {
  const teams = yearData.teams ?? [];

  const faculty = teams.find((team) => team.id === 'faculty');
  const core = teams.find((team) => team.id === 'core');
  const departments = teams.filter(
    (team) => !['faculty', 'core'].includes(team.id),
  );

  return (
    <div className="overflow-x-clip bg-black pb-12 text-white">
      <CommitteeQuickNav />

      <header
        id="committee-top"
        className="relative overflow-hidden scroll-mt-28 px-5 pb-10 pt-28 sm:px-8 md:pt-32 lg:px-12"
      >
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#bc0034] to-transparent" />

        <div className="mx-auto grid max-w-[90rem] grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(32rem,1.1fr)]">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-[#ef3b67]">
              DESOC · KKWIEER
            </p>

            <h1 className="text-5xl font-black uppercase leading-[0.77] tracking-[-0.07em] text-white sm:text-7xl md:text-8xl lg:text-9xl">
              Committee
              <span className="block pt-2 text-[#bc0034]">{yearData.label}</span>
            </h1>

            <p className="mt-5 max-w-xl border-l border-white/20 pl-4 text-sm leading-relaxed text-gray-400 sm:text-base">
              The people shaping DESOC’s next chapter in design, technology,
              and community.
            </p>
          </div>

          <img
            src="/text-logo.png"
            alt="DESOC — Computer Science and Design Club"
            className="committee-wordmark mx-auto block h-auto w-full max-w-[42rem] object-contain lg:justify-self-end"
          />
        </div>
      </header>

      {faculty && <TeamFrame team={faculty} />}
      {core && <TeamFrame team={core} isCore />}

      {departments.map((team) => (
        <TeamFrame key={team.id} team={team} />
      ))}
    </div>
  );
}