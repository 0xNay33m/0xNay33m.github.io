const base = import.meta.env.BASE_URL;

export const profile = {
  name: 'Md Nayeem Ahmed',
  handle: '0xNay33m',
  brand: 'NAYEEM.AHM',
  role: 'Pentest Engineer · Security Researcher',
  location: 'Dhaka, Bangladesh',
  photo: `${base}profile.webp`,
  heroPhoto: `${base}profile-hero.webp`,
  cv: `${base}Md_Nayeem_Ahmed_CV.pdf`,
  bio: 'I break systems to understand them and investigate breaches to explain them. Pentest Engineer at the DIU Cyber Security Centre, digital forensics consultant, CTF organiser and builder of security tooling across offensive, defensive and AI-driven work.',
  short: 'Offensive security, digital forensics & security engineering.',
  email: 'mdnayeemahmed666@gmail.com',
  socials: {
    github: 'https://github.com/0xNay33m',
    linkedin: 'https://linkedin.com/in/md-nayeem-ahmed-16191424b',
    medium: 'https://medium.com/@mdnayeemahmed666',
    x: 'https://x.com/0xNay33m', // TODO: fill - confirm X handle
    youtube: 'https://www.youtube.com/@AQU4M4N',
  },
  // TODO: fill - URL of the hidden "fun projects" site
  funSite: 'https://github.com/0xNay33m?tab=repositories',
  stats: [
    { value: '3rd', label: 'BDSec CTF 2026', sub: 'of 545 teams' },
    { value: 'Top 7%', label: 'TryHackMe', sub: 'global ranking' },
    { value: '10+', label: 'Certifications', sub: 'offense to intel' },
    { value: '14', label: 'Writeups', sub: 'published on Medium' },
  ],
};

export const education = [
  {
    school: 'Daffodil International University',
    degree: 'BSc in Software Engineering (Major: Cybersecurity)',
    period: 'Jun 2022 - Jun 2026',
    location: 'Dhaka, Bangladesh',
    detail: 'CGPA 3.92 / 4.00',
    logo: `${base}orgs/diu.webp`,
    link: { label: 'Daffodil International University website', href: 'https://daffodilvarsity.edu.bd/' },
    notes: [
      {
        label: 'Undergraduate thesis',
        title: 'An Explainable AI-Enhanced Agentic Framework for Video Deepfake Detection and Forensic Reporting',
        to: '/project/deepfake-forensics',
      },
      {
        label: 'Capstone project',
        title: 'WebWizard — a web security testing & education toolkit',
        to: '/project/webwizard',
      },
    ],
  },
];

export const experience = [
  {
    title: 'Pentest Engineer',
    org: 'Cyber Security Centre, Daffodil International University',
    period: 'Jan 2026 - Present',
    location: 'Dhaka, Bangladesh',
    link: { label: 'Cyber Security Centre on Facebook', href: 'https://www.facebook.com/CSCDIU' },
    logo: `${base}orgs/csc.webp`,
    points: [
      'Performing authorized vulnerability assessments and penetration tests (VAPT) on university digital assets and reporting remediations.',
      'Delivering hands-on training on Linux, web application security, OSINT and penetration testing methodology.',
      'Organising CTF competitions and technical assessments for new member recruitment.',
    ],
  },
  {
    title: 'Contractual Security Consultant',
    org: 'Cholo Bohudur',
    period: 'Mar 2026',
    location: 'Dhaka, Bangladesh',
    engagement: '7-day incident response engagement',
    link: { label: 'Cholo Bohudur on Facebook', href: 'https://www.facebook.com/cholobohudur.official' },
    logo: `${base}orgs/cholo-bohudur.webp`,
    caseStudy: '/case/cholo-bohudur-investigation',
    points: [
      'Conducted VAPT and a full digital forensic investigation following a security incident.',
      'Performed log analysis, WordPress security assessment and forensic evidence collection and reporting.',
    ],
  },
  {
    title: 'Lead Organiser',
    org: 'CSC_Cyberwar CTF 2026',
    period: '2026',
    location: 'Daffodil International University',
    points: [
      'Led infrastructure deployment and platform management for the CTF environment.',
      'Designed challenges in reverse engineering, digital forensics and binary exploitation.',
      'Coordinated challenge authors, infrastructure teams and event operations.',
    ],
  },
  {
    title: 'Invigilator & Challenge Contributor',
    org: 'Al-Khwarizmi CTF 2025',
    period: '2025',
    location: 'Dhaka, Bangladesh',
    points: ['Assisted in challenge design and competition operations.', 'Supported event monitoring and participant coordination.'],
  },
  {
    title: 'Security Analyst',
    org: 'CHOLO BOHUDUR',
    period: 'Mar 2024 - Aug 2024',
    location: 'Dhaka, Bangladesh',
    points: [
      'Monitored and secured social media assets against spam, phishing and account takeover.',
      'Implemented preventive controls and security best practices for the organisation\'s digital presence.',
    ],
  },
];

