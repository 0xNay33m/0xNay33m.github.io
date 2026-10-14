export interface Platform {
  name: string;
  mark: string;
  tagline: string;
  color: string;
  url: string;
  stat?: string;
  detail: string;
}

export const platforms: Platform[] = [
  {
    name: 'Hack The Box',
    mark: 'HTB',
    tagline: 'Machines, Pro Labs & Academy',
    color: '#9fef00',
    url: 'https://profile.hackthebox.com/profile/019d7327-68b4-7100-b837-0b33d8aa4484',
    detail: 'Realistic machines that sharpened enumeration discipline, Active Directory attack paths and privilege escalation.',
  },
  {
    name: 'TryHackMe',
    mark: 'THM',
    tagline: 'Guided paths & rooms',
    color: '#e8304a',
    url: 'https://tryhackme.com/p/ghostman666',
    stat: 'Top 7% globally',
    detail: 'Completed the Jr Penetration Tester path (~30 hours) and built a broad foundation across offense and defense.',
  },
  {
    name: 'RatCTF',
    mark: 'RAT',
    tagline: 'AD labs & retired machines',
    color: '#ff5555',
    url: 'https://ratctf.thexssrat.com/users/0xnay33m',
    stat: 'Rank #36 · 24,000 pts',
    detail: '16 machines fully solved — user + root on every box, including Hard Active Directory labs — with 12 badges including First Bloods.',
  },
  {
    name: 'CyLab Academy',
    mark: 'CYL',
    tagline: 'CTF fundamentals · formerly picoCTF',
    color: '#f5a623',
    url: 'https://learn.cylabacademy.org/users/nayeem',
    detail: 'Where the CTF habit began: crypto, forensics, web and binary fundamentals.',
  },
  {
    name: 'Hacker101',
    mark: '101',
    tagline: 'Bug bounty training by HackerOne',
    color: '#c7c7c7',
    url: 'https://ctf.hacker101.com/', // TODO: fill - Hacker101 profile URL
    detail: 'Web vulnerability classes and the bug-bounty mindset that led to the HackerOne BUG HUNT 2026 finals.',
  },
  {
    name: 'PortSwigger Academy',
    mark: 'PS',
    tagline: 'Web Security Academy',
    color: '#ff6633',
    url: 'https://portswigger.net/web-security',
    detail: 'Deep, lab-driven coverage of web vulnerabilities, from SQLi and XSS to request smuggling.',
  },
  {
    name: 'APIsec University',
    mark: 'API',
    tagline: 'API security certifications',
    color: '#4f8cff',
    url: 'https://www.apisecuniversity.com/',
    detail: 'OWASP API Top 10, API penetration testing and the Certified API Security Analyst credential.',
  },
  {
    name: 'Knight Squad Academy',
    mark: 'KSA',
    tagline: 'Web app pentesting',
    color: '#b38bff',
    url: 'https://knightsquad.org/',
    detail: 'kWAPTA, Certified Web App Penetration Testing Apprentice, passed with merit.',
  },
  {
    name: 'Red Team Leaders',
    mark: 'RTL',
    tagline: 'Threat intel & education',
    color: '#ff4d4d',
    url: 'https://redteamleaders.coursestack.com/',
    detail: 'CTIGA and CCEP certifications in threat intelligence, governance and security education.',
  },
  {
    name: 'Cisco NetAcad',
    mark: 'NET',
    tagline: 'Networking & security',
    color: '#1ba0d7',
    url: 'https://www.netacad.com/',
    detail: 'CCNAv7 Enterprise Networking, Security & Automation and Introduction to Cybersecurity.',
  },
  {
    name: 'HackSmarter',
    mark: 'HS',
    tagline: 'Hands-on labs',
    color: '#00d4aa',
    url: 'https://www.hacksmarter.org/',
    detail: 'Lab machines like Ascension and Samurai, documented in public walkthroughs.',
  },
  {
    name: 'beecrowd',
    mark: 'BEE',
    tagline: 'Programming online judge',
    color: '#facc15',
    url: 'https://judge.beecrowd.com/en/profile/791766',
    detail: 'Algorithmic problem solving that keeps the programming side of security sharp.',
  },
  {
    name: 'HackerRank',
    mark: 'HR',
    tagline: 'Coding & SQL practice',
    color: '#2ec866',
    url: 'https://www.hackerrank.com/profile/mdnayeemahmed666',
    detail: 'Programming and SQL challenges, with an SQL badge earned along the way.',
  },
];
