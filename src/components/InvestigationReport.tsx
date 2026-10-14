import {
  AlertTriangle,
  ArrowRight,
  Brain,
  CheckCircle2,
  Crosshair,
  Database,
  FileText,
  Fingerprint,
  GitMerge,
  Globe,
  Route,
  Server,
  Target,
  UserX,
} from 'lucide-react';
import type { CaseStudy, Investigation } from '../data/types';
import { SectionDivider } from './Cards';
import { Reveal } from './Reveal';

const TOTAL = 7;
const planeIcons = [Database, Server, Globe];

export function InvestigationGlance({ inv }: { inv: Investigation }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {inv.glance.map((g, i) => (
        <Reveal key={g.label} delay={i * 0.04}>
          <div className="glass h-full rounded-2xl p-4">
            <p className="text-2xl font-semibold text-accent">{g.value}</p>
            <p className="mt-1 text-xs text-slate-200">{g.label}</p>
            {g.hint && <p className="mt-0.5 text-[11px] text-slate-500">{g.hint}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function InvestigationReport({ study, inv }: { study: CaseStudy; inv: Investigation }) {
  return (
    <div className="mt-16 flex flex-col gap-20">
      {/* 01 The case */}
      <section>
        <SectionDivider index={1} total={TOTAL} label="The case" icon={AlertTriangle} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="glass h-full rounded-2xl p-6 sm:p-8">
              <p className="eyebrow mb-4">What the case was</p>
              <p className="leading-relaxed text-slate-300">{study.incident}</p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="glass-accent h-full rounded-2xl p-6 sm:p-8">
              <p className="eyebrow mb-4 flex items-center gap-2">
                <Target size={14} /> The first lead
              </p>
              <p className="text-sm leading-relaxed text-slate-300">{study.lead}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 Attack path */}
      <section>
        <SectionDivider index={2} total={TOTAL} label="Attack path discovery" icon={Route} />
        <ol className="grid gap-3 lg:grid-cols-5">
          {inv.attackPath.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <li className="relative h-full">
                <div className="glass h-full rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Stage {i + 1}</span>
                    {i < inv.attackPath.length - 1 && <ArrowRight size={14} className="hidden text-slate-600 lg:block" />}
                  </div>
                  <h3 className="mt-3 font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.text}</p>
                </div>
                <span
                  aria-hidden
                  className="absolute left-0 right-0 top-0 h-0.5 rounded-full bg-accent"
                  style={{ opacity: 0.35 + (i / inv.attackPath.length) * 0.65 }}
                />
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* 03 Behaviour */}
      <section>
        <SectionDivider index={3} total={TOTAL} label="Suspect behaviour analysis" icon={UserX} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {inv.behaviour.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.05}>
              <div className="glass card-hover h-full rounded-2xl p-5 sm:p-6">
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Fingerprint size={17} />
                </span>
                <h3 className="mt-4 font-semibold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 04 Correlation */}
      <section>
        <SectionDivider index={4} total={TOTAL} label="Finding correlations" icon={GitMerge} />
        <div className="grid gap-4 md:grid-cols-3">
          {inv.correlations.map((c, i) => {
            const Icon = planeIcons[i % planeIcons.length];
            return (
              <Reveal key={c.plane} delay={i * 0.06}>
                <div className="glass relative h-full rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent bg-accent-soft text-accent">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Plane {String.fromCharCode(65 + i)}</p>
                      <p className="font-semibold text-white">{c.plane}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-400">{c.finding}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div aria-hidden className="relative mx-auto hidden h-12 w-2/3 md:block">
          <span className="absolute left-0 top-0 h-6 w-px bg-accent opacity-50" />
          <span className="absolute left-1/2 top-0 h-12 w-px bg-accent opacity-50" />
          <span className="absolute right-0 top-0 h-6 w-px bg-accent opacity-50" />
          <span className="absolute left-0 right-0 top-6 h-px bg-accent opacity-50" />
        </div>
        <Reveal>
          <div className="glass-accent mt-4 rounded-2xl p-6 sm:p-8 md:mt-0">
            <p className="eyebrow mb-3 flex items-center gap-2">
              <Crosshair size={14} /> Where the evidence converged
            </p>
            <p className="leading-relaxed text-slate-200">{inv.convergence}</p>
          </div>
        </Reveal>
      </section>

      {/* 05 Reasoning */}
      <section>
        <SectionDivider index={5} total={TOTAL} label="Reaching the conclusion" icon={Brain} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          <ol className="flex flex-col gap-3">
            {inv.reasoning.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <li className="glass flex gap-4 rounded-2xl p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-accent font-mono text-sm font-semibold text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{r.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{r.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={0.05}>
            <div className="glass h-full rounded-2xl p-6">
              <p className="eyebrow mb-4 flex items-center gap-2">
                <Crosshair size={14} /> MITRE ATT&amp;CK mapping
              </p>
              <ul className="flex flex-col gap-2">
                {study.attack.map((a) => (
                  <li key={a.id} className="flex items-baseline gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                    <span className="w-20 shrink-0 font-mono text-xs text-accent">{a.id}</span>
                    <span className="text-sm text-slate-200">{a.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 06 Outcome */}
      <section>
        <SectionDivider index={6} total={TOTAL} label="Outcome & impact" icon={CheckCircle2} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {inv.outcomes.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.05}>
              <div className="glass h-full rounded-2xl p-5">
                <CheckCircle2 size={18} className="text-accent" />
                <h3 className="mt-3 font-semibold text-white">{o.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.06] p-5 text-sm leading-relaxed text-red-200/90">
              <span className="font-semibold text-red-300">Business impact: </span>
              {study.impact}
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-sm leading-relaxed text-slate-300">
              <span className="font-semibold text-white">Root cause: </span>
              {study.rootCause}
            </div>
          </div>
        </Reveal>
      </section>

      {/* 07 Report */}
      <section>
        <SectionDivider index={7} total={TOTAL} label="Report & artifacts" icon={FileText} />
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <ReportDocument inv={inv} />
          </Reveal>
          <Reveal delay={0.05}>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <p className="eyebrow mb-1">Artifact register</p>
              <p className="mb-5 text-sm text-slate-500">Evidence acquired read-only and hashed before analysis.</p>
              <ul className="divide-y divide-white/[0.06]">
                {inv.artifacts.map((a) => (
                  <li key={a.id} className="flex gap-4 py-3.5 first:pt-0 last:pb-0">
                    <span className="mt-0.5 shrink-0 rounded-md border border-accent bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-accent">
                      {a.id}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{a.name}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{a.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/[0.06] pt-4 text-xs leading-relaxed text-slate-600">
                The full report, raw evidence and indicators remain with the client. Identifying details on this page are redacted or generalised.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ReportDocument({ inv }: { inv: Investigation }) {
  const r = inv.report;
  return (
    <div className="relative mx-auto max-w-md">
      <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-white/[0.06] bg-ink-850" />
      <div aria-hidden className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-xl border border-white/[0.06] bg-ink-800" />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0e131c] p-6 shadow-glow sm:p-8">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">Case {r.caseId}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">{r.pages} pages</p>
          </div>
          <span className="-rotate-6 rounded border-2 border-red-500/60 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-red-400/80">
            Confidential
          </span>
        </div>
        <h3 className="mt-6 text-xl font-semibold leading-snug text-white">{r.title}</h3>
        <div className="mt-3 space-y-1.5" aria-hidden>
          <span className="block h-2 w-3/4 rounded bg-white/10" />
          <span className="block h-2 w-1/2 rounded bg-white/10" />
        </div>
        <div className="mt-6 h-px bg-accent opacity-40" />
        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">Contents</p>
        <ol className="mt-3 space-y-2">
          {r.sections.map((s, i) => (
            <li key={s.name} className="flex items-baseline gap-2 text-xs text-slate-300">
              <span className="font-mono text-slate-500">{String(i + 1).padStart(2, '0')}</span>
              <span className="shrink-0">{s.name}</span>
              <span aria-hidden className="mx-1 flex-1 border-b border-dotted border-white/15" />
              <span className="font-mono text-slate-500">{s.page}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 flex items-center gap-2" aria-hidden>
          <span className="h-2 w-16 rounded bg-white/10" />
          <span className="h-2 w-24 rounded bg-black ring-1 ring-white/10" />
          <span className="h-2 w-10 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}
