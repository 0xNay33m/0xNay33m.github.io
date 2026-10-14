import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cpu,
  ExternalLink,
  FileText,
  Images,
  Layers,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { SplitBackground } from '../components/Backgrounds';
import { SectionDivider } from '../components/Cards';
import { DomainChips } from '../components/DomainChips';
import { GithubIcon } from '../components/Icons';
import { Lightbox } from '../components/Lightbox';
import { ProjectThumb } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { VideoEmbed } from '../components/VideoEmbed';
import { domainMap } from '../data/domains';
import { projectMap } from '../data/projects';
import type { DomainId, Figure, Project } from '../data/types';
import { useAccent } from '../lib/accent';
import { useTitle } from '../lib/useTitle';
import { projectsFor } from '../lib/content';
const linkIcon = { github: GithubIcon, demo: ExternalLink, docs: BookOpen, paper: FileText, video: PlayCircle };

export default function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? projectMap[slug] : undefined;
  if (!project) return <Navigate to="/" replace />;
  return <ProjectView key={project.slug} project={project} />;
}

function ProjectView({ project }: { project: Project }) {
  const [params] = useSearchParams();
  const from = params.get('from') as DomainId | null;
  const ctx: DomainId = from && project.domains.includes(from) ? from : project.domains[0];
  useAccent(ctx);
  useTitle(project.title);
  const [zoom, setZoom] = useState<Figure | null>(null);

  const siblings = projectsFor(ctx);
  const idx = siblings.findIndex((p) => p.slug === project.slug);
  const next = siblings.length > 1 ? siblings[(idx + 1) % siblings.length] : undefined;
  const primary = domainMap[ctx];
  const cross = project.domains.length > 1;
  const total = project.figures ? 6 : 5;

  return (
    <>
      <SplitBackground ids={project.domains} />
      <div className="container-x pt-24 sm:pt-28">
        <Link to={`/d/${primary.id}`} className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white">
          <ArrowLeft size={16} /> Back to {primary.name}
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap gap-1.5">
              <DomainChips ids={project.domains} />
              {project.tags.map((t) => (
                <span key={t} className="chip-neutral">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">{project.title}</h1>
            <p className="mt-3 text-lg font-medium text-accent">{project.tagline}</p>
            <p className="mt-5 leading-relaxed text-slate-300">{project.summary}</p>
            <dl className="mt-6 grid grid-cols-3 divide-x divide-white/[0.08] overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]">
              {project.glance.map((g) => (
                <div key={g.label} className="px-3 py-3 sm:px-4">
                  <dt className="sr-only">{g.label}</dt>
                  <dd className="text-sm font-semibold leading-tight text-accent sm:text-lg">{g.value}</dd>
                  <dd className="mt-0.5 text-[11px] leading-snug text-slate-400">{g.label}</dd>
                </div>
              ))}
            </dl>
            {cross && (
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Cross-domain · {project.domains.map((d) => domainMap[d].name).join(' / ')}
              </p>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {project.links.map((l, i) => {
                const Icon = linkIcon[l.kind];
                return (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={i === 0 ? 'btn-accent' : 'btn-ghost'}>
                    <Icon size={16} /> {l.label}
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
            {project.youtube ? (
              <VideoEmbed id={project.youtube} title={`${project.title} demo`} />
            ) : (
              <div className="group overflow-hidden rounded-2xl border border-accent">
                <ProjectThumb project={project} />
              </div>
            )}
          </motion.div>
        </div>

        {project.metrics && (
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {project.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.04}>
                <div className="glass h-full rounded-2xl p-4">
                  <p className="text-2xl font-semibold text-white">{m.value}</p>
                  <p className="mt-1 text-xs text-slate-300">{m.label}</p>
                  {m.hint && <p className="mt-0.5 text-[11px] text-slate-500">{m.hint}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Overview */}
        <section className="mt-16">
          <SectionDivider index={1} total={total} label="Overview" icon={FileText} />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.45fr_1fr]">
            <Reveal>
              <div className="glass h-full rounded-2xl p-6 sm:p-8">
                <p className="eyebrow mb-4">What it is</p>
                <div className="prose-body">
                  {project.description.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
              </div>
            </Reveal>
            <div className="flex flex-col gap-6">
              <Reveal delay={0.05}>
                <div className="glass-accent rounded-2xl p-6 sm:p-8">
                  <p className="eyebrow mb-4 flex items-center gap-2">
                    <Target size={14} /> The problem
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">{project.problem}</p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <p className="eyebrow mb-4 flex items-center gap-2">
                    <Users size={14} /> Built for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.audience.map((a) => (
                      <span key={a} className="chip">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
              {project.scope && (
                <Reveal delay={0.15}>
                  <div className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-xs leading-relaxed text-slate-400">
                    <ShieldCheck size={16} className="mt-0.5 shrink-0 text-accent" />
                    {project.scope}
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-20">
          <SectionDivider index={2} total={total} label="Key features" icon={Sparkles} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.05}>
                <div className="glass card-hover group h-full rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
                      <CheckCircle2 size={17} />
                    </span>
                    <span className="font-mono text-[11px] text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="mt-20">
          <SectionDivider index={3} total={total} label="How it works" icon={Workflow} />
          <ol className="relative grid gap-4 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
            {project.workflow.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.06}>
                <li className="relative h-full">
                  {i < project.workflow.length - 1 && (
                    <span aria-hidden className="absolute left-[calc(100%-8px)] top-9 hidden h-px w-6 bg-accent opacity-50 md:block" />
                  )}
                  <div className="glass h-full rounded-2xl p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-accent font-mono text-sm font-semibold text-accent">
                      {i + 1}
                    </span>
                    <h3 className="mt-4 font-semibold text-white">{w.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{w.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Impact */}
        <section className="mt-20">
          <SectionDivider index={4} total={total} label="Impact" icon={TrendingUp} />
          <div className="grid gap-4 md:grid-cols-3">
            {project.impact.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.06}>
                <div className="glass-accent relative h-full overflow-hidden rounded-2xl p-6">
                  <span aria-hidden className="absolute -right-3 -top-6 font-mono text-[5.5rem] font-bold leading-none text-white/[0.04]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="relative text-lg font-semibold text-white">{m.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-300/90">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Tech */}
        <section className="mt-20">
          <SectionDivider index={5} total={total} label="Under the hood" icon={Cpu} />
          <div className={`grid gap-6 ${project.architecture ? 'lg:grid-cols-[1fr_1.3fr]' : ''}`}>
            <Reveal>
              <div className="glass h-full rounded-2xl p-6 sm:p-8">
                <p className="eyebrow mb-5 flex items-center gap-2">
                  <Cpu size={14} /> Tech stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-slate-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
            {project.architecture && (
              <Reveal delay={0.05}>
                <div className="glass h-full rounded-2xl p-6 sm:p-8">
                  <p className="eyebrow mb-5 flex items-center gap-2">
                    <Layers size={14} /> Architecture
                  </p>
                  <ol className="space-y-3">
                    {project.architecture.map((a, i) => (
                      <li key={a} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                        <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                        {a}
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {project.figures && (
          <section className="mt-20">
            <SectionDivider index={6} total={total} label="Gallery" icon={Images} />
            <Reveal>
              <h2 className="section-title mb-6">Figures & screenshots</h2>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.figures.map((f, i) => (
                <Reveal key={f.src} delay={(i % 3) * 0.05}>
                  <button onClick={() => setZoom(f)} className="glass group card-hover block w-full overflow-hidden rounded-2xl text-left">
                    <div className="aspect-[16/10] overflow-hidden bg-white">
                      <img src={f.src} alt={f.caption} loading="lazy" className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <p className="px-4 py-3 text-xs text-slate-400">{f.caption}</p>
                  </button>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <Reveal className="mt-16">
          {next ? (
            <Link
              to={`/project/${next.slug}?from=${ctx}`}
              className="glass group card-hover flex items-center justify-between rounded-2xl p-6"
            >
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Next in <span className="text-accent">{primary.name}</span> · {idx + 1} / {siblings.length}
                </p>
                <p className="mt-1 text-lg font-semibold text-white">{next.title}</p>
                <p className="text-sm text-slate-400">{next.tagline}</p>
              </div>
              <ArrowRight className="text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          ) : (
            <Link to={`/d/${ctx}`} className="glass group card-hover flex items-center justify-between rounded-2xl p-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Only project in <span className="text-accent">{primary.name}</span>
                </p>
                <p className="mt-1 text-lg font-semibold text-white">Back to {primary.name}</p>
                <p className="text-sm text-slate-400">Explore the writeups, tools and more in this domain.</p>
              </div>
              <ArrowRight className="text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          )}
        </Reveal>
      </div>
      <Lightbox src={zoom?.src ?? null} caption={zoom?.caption} onClose={() => setZoom(null)} />
    </>
  );
}
