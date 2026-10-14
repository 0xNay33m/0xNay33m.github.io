import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Briefcase,
  FileText,
  FlaskConical,
  Globe,
  GraduationCap,
  Rocket,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AmbientBackground } from '../components/Backgrounds';
import { SectionDivider } from '../components/Cards';
import { ImageCarousel } from '../components/ImageCarousel';
import { Lightbox } from '../components/Lightbox';
import { PivotQuickly } from '../components/PivotQuickly';
import { Reveal } from '../components/Reveal';
import { VideoEmbed } from '../components/VideoEmbed';
import { certs, type Cert } from '../data/certs';
import { chapters, mission, pipeline, type Chapter, type StoryLink } from '../data/community';
import { aboutLinks } from '../data/nav';
import { education, experience, research } from '../data/profile';
import { useAccent } from '../lib/accent';
import { useTitle } from '../lib/useTitle';
type SectionId = 'experience' | 'education' | 'research' | 'certifications' | 'leadership';

const meta: Record<SectionId, { label: string; eyebrow: string; title: string; desc: string; icon: LucideIcon }> = {
  experience: {
    label: 'Experience',
    eyebrow: 'Experience',
    title: 'Work experience',
    desc: 'Authorized hacking and incident response — full-time and contractual.',
    icon: Briefcase,
  },
  education: {
    label: 'Education',
    eyebrow: 'Education',
    title: 'Academic background',
    desc: 'The degree behind the work.',
    icon: GraduationCap,
  },
  research: {
    label: 'Research',
    eyebrow: 'Research',
    title: 'Research',
    desc: 'Post-quantum cryptography: what happens to timing when you hybridise.',
    icon: FlaskConical,
  },
  certifications: {
    label: 'Certifications',
    eyebrow: 'Credentials',
    title: 'Certifications',
    desc: 'Every credential, from offense to intelligence. Select a card to zoom it.',
    icon: BadgeCheck,
  },
  leadership: {
    label: 'Leadership & Community',
    eyebrow: 'Community',
    title: 'Leadership & community',
    desc: 'The story of building a cybersecurity community at DIU: CTFs, recruitment, CyberTrack and teaching.',
    icon: Users,
  },
};

const order: SectionId[] = ['experience', 'education', 'research', 'certifications', 'leadership'];

const nextFor: Record<SectionId, { title: string; desc: string; to: string }> = {
  experience: { title: 'Education', desc: 'The degree behind the work', to: '/education' },
  education: { title: 'Research', desc: 'Post-quantum cryptography, concept-first', to: '/research' },
  research: { title: 'Certifications', desc: 'Credentials, from offense to intelligence', to: '/certifications' },
  certifications: { title: 'Leadership & community', desc: 'Organising, teaching & volunteering', to: '/leadership' },
  leadership: { title: 'Get in touch', desc: 'Have work, a CTF or research in mind?', to: '/contact' },
};

/** End-of-page recommendation: links to the next section, or out for the finale. */
function NextUp({ title, desc, to }: { title: string; desc?: string; to: string }) {
  return (
    <Reveal>
      <Link to={to} className="glass group card-hover mt-8 flex w-full items-center justify-between gap-4 rounded-2xl p-5 text-left sm:p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Next recommended</p>
          <p className="mt-1 font-semibold text-white transition-colors group-hover:text-accent">{title}</p>
          {desc && <p className="mt-0.5 text-sm text-slate-400">{desc}</p>}
        </div>
        <ArrowRight size={18} className="shrink-0 text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-accent" />
      </Link>
    </Reveal>
  );
}