export const research = [
  {
    title:
      'Timing Observability of Serial Post-Quantum Hybrid Key Encapsulation: A Measurement Study of ML-KEM and BIKE Decapsulation on Commodity x86 Processors',
    detail:
      'Hybrid key encapsulation keeps a session key safe unless every component scheme breaks — but those proofs say nothing about timing. This study asks whether running two post-quantum decapsulations back to back makes the computation more observable to a timing attacker than its slowest component alone.',
    status: 'Manuscript in preparation',
    with: 'Supervised by Nadira Islam, Assistant Professor, Daffodil International University',
    concept: [
      {
        label: 'Why it matters',
        text: 'The world is moving to post-quantum cryptography by hybridising: pairing schemes from different mathematical families (lattice-based ML-KEM with a code-based KEM) so one break is not enough. Combiner proofs cover key secrecy, but an implementation that runs two decapsulations in series exposes a longer computation, and timing is a property of that computation.',
      },
      {
        label: 'The question',
        text: 'Does serial composition widen the timing distribution an observer can measure, or does the hybrid simply inherit the timing of its slowest leg? And when a widening appears, is it real composition or a measurement artifact?',
      },
      {
        label: 'The approach',
        text: 'A measurement study on commodity x86 laptops: the same harness times each scheme alone and inside the hybrid, under a local, unprivileged observer model, backed by structural checks for secret-dependent behaviour.',
      },
    ],
    topics: ['Post-quantum cryptography', 'Hybrid KEMs', 'ML-KEM', 'BIKE', 'Timing side channels', 'Constant-time software'],
  },
];

/** Leadership & community roles — rendered on the home Leadership card. Add new entries here; details can be filled in later. */
export const leadership = [
  {
    title: 'Lead Organiser',
    org: 'CSC_Cyberwar CTF 2026 — CTF organisation & operations',
    period: '2026',
  },
  {
    title: 'Invigilator & Problem Setter',
    org: 'Al-Khwarizmi CTF 2025',
    period: '2025',
  },
  {
    title: 'Session Instructor',
    org: 'Cybersecurity basics sessions — Cyber Security Centre, DIU',
    period: '', // TODO: add year + session details
  },
  {
    title: 'Volunteer',
    org: 'Cyber Security Awareness Day (CSAD), DIU',
    period: '2023', // TODO: add details
  },
];

export const skills = [
  { group: 'Offensive', items: ['Penetration Testing', 'Red Teaming', 'Web App Security', 'Privilege Escalation', 'OSINT', 'WordPress Assessment', 'Vulnerability Research'] },
  { group: 'Defensive', items: ['Incident Response', 'Digital Forensics', 'Threat Hunting', 'Log Analysis', 'SIEM Concepts', 'Malware Analysis', 'Web Server Forensics'] },
  { group: 'Tools', items: ['Burp Suite', 'Metasploit', 'Wireshark', 'Nmap', 'Ghidra', 'WPScan', 'Hydra', 'Gobuster', 'SQLMap', 'FFUF', 'Volatility', 'Autopsy'] },
  { group: 'Programming', items: ['Python', 'Bash', 'C', 'SQL', 'TypeScript'] },
];
