import { Braces, BrainCircuit, Fingerprint, Flag, Radar, ShieldCheck, Swords } from 'lucide-react';
import type { Domain, DomainId, SectionId } from './types';

export const domains: Domain[] = [
  {
    id: 'offensive',
    name: 'Offensive',
    label: 'Offensive Security',
    short: 'Break. Exploit. Learn.',
    color: '#ef4444',
    rgb: '239 68 68',
    icon: Swords,
    headline: ['Break the ', 'attack surface'],
    intro:
      'Penetration testing, web & API security, Bluetooth assessment and reconnaissance tooling: finding the weak link before someone else does.',
    overview: [
      'Offensive security, to me, is applied curiosity with a contract. I approach every target the way a real adversary would: map the attack surface, chain small weaknesses into meaningful impact, and then translate that path into findings a defender can actually fix.',
      'As a Pentest Engineer at the DIU Cyber Security Centre I run authorized VAPT engagements against university assets, and I build the tooling I wish I had: from an AI-assisted reconnaissance framework to a Bluetooth proximity radar for wireless assessments.',
    ],
    focus: ['Web & API penetration testing', 'Privilege escalation & lateral movement', 'Active Directory attack paths', 'Bluetooth / wireless assessment', 'Recon automation'],
    sections: ['overview', 'projects', 'writeups', 'tools'],
    tools: [
      { category: 'Reconnaissance', items: ['Nmap', 'Subfinder', 'Dirsearch', 'Gobuster', 'FFUF', 'Wafw00f'] },
      { category: 'Web & API', items: ['Burp Suite', 'SQLMap', 'Arjun', 'WPScan', 'CMSeek', 'Postman'] },
      { category: 'Exploitation', items: ['Metasploit', 'Hydra', 'Impacket', 'NetExec', 'Searchsploit'] },
      { category: 'Post-Exploitation', items: ['LinPEAS', 'GTFOBins', 'BloodHound', 'pspy'] },
      { category: 'Wireless & BLE', items: ['BlueZ', 'bluetoothctl', 'aircrack-ng', 'gatttool'] },
    ],
  },
  {
    id: 'defensive',
    name: 'Defensive',
    label: 'Defensive Security',
    short: 'Detect. Investigate. Respond.',
    color: '#3b82f6',
    rgb: '59 130 246',
    icon: ShieldCheck,
    headline: ['Detect. Investigate. ', 'Respond.'],
    intro:
      'Building resilient systems through monitoring, detection engineering, threat hunting and incident response.',
    overview: [
      'Defense is where offensive insight pays off. Having spent time on the attacking side, I design controls around how intrusions actually unfold: credential abuse, misconfiguration, and the quiet persistence that dashboards miss.',
      'My defensive work spans incident response engagements, hardening of compromised production servers, phishing detection with machine learning, and privacy-preserving security tooling for everyday users.',
    ],
    focus: ['Incident response', 'Threat hunting & log analysis', 'Phishing detection', 'Server & WordPress hardening', 'Security monitoring'],
    sections: ['overview', 'projects', 'writeups', 'tools'],
    tools: [
      { category: 'Monitoring & Detection', items: ['Wireshark', 'Suricata', 'YARA', 'Sigma (concepts)', 'SIEM concepts'] },
      { category: 'Incident Response', items: ['journalctl', 'auditd', 'last / lastlog', 'ss / netstat', 'grep / awk / sed'] },
      { category: 'Threat Intelligence', items: ['VirusTotal', 'AbuseIPDB', 'URLhaus', 'PhishTank', 'OpenPhish'] },
      { category: 'Hardening', items: ['firewalld', 'fail2ban', 'WAF rules', '2FA / MFA', 'Least privilege'] },
    ],
  },
  {
    id: 'forensics',
    name: 'Forensics',
    label: 'Digital Forensics',
    short: 'Find. Analyze. Reconstruct.',
    color: '#a855f7',
    rgb: '168 85 247',
    icon: Fingerprint,
    headline: ['Every artifact ', 'tells a story.'],
    intro:
      'Recovering evidence, correlating logs and reconstructing what really happened, then writing it down so it holds up.',
    overview: [
      'Forensics is the discipline of honesty. An investigation is only as good as its evidence trail, so I work from preserved, hashed sources, keep a numbered proof register, and refuse to claim what the data cannot prove.',
      'I have led real-world investigations into a compromised e-commerce platform, an abused Gmail account and a persistent cryptominer, and I build forensic tooling such as an explainable deepfake detector that produces investigator-ready reports.',
    ],
    focus: ['Web server & database forensics', 'Email header analysis', 'Malware behavioral analysis', 'Timeline reconstruction', 'Forensic reporting'],
    sections: ['overview', 'projects', 'cases', 'tools'],
    tools: [
      { category: 'Disk & Memory', items: ['Autopsy', 'Volatility', 'FTK Imager', 'sha256sum'] },
      { category: 'Log & Database', items: ['grep / awk / uniq', 'MySQL forensics', 'PHP unserialize', 'journalctl'] },
      { category: 'Malware Analysis', items: ['ANY.RUN', 'Ghidra', 'YARA', 'TrID', 'ExifTool'] },
      { category: 'Network & Email', items: ['Wireshark', 'Email header parsing', 'WHOIS / RDAP', 'ipinfo'] },
    ],
  },
  {
    id: 'intelligence',
    name: 'Intelligence',
    label: 'Threat Intelligence & OSINT',
    short: 'Open sources. Real insights.',
    color: '#f59e0b',
    rgb: '245 158 11',
    icon: Radar,
    headline: ['Turn open signals into ', 'actionable intel.'],
    intro:
      'OSINT, threat intelligence and attribution: connecting scattered public signals into a picture someone can act on.',
    overview: [
      'Intelligence is pattern recognition under uncertainty. Whether it is geolocating a thermal image or mapping an attacker\'s typosquat domains, the goal is the same: move from raw signal to a confident, sourced conclusion.',
      'I hold the Certified Threat Intelligence & Governance Analyst (CTIGA) credential and fold intelligence into everything I build, from OSINT dorking in ReconLab to live threat feeds in PhishHunter.',
    ],
    focus: ['Image & geolocation OSINT', 'Infrastructure attribution', 'Threat feed integration', 'MITRE ATT&CK mapping', 'Google dorking'],
    sections: ['overview', 'projects', 'investigations', 'writeups', 'tools'],
    tools: [
      { category: 'OSINT', items: ['Google Dorking', 'Google Earth', 'Reverse image search', 'Overpass Turbo', 'Wayback Machine'] },
      { category: 'Infrastructure', items: ['WHOIS / RDAP', 'ipinfo', 'crt.sh', 'Shodan', 'DNSDumpster'] },
      { category: 'Frameworks', items: ['MITRE ATT&CK', 'Diamond Model', 'Cyber Kill Chain'] },
      { category: 'Metadata', items: ['ExifTool', 'FOCA', 'Metagoofil'] },
    ],
  },
  {
    id: 'ctf',
    name: 'CTF',
    label: 'Capture The Flag',
    short: 'Build. Break. Capture.',
    color: '#22d3ee',
    rgb: '34 211 238',
    icon: Flag,
    headline: ['Build, break and ', 'capture the flag.'],
    intro:
      'R00TG4NG member, organiser of CSC_Cyberwar CTF 2026, challenge author and invigilator.',
    overview: [
      'CTFs are where I learned to think laterally. As a member of R00TG4NG I compete across OSINT, forensics, web exploitation, privilege escalation, reverse engineering and cryptography, and finished 3rd of 545 teams at BDSec CTF 2026.',
      'Just as importantly, I give back: I led infrastructure and operations for CSC_Cyberwar CTF 2026, authored challenges across crypto, stego, web and wireless, and served as invigilator and problem setter for the Al-Khwarizmi CTF 2025 final round.',
    ],
    focus: ['OSINT & forensics', 'Web exploitation', 'Privilege escalation', 'Cryptography', 'CTF infrastructure (CTFd)'],
    sections: ['overview', 'organized', 'judged', 'challenges', 'writeups', 'participation', 'tools'],
    tools: [
      { category: 'Web', items: ['Burp Suite', 'SQLMap', 'FFUF', 'JWT.io', 'CyberChef'] },
      { category: 'Crypto', items: ['CyberChef', 'RsaCtfTool', 'SageMath', 'PyCryptodome', 'dCode'] },
      { category: 'Forensics', items: ['Wireshark', 'Volatility', 'binwalk', 'foremost', 'ExifTool'] },
      { category: 'Steganography', items: ['steghide', 'zsteg', 'stegseek', 'Stegsolve', 'Audacity'] },
      { category: 'Reversing & Pwn', items: ['Ghidra', 'GDB + pwndbg', 'pwntools', 'radare2', 'strings / ltrace'] },
      { category: 'OSINT', items: ['Google Lens', 'Google Earth', 'Overpass Turbo', 'Sherlock'] },
      { category: 'Wireless', items: ['aircrack-ng', 'hashcat', 'hcxtools'] },
    ],
  },
  {
    id: 'aiml',
    name: 'AI / ML',
    label: 'AI & Machine Learning',
    short: 'Learn. Detect. Explain.',
    color: '#ec4899',
    rgb: '236 72 153',
    icon: BrainCircuit,
    headline: ['Teaching machines to ', 'spot the fake.'],
    intro:
      'Applied machine learning for security: explainable deepfake detection and multi-channel phishing classification.',
    overview: [
      'I treat machine learning as another security instrument: only useful if it is measurable, explainable and robust against an adversary. A model that cannot justify its verdict is a liability in an investigation.',
      'Deepfake Forensics is an explainable deepfake video detector with targeted Grad-CAM and investigator-ready reports, and PhishHunter combines classical ML with live threat intelligence to classify URLs, emails and SMS.',
    ],
    focus: ['Deepfake video detection', 'Explainable AI (Grad-CAM, LIME)', 'Phishing classification', 'Adversarial robustness (FGSM)', 'LLM-assisted reporting'],
    sections: ['overview', 'projects', 'tools'],
    tools: [
      { category: 'Deep Learning', items: ['PyTorch', 'torchvision', 'EfficientNet', 'BiLSTM + Attention'] },
      { category: 'Classical ML', items: ['scikit-learn', 'Random Forest', 'TF-IDF', 'Logistic Regression'] },
      { category: 'Explainability', items: ['Grad-CAM', 'LIME', 'Attention maps'] },
      { category: 'Tooling', items: ['OpenCV', 'NumPy', 'Streamlit', 'Pydantic', 'Ollama / OpenRouter'] },
    ],
  },
  {
    id: 'development',
    name: 'Development',
    label: 'Security Engineering',
    short: 'Code. Automate. Secure.',
    color: '#22c55e',
    rgb: '34 197 94',
    icon: Braces,
    headline: ['Security tools, ', 'engineered to ship.'],
    intro:
      'Full-stack security platforms built with FastAPI, React and Node: real-time, typed, and designed with the threat model first.',
    overview: [
      'I build the tools I use. Every project here started as a gap in my own workflow and grew into a full-stack platform with authentication, real-time updates and a UI that an analyst would actually want to open.',
      'My stack centres on Python (FastAPI) and TypeScript (React + Vite), with WebSockets, PostgreSQL/MongoDB and careful attention to secure-by-default design: in-memory secret handling, rate limiting and role-based access.',
    ],
    focus: ['FastAPI & async Python', 'React + TypeScript UIs', 'Real-time WebSocket systems', 'Secure-by-design architecture', 'Automation & scripting'],
    sections: ['overview', 'projects', 'writeups', 'tools'],
    tools: [
      { category: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'Bash', 'C', 'SQL'] },
      { category: 'Backend', items: ['FastAPI', 'Node.js', 'Express', 'WebSocket', 'SQLAlchemy'] },
      { category: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion'] },
      { category: 'Data & Infra', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Linux', 'Git'] },
    ],
  },
];

export const domainMap = Object.fromEntries(domains.map((d) => [d.id, d])) as Record<DomainId, Domain>;

export const sectionLabels: Record<SectionId, string> = {
  overview: 'Overview',
  projects: 'Projects',
  writeups: 'Blogs & Writeups',
  cases: 'Case Studies',
  investigations: 'Investigations',
  tools: 'Tools',
  organized: 'Organized CTF',
  judged: 'Invigilator',
  challenges: 'Challenges I Created',
  participation: 'Participation',
  research: 'Research',
};
