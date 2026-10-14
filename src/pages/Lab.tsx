import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { useAccent } from '../lib/accent';
import { useTitle } from '../lib/useTitle';
const lines = [
  '$ whoami',
  'a curious one.',
  '$ sudo ./unlock --lab',
  '[sudo] password for visitor: ********',
  '[+] access granted. welcome to the side quests.',
];

const sideProjects = [
  { name: 'Atmosync', desc: 'A command-line weather app with real-time data for any city.', href: 'https://github.com/0xNay33m/Atmosync' },
  { name: 'Userly', desc: 'A sleek, minimal user-management CRUD app.', href: 'https://github.com/0xNay33m/Userly' },
  { name: 'Vulnerability Checklist', desc: 'Web & API vulnerability checklist and hunting ideas.', href: 'https://github.com/0xNay33m/vulnerability-Checklist' },
  { name: 'Marketing Plans (Spring Boot)', desc: 'Academic Spring Boot app for purchasing and managing marketing plans.', href: 'https://github.com/0xNay33m/springboot_academic_project' },
  { name: 'Operating-System-Fix', desc: 'Fixes and notes from fighting my own OS.', href: 'https://github.com/0xNay33m/Operating-System-Fix' },
  { name: 'CTFd-test', desc: 'CTFd sandbox used while building CTF infrastructure.', href: 'https://github.com/0xNay33m/CTFd-test' },
];

export default function Lab() {
  useAccent('development');
  useTitle('The Lab');
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 300 : 650);
    return () => clearTimeout(t);
  }, [shown]);

  const done = shown >= lines.length;

  return (
    <div className="relative min-h-screen bg-black pt-28 font-mono">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.12),transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 opacity-[0.07] [background:repeating-linear-gradient(0deg,#fff_0,#fff_1px,transparent_1px,transparent_3px)]" />
      <div className="container-x relative max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-white">
          <ArrowLeft size={14} /> exit
        </Link>
        <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-ink-950/80 p-5 shadow-[0_0_80px_-20px_rgba(34,197,94,0.4)] sm:p-8">
          <div className="mb-5 flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-amber-500/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
          </div>
          <div className="space-y-1.5 text-sm">
            {lines.slice(0, shown).map((l) => (
              <p key={l} className={l.startsWith('$') ? 'text-emerald-400' : l.startsWith('[+]') ? 'text-emerald-300' : 'text-slate-400'}>
                {l}
              </p>
            ))}
            {!done && <span className="animate-blink inline-block h-4 w-2 bg-emerald-400" />}
          </div>
        </div>

        {done && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">// the lab</p>
            <h1 className="mt-3 font-sans text-3xl font-semibold sm:text-4xl">Side quests & fun builds</h1>
            <p className="mt-3 font-sans text-slate-400">You found it. Here is where the experiments live: small, weird and fun.</p>

            <a
              href={profile.funSite}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 flex items-center justify-between rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-6 transition-colors hover:bg-emerald-500/[0.12]"
            >
              <span>
                <span className="block text-xs uppercase tracking-[0.2em] text-emerald-400">enter</span>
                <span className="mt-1 block font-sans text-xl font-semibold text-white">The Fun Projects Site</span>
              </span>
              <ArrowUpRight className="text-emerald-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {sideProjects.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-emerald-500/40"
                >
                  <span className="flex items-center justify-between text-sm text-white">
                    ./{p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                    <ArrowUpRight size={14} className="text-slate-600 group-hover:text-emerald-400" />
                  </span>
                  <span className="mt-1 block font-sans text-xs text-slate-500">{p.desc}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
