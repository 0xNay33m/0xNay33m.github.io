import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Boxes,
  Briefcase,
  CalendarCheck,
  ExternalLink,
  Eye,
  FileSearch,
  FlaskConical,
  LayoutGrid,
  Puzzle,
  ShieldCheck,
  Trophy,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AmbientBackground } from '../components/Backgrounds';
import { BlogCard, CaseCard, EmptyState, SectionDivider, SectionHeading, ToolGrid, WriteupCard } from '../components/Cards';
import { HeroVisual } from '../components/HeroVisual';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { ImageCarousel } from '../components/ImageCarousel';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { judged, organized, participation, type CtfEvent } from '../data/ctf';
import { ctfChallenges, difficultyClass } from '../data/ctfChallenges';
import { PivotQuickly } from '../components/PivotQuickly';
import { domainMap, sectionLabels } from '../data/domains';
import { research } from '../data/profile';
import type { Domain, DomainId, DomainServices, SectionId } from '../data/types';
import { useAccent } from '../lib/accent';
import { useTitle } from '../lib/useTitle';
import { blogsFor, casesFor, projectsFor, writeupsFor } from '../lib/content';
const sectionIcons: Record<SectionId, LucideIcon> = {
  overview: LayoutGrid,
  projects: Boxes,
  writeups: BookOpen,
  cases: FileSearch,
  investigations: FileSearch,
  tools: Wrench,
  organized: CalendarCheck,
  judged: Eye,
  challenges: Puzzle,
  participation: Trophy,
  research: FlaskConical,
};

/** The CTF page shows authored writeups instead of Medium blogs. */
const labelFor = (domainId: DomainId, s: SectionId) =>
  domainId === 'ctf' && s === 'writeups' ? 'Writeups' : sectionLabels[s];

function useScrollSpy(ids: string[]) {  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -60% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return [active, setActive] as const;
}

export default function DomainPage() {
  const { id } = useParams();
  const domain = id ? domainMap[id as DomainId] : undefined;
  if (!domain) return <Navigate to="/" replace />;
  return <DomainView key={domain.id} domain={domain} />;
}

