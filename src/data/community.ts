import { ClipboardCheck, Eye, Flag, HandHeart, LayoutDashboard, Presentation, type LucideIcon } from 'lucide-react';

const base = import.meta.env.BASE_URL;
const ctfImg = (name: string) => `${base}ctf/${name}.webp`;

export interface StoryLink {
  label: string;
  /** Internal route (rendered with the router) or external URL. */
  to?: string;
  href?: string;
}

export interface Chapter {
  when: string;
  role: string;
  title: string;
  place: string;
  icon: LucideIcon;
  story: string[];
  stats?: { value: string; label: string }[];
  highlights?: string[];
  images?: string[];
  video?: string;
  links?: StoryLink[];
}

export const mission = {
  title: 'Why I build community',
  paragraphs: [
    'Daffodil International University’s software engineering department has its own Cyber Security Centre. I want it to grow into a strong, welcoming cybersecurity community: one that makes the path into security smoother, narrows the gap between the classroom and the industry, and keeps people going when the work gets hard.',
    'Learning security alone for long stretches, without guidance or a sense of progress, is how motivated students quietly give up. So alongside my own self-learning, I share what I know: by organising competitions, rethinking how we recruit, building tools and teaching.',
  ],
  quote: 'Hunt your way to 1337.',
  quoteBy: 'My message to the new batch',
};

export const chapters: Chapter[] = [
  {
    when: '2023',
    role: 'Volunteer',
    title: 'Where it started',
    place: 'Cyber Security Awareness Day (CSAD), DIU',
    icon: HandHeart,
    story: ['My first role in the community was behind the scenes, volunteering at Cyber Security Awareness Day 2023.'],
  },
  {
    when: '2025',
    role: 'Invigilator & Problem Setter',
    title: 'The other side of the table',
    place: 'Al-Khwarizmi CTF 2025 · national level',
    icon: Eye,
    story: [
      'Before we organised a CTF of our own, I was invited to invigilate the final round of Al-Khwarizmi CTF 2025 and trusted to design the problem set its finalists competed on.',
      'Monitoring a live event and coordinating with participants from the organiser’s seat showed me what it takes to run a competition well.',
    ],
    highlights: ['Final-round problem set', 'Live event invigilation', 'Participant coordination'],
    images: [ctfImg('alkhwarizmi-1')],
    links: [
      { label: 'The challenges I set', to: '/d/ctf' },
      { label: 'LinkedIn post', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7426943817766944768/' },
    ],
  },
  {
    when: 'May 2026',
    role: 'Lead Organiser',
    title: 'Our first CTF',
    place: 'CSC_Cyberwar CTF 2026 · intra-university',
    icon: Flag,
    story: [
      'CSC_Cyberwar was the first CTF we ever organised: an intra-university competition held under Cyber Security Awareness Day 2026, three years after I first volunteered at the same event.',
      'Instead of hiring a third party, we did it all ourselves. We developed the challenges, built and hosted the platform, and managed and operated the event, and it ran clean with zero downtime.',
      'I led the infrastructure, the platform and the teams behind them, and received a Certificate of Appreciation as Lead Organiser.',
    ],
    stats: [
      { value: '25+', label: 'CTF challenges' },
      { value: '0', label: 'Downtime' },
      { value: '~90%', label: 'Cost saved in-house' },
    ],
    highlights: ['Crypto, steganography, web, wireless & reversing', 'Self-hosted CTFd platform', 'Authors, infra & ops teams'],
    images: ['cyberwar-2', 'cyberwar-1', 'cyberwar-4', 'cyberwar-5', 'cyberwar-3'].map(ctfImg),
    links: [
      { label: 'GitHub', href: 'https://github.com/0xNay33m/csc_cyberwar_ctf' },
      { label: 'LinkedIn post', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7463862016903069696/' },
    ],
  },
  {
    when: 'Jun 2026',
    role: 'Organiser',
    title: 'A recruitment exam worth taking',
    place: 'CSC membership exam',
    icon: ClipboardCheck,
    story: [
      'Next, we rethought how the centre recruits. I wanted the exam I had wished for as an applicant: one that rewards problem-solving, persistence and curiosity rather than memorised facts.',
      'With a team of offensive-security enthusiasts, we built and ran the whole exam on a CTF-style platform: 30 questions in three tiers, from observation and judgment, through analytical reasoning and evidence evaluation, to investigative thinking and decision intelligence. A short viva followed to see each applicant’s passion and creativity.',
    ],
    stats: [
      { value: '77', label: 'Applicants' },
      { value: '30', label: 'Questions · 3 tiers' },
      { value: '0', label: 'Downtime' },
    ],
    images: ['recruitment-7', 'recruitment-2', 'recruitment-9', 'recruitment-4', 'recruitment-5', 'recruitment-6', 'recruitment-3', 'recruitment-8', 'recruitment-1'].map(ctfImg),
    links: [{ label: 'LinkedIn post', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7471228822332391425/' }],
  },
  {
    when: 'Sep 2026',
    role: 'Builder',
    title: 'CyberTrack: nobody learns alone',
    place: 'Cyber Security Centre · Capacity Buildup Project',
    icon: LayoutDashboard,
    story: [
      'Becoming a strong security professional takes consistency, a clear goal and a path to follow, but the journey can feel lonely. Students who learn in isolation for too long, without guidance or visible progress, lose motivation.',
      'So I built CyberTrack, where the centre’s students document, track, collaborate and grow: structured learning tracks, tasks from faculty and mentors, projects and research, technical blogs, CTFs and a portfolio that builds over time. Leaderboard-based progression makes progress visible, and faculty get a clearer picture of each student’s strengths and interests.',
      'It launched at the orientation of the new batch, and I was awarded the Gold Member Badge.',
    ],
    video: 'ezYa6QU7ScY',
    links: [
      { label: 'Explore the project', to: '/project/cybertrack' },
      { label: 'LinkedIn post', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7510265381635186688/' },
    ],
  },
  {
    when: 'Ongoing',
    role: 'Session Instructor',
    title: 'Teaching what I learn',
    place: 'Cyber Security Centre members',
    icon: Presentation,
    story: [
      'Alongside my own learning, I run sessions for members of the Cyber Security Centre, starting from the basics and moving into hands-on practice.',
    ],
    highlights: ['Linux', 'Web application security', 'OSINT', 'Penetration testing methodology'],
  },
];

export const pipeline = [
  { title: 'Prompt-engineering challenge platform', text: 'A challenge platform for practising prompt engineering.' },
  { title: 'A dedicated CTF platform for CSC', text: 'Our own CTF platform for the Cyber Security Centre’s future competitions.' },
];
