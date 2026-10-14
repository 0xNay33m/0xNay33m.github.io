import type { CaseStudy } from './types';

const cover = (name: string) => `${import.meta.env.BASE_URL}cases/${name}.webp`;

export const caseStudies: CaseStudy[] = [
  {
    slug: 'cholo-bohudur-investigation',
    title: 'Cholo Bohudur Investigation',
    cover: cover('cholo-bohudur'),
    subtitle: 'E-commerce takeover, rogue administrators & parasite-SEO compromise',
    domains: ['forensics', 'defensive', 'intelligence'],
    tags: ['Incident Response', 'DFIR', 'WordPress', 'Correlation Analysis'],
    date: 'May 2026',
    role: 'Contractual Security Consultant (VAPT & DFIR)',
    classification: 'Client engagement · identifiers redacted',
    summary:
      'Twelve rogue administrators, 1,050 hijacked sessions and injected casino spam: correlating database, server and web-log evidence to expose a silent, months-long takeover of a live e-commerce store.',
    investigation: {
      glance: [
        { value: '12', label: 'Rogue admins identified', hint: 'of 14 administrator accounts' },
        { value: '1,050', label: 'Hijacked sessions', hint: 'on a single rogue account' },
        { value: '1.8 GiB', label: 'Access logs analysed', hint: '335 rotated log files' },
        { value: '3', label: 'Evidence planes correlated', hint: 'Database · Host · HTTP' },
        { value: '20', label: 'Numbered proofs', hint: 'E-001 to E-020' },
        { value: '32 pages', label: 'Forensic report', hint: 'delivered to the client' },
      ],
      attackPath: [
        { title: 'Initial access', text: 'Most likely compromised administrator credentials. The exact vector predates the retained logs and is stated as unproven.' },
        { title: 'Persistence', text: 'Twelve full administrator accounts created in three weeks, disguised as system and service users.' },
        { title: 'Privilege abuse', text: 'Theme editor, plugin upload and admin endpoints exercised from attacker-controlled sessions.' },
        { title: 'Monetisation', text: 'Long-form casino SEO articles injected under a legitimate-looking developer account.' },
        { title: 'Spread', text: 'The same operator identity found on a second, linked storefront serving identical spam.' },
      ],
      behaviour: [
        { title: 'Masquerading identities', text: 'Usernames styled as sysadmin, API, cache and content-manager accounts to blend into the user list.' },
        { title: 'Disposable footprint', text: 'Accounts registered to typosquatted brand domains and throwaway mailboxes.' },
        { title: 'Redundant persistence', text: 'Many parallel admins so that removing one or two would never evict the operator.' },
        { title: 'Single operator, many accounts', text: 'One external source held concurrent sessions across nine of the rogue administrators.' },
        { title: 'Automation pattern', text: 'Login-endpoint bursts and admin-panel navigation consistent with scripted, hands-on-keyboard takeover.' },
      ],
      correlations: [
        { plane: 'Database', finding: 'Account roles, creation order, session tokens and authored spam content.' },
        { plane: 'Host', finding: 'Identities, privileges, exposed services, authentication telemetry and hardening gaps.' },
        { plane: 'HTTP logs', finding: 'Login bursts, admin-panel paths and API use profiled per source across 335 files.' },
      ],
      convergence:
        'The same external source surfaced independently in all three planes: as the top login-endpoint client in the web logs, inside the session tokens of nine rogue administrators in the database, and behind admin-panel actions on the host. Independent evidence pointing to one operator turned suspicion into a defensible conclusion.',
      reasoning: [
        { title: 'Baseline the legitimate', text: 'The owner\'s activity was confirmed and allow-listed first, so nothing legitimate could be counted as hostile.' },
        { title: 'Prove each claim', text: 'Every finding was tied to a numbered proof in the evidence register before it entered the narrative.' },
        { title: 'Correlate across planes', text: 'Claims were only promoted to findings when database, host and HTTP evidence agreed.' },
        { title: 'State the limits', text: 'Where evidence could not prove something, such as the initial vector, the report says so explicitly.' },
      ],
      outcomes: [
        { title: 'Takeover confirmed', text: 'A persistent, multi-account compromise proven with a correlated, evidence-backed timeline.' },
        { title: 'Operator mapped', text: 'Rogue accounts, infrastructure and a linked second storefront attributed to the same activity.' },
        { title: 'Root cause surfaced', text: 'Weak governance identified: universal admin roles, no 2FA, no audit trail and ineffective hardening.' },
        { title: 'Recovery plan delivered', text: 'Prioritised containment, credential rotation, hardening and a clean-rebuild path.' },
      ],
      report: {
        title: 'Forensic Investigation & Compromise Assessment',
        caseId: 'DFIR-2026-05',
        pages: 32,
        sections: [
          { name: 'Executive summary', page: 3 },
          { name: 'Scope, method & limitations', page: 5 },
          { name: 'Evidence register (E-001 to E-020)', page: 7 },
          { name: 'Host & network baseline', page: 11 },
          { name: 'Database & identity forensics', page: 14 },
          { name: 'Access-log analytics', page: 18 },
          { name: 'Cross-plane correlation', page: 21 },
          { name: 'Timeline & ATT&CK mapping', page: 24 },
          { name: 'Indicators of compromise', page: 27 },
          { name: 'Remediation & hardening plan', page: 29 },
        ],
      },
      artifacts: [
        { id: 'A-01', name: 'Database snapshot', detail: 'Logical dump of the production database, hashed on acquisition' },
        { id: 'A-02', name: 'Webroot snapshot', detail: 'Application files and configuration captured read-only' },
        { id: 'A-03', name: 'Live host capture', detail: 'Identities, privileges, logins, sockets, services and scheduled tasks' },
        { id: 'A-04', name: 'Web access logs', detail: '~1.8 GiB across 335 rotated virtual-host log files' },
        { id: 'A-05', name: 'Correlation matrix', detail: 'Database ↔ host ↔ HTTP cross-reference of every key indicator' },
        { id: 'A-06', name: 'IOC set', detail: 'Rogue identities, infrastructure and HTTP patterns for detection' },
      ],
    },
    incident:
      'The owner of a Bangladeshi organic-food WooCommerce store suspected someone else was in control of the site. The store ran on a self-managed AlmaLinux VPS with CyberPanel, OpenLiteSpeed, MariaDB and a mail stack. I was engaged to perform a compromise assessment, preserve evidence and deliver a formal report.',
    lead:
      'The first query told the story: every one of the 14 WordPress accounts held the full administrator role, and twelve had been created within three weeks. Their usernames impersonated system accounts and were registered to typosquatted or throwaway mailboxes.',
    evidence: [
      'Logical MySQL dump of the production database',
      'Webroot snapshot including wp-config.php',
      'Read-only live host capture: identities, privileges, logins, auth logs, sockets, firewall, services and scheduled tasks',
      '~1.8 GiB of rotated virtual-host access logs (335 files)',
      'External scan of a second, linked storefront',
    ],
    methodology: [
      'SQL forensics across the users, user-meta, posts and options tables',
      'Rebuilt per-account login IPs and session counts from stored session tokens',
      'Inferred account-creation order from ID sequencing (WordPress keeps no "created by")',
      'Host baseline: users, privileges, listening services, persistence locations',
      'Log analytics with grep / sed / uniq / sort to profile login sources',
      'Numbered proof register (E-001 to E-020) feeding a correlated timeline',
      'Owner activity allow-listed so legitimate actions were never counted as hostile',
    ],
    timeline: [
      { when: 'Apr 2025', what: 'A developer-class administrator account is created.' },
      { when: '14 Feb 2026', what: 'First rogue administrator appears.' },
      { when: '15 Feb - 5 Mar 2026', what: 'Eleven more rogue administrators are created in quick succession.' },
      { when: '22 Feb 2026', what: 'Long-form casino SEO articles are injected under the developer account.' },
      { when: 'Apr - May 2026', what: 'A single external source dominates login attempts and appears in the sessions of 9 rogue administrators.' },
      { when: 'May 2026', what: 'One rogue account shows 1,050 sessions from 14 IPs. The same developer username is found on a second storefront serving identical spam.' },
    ],
    attack: [
      { id: 'T1078', name: 'Valid Accounts', evidence: 'Logins to legitimate and rogue administrator accounts' },
      { id: 'T1136', name: 'Create Account', evidence: 'Twelve rogue administrators created' },
      { id: 'T1098', name: 'Account Manipulation', evidence: 'Every account elevated to administrator' },
      { id: 'T1110', name: 'Brute Force', evidence: 'Sustained attempts against the login endpoints' },
      { id: 'T1036', name: 'Masquerading', evidence: 'System-style administrator usernames' },
      { id: 'T1583.001', name: 'Acquire Infrastructure: Domains', evidence: 'Typosquatted brand domain for account emails' },
      { id: 'T1595', name: 'Active Scanning', evidence: 'Hostile scanning of public endpoints' },
    ],
    rootCause:
      'The exact initial access could not be proven, and the report says so. The most likely vector is compromised administrator credentials, amplified by weak governance: 14 super-admins, no 2FA, no audit log, file-edit protections that never took effect, a database listening on all interfaces and an over-privileged cloud user.',
    impact:
      'A persistent, redundant takeover of a live e-commerce store with customer data exposure and the brand\'s domain reputation abused for gambling-affiliate spam.',
    remediation: [
      'Preserve and hash all evidence before any change',
      'Remove every administrator not confirmed by the owner; revoke all sessions and rotate every secret',
      'Correct the WordPress hardening configuration; enforce 2FA, least privilege and audit logging',
      'Rate-limit and WAF-protect authentication and API endpoints',
      'Bind the database to localhost, key-only SSH, fail2ban',
      'Block script execution in uploads and add file-integrity monitoring',
      'Rebuild from a backup predating the first rogue account',
    ],
    tools: ['MySQL', 'grep / awk / sed / uniq', 'ss', 'last / lastlog', 'journalctl', 'find', 'WPScan', 'LaTeX'],
    outcome: 'Delivered a 32-page consolidated forensic report with a numbered evidence register, correlated timeline and prioritised remediation plan.',
  },
  {
    slug: 'mail-forensics',
    title: 'Mail Forensics',
    cover: cover('mail-forensics'),
    subtitle: 'Gmail account abuse through a leaked app password',
    domains: ['forensics', 'defensive'],
    tags: ['Email Forensics', 'Header Analysis', 'Attribution'],
    date: 'Aug 2026',
    role: 'Independent investigator',
    classification: 'Private individual · identifiers redacted',
    summary:
      'Google said nothing was wrong. The Sent folder disagreed. Tracing scam mail back to authenticated mail submission that never shows up as a sign-in.',
    incident:
      'A private user\'s Gmail account was sending French healthcare-insurance scam emails, yet the account\'s Security page showed no password change and no unfamiliar sign-in.',
    lead:
      'The scam messages sat in the account\'s own Sent folder. That ruled out simple "From" spoofing: someone was genuinely sending as this user.',
    evidence: [
      'Five raw "Show original" message captures',
      'WHOIS / RDAP registration records',
      'IP geolocation and reverse-DNS data',
      'Message bodies and subjects for tooling fingerprints',
    ],
    methodology: [
      'Parsed Received, Return-Path, HELO and Date headers for every message',
      'Ordered messages into a timeline and grouped them by sending infrastructure',
      'Fingerprinted tooling from subjects and bodies',
      'Attributed hosting providers and regions via RDAP and geolocation',
      'Tested and eliminated competing hypotheses one by one',
    ],
    timeline: [
      { when: 'Mid-Aug', what: 'A "validation" message is sent from a cloud VM: the stolen credential is being tested.' },
      { when: '+12 days', what: 'A second validator test is sent from a European VPS.' },
      { when: 'Same week', what: 'A test email goes out from a residential connection abroad.' },
      { when: 'Same morning', what: 'Two BCC mass mailings of a fake health-insurance lure, with links cloaked behind search-engine redirects.' },
    ],
    attack: [
      { id: 'T1586.002', name: 'Compromise Accounts: Email', evidence: 'The victim\'s own mailbox sent the spam' },
      { id: 'T1078.004', name: 'Valid Accounts: Cloud', evidence: 'Authenticated mail submission' },
      { id: 'T1583.003', name: 'Acquire Infrastructure: VPS', evidence: 'Cloud and VPS validation hosts' },
      { id: 'T1566.002', name: 'Phishing: Link', evidence: 'Lure aimed at the scam recipients' },
      { id: 'T1036', name: 'Masquerading', evidence: 'Redirect cloaking of malicious links' },
    ],
    rootCause:
      'Every message showed authenticated submission to Gmail\'s own relay. The sender held valid credentials, almost certainly a leaked app password, which does not register as a new-device sign-in. That is exactly why the Security page looked clean.',
    impact:
      'The victim\'s identity was used to deliver scam mail to consumers, putting the account\'s reputation and sending limits at risk.',
    remediation: [
      'Delete all app passwords and revoke third-party access',
      'Sign out all sessions and change the password from a clean device',
      'Enforce 2-Step Verification with an authenticator app or security key',
      'Scan the user\'s endpoints for information-stealing malware',
      'Report abuse to the hosting providers involved',
    ],
    tools: ['Email header analysis', 'WHOIS / RDAP', 'ipinfo', 'Reverse DNS'],
    outcome: 'Identified the abuse mechanism, closed the access path and gave the owner a clear, non-technical recovery checklist.',
  },
  {
    slug: 'miner-in-edges-clothing',
    title: 'The Miner in Edge\'s Clothing',
    cover: cover('miner-edge'),
    subtitle: 'A World Cup live stream, a fake Edge binary and a silently hijacked student PC',
    domains: ['forensics', 'defensive'],
    tags: ['Malware Analysis', 'Endpoint Forensics', 'AV Evasion', 'Detection Engineering'],
    date: 'Jul 2026',
    role: 'Malware analyst & incident responder',
    classification: 'Student endpoint · identifiers redacted',
    summary:
      'A student streamed a World Cup match from an unknown site and walked away with a cryptominer. Disguised as Microsoft Edge, it bypassed antivirus, blinded the PC and mined Monero: a full behavioural teardown with detection guidance.',
    incident:
      'A university student\'s laptop became slow, hot and noisy shortly after they watched a live FIFA World Cup match on an unofficial streaming site. During the stream the page pushed a "player update" download. The file ran, the installed antivirus raised no alert, and from then on the machine was never quite the same.',
    lead:
      'The downloaded file claimed to be a Microsoft Edge build, but Edge is never delivered through a sports-streaming pop-up. Detonated in an isolated sandbox, it requested elevation within seconds and began rewriting security settings, which is not something a browser does.',
    evidence: [
      'Triage of the affected student endpoint: running processes, services and scheduled tasks',
      'Browser download history pointing back to the streaming site',
      'Full process tree from a 60-second isolated detonation',
      'Static PE metadata and file-type identification',
      'IDS alerts, DNS and HTTP logs',
      'Dropped files and persistence artefacts',
    ],
    methodology: [
      'Detonated in an isolated Windows 10 sandbox with network monitoring',
      'Walked the process tree to separate malicious from benign activity',
      'Correlated network alerts with process behaviour',
      'Mapped every observed behaviour to MITRE ATT&CK',
      'Derived concrete detection opportunities for defenders',
    ],
    timeline: [
      { when: 'Match day', what: 'The student opens an unofficial live-stream site to watch a World Cup game.' },
      { when: 'Mid-stream', what: 'A fake "player update" prompt delivers an executable posing as Microsoft Edge.' },
      { when: 'T+0s', what: 'The student runs it; it launches and requests administrative elevation.' },
      { when: 'T+5s', what: 'Security tooling is weakened and update services are stopped.' },
      { when: 'T+10s', what: 'Installs itself as an auto-start service and deletes its original copy.' },
      { when: 'T+20s', what: 'Obfuscated scripts inject into legitimate Windows processes.' },
      { when: 'T+30s', what: 'Injected process retrieves remote configuration and connects to a Monero mining pool.' },
    ],
    attack: [
      { id: 'T1189', name: 'Drive-by Compromise', evidence: 'Malicious download pushed by a live-stream site' },
      { id: 'T1204.002', name: 'User Execution: Malicious File', evidence: 'Student ran the fake update' },
      { id: 'T1036.005', name: 'Masquerading', evidence: 'Fake Microsoft Edge metadata' },
      { id: 'T1548.002', name: 'Bypass UAC', evidence: 'Elevation request on launch' },
      { id: 'T1562.001', name: 'Impair Defenses', evidence: 'Security tooling weakened' },
      { id: 'T1489', name: 'Service Stop', evidence: 'Update and logging services stopped' },
      { id: 'T1543.003', name: 'Windows Service', evidence: 'Auto-start persistence' },
      { id: 'T1055', name: 'Process Injection', evidence: 'Injection into system processes' },
      { id: 'T1027', name: 'Obfuscated Files', evidence: 'Heavily obfuscated scripts' },
      { id: 'T1496', name: 'Resource Hijacking', evidence: 'Monero mining' },
    ],
    rootCause:
      'A drive-by lure on an unofficial streaming site led the student to run a disguised binary. Its trusted-looking Edge metadata and obfuscated scripts slipped past signature-based antivirus, and once elevated it systematically blinded the host before mining, so the infection survived casual clean-up attempts.',
    impact:
      'Persistent CPU and power theft on the student\'s laptop, a blinded endpoint (no updates, no logging, weakened AV) and an elevated foothold that could have been reused for credential theft or further payloads.',
    remediation: [
      'Isolate and reimage the affected laptop; rotate passwords used on it from a clean device',
      'Awareness: browsers never update through streaming sites; use official broadcasters only',
      'Enable SmartScreen / reputation-based download protection and a DNS filter for piracy and ad-malware domains',
      'Enable vulnerable-driver blocklists (WDAC / HVCI)',
      'Alert on new antivirus exclusions and stopped logging or update services',
      'Block known mining-pool domains at DNS',
    ],
    tools: ['ANY.RUN', 'Suricata / ET Open', 'YARA', 'TrID', 'ExifTool'],
    outcome: 'Traced the infection from the streaming site to the miner, cleaned the student\'s machine and produced a behavioural report with ATT&CK mapping, detection rules and a short awareness note for students.',
  },
];

export const caseMap = Object.fromEntries(caseStudies.map((c) => [c.slug, c])) as Record<string, CaseStudy>;