function DomainView({ domain }: { domain: Domain }) {
  useAccent(domain.id);
  useTitle(domain.label);
  const [active, setActive] = useScrollSpy(domain.sections);
  const Icon = domain.icon;
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (bar && chip) bar.scrollTo({ left: chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);

  const go = (s: string) => {
    setActive(s);
    document.getElementById(s)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <AmbientBackground />
      <div className="container-x pt-16 lg:grid lg:grid-cols-[230px_1fr] lg:gap-10 lg:pt-24">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="no-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6">
            <div className="mb-6 flex items-center gap-3 px-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
                <Icon size={18} />
              </span>
              <span className="text-lg font-semibold text-white">{domain.name}</span>
            </div>
            <nav className="flex flex-col gap-1" aria-label={`${domain.name} sections`}>
              {domain.sections.map((s) => {
                const SIcon = sectionIcons[s];
                const on = active === s;
                return (
                  <button
                    key={s}
                    onClick={() => go(s)}
                    className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      on ? 'bg-accent-soft font-medium text-white' : 'text-slate-400 hover:bg-white/[0.03] hover:text-white'
                    }`}
                  >
                    {on && <motion.span layoutId="side-active" className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-accent" />}
                    <SIcon size={16} className={on ? 'text-accent' : ''} />
                    {labelFor(domain.id, s)}
                  </button>
                );
              })}
            </nav>
            <PivotQuickly domain={domain.id} />
          </div>
        </aside>

        {/* Section bar (mobile / tablet) */}
        <nav
          aria-label={`${domain.name} sections`}
          className="fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-3 lg:hidden"
        >
          <div
            ref={barRef}
            className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-ink-950/85 p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            {domain.sections.map((s) => (
              <button
                key={s}
                data-section={s}
                onClick={() => go(s)}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                  active === s ? 'bg-accent text-white' : 'text-slate-400'
                }`}
              >
                {labelFor(domain.id, s)}
              </button>
            ))}
          </div>
        </nav>

        <div className="min-w-0">
          {/* Hero / overview */}
          <section id="overview" className="scroll-mt-20 pt-10 lg:scroll-mt-24 lg:pt-4">
            <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="eyebrow">
                  {domain.label}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 }}
                  className="mt-4 text-balance text-4xl font-semibold leading-[1.08] sm:text-5xl"
                >
                  {domain.headline[0]}
                  <span className="text-accent">{domain.headline[1]}</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 }}
                  className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
                >
                  {domain.intro}
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-7">
                  <button onClick={() => go(domain.sections[1])} className="btn-outline">
                    Explore my work <ArrowRight size={16} />
                  </button>
                </motion.div>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                <HeroVisual icon={Icon} />
              </motion.div>
            </div>

            <div className="mt-16">
              <SectionDivider index={1} total={domain.sections.length} label={sectionLabels.overview} icon={sectionIcons.overview} />
            </div>
            <Reveal className={`grid grid-cols-1 gap-6 ${domain.services ? '' : 'lg:grid-cols-[1.4fr_1fr]'}`}>
              <div className="glass rounded-2xl p-6 sm:p-8">
                <p className="eyebrow mb-4">What this domain means to me</p>
                <div className="prose-body">
                  {domain.overview.map((p) => (
                    <p key={p.slice(0, 20)}>{p}</p>
                  ))}
                </div>
              </div>
              {!domain.services && (
                <div className="glass-accent rounded-2xl p-6 sm:p-8">
                  <p className="eyebrow mb-4">Focus areas</p>
                  <ul className="space-y-3">
                    {domain.focus.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
            {domain.services && <ServicesCard services={domain.services} />}
          </section>

          {domain.sections.slice(1).map((s, i) => (
            <section key={s} id={s} className="scroll-mt-20 pt-20 lg:scroll-mt-24">
              <SectionDivider index={i + 2} total={domain.sections.length} label={labelFor(domain.id, s)} icon={sectionIcons[s]} />
              <DomainSection section={s} domain={domain} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

function DomainSection({ section, domain }: { section: SectionId; domain: Domain }) {
  const title = sectionLabels[section];

  switch (section) {
    case 'projects': {
      const list = projectsFor(domain.id);
      return (
        <>
          <Reveal>
            <SectionHeading eyebrow="Featured work" title={title} />
          </Reveal>
          {list.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {list.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.05}>
                  <ProjectCard project={p} from={domain.id} />
                </Reveal>
              ))}
            </div>
          ) : (
            <EmptyState text="Projects for this domain are on the way." />
          )}
        </>
      );
    }
    case 'writeups': {
      const posts = blogsFor(domain.id);
      const cases = domain.sections.includes('cases') || domain.sections.includes('investigations') ? [] : casesFor(domain.id);
      const reps = writeupsFor(domain.id);
      const ctfOnly = domain.id === 'ctf';
      const heading = ctfOnly ? 'Writeups' : title;
      const solves = ctfChallenges.filter((c) => c.event === 'BDSec CTF 2026' && c.role === 'solver');
      return (
        <>
          <Reveal>
            <SectionHeading eyebrow={ctfOnly ? 'Solve notes' : 'Read'} title={heading} />
          </Reveal>
          {ctfOnly && (
            <div className="flex flex-col gap-10">
              <div>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  BDSec CTF 2026 · solved by Mr L · 3rd of 545 teams
                </p>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {solves.map((c, i) => (
                    <Reveal key={c.slug} delay={(i % 4) * 0.04}>
                      <Link to={`/ctf/${c.slug}`} className="glass group card-hover flex h-full flex-col rounded-2xl p-5">
                        <div className="flex items-center justify-between">
                          <span className="chip">{c.category}</span>
                          <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${difficultyClass(c.difficulty)}`}>
                            {c.difficulty}
                          </span>
                        </div>
                        <h3 className="mt-4 font-mono text-base font-semibold text-white">{c.name}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.summary}</p>
                        <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-medium text-accent">
                          Read full writeup <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
              {reps.length > 0 && (
                <div>
                  <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">Bug bounty report</p>
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {reps.map((w, i) => (
                      <Reveal key={w.slug} delay={i * 0.05}>
                        <WriteupCard writeup={w} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {!ctfOnly && cases.length > 0 && (
            <>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400">Investigations</p>
              <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                {cases.map((c, i) => (
                  <Reveal key={c.slug} delay={i * 0.05}>
                    <CaseCard study={c} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
          {ctfOnly ? (
            solves.length === 0 && reps.length === 0 && <EmptyState text="Writeups for this domain are coming soon." />
          ) : posts.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {posts.map((b, i) => (
                <Reveal key={b.url} delay={(i % 6) * 0.04}>
                  <BlogCard blog={b} />
                </Reveal>
              ))}
            </div>
          ) : (
            !cases.length && !reps.length && <EmptyState text="Writeups for this domain are coming soon." />
          )}
          {!ctfOnly && reps.length > 0 && (
            <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {reps.map((w, i) => (
                <Reveal key={w.slug} delay={i * 0.05}>
                  <WriteupCard writeup={w} />
                </Reveal>
              ))}
            </div>
          )}
        </>
      );
    }
    case 'cases':
      return (
        <>
          <Reveal>
            <SectionHeading eyebrow="Forensics investigations" title={title} />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {casesFor(domain.id).map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <CaseCard study={c} />
              </Reveal>
            ))}
          </div>
        </>
      );
    case 'investigations':
      return (
        <>
          <Reveal>
            <SectionHeading eyebrow={domain.id === 'intelligence' ? 'OSINT' : 'Investigations'} title={title} />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {casesFor(domain.id).map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <CaseCard study={c} />
              </Reveal>
            ))}
          </div>
        </>
      );
    case 'tools':
      return (
        <>
          <Reveal>
            <SectionHeading eyebrow="Arsenal" title={domain.id === 'ctf' ? 'Tools by category' : title} />
          </Reveal>
          <Reveal>
            <ToolGrid groups={domain.tools} />
          </Reveal>
        </>
      );
    case 'organized':
    case 'judged':
      return (
        <>
          <Reveal>
            <SectionHeading eyebrow={section === 'organized' ? 'Leadership' : 'Community'} title={title} />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {(section === 'organized' ? organized : judged).map((e, i) => (
              <Reveal key={e.name} delay={i * 0.05}>
                <EventCard event={e} />
              </Reveal>
            ))}
          </div>
        </>
      );
    case 'challenges': {
      const authored = ctfChallenges.filter((c) => c.role !== 'solver');
      const events = [...new Set(authored.map((c) => c.event))];
      return (
        <>
          <Reveal>
            <SectionHeading
              eyebrow={`${authored.length} challenges · files + writeups`}
              title={title}
              action={
                <a
                  href="https://github.com/0xNay33m/csc_cyberwar_ctf"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden items-center gap-1 text-sm text-accent hover:underline sm:flex"
                >
                  Source <ExternalLink size={14} />
                </a>
              }
            />
          </Reveal>
          <div className="flex flex-col gap-10">
            {events.map((ev) => (
              <div key={ev}>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">{ev}</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {authored
                    .filter((c) => c.event === ev)
                    .map((c, i) => (
                      <Reveal key={c.slug} delay={(i % 6) * 0.04}>
                        <Link to={`/ctf/${c.slug}`} className="glass group card-hover flex h-full flex-col rounded-2xl p-5">
                          <div className="flex items-center justify-between">
                            <span className="chip">{c.category}</span>
                            <span className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${difficultyClass(c.difficulty)}`}>
                              {c.difficulty}
                            </span>
                          </div>
                          <h3 className="mt-4 font-mono text-base font-semibold text-white">{c.name}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-slate-400">{c.summary}</p>
                          <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-medium text-accent">
                            Files & writeup <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                          </span>
                        </Link>
                      </Reveal>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }
    case 'participation':
      return (
        <>
          <Reveal>
            <SectionHeading eyebrow="Competing with R00TG4NG & friends" title="CTF Participation" />
          </Reveal>
          <div className="glass overflow-hidden rounded-2xl">
            {participation.map((r, i) => (
              <Reveal key={r.event} delay={i * 0.04}>
                <div className={`flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:gap-6 ${i ? 'border-t border-white/[0.05]' : ''}`}>
                  <span className="w-12 font-mono text-xs text-slate-500">{r.year}</span>
                  <div className="flex-1">
                    <p className="font-medium text-white">{r.event}</p>
                    {(r.detail || r.team) && (
                      <p className="text-xs text-slate-500">
                        {r.detail}
                        {r.detail && r.team ? ' · ' : ''}
                        {r.team && `Team ${r.team}`}
                      </p>
                    )}
                  </div>
                  <span className={r.highlight ? 'chip' : 'chip-neutral'}>
                    {r.highlight && <Trophy size={12} />} {r.placement}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      );
    case 'research':
      return (
        <>
          <Reveal>
            <SectionHeading eyebrow="Papers & thesis" title={title} />
          </Reveal>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {research.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <div className="glass card-hover flex h-full flex-col rounded-2xl p-6">
                  <span className="chip w-fit">{r.status}</span>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-white">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{r.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      );
    default:
      return null;
  }
}

function ServicesCard({ services }: { services: DomainServices }) {
  return (
    <Reveal className="mt-5">
      <div className="glass-accent relative overflow-hidden rounded-2xl p-6 sm:p-8">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-accent" />
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{services.eyebrow}</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{services.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">{services.pitch}</p>
          </div>
          <Link to="/contact" className="btn-accent shrink-0 self-start">
            <Briefcase size={16} /> Hire me
          </Link>
        </div>
        <ul className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.items.map((s) => (
            <li key={s.name} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-white">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {s.name}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.detail}</p>
            </li>
          ))}
        </ul>
        {services.note && (
          <p className="mt-6 flex items-start gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-accent" />
            {services.note}
          </p>
        )}
      </div>
    </Reveal>
  );
}

function EventCard({ event }: { event: CtfEvent }) {
  const slides = [...(event.cover ? [event.cover] : []), ...(event.gallery ?? []).filter((s) => s !== event.cover)];
  const authored = event.challengeEvent ? ctfChallenges.filter((c) => c.event === event.challengeEvent) : [];
  const designed = [...new Set(authored.map((c) => c.category))];
  return (
    <div className="glass-accent flex h-full flex-col overflow-hidden rounded-2xl">
      {slides.length > 0 && (
        <div className="relative border-b border-white/10">
          <ImageCarousel images={slides} label={event.name} className="aspect-video" />
          <span className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-accent" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{event.role}</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{event.name}</h3>
          </div>
          <span className="chip-neutral">{event.year}</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{event.description}</p>
        <ul className="mt-4 space-y-2">
          {event.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
        {designed.length > 0 && (
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            <span className="text-slate-300">Challenge domains I designed:</span> {designed.join(', ')}. The challenges are listed
            in the Challenges section below.
          </p>
        )}
        {(event.link || event.linkedin) && (
          <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-5 text-sm">
            {event.link && (
              <a href={event.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
                <GithubIcon size={14} /> View repository <ExternalLink size={14} />
              </a>
            )}
            {event.linkedin && (
              <a href={event.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
                <LinkedinIcon size={14} /> LinkedIn post <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
