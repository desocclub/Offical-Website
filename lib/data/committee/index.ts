import type { YearCommittee } from '@/types/committee';
import { committee2025_26 } from './2025-26';
import { committee2026_27 } from './2026-27';

export const ALL_COMMITTEE_YEARS: YearCommittee[] = [
  committee2026_27,
  committee2025_26,
];

export function getCommitteeByYear(yearKey: string): YearCommittee | undefined {
  return ALL_COMMITTEE_YEARS.find(
    (item) => item.year === yearKey || item.label === yearKey
  );
}

export function getLatestCommitteeYear(): YearCommittee {
  return ALL_COMMITTEE_YEARS[0];
}

export function getRevealedCommitteeYears(): YearCommittee[] {
  return ALL_COMMITTEE_YEARS.filter((item) => item.status === 'revealed');
}

export { committee2025_26, committee2026_27 };
