import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Crosshair, Database, FileCheck2, Microscope, ShieldCheck, Target, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { SplitBackground } from '../components/Backgrounds';
import { CaseCard } from '../components/Cards';
import { DomainChips } from '../components/DomainChips';
import { InvestigationGlance, InvestigationReport } from '../components/InvestigationReport';
import { Reveal } from '../components/Reveal';
import { caseMap, caseStudies } from '../data/caseStudies';
import type { CaseStudy } from '../data/types';
import { useAccent } from '../lib/accent';
import { useTitle } from '../lib/useTitle';
export default function CasePage() {
  const { slug } = useParams();
  const study = slug ? caseMap[slug] : undefined;
  if (!study) return <Navigate to="/d/forensics" replace />;
  return <CaseView key={study.slug} study={study} />;
}

function Block({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="glass rounded-2xl p-6 sm:p-8">
        <h2 className="mb-5 flex items-center gap-3 text-lg font-semibold text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">{icon}</span>
          {title}
        </h2>
        {children}
      </section>
    </Reveal>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((i) => (
        <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function CaseView({ study }: { study: CaseStudy }) {
  useAccent(study.domains[0]);
  useTitle(study.title);
  const others = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <>
      <SplitBackground ids={study.domains} />
      <article className="container-x pt-24 sm:pt-28">
        <Link to="/d/forensics" className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white">
          <ArrowLeft size={16} /> Back to Forensics
        </Link>

        <motion.header initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-8 max-w-4xl">
          <p className="eyebrow">Case study · {study.date}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight sm:text-5xl">{study.title}</h1>
          <p className="mt-3 text-lg font-medium text-accent">{study.subtitle}</p>
          <p className="mt-5 text-lg leading-relaxed text-slate-300">{study.summary}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            <DomainChips ids={study.domains} />
            {study.tags.map((t) => (
              <span key={t} className="chip-neutral">
                {t}
              </span>
            ))}
          </div>
        </motion.header>

        {study.cover && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative mt-10 overflow-hidden rounded-2xl border border-white/[0.08]"
          >
            <img src={study.cover} alt={`${study.title} cover illustration`} className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
          </motion.div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ['Role', study.role],
            ['Date', study.date],
            ['Classification', study.classification],
          ].map(([k, v]) => (
            <div key={k} className="glass rounded-xl px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{k}</p>
              <p className="mt-1 text-sm text-slate-200">{v}</p>
            </div>
          ))}
        </div>

        {study.investigation ? (
          <>
            <InvestigationGlance inv={study.investigation} />
            <InvestigationReport study={study} inv={study.investigation} />
            <Reveal className="mt-10">
              <div className="glass flex flex-col gap-4 rounded-2xl p-6 sm:flex-row sm:items-center">
                <p className="eyebrow flex shrink-0 items-center gap-2">
                  <Wrench size={13} /> Toolkit
                </p>
                <div className="flex flex-wrap gap-2">
                  {study.tools.map((t) => (
                    <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </>
        ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div className="flex min-w-0 flex-col gap-6">
            <Block icon={<AlertTriangle size={17} />} title="The incident">
              <p className="leading-relaxed text-slate-300">{study.incident}</p>
            </Block>
            <Block icon={<Target size={17} />} title="The first lead">
              <p className="leading-relaxed text-slate-300">{study.lead}</p>
            </Block>
            <Block icon={<Database size={17} />} title="Evidence collected">
              <Bullets items={study.evidence} />
            </Block>
            <Block icon={<Microscope size={17} />} title="Methodology">
              <Bullets items={study.methodology} />
            </Block>

            <Reveal>
              <section className="glass rounded-2xl p-6 sm:p-8">
                <h2 className="mb-6 text-lg font-semibold text-white">Timeline of findings</h2>
                <ol className="relative ml-2 border-l border-white/10">
                  {study.timeline.map((t) => (
                    <li key={t.when + t.what} className="relative pb-6 pl-6 last:pb-0">
                      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgb(var(--accent-rgb)/0.18)]" />
                      <p className="font-mono text-xs text-accent">{t.when}</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-300">{t.what}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>

            <Reveal>
              <section className="glass overflow-hidden rounded-2xl">
                <h2 className="flex items-center gap-3 p-6 text-lg font-semibold text-white sm:px-8">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Crosshair size={17} />
                  </span>
                  MITRE ATT&amp;CK mapping
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="border-y border-white/[0.06] bg-white/[0.02] font-mono text-[11px] uppercase tracking-[0.15em] text-slate-500">
                      <tr>
                        <th className="px-6 py-3 font-medium sm:px-8">ID</th>
                        <th className="px-4 py-3 font-medium">Technique</th>
                        <th className="px-4 py-3 font-medium">Evidence</th>
                      </tr>
                    </thead>
                    <tbody>
                      {study.attack.map((a) => (
                        <tr key={a.id} className="border-b border-white/[0.04] last:border-0">
                          <td className="whitespace-nowrap px-6 py-3 font-mono text-xs text-accent sm:px-8">{a.id}</td>
                          <td className="px-4 py-3 text-slate-200">{a.name}</td>
                          <td className="px-4 py-3 text-slate-400">{a.evidence}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </Reveal>

            <Block icon={<FileCheck2 size={17} />} title="Root cause & impact">
              <p className="leading-relaxed text-slate-300">{study.rootCause}</p>
              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/[0.06] p-4 text-sm leading-relaxed text-red-200/90">
                <span className="font-semibold text-red-300">Impact: </span>
                {study.impact}
              </div>
            </Block>
            <Block icon={<ShieldCheck size={17} />} title="Remediation">
              <Bullets items={study.remediation} />
            </Block>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="glass-accent rounded-2xl p-6">
                <p className="eyebrow mb-3">Outcome</p>
                <p className="text-sm leading-relaxed text-slate-300">{study.outcome}</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="glass rounded-2xl p-6">
                <p className="eyebrow mb-4 flex items-center gap-2">
                  <Wrench size={13} /> Tools used
                </p>
                <div className="flex flex-wrap gap-2">
                  {study.tools.map((t) => (
                    <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            <p className="px-1 text-xs leading-relaxed text-slate-600">
              Identifying details of victims, clients and infrastructure have been redacted or generalised.
            </p>
          </aside>
        </div>
        )}

        <section className="mt-16">
          <h2 className="section-title mb-6">More investigations</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {others.map((c) => (
              <CaseCard key={c.slug} study={c} />
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
