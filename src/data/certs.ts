export interface Cert {
  name: string;
  short: string;
  issuer: string;
  date: string;
  image?: string;
  credentialId?: string;
  verify?: string;
  pdf?: string;
  category: 'Offensive' | 'Defensive' | 'Intelligence' | 'Education' | 'Networking' | 'Competition';
}

const img = (name: string) => `${import.meta.env.BASE_URL}certs/${name}.webp`;

export const certs: Cert[] = [
  {
    name: 'Jr Penetration Tester',
    short: 'THM JPT',
    issuer: 'TryHackMe',
    date: 'Feb 2025',
    image: img('thm-jr-pentester'),
    credentialId: 'THM-NGR0L8HTSA',
    verify: 'https://tryhackme.com/certificate/THM-NGR0L8HTSA',
    category: 'Offensive',
  },
  {
    name: 'Certified Web App Penetration Testing Apprentice',
    short: 'kWAPTA',
    issuer: 'Knight Squad Academy',
    date: 'Jan 2026',
    image: img('kwapta'),
    credentialId: 'KSA-WTPPEHFS2401',
    category: 'Offensive',
  },
  {
    name: 'Certified API Hacking Expert',
    short: 'CAPIE',
    issuer: 'API Hacking Course',
    date: 'Feb 2026',
    image: img('capie'),
    credentialId: 'qEjlXIPR',
    category: 'Offensive',
  },
  {
    name: 'Certified API Security Analyst',
    short: 'CASA',
    issuer: 'APIsec University',
    date: 'Apr 2026',
    image: img('casa'),
    credentialId: 'acd516e7-7e7e-4df1-b3f1-4e50cec379b9',
    verify: 'https://www.credly.com/badges/acd516e7-7e7e-4df1-b3f1-4e50cec379b9',
    pdf: `${import.meta.env.BASE_URL}certs/casa.pdf`,
    category: 'Offensive',
  },
  {
    name: 'APIsec Certified Practitioner',
    short: 'ACP',
    issuer: 'APIsec University',
    date: 'Apr 2026',
    image: img('acp-practitioner'),
    credentialId: '115bbad6-4c77-4917-b4e5-302e5db458c3',
    verify: 'https://www.credly.com/badges/115bbad6-4c77-4917-b4e5-302e5db458c3',
    category: 'Offensive',
  },
  {
    name: 'APIsec Certified Practitioner: Exam Passed',
    short: 'ACP Exam',
    issuer: 'APIsec University',
    date: 'Apr 2026',
    image: img('acp'),
    credentialId: 'fcd92956-eee4-4332-9cc1-da8c54020dac',
    verify: 'https://www.credly.com/badges/fcd92956-eee4-4332-9cc1-da8c54020dac',
    category: 'Offensive',
  },
  {
    name: 'Certified Threat Intelligence & Governance Analyst',
    short: 'CTIGA',
    issuer: 'Red Team Leaders',
    date: 'Feb 2026',
    image: img('ctiga'),
    category: 'Intelligence',
  },
  {
    name: 'Certified Cybersecurity Educator Professional',
    short: 'CCEP',
    issuer: 'Red Team Leaders',
    date: 'Feb 2026',
    image: img('ccep'),
    category: 'Education',
  },
  {
    name: 'Certified Cyber Fundamentals Associate',
    short: 'CCFA',
    issuer: 'National Cyber Security Agency, Bangladesh',
    date: 'Nov 2025',
    image: img('ccfa'),
    credentialId: 'NCSA-CCFA-2025282',
    category: 'Defensive',
  },
  {
    name: 'CCNA: Enterprise Networking, Security, and Automation',
    short: 'CCNA ENSA',
    issuer: 'Cisco Networking Academy',
    date: 'Jan 2024',
    image: img('ccna-ensa'),
    pdf: `${import.meta.env.BASE_URL}certs/ccna-ensa.pdf`,
    category: 'Networking',
  },
  {
    name: 'Introduction to Cybersecurity',
    short: 'Cisco I2CS',
    issuer: 'Cisco Networking Academy',
    date: 'Sep 2022',
    image: img('cisco-intro-cyber'),
    credentialId: 'f5e87397-6a82-4f4b-8c89-763728777f15',
    verify: 'https://www.credly.com/badges/f5e87397-6a82-4f4b-8c89-763728777f15',
    category: 'Defensive',
  },
  {
    name: 'BDSec CTF 2026: 3rd Place of 545 Teams',
    short: 'BDSec CTF',
    issuer: 'BDSec',
    date: 'Jul 2026',
    image: img('bdsec-ctf-2026'),
    category: 'Competition',
  },
  {
    name: 'Global Ynov Partners CTF: 22nd of 71',
    short: 'Ynov CTF',
    issuer: 'Ynov',
    date: 'Apr 2026',
    image: img('ynov-ctf-2026'),
    category: 'Competition',
  },
];
