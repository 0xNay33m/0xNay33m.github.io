import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, FileText, ShieldCheck } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { SplitBackground } from '../components/Backgrounds';
import { SectionDivider, WriteupCard } from '../components/Cards';
import { CodeBlock } from './ChallengePage';
import { DomainChips } from '../components/DomainChips';
import { Reveal } from '../components/Reveal';
import type { Writeup } from '../data/types';
import { writeupMap, writeups } from '../data/writeups';
import { useAccent } from '../lib/accent';
import { useTitle } from '../lib/useTitle';
const severityClass: Record<string, string> = {
  Critical: 'border-red-500/40 bg-red-500/10 text-red-300',
  High: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
  Medium: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
};

export default function WriteupPage() {
  const { slug } = useParams();
  const writeup = slug ? writeupMap[slug] : undefined;
  if (!writeup) return <Navigate to="/d/ctf" replace />;
  return <WriteupView key={writeup.slug} writeup={writeup} />;
}

function WriteupView({ writeup }: { writeup: Writeup }) {
  useAccent(writeup.domains[0]);
  useTitle(writeup.title);
  const others = writeups.filter((w) => w.slug !== writeup.slug);
  const bugbounty = writeup.kind === 'bugbounty';
  const facts = [
    ['Author', writeup.author],
    [bugbounty ? 'Event' : 'Team', writeup.team ?? writeup.event],
    ['Result', writeup.placement ?? writeup.year],
  ];

  return (
    <>
      <SplitBackground ids={writeup.domains} />
      <article className="container-x pt-24 sm:pt-28">
        <Link to="/d/ctf" className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white">
          <ArrowLeft size={16} /> Back to CTF
        </Link>

        <motion.header initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-8 max-w-4xl">
          <p className="eyebrow">
            {bugbounty ? 'Bug bounty report' : 'CTF writeups'} · {writeup.year}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-5xl">{writeup.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">{writeup.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {writeup.file && (
              <a href={writeup.file} target="_blank" rel="noreferrer" className="btn-primary">
                <FileText size={16} /> Read the full report (PDF)
              </a>
            )}
            <div className="flex flex-wrap gap-1.5">
              <DomainChips ids={writeup.domains} />
            </div>
          </div>
        </motion.header>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {facts.map(([k, v]) => (
            <div key={k} className="glass rounded-xl px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{k}</p>
              <p className="mt-1 text-sm text-slate-200">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {writeup.glance.map((g) => (
            <div key={g.label} className="rounded-xl border border-accent bg-accent-soft px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{g.label}</p>
              <p className="mt-1 text-2xl font-semibold text-white">{g.value}</p>
              {g.hint && <p className="mt-0.5 text-xs text-slate-400">{g.hint}</p>}
            </div>
          ))}
        </div>

        <div className="mt-14">
          <Reveal>
            <SectionDivider index={1} total={4} label="Overview" />
          </Reveal>
          <Reveal>
            <div className="glass max-w-4xl rounded-2xl p-6 sm:p-8">
              {writeup.overview.map((p) => (
                <p key={p.slice(0, 24)} className="leading-relaxed text-slate-300 [&+&]:mt-4">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-14">
          <Reveal>
            <SectionDivider index={2} total={4} label={writeup.entriesLabel} />
          </Reveal>
          <ol className="flex flex-col gap-5">
            {writeup.entries.map((e, i) => (
              <Reveal key={e.name}>
                <li className="glass overflow-hidden rounded-2xl">
                  <div className="border-b border-white/[0.06] p-6 [background:rgb(var(--accent-rgb)/0.04)] sm:px-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] ${
                          severityClass[e.tag] ?? 'border-white/10 bg-white/[0.04] text-slate-300'
                        }`}
                      >
                        {e.tag}
                      </span>
                      {e.flagFormat && <span className="ml-auto font-mono text-[11px] text-slate-500">{e.flagFormat}</span>}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-white">{e.name}</h3>
                    {e.endpoint && (
                      <p className="mt-2 break-all font-mono text-xs text-accent">{e.endpoint}</p>
                    )}
                  </div>
                  <div className="p-6 sm:px-8 sm:py-7">
                    <p className="text-sm leading-relaxed text-slate-300">{e.summary}</p>
                    {e.by && <p className="mt-3 font-mono text-[11px] text-slate-500">Solved by {e.by}</p>}
                    {e.repro && e.repro.length > 0 && (
                      <div className="mt-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Steps to reproduce</p>
                        <ol className="mt-3 space-y-4">
                          {e.repro.map((s, j) => (
                            <li key={j} className="flex gap-3">
                              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-accent bg-ink-900 font-mono text-[10px] font-semibold text-accent">
                                {j + 1}
                              </span>
                              <div className="min-w-0 flex-1">
                                {s.text && <p className="text-sm leading-relaxed text-slate-400">{s.text}</p>}
                                {s.code && <CodeBlock code={s.code} lang={s.lang} />}
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                    {e.impact && e.impact.length > 0 && (
                      <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/[0.05] p-4 sm:p-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-300/80">Impact</p>
                        <ul className="mt-2.5 space-y-2">
                          {e.impact.map((x) => (
                            <li key={x} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-300">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                              {x}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-14">
          <Reveal>
            <SectionDivider index={3} total={4} label="Skills demonstrated" />
          </Reveal>
          <Reveal>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <p className="eyebrow flex items-center gap-2">
                <ShieldCheck size={13} /> Toolkit
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {writeup.skills.map((s) => (
                  <span key={s} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {writeup.file && (
          <div className="mt-14">
            <Reveal>
              <SectionDivider index={4} total={4} label="Full report" />
            </Reveal>
            <Reveal>
              <div className="glass flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div>
                  <h2 className="text-lg font-semibold text-white">Every step, command and payload</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    The hosted PDF collects the complete {bugbounty ? 'findings with reproduction steps' : 'solves with exact commands'}.
                  </p>
                </div>
                <a href={writeup.file} target="_blank" rel="noreferrer" className="btn-primary shrink-0">
                  Open PDF <ArrowUpRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        )}

        {others.length > 0 && (
          <div className="mt-14 pb-4">
            <Reveal>
              <SectionDivider index={4} total={4} label="More writeups" />
            </Reveal>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {others.map((w, i) => (
                <Reveal key={w.slug} delay={i * 0.05}>
                  <WriteupCard writeup={w} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
