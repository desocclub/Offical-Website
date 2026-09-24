'use client';

import React from 'react';
import type { YearCommittee, CommitteeMember } from '@/types/committee';
import { resolveSrc } from '@/lib/imageUtils';

interface CommitteeRevealedViewProps {
  yearData: YearCommittee;
}

const MemberCard: React.FC<{ member: CommitteeMember }> = ({ member }) => {
  const imageSrc = resolveSrc(member.image);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#bc0034]/60 hover:shadow-[0_12px_30px_rgba(188,0,52,0.18)]">
      <div className="aspect-[3/4] overflow-hidden bg-[#19050b] flex items-center justify-center relative">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest text-center px-2">
            {member.name.split(' ').map((n) => n[0]).join('')}
          </span>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent px-4 pb-4 pt-12">
        <h3 className="text-base text-primary leading-tight font-medium" style={{ letterSpacing: '-0.015em' }}>
          {member.name}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-wider text-[#ef3b67] font-medium">
          {member.role}
        </p>
      </div>
    </article>
  );
};

export const CommitteeRevealedView: React.FC<CommitteeRevealedViewProps> = ({ yearData }) => {
  if (!yearData.teams || yearData.teams.length === 0) {
    return null;
  }

  return (
    <div className="space-y-12">
      {yearData.teams.map((team) => (
        <section key={team.id} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 rounded-full bg-gradient-to-b from-[#bc0034] to-[#ef3b67]" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {team.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {team.members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default CommitteeRevealedView;
