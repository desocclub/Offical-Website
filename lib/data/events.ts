import type { Event } from '@/types/events';
import cybersabhaImg from '@/src/assets/cybersabha.jpeg';
import sharkverseImg from '@/src/assets/genesis/sharkverse1.jpg';
import escapeMatrixImg from '@/src/assets/genesis/escape1.jpg';
import bidnBuildImg from '@/src/assets/genesis/bidnbuild1.jpg';

export const events: Event[] = [
  {
    id: 'cybersabha-2',
    slug: 'cyber-sabha',
    title: 'Cyber Sabha 2.0',
    description: 'A dynamic MUN-style cybersecurity debate exploring digital governance, cyber policy, and international tech diplomacy.',
    category: 'DIGITAL GOVERNANCE + DEBATE + POLICY MAKING',
    image: cybersabhaImg,
    location: 'TBA',
    registrationUrl: '/events/cyber-sabha',
    schedule: {
      status: 'tba',
      startDate: null,
      endDate: null,
    },
  },
  {
    id: 'sharkverse-2026',
    slug: 'sharkverse',
    title: 'Sharkverse - Genesis 2026',
    description: 'Simulated startup pitch arena where innovation meets strategy and investor-style decision making.',
    category: 'STARTUP PITCH & VENTURE ARENA',
    image: sharkverseImg,
    location: 'Seminar Hall 2 & Virtual',
    registrationUrl: '/genesis/events/sharkverse',
    schedule: {
      status: 'confirmed',
      startDate: '2026-03-28T10:00:00+05:30',
      endDate: '2026-03-28T15:00:00+05:30',
    },
  },
  {
    id: 'escape-2026',
    slug: 'escape-the-matrix',
    title: 'Escape The Matrix - Genesis 2026',
    description: 'Solve chained cryptographic and system puzzles across sequential checkpoints to unlock the final protocol.',
    category: 'ALGORITHMIC PUZZLE & ESCAPE CHALLENGE',
    image: escapeMatrixImg,
    location: 'Campus Wide',
    registrationUrl: '/genesis/events/escape-the-matrix',
    schedule: {
      status: 'confirmed',
      startDate: '2026-03-27T10:00:00+05:30',
      endDate: '2026-03-27T15:00:00+05:30',
    },
  },
  {
    id: 'bidnbuild-2026',
    slug: 'bid-and-build',
    title: 'Bid & Build - Genesis 2026',
    description: 'Manage token economy budgets in live auctions, negotiate asset trades, and build a finished product under constrained deadlines.',
    category: 'DESIGN AUCTION & RAPID PROTOTYPING',
    image: bidnBuildImg,
    location: 'Computer Engineering Complex',
    registrationUrl: '/genesis/events/bid-and-build',
    schedule: {
      status: 'confirmed',
      startDate: '2026-03-28T10:00:00+05:30',
      endDate: '2026-03-28T15:00:00+05:30',
    },
  },
];

export default events;
