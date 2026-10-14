export interface CtfEvent {
  name: string;
  year: string;
  role: string;
  description: string;
  highlights: string[];
  link?: string;
  linkedin?: string;
  cover?: string;
  gallery?: string[];
  /** Event label used in ctfChallenges; lists the challenge domains authored for it. */
  challengeEvent?: string;
}

const img = (name: string) => `${import.meta.env.BASE_URL}ctf/${name}.webp`;
const series = (name: string, count: number) => Array.from({ length: count }, (_, i) => img(`${name}-${i + 1}`));

export interface CtfResult {
  event: string;
  year: string;
  placement: string;
  detail?: string;
  team?: string;
  highlight?: boolean;
}

export const organized: CtfEvent[] = [
  {
    name: 'CSC_Cyberwar CTF 2026',
    year: '2026',
    role: 'Lead Organiser',
    description:
      'Intra-university CTF held under Cyber Security Awareness Day (CSAD) 2026 at Daffodil International University. From strategic planning and challenge development to event-day execution, I led infrastructure, platform management and the teams behind it, and received a Certificate of Appreciation as Lead Organiser.',
    highlights: [
      'Platform deployment and management on CTFd',
      'Challenge design across crypto, steganography, web, wireless and reversing',
      'Coordinated authors, infrastructure and operations teams',
      'Challenges balanced to the skill level of university participants',
    ],
    link: 'https://github.com/0xNay33m/csc_cyberwar_ctf',
    linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7463862016903069696/',
    cover: img('cyberwar-1'),
    gallery: series('cyberwar', 5),
  },
  {
    name: 'CSC Recruitment Exam',
    year: '2026',
    role: 'Organiser · Cyber Security Centre, DIU',
    description:
      'Redesigned the Cyber Security Centre membership exam to be the process I wished for as an applicant. With a team of offensive security enthusiasts, we built and ran the full examination environment, focused on problem-solving, persistence and curiosity rather than rote technical knowledge.',
    highlights: [
      '77 applicants, run end to end with zero downtime',
      '30 logical reasoning and analytical questions on a CTF-style platform',
      'Short viva to assess passion, creativity and curiosity',
    ],
    linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7471228822332391425/',
    cover: img('recruitment-4'),
    gallery: series('recruitment', 9),
  },
];

export const judged: CtfEvent[] = [
  {
    name: 'Al-Khwarizmi CTF 2025',
    year: '2025',
    role: 'Invigilator & Problem Setter',
    description:
      'Invited as an invigilator for the final round of this national-level CTF, and trusted to design the problem set the finalists competed on. I monitored the live event and coordinated with participants throughout.',
    highlights: ['Problem set designed for the final round', 'Live event invigilation', 'Participant coordination'],
    linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7426943817766944768/',
    cover: img('alkhwarizmi-1'),
    challengeEvent: 'Al-Khwarizmi CTF 2025',
  },
];

export const participation: CtfResult[] = [
  { event: 'BDSec CTF', year: '2026', placement: '3rd Place', detail: 'out of 545 teams (international)', team: 'Benson & Hedges', highlight: true },
  { event: 'HackerOne BUG HUNT', year: '2026', placement: 'Finalist', highlight: true },
  { event: 'Global Ynov Partners CTF', year: '2026', placement: '22nd / 71', detail: '25 of 38 challenges · 12,825 pts', team: 'Ajaira', highlight: true },
  { event: 'CyberRaid CTF', year: '2025', placement: '27th Place', detail: 'Finalist', highlight: true },
  { event: 'DIU Cybercon CTF', year: '2025', placement: '12th Place', detail: 'Finalist', highlight: true },
  { event: 'IUTCTF', year: '2024', placement: '12th Place', highlight: true },
  { event: 'Flag Fest', year: '2024', placement: '5th Place', highlight: true },
  { event: 'BUET CTF', year: '2023', placement: '17th Place', highlight: true },
  { event: 'CyberDrill', year: '2023', placement: '57th Place', highlight: true },
  { event: 'FlagHunt', year: '2023', placement: '5th Place', detail: 'Finalist', highlight: true },
];