function ExperienceDetail() {
  return (
    <div className="flex flex-col gap-5">
      {experience.slice(0, 2).map((x, i) => (
        <Reveal key={x.title + x.org} delay={i * 0.05}>
          <article className="glass group/xp card-hover flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:p-8">
            <div className="flex shrink-0 justify-center sm:block">
              <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white p-3 [box-shadow:0_20px_50px_-25px_rgb(var(--accent-rgb)/0.6)] sm:h-32 sm:w-32">
                {x.logo ? (
                  <img src={x.logo} alt={`${x.org} logo`} loading="lazy" className="h-full w-full object-contain" />
                ) : (
                  <Briefcase size={36} className="text-slate-400" />
                )}
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-slate-500">{x.period}</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{x.title}</h3>
                  <p className="mt-0.5 text-sm text-accent">{x.org}</p>
                </div>
                {x.link && (
                  <a
                    href={x.link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={x.link.label}
                    title={x.link.label}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition-all hover:border-accent hover:bg-accent-soft hover:text-accent"
                  >
                    <Globe size={17} />
                  </a>
                )}
              </div>

              {x.engagement && <span className="chip mt-3 w-fit">{x.engagement}</span>}

              <ul className="mt-4 space-y-2.5">
                {x.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-400">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {p}
                  </li>
                ))}
              </ul>

              {x.caseStudy && (
                <Link to={x.caseStudy} className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent hover:underline">
                  Read the case study <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

function EducationDetail() {
  return (
    <>
      {education.map((e) => (
        <Reveal key={e.school}>
          <article className="glass-accent flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:p-8">
            <div className="flex shrink-0 justify-center sm:block">
              <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white p-3 [box-shadow:0_20px_50px_-25px_rgb(var(--accent-rgb)/0.6)] sm:h-32 sm:w-32">
                {e.logo ? (
                  <img src={e.logo} alt={`${e.school} logo`} loading="lazy" className="h-full w-full object-contain" />
                ) : (
                  <GraduationCap size={36} className="text-slate-400" />
                )}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-slate-500">{e.period}</p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{e.school}</h3>
                  <p className="mt-0.5 text-slate-300">{e.degree}</p>
                  <p className="mt-2 text-sm font-semibold text-accent">{e.detail}</p>
                </div>
                {e.link && (
                  <a
                    href={e.link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={e.link.label}
                    title={e.link.label}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition-all hover:border-accent hover:bg-accent-soft hover:text-accent"
                  >
                    <Globe size={17} />
                  </a>
                )}
              </div>
              <div className="mt-5 grid gap-3 lg:grid-cols-2">
                {e.notes.map((n) => (
                  <Link
                    key={n.title}
                    to={n.to}
                    className="group/note flex h-full flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-accent"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{n.label}</span>
                    <span className="mt-1.5 text-sm font-medium leading-snug text-slate-200 group-hover/note:text-white">{n.title}</span>
                    <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs text-slate-500 group-hover/note:text-accent">
                      View project <ArrowRight size={12} className="transition-transform group-hover/note:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </>
  );
}

function ResearchDetail() {
  const pqc = research[0];
  return (
    <>
      <Reveal>
        <div className="glass-accent rounded-2xl p-6 sm:p-8">
          <span className="chip w-fit">{pqc.status}</span>
          <h2 className="mt-4 max-w-3xl text-xl font-semibold leading-snug text-white sm:text-2xl">{pqc.title}</h2>
          <p className="mt-1.5 text-sm text-accent">{pqc.with}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-slate-300">{pqc.detail}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {pqc.topics.map((t) => (
              <li key={t} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {pqc.concept.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.05}>
            <div className="glass flex h-full flex-col rounded-2xl p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">{c.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{c.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-5 font-mono text-xs text-slate-500">Concept preview — results and artifacts will be shared once the paper is published.</p>
      </Reveal>
    </>
  );
}

function CertsDetail() {
  const [zoom, setZoom] = useState<Cert | null>(null);
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.05}>
            <button
              onClick={() => c.image && setZoom(c)}
              disabled={!c.image}
              className="glass group card-hover flex h-full w-full flex-col overflow-hidden rounded-2xl text-left disabled:cursor-default"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink-850">
                {c.image ? (
                  <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover object-top opacity-85 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100" />
                ) : (
                  <div className="grid h-full place-items-center">
                    <BadgeCheck size={44} className="text-accent opacity-60" strokeWidth={1.2} />
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-md bg-ink-950/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300 backdrop-blur">
                  {c.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-mono text-xs font-semibold text-accent">{c.short}</p>
                <h3 className="mt-1 text-sm font-semibold leading-snug text-white">{c.name}</h3>
                <p className="mt-1 text-xs text-slate-500">
                  {c.issuer} · {c.date}
                </p>
                {(c.verify || c.pdf) && (
                  <div className="mt-auto flex flex-wrap gap-x-4 pt-3 text-xs">
                    {c.verify && (
                      <a
                        href={c.verify}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-accent hover:underline"
                      >
                        Verify badge <ArrowUpRight size={12} />
                      </a>
                    )}
                    {c.pdf && (
                      <a
                        href={c.pdf}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-accent hover:underline"
                      >
                        <FileText size={12} /> View PDF
                      </a>
                    )}
                  </div>
                )}
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      <Lightbox src={zoom?.image ?? null} caption={zoom?.name} onClose={() => setZoom(null)} />
    </>
  );
}

function StoryLinks({ links }: { links: StoryLink[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {links.map((l) =>
        l.to ? (
          <Link key={l.label} to={l.to} className="inline-flex items-center gap-1.5 text-accent hover:underline">
            {l.label} <ArrowRight size={14} />
          </Link>
        ) : (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-accent hover:underline">
            {l.label} <ArrowUpRight size={14} />
          </a>
        ),
      )}
    </div>
  );
}

function ChapterCard({ c }: { c: Chapter }) {
  const media = c.video ? (
    <VideoEmbed id={c.video} title={`${c.title} demo`} />
  ) : c.images?.length ? (
    <ImageCarousel images={c.images} label={c.place} className="aspect-[4/3] rounded-xl border border-white/10" />
  ) : null;

  return (
    <div className={`glass rounded-2xl p-5 sm:p-7 ${media ? 'grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]' : ''}`}>
      {media && <div className="min-w-0 xl:order-2">{media}</div>}
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip w-fit">{c.role}</span>
          <span className="text-xs text-slate-500">{c.place}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{c.title}</h3>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-400">
          {c.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {c.stats && (
          <div className="mt-5 grid grid-cols-3 gap-2">
            {c.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-3">
                <p className="text-xl font-semibold text-accent sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}
        {c.highlights && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.highlights.map((h) => (
              <li key={h} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300">
                {h}
              </li>
            ))}
          </ul>
        )}
        {c.links && <StoryLinks links={c.links} />}
      </div>
    </div>
  );
}

/** One stop on the timeline: an icon node on the rail, then the chapter. */
function TimelineItem({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <li className="relative pl-12 sm:pl-16">
      <span className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full border border-accent bg-ink-950 text-accent shadow-[0_0_0_6px_rgb(var(--accent-rgb)/0.08)] sm:h-11 sm:w-11">
        <Icon size={17} />
      </span>
      <Reveal>
        <p className="pt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent sm:pt-3">{label}</p>
        <div className="mt-3">{children}</div>
      </Reveal>
    </li>
  );
}

function LeadershipDetail() {
  return (
    <>
      <Reveal>
        <div className="glass-accent flex flex-col gap-6 rounded-2xl p-6 sm:flex-row sm:p-8">
          <div className="flex shrink-0 justify-center sm:block">
            <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white p-2.5 [box-shadow:0_20px_50px_-25px_rgb(var(--accent-rgb)/0.6)]">
              <img src={`${import.meta.env.BASE_URL}orgs/csc.webp`} alt="Cyber Security Centre, DIU logo" className="h-full w-full object-contain" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">The story</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{mission.title}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-slate-300">
              {mission.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <blockquote className="mt-5 border-l-2 border-accent pl-4">
              <p className="font-mono text-lg text-white">“{mission.quote}”</p>
              <footer className="mt-1 text-xs text-slate-500">{mission.quoteBy}</footer>
            </blockquote>
          </div>
        </div>
      </Reveal>

      <div className="relative mt-12">
        <span aria-hidden className="absolute bottom-0 left-[17px] top-2 w-px bg-gradient-to-b from-accent via-white/10 to-transparent sm:left-[21px]" />
        <ol className="space-y-10">
        {chapters.map((c, i) => (
          <TimelineItem key={c.title} icon={c.icon} label={`Chapter ${String(i + 1).padStart(2, '0')} · ${c.when}`}>
            <ChapterCard c={c} />
          </TimelineItem>
        ))}
          <TimelineItem icon={Rocket} label="Next · In the pipeline">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {pipeline.map((p) => (
                <div key={p.title} className="glass flex h-full flex-col rounded-2xl p-5 sm:p-6">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> In progress
                  </span>
                  <h3 className="mt-3 font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.text}</p>
                </div>
              ))}
            </div>
          </TimelineItem>
        </ol>
      </div>
    </>
  );
}

export default function SectionPage({ id }: { id: SectionId }) {
  useAccent();
  useTitle(meta[id].title);
  const m = meta[id];
  const next = nextFor[id];
  const { pathname } = useLocation();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const chip = bar?.querySelector<HTMLElement>('[data-active]');
    if (bar && chip) bar.scrollTo({ left: chip.offsetLeft - (bar.clientWidth - chip.offsetWidth) / 2 });
  }, [pathname]);
  return (
    <>
      <AmbientBackground />
      <div className="container-x pb-8 pt-28 sm:pt-32 lg:grid lg:grid-cols-[230px_1fr] lg:gap-10 lg:pt-24">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="no-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6">
            <div className="mb-6 flex items-center gap-3 px-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft text-accent">
                <UserRound size={18} />
              </span>
              <span className="text-lg font-semibold text-white">About me</span>
            </div>
            <nav className="flex flex-col gap-1" aria-label="About pages">
              {aboutLinks.map((a) => {
                const AIcon = a.icon;
                const on = pathname === a.to;
                return (
                  <Link
                    key={a.to}
                    to={a.to}
                    aria-current={on ? 'page' : undefined}
                    className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      on ? 'bg-accent-soft font-medium text-white' : 'text-slate-400 hover:bg-white/[0.03] hover:text-white'
                    }`}
                  >
                    {on && <span className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-accent" />}
                    <AIcon size={16} className={on ? 'text-accent' : ''} />
                    {a.label}
                  </Link>
                );
              })}
            </nav>
            <PivotQuickly aboutPath={pathname} />
          </div>
        </aside>

        {/* Page bar (mobile / tablet) */}
        <nav
          aria-label="About pages"
          className="fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-3 lg:hidden"
        >
          <div
            ref={barRef}
            className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-ink-950/85 p-1.5 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            {aboutLinks.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                data-active={pathname === a.to || undefined}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                  pathname === a.to ? 'bg-accent text-white' : 'text-slate-400'
                }`}
              >
                {a.short}
              </Link>
            ))}
          </div>
        </nav>

        <div className="min-w-0 lg:pt-4">
          <Reveal>
            <p className="eyebrow">{m.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{m.title}</h1>
            <p className="mt-3 max-w-2xl text-slate-400">{m.desc}</p>
          </Reveal>
          <div className="mt-10">
            <SectionDivider index={order.indexOf(id) + 1} total={order.length} label={m.label} icon={m.icon} />
          </div>
          <div className="mt-8">
            {id === 'experience' && <ExperienceDetail />}
            {id === 'education' && <EducationDetail />}
            {id === 'research' && <ResearchDetail />}
            {id === 'certifications' && <CertsDetail />}
            {id === 'leadership' && <LeadershipDetail />}
          </div>
          <NextUp title={next.title} desc={next.desc} to={next.to} />
        </div>
      </div>
    </>
  );
}
