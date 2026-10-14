import type { Project } from './types';

const fig = (name: string) => `${import.meta.env.BASE_URL}projects/deepfake/${name}.webp`;

export const projects: Project[] = [
  {
    slug: 'reconlab',
    title: 'ReconLab',
    tagline: 'AI-powered reconnaissance framework for bug hunters',
    domains: ['offensive', 'intelligence'],
    tags: ['Python', 'FastAPI', 'React', 'OSINT', 'Recon'],
    youtube: 'waDg2DWushs',
    year: '2025',
    featured: true,
    summary:
      'A unified web platform that orchestrates industry-standard recon tooling, tracks every scan in real time and pairs the results with an AI security analyst. It replaces a dozen terminals and scattered notes with one auditable workflow, taking a tester from an empty scope to prioritised next steps and a client-ready report.',
    glance: [
      { value: '6+', label: 'Recon tools orchestrated' },
      { value: 'AI', label: 'Multi-model analyst' },
      { value: 'End-to-end', label: 'Scope to report' },
    ],
    problem:
      'Reconnaissance is the most time-consuming phase of a penetration test or bug-bounty engagement, yet it is usually a mess of terminals, copy-pasted output and scattered notes. Findings get lost, coverage is hard to prove and the jump from raw tool output to "what do I test next?" depends entirely on the tester\'s memory.',
    description: [
      'ReconLab turns the scattered first phase of an engagement into a single, auditable workflow. Instead of juggling a dozen terminals, an operator launches subdomain discovery, content brute-forcing, parameter mining, CMS fingerprinting, WAF detection and Nmap service enumeration from one interface. Every run is tracked live, normalised into structured data and persisted, so nothing disappears when a terminal closes.',
      'On top of the tooling sits a cybersecurity-tuned AI analyst. It reads raw scan output and responds with context-aware analysis: which hosts look interesting, which parameters deserve fuzzing, which technologies have known weak spots, and a list of concrete next steps extracted from the conversation. Models are pluggable (OpenRouter, DeepSeek R1, OpenAI), so the assistant can evolve without touching the interface.',
      'The rest of the engagement lifecycle is built in as well: Google dorking for passive OSINT, a vulnerability checklist that tracks testing coverage, a findings notebook and one-click professional report generation. ReconLab takes a tester from an empty scope to a deliverable without leaving the platform.',
    ],
    features: [
      { title: 'Unified tool orchestration', text: 'Runs Subfinder, Dirsearch, Arjun, CMSeek, Wafw00f and Nmap from one dashboard with consistent inputs and outputs.' },
      { title: 'Real-time task tracking', text: 'Live progress, status and streaming output for every scan, with results stored for later review.' },
      { title: 'AI security analyst', text: 'Multi-provider assistant that interprets scan data and extracts actionable next steps automatically.' },
      { title: 'Google dorking module', text: 'Curated dork templates expand the attack surface passively before any active scanning begins.' },
      { title: 'Coverage checklist', text: 'A vulnerability checklist that shows what has been tested and what is still outstanding for each target.' },
      { title: 'Notes & reporting', text: 'A findings notebook backed by MongoDB and professional report generation for client-ready output.' },
    ],
    workflow: [
      { title: 'Define scope', text: 'Create a target and scope, then authenticate through Firebase so every action is attributable.' },
      { title: 'Discover', text: 'Launch subdomain, content, parameter, CMS, WAF and port discovery as tracked background tasks.' },
      { title: 'Analyse', text: 'Feed results to the AI analyst for prioritisation and an extracted list of next steps.' },
      { title: 'Track & report', text: 'Tick off checklist coverage, record findings and export a structured report.' },
    ],
    impact: [
      { title: 'Faster time-to-first-finding', text: 'Removes the context switching between tools so testers spend their time on analysis, not plumbing.' },
      { title: 'Repeatable methodology', text: 'Every engagement follows the same tracked pipeline, which makes coverage measurable and results comparable.' },
      { title: 'Lower barrier for newcomers', text: 'The AI analyst explains output in plain language, helping junior hunters learn why a result matters.' },
    ],
    audience: ['Bug bounty hunters', 'Penetration testers', 'Red team operators', 'Security students'],
    scope: 'Designed for authorized engagements and bug-bounty programs only. Always stay inside the published scope.',
    stack: ['Python', 'FastAPI', 'Motor (MongoDB)', 'aiohttp', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Firebase Auth'],
    architecture: [
      'React + TypeScript SPA talks to an async FastAPI backend.',
      'Tool runners execute as managed subprocesses; results are normalised with Pydantic and persisted in MongoDB via Motor.',
      'AI analysis is proxied through provider adapters so models can be swapped without touching the UI.',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/0xNay33m/ReconLab', kind: 'github' },
      { label: 'Demo video', href: 'https://www.youtube.com/watch?v=waDg2DWushs', kind: 'video' },
    ],
  },
  {
    slug: 'bluetracker',
    title: 'BlueTracker',
    tagline: 'Bluetooth reconnaissance & proximity radar for authorized assessments',
    domains: ['offensive'],
    tags: ['Bluetooth', 'BLE', 'FastAPI', 'WebSocket', 'BlueZ'],
    youtube: 'AeEZ1VmDj2o',
    year: '2026',
    featured: true,
    summary:
      'A command-center web app that discovers Classic and BLE devices, estimates their live distance on a tactical radar, scores their security posture and opens capability-driven control dossiers. It turns Bluetooth, an attack surface most assessments ignore, into something an authorized tester can see, verify and report on.',
    glance: [
      { value: 'Classic + BLE', label: 'Live discovery' },
      { value: '7', label: 'Capability control tabs' },
      { value: 'PASS / FAIL', label: 'Automated verification' },
    ],
    problem:
      'Bluetooth is everywhere (phones, wearables, keyboards, IoT) yet it is rarely part of a security assessment. Existing tooling is command-line only, fragmented across utilities, and gives no sense of where a device physically is or how exposed it really is.',
    description: [
      'BlueTracker brings Bluetooth assessment out of the terminal and onto a live tactical radar. It discovers Classic BR/EDR and BLE devices through BlueZ over D-Bus, smooths RSSI into a distance estimate with a log-distance path-loss model, and tracks each target\'s motion as approaching, leaving or stationary. Unknown devices that come within a configurable radius raise a proximity alert.',
      'Every target opens into a security dossier. Advertised profiles are scored against a threat-pattern catalogue (bluejacking, message-access exposure, phonebook harvesting, PAN pivoting and more) to give an at-a-glance risk level. An automated VERIFY TARGET battery then confirms exposure with per-test PASS / FAIL / SKIPPED results, and the whole fleet can be exported as a JSON report.',
      'Control tabs appear only when a device actually advertises the capability, covering phone remote, MAP messages, OBEX files, GATT read/write, RFCOMM serial, PAN networking and HID input. The assessor sees exactly what a real attacker could reach, and nothing that is not there.',
    ],
    features: [
      { title: 'Live device discovery', text: 'Classic BR/EDR and BLE discovery through BlueZ D-Bus, including paired devices that are not advertising.' },
      { title: 'Distance estimation', text: 'RSSI averaging and a log-distance path-loss model with a tunable environment exponent for indoor or open spaces.' },
      { title: 'Tactical radar', text: 'North-up radar with range rings, threat colours, hover intel and approaching / leaving / stationary motion.' },
      { title: 'Risk scoring', text: 'Profile-based posture scoring against a threat-pattern catalogue, summarised per target and across the fleet.' },
      { title: 'Automated verification', text: 'VERIFY TARGET probes confirm exposure with clear PASS / FAIL / SKIPPED results per test.' },
      { title: 'Capability-based controls', text: 'MAP, OBEX FTP/OPP, GATT, RFCOMM, PAN and HID tabs that only appear when the target supports them.' },
      { title: 'Proximity alerts', text: 'Warns when an unknown device enters a configurable radius; trusted devices can be marked as known.' },
      { title: 'Live event stream', text: 'Discovery, threat, verification and system events pushed to the browser over WebSocket.' },
    ],
    workflow: [
      { title: 'Arm the radar', text: 'Start discovery; devices populate the radar and fleet list with live distance and motion.' },
      { title: 'Triage', text: 'Risk scores and threat families highlight priority targets in range.' },
      { title: 'Verify', text: 'Connect to an in-scope device and run verification probes to confirm real exposure.' },
      { title: 'Report', text: 'Export the fleet security report as JSON for documentation and remediation.' },
    ],
    impact: [
      { title: 'Makes wireless visible', text: 'Turns an invisible attack surface into something an assessor or blue team can see, measure and explain.' },
      { title: 'Evidence over assumption', text: 'Verification probes replace "this profile might be exposed" with tested, reportable results.' },
      { title: 'Awareness tool', text: 'Demonstrates to non-technical audiences how much a discoverable phone or wearable reveals.' },
    ],
    audience: ['Wireless security assessors', 'Red teams', 'IoT & hardware researchers', 'Security educators'],
    scope: 'Built strictly for authorized testing on devices you own or have explicit written permission to assess.',
    stack: ['Python', 'FastAPI', 'WebSocket', 'BlueZ', 'dbus-fast', 'OBEX', 'Vanilla JS', 'HTML5 Canvas'],
    architecture: [
      'FastAPI backend wraps BlueZ (bluetoothd) and OBEX (obexd) over D-Bus.',
      'A scanner service streams discoveries, distance updates and security events to the browser via WebSocket.',
      'Canvas-rendered radar and a modular command-center UI are written in dependency-free JavaScript.',
    ],
    links: [{ label: 'Demo video', href: 'https://www.youtube.com/watch?v=AeEZ1VmDj2o', kind: 'video' }],
  },
  {
    slug: 'phishhunter',
    title: 'PhishHunter',
    tagline: 'Cybercrime detection, reporting & investigation platform',
    domains: ['defensive', 'aiml', 'forensics'],
    tags: ['Machine Learning', 'Threat Intel', 'FastAPI', 'React', 'LEO Portal'],
    youtube: 'CMHQXTRIo2U',
    year: '2026',
    featured: true,
    summary:
      'A hybrid machine-learning and threat-intelligence engine that classifies phishing URLs, emails and SMS, and explains every verdict in plain language. Public reports flow into a dedicated law-enforcement portal where investigators correlate evidence, preserve chain of custody and uncover coordinated campaigns.',
    glance: [
      { value: '3', label: 'Channels: URL, email, SMS' },
      { value: '6', label: 'Threat-intel feeds fused' },
      { value: '140k+', label: 'Training samples' },
    ],
    problem:
      'Phishing reaches people through links, inboxes and text messages, but most checkers cover only one channel and return an unexplained score. Victims have nowhere structured to report, and investigators receive isolated complaints with no way to connect them into campaigns.',
    description: [
      'PhishHunter answers two questions at once: "is this phishing?" for the public, and "who is behind this campaign?" for investigators. Every submission, whether a URL, an email or an SMS, is scored by a dedicated machine-learning model for that channel, cross-checked against live threat-intelligence feeds and then explained in plain language by an AI layer.',
      'The verdict is hybrid by design. Model probability and threat-feed hits are fused into one decision, so a brand-new phishing page that no feed has seen yet can still be caught by its features, while known-bad infrastructure is confirmed instantly. Users see why something was flagged, not just that it was.',
      'Behind the public portal sits a role-separated law-enforcement workspace. Officers and supervisors collaborate on cases, correlate evidence across reports, preserve chain of custody and pivot with OSINT, while trending-campaign detection surfaces coordinated attacks early. Every action is audit-logged.',
    ],
    features: [
      { title: 'URL detection', text: 'Random Forest over 30+ engineered URL features, trained on ~120k balanced samples.' },
      { title: 'Email & SMS detection', text: 'TF-IDF + Logistic Regression models trained on 17.5k emails and 5.2k SMS messages.' },
      { title: 'Threat-intel fusion', text: 'Combines model output with OpenPhish, Phishing Army, PhishTank, VirusTotal, AbuseIPDB and URLhaus.' },
      { title: 'Explainable verdicts', text: 'AI-generated, user-friendly explanations of the signals behind each decision.' },
      { title: 'Public reporting', text: 'A simple flow for citizens to report phishing, feeding the investigation pipeline.' },
      { title: 'LEO case portal', text: 'Separate, role-based workspace with case management, evidence correlation and chain of custody.' },
      { title: 'Campaign detection', text: 'Trending-campaign analytics group related reports to expose coordinated attacks.' },
      { title: 'Hardened by default', text: 'JWT auth, bcrypt, rate limiting, Pydantic validation and full audit logging.' },
    ],
    workflow: [
      { title: 'Submit', text: 'A user pastes a URL, email or SMS, or files a report.' },
      { title: 'Extract & score', text: 'Channel-specific features feed the matching model to produce a probability.' },
      { title: 'Enrich', text: 'Threat feeds are queried and fused with the model output into a hybrid verdict.' },
      { title: 'Explain', text: 'An AI layer writes a plain-language explanation for the user.' },
      { title: 'Investigate', text: 'Reports flow to the LEO portal, where they are correlated into cases and campaigns.' },
    ],
    impact: [
      { title: 'Protects everyday users', text: 'Gives non-technical people a trustworthy, explained answer before they click or reply.' },
      { title: 'Connects the dots', text: 'Turns scattered individual complaints into correlated campaigns that investigators can act on.' },
      { title: 'Evidence-grade workflow', text: 'Chain of custody and audit logging keep collected evidence usable in a real investigation.' },
    ],
    audience: ['General public', 'Law-enforcement cybercrime units', 'SOC analysts', 'Security researchers'],
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'scikit-learn', 'Redis', 'React', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    architecture: [
      'Models are trained offline and loaded once at FastAPI startup for low-latency inference.',
      'Detection pipeline: feature extraction, model probability, threat-intel lookup, hybrid decision, AI explanation.',
      'PostgreSQL stores users, detections, reports, campaigns and audit logs; feeds refresh every 6 hours.',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/0xNay33m/PhishHunter', kind: 'github' },
      { label: 'Demo video', href: 'https://www.youtube.com/watch?v=CMHQXTRIo2U', kind: 'video' },
    ],
  },
  {
    slug: 'deepfake-forensics',
    title: 'Deepfake Forensics',
    tagline: 'Explainable deepfake video detection with investigator-ready reports',
    domains: ['aiml', 'forensics'],
    tags: ['PyTorch', 'EfficientNet', 'BiLSTM', 'Grad-CAM', 'Explainable AI'],
    cover: fig('gradcam_fake_example'),
    year: '2026',
    featured: true,
    summary:
      'An explainable, agentic pipeline for video deepfakes: EfficientNet-B0 + BiLSTM with temporal attention detects manipulation, targeted Grad-CAM shows exactly where and why, and a schema-validated forensic report documents it. The result turns a single "fake" score into evidence an investigator can defend.',
    glance: [
      { value: '97.5%', label: 'Validation ROC-AUC' },
      { value: '58.4%', label: 'Faster explanations' },
      { value: '5-phase', label: 'Forensic pipeline' },
    ],
    problem:
      'Most deepfake detectors output a single "fake" probability. That is not enough for an investigator, a journalist or a court: they need to know which frames are suspicious, which regions of the face drove the decision, how robust that decision is, and they need it written up in a form that can be filed as evidence.',
    description: [
      'Deepfake Forensics is an explainable, agentic AI framework for detecting manipulated video and reporting on it. It treats detection as a forensic workflow rather than a single score: a video is face-cropped and sparsely sampled, classified at clip level, explained visually, stress-tested and finally written up as a structured report an investigator can file.',
      'The detector pairs an EfficientNet-B0 frame encoder with a bidirectional LSTM and temporal attention, so it learns both what a manipulated face looks like and how manipulation flickers across time. Attention also ranks the most suspicious frames, which means Grad-CAM (and optional LIME) only needs to run on the Top-K frames. That cuts explanation time by 58.4% compared with explaining every frame.',
      'Reports are Pydantic-validated JSON/HTML dossiers generated from templates or a deterministic LLM (temperature 0), alongside metadata, compression and face-consistency checks. An FGSM module probes how robust both the classifier and its heatmaps are against adversarial noise, an honest answer to "can this explanation be trusted?".',
    ],
    features: [
      { title: 'Five-phase pipeline', text: 'Preprocess, classify, explain, report and stress-test, each as a separable, testable stage.' },
      { title: 'Spatio-temporal model', text: 'EfficientNet-B0 frame features into a BiLSTM (512-d) with temporal attention pooling.' },
      { title: 'Targeted explainability', text: 'Attention-ranked Top-K Grad-CAM, 58.4% faster than explaining every frame, with optional LIME.' },
      { title: 'Forensic dossiers', text: 'Schema-validated JSON/HTML reports from templates or a deterministic LLM for reproducible output.' },
      { title: 'Supporting forensic checks', text: 'Metadata, compression and face-consistency analysis complement the model verdict.' },
      { title: 'Adversarial robustness', text: 'FGSM module measures classifier accuracy and heatmap stability under attack.' },
      { title: 'Multiple interfaces', text: 'Streamlit dashboard, CLI and offline demo bundle; runs on CPU, CUDA or Apple MPS.' },
    ],
    workflow: [
      { title: 'Preprocess', text: 'Detect and crop faces, then sample 24 frames uniformly across the clip.' },
      { title: 'Classify', text: 'Encode frames, model temporal behaviour and produce a clip-level verdict.' },
      { title: 'Explain', text: 'Rank frames by attention and generate Grad-CAM heatmaps on the Top-K.' },
      { title: 'Report', text: 'Assemble verdict, evidence and heatmaps into a validated forensic dossier.' },
      { title: 'Stress-test', text: 'Run adversarial probes to quantify how reliable the result is.' },
    ],
    impact: [
      { title: 'From score to evidence', text: 'Bridges the gap between an ML prediction and something an investigator can document and defend.' },
      { title: 'Trustworthy AI', text: 'Visual explanations plus robustness testing show when the model should, and should not, be believed.' },
      { title: 'Practical speed', text: 'Targeted explanation makes forensic-grade analysis fast enough for real casework.' },
    ],
    audience: ['Digital forensic investigators', 'Journalists & fact-checkers', 'Trust & safety teams', 'AI security researchers'],
    stack: ['Python', 'PyTorch', 'torchvision', 'OpenCV', 'scikit-learn', 'Pydantic', 'LIME', 'Streamlit', 'Ollama / OpenAI', 'LaTeX'],
    architecture: [
      'Input: 24 uniformly sampled face crops (224px, stride 4, 1.3x crop scale).',
      'EfficientNet-B0 (ImageNet) yields 1280-d frame embeddings fed to a 1-layer BiLSTM (hidden 256).',
      'Temporal attention pools the sequence; dropout 0.4, Linear 512 to 128, single clip logit.',
      'Trained with AdamW, label smoothing 0.05, AMP, frozen backbone warm-up and JPEG/blur/noise augmentation.',
    ],
    metrics: [
      { label: 'Validation accuracy', value: '92.0%', hint: 'Model 2, FaceForensics++' },
      { label: 'Validation ROC-AUC', value: '97.5%' },
      { label: 'Validation precision', value: '97.8%' },
      { label: 'Test ROC-AUC', value: '93.9%' },
      { label: 'Explanation speed-up', value: '58.4%', hint: 'Top-K vs all-frame Grad-CAM' },
      { label: 'Dataset', value: '2,000 clips', hint: '1,000 real / 1,000 fake' },
    ],
    figures: [
      { src: fig('arch_overview'), caption: 'System architecture overview' },
      { src: fig('model2_architecture_diagram'), caption: 'EfficientNet-B0 + BiLSTM + temporal attention' },
      { src: fig('gradcam_fake_example'), caption: 'Targeted Grad-CAM on a manipulated frame' },
      { src: fig('gradcam_real_example'), caption: 'Grad-CAM on an authentic frame' },
      { src: fig('bar_compare_all_models'), caption: 'Model comparison across all variants' },
      { src: fig('roc_model2_val'), caption: 'ROC curve: validation set' },
      { src: fig('cm_model2_val'), caption: 'Confusion matrix: validation set' },
      { src: fig('attention_weights'), caption: 'Temporal attention over frames' },
      { src: fig('ui_1'), caption: 'Forensic dashboard: detection verdict' },
      { src: fig('ui_7'), caption: 'Dashboard: explainability view' },
    ],
    links: [
      // TODO: fill - add the paper link once public
    ],
  },
  {
    slug: 'password-analyzer',
    title: 'Password Analyzer',
    tagline: 'Privacy-first password strength & breach intelligence dashboard',
    domains: ['defensive'],
    tags: ['React', 'Node.js', 'Entropy', 'Privacy', 'zxcvbn'],
    youtube: 'cKbyAOPzWWk',
    year: '2025',
    summary:
      'A privacy-first dashboard that measures entropy, pattern weakness and crack time, then checks breach exposure using only a SHA-1 hash computed in the browser. No plaintext is ever stored or logged, and users get a clear explanation of why a password is weak plus a secure replacement on the spot.',
    glance: [
      { value: '100k+', label: 'Breached passwords checked' },
      { value: 'Hash-only', label: 'Breach lookup' },
      { value: 'Zero', label: 'Data persisted' },
    ],
    problem:
      'Most password checkers ask you to trust them with the very secret they are evaluating, and then reduce the answer to a vague "weak / strong" bar. Users learn nothing about why a password is weak, and privacy-conscious users rightly refuse to paste real passwords into them.',
    description: [
      'Password Analyzer is built around a threat model that removes that trust. Analysis happens in request-scoped memory only, nothing is persisted, and the breach check never sees the password at all: the browser hashes it with the Web Crypto API and sends just the 40-character SHA-1 digest, which is compared against an in-memory set of breached hashes.',
      'The dashboard turns an abstract score into something a user can understand. zxcvbn pattern analysis points out dictionary words, keyboard sequences, repeats and dates; an entropy calculation (E = L x log2 R) shows how the character pool and length contribute; and crack-time simulation compares how long the password would survive online throttled guessing versus offline GPU cracking.',
      'When a password fails, a cryptographically secure generator (crypto.getRandomValues) offers a strong replacement immediately, closing the loop from diagnosis to fix.',
    ],
    features: [
      { title: 'Entropy analysis', text: 'Length and character-pool entropy with clear strength bands from Very Weak to Strong.' },
      { title: 'Pattern detection', text: 'zxcvbn flags dictionary words, sequences, repeats and dates that attackers try first.' },
      { title: 'Crack-time simulation', text: 'Estimated survival time across online and offline attacker profiles.' },
      { title: 'Hash-only breach check', text: 'Only a SHA-1 digest leaves the browser; it is matched against 100k+ known breached passwords.' },
      { title: 'Secure generator', text: 'Strong passwords generated client-side with crypto.getRandomValues.' },
      { title: 'Zero persistence', text: 'No database, no plaintext logging; everything is request-scoped and discarded.' },
    ],
    workflow: [
      { title: 'Type', text: 'The user enters a password; strength feedback updates live.' },
      { title: 'Hash locally', text: 'The browser computes a SHA-1 digest with the Web Crypto API.' },
      { title: 'Analyse', text: 'Entropy, patterns and crack time are calculated in request-scoped memory.' },
      { title: 'Check exposure', text: 'The digest is compared against the in-memory breached-hash set.' },
      { title: 'Fix', text: 'If weak or breached, a secure replacement is generated instantly.' },
    ],
    impact: [
      { title: 'Privacy by design', text: 'Demonstrates that useful security tooling does not require collecting user secrets.' },
      { title: 'Security education', text: 'Explains why a password is weak, which changes behaviour more than a red bar does.' },
      { title: 'Real-world risk signal', text: 'Breach exposure shows users that "unique" passwords may already be in attacker wordlists.' },
    ],
    audience: ['Everyday users', 'Security awareness trainers', 'Developers learning secure design', 'Students'],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'zxcvbn', 'Web Crypto API'],
    architecture: [
      'React client hashes locally and calls /api/analyze and /api/breach-check.',
      'Express server holds breached hashes in an in-memory Set built at startup; plaintext wordlists are hashed and discarded.',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/0xNay33m/Password-Analyzer', kind: 'github' },
      { label: 'Demo video', href: 'https://www.youtube.com/watch?v=cKbyAOPzWWk', kind: 'video' },
    ],
  },
  {
    slug: 'cybertrack',
    title: 'CyberTrack',
    tagline: 'Activity tracking, review & talent discovery platform for a cyber security centre',
    domains: ['development'],
    tags: ['Full-stack', 'Dashboard', 'RBAC', 'Leaderboards', 'On-premise'],
    youtube: 'ezYa6QU7ScY',
    year: '2026',
    featured: true,
    summary:
      'An on-premise engagement console for a university cyber security centre. Members log CTFs, certifications, projects and research; reviewers approve each one against a published scoring doctrine; and leaderboards, roadmaps and domain-based talent discovery turn that verified activity into recognition and mentoring.',
    glance: [
      { value: 'Human', label: 'Reviewed scoring' },
      { value: 'Multi-domain', label: 'Talent discovery' },
      { value: 'Role-based', label: 'Member to admin' },
    ],
    problem:
      'A university cyber security centre runs CTFs, training, research and projects across dozens of members and batches, but progress is usually tracked in spreadsheets and chat threads. Contributions go unrecognised, scoring is inconsistent, and finding the right person for a CTF team or project depends on who you happen to know.',
    description: [
      'CyberTrack is the centre\'s "Track. Learn. Compete. Lead." console. Members log their work (CTF participation, certifications, projects, blogs and writeups, research and achievements) through structured forms instead of free-form messages, building a verified portfolio over time.',
      'Nothing counts until a human reviewer approves it. Submissions move through a review queue and are scored against a published scoring doctrine, so every point on the leaderboard is transparent and auditable. A live feed on the landing page announces approvals and new announcements as they happen.',
      'Approved activity powers leaderboards (by batch, all-time and for top-tier members) and domain talent discovery across many cyber domains, so mentors can quickly find who is strong in web security, forensics or CTF. Learning roadmaps and a community "Hacker Journeys" section, with stories about well-known security figures and member-published journeys, turn the platform into a place to learn as well as to compete.',
    ],
    features: [
      { title: 'Structured activity logging', text: 'Dedicated submission flows for CTFs, certifications, projects, writeups, research and achievements.' },
      { title: 'Human review queue', text: 'Every submission is approved or rejected by a reviewer before it earns points.' },
      { title: 'Published scoring doctrine', text: 'A transparent, versioned scoring table so members know exactly how points are earned.' },
      { title: 'Leaderboards', text: 'Batch, all-time and top-member rankings that recognise consistent contribution.' },
      { title: 'Domain talent discovery', text: 'Find members by strength across many cyber domains for teams, projects and mentoring.' },
      { title: 'Roadmaps', text: 'Security and career roadmaps that guide members on what to learn next.' },
      { title: 'Community stories', text: '"Hacker Journeys" profiles and member-published stories to inspire newcomers.' },
      { title: 'Role-based administration', text: 'Separate member, reviewer, faculty and admin views with announcements and management tools.' },
    ],
    workflow: [
      { title: 'Log', text: 'A member submits an activity with supporting details.' },
      { title: 'Review', text: 'A reviewer checks it against the scoring doctrine and approves or rejects it.' },
      { title: 'Score', text: 'Approved activity updates the member\'s profile, points and leaderboard position.' },
      { title: 'Discover', text: 'Mentors and faculty use domain views and rankings to find and develop talent.' },
    ],
    impact: [
      { title: 'Recognition that is fair', text: 'Transparent scoring and human review make every ranking explainable and hard to game.' },
      { title: 'Data-driven mentoring', text: 'Leaders can see who is growing in which domain and form CTF teams or project groups quickly.' },
      { title: 'Motivation to keep learning', text: 'Roadmaps, leaderboards and community stories give members visible goals and progress.' },
    ],
    audience: ['Cyber security club members', 'Reviewers & mentors', 'Faculty advisors', 'Club administrators'],
    scope: 'Deployed on-premise for internal use; member data and internal metrics are intentionally not shown here.',
    stack: ['Full-stack web app', 'Role-based access control', 'REST API', 'Relational database', 'Responsive dashboard UI'], // TODO: fill - exact frameworks
    links: [{ label: 'Demo video', href: 'https://www.youtube.com/watch?v=ezYa6QU7ScY', kind: 'video' }],
  },
  {
    slug: 'webwizard',
    title: 'WebWizard',
    tagline: 'Web security testing & education toolkit',
    domains: ['offensive', 'development'],
    tags: ['Python', 'CLI', 'XSS', 'SQLi', 'DNS'],
    year: '2024',
    summary:
      'A Linux CLI that unifies dork-based scraping, domain intelligence, DNS enumeration and XSS / SQLi / clickjacking checks into one guided, menu-driven interface. Built as my university capstone, it gives newcomers a single on-ramp to web security testing and later evolved into ReconLab.',
    glance: [
      { value: '7', label: 'Integrated modules' },
      { value: 'Guided', label: 'Menu-driven CLI' },
      { value: 'Capstone', label: 'University project' },
    ],
    problem:
      'People starting in web security face a wall of separate tools, each with its own flags and output format. Before they can learn what a vulnerability is, they have to learn a dozen command lines.',
    description: [
      'WebWizard began as my university capstone: a single, approachable entry point to the web-testing toolchain for people learning offensive security. It wraps reconnaissance and vulnerability checks behind a guided, menu-driven CLI so beginners can focus on understanding results rather than memorising flags.',
      'It covers the typical first steps of a web assessment: Google Custom Search powered dork scraping to find exposed pages, domain-to-IP resolution and domain reconnaissance, DNS enumeration, and basic checks for clickjacking, cross-site scripting and SQL injection.',
      'The project followed a deliberate four-stage methodology (exploration of existing tools, an architecture blueprint, construction and validation) and was tested on Parrot OS and Kali Linux. The checks are intentionally foundational, making the tool a teaching aid and a launch point rather than a replacement for professional scanners.',
    ],
    features: [
      { title: 'Dork-based web scraping', text: 'Uses the Google Custom Search API to find indexed pages that match security-relevant dorks.' },
      { title: 'Domain intelligence', text: 'Domain-to-IP resolution and basic reconnaissance of a target domain.' },
      { title: 'DNS enumeration', text: 'Enumerates DNS records to map a target\'s infrastructure.' },
      { title: 'Vulnerability checks', text: 'Introductory clickjacking, XSS and SQL injection testing modules.' },
      { title: 'Guided CLI', text: 'Menu-driven flow that walks learners through each step.' },
    ],
    workflow: [
      { title: 'Configure', text: 'Add a Google Custom Search API key and engine ID.' },
      { title: 'Recon', text: 'Run dorking, domain and DNS modules to understand the target.' },
      { title: 'Test', text: 'Launch clickjacking, XSS and SQLi checks against in-scope pages.' },
      { title: 'Learn', text: 'Review the output and dig deeper with professional tools.' },
    ],
    impact: [
      { title: 'Gentle on-ramp', text: 'Lowers the barrier for students taking their first steps into web security.' },
      { title: 'Methodology first', text: 'Teaches the recon-then-test order that real assessments follow.' },
      { title: 'Foundation for later work', text: 'The ideas here grew into ReconLab, a full AI-assisted recon platform.' },
    ],
    audience: ['Security students', 'CTF beginners', 'Educators running web-security labs'],
    scope: 'Educational tool for authorized targets and lab environments only.',
    stack: ['Python', 'Bash', 'Google Custom Search API', 'Linux'],
    links: [{ label: 'GitHub', href: 'https://github.com/0xNay33m/webwizard', kind: 'github' }],
  },
];

export const projectMap = Object.fromEntries(projects.map((p) => [p.slug, p])) as Record<string, Project>;

export const youtubeThumb = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
