import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  Download,
  FlaskConical,
  GraduationCap,
  Layers,
  MapPin,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { AmbientBackground } from '../components/Backgrounds';
import { SectionDivider } from '../components/Cards';
import { DomainCard, type DomainCardVariant } from '../components/DomainCard';
import { HudCard, HudTags, hexToTriplet, pad2, type HudVariant } from '../components/HudCard';
import { Reveal } from '../components/Reveal';
import { certs } from '../data/certs';
import { domains } from '../data/domains';
import { education, experience, leadership, profile } from '../data/profile';
import { useAccent } from '../lib/accent';
import { useTitle } from '../lib/useTitle';
import { countFor } from '../lib/content';
const ease = [0.2, 0.8, 0.2, 1] as const;

const domainLayout: Partial<Record<string, { variant: DomainCardVariant; className: string }>> = {
  offensive: { variant: 'feature', className: 'sm:col-span-2 lg:row-span-2' },
  defensive: { variant: 'wide', className: 'sm:col-span-2' },
  ctf: { variant: 'wide', className: 'sm:col-span-2' },
};

interface AboutCard {
  path: string;
  title: string;
  subtitle: string;
  color: string;
  icon: LucideIcon;
  variant: HudVariant;
  className: string;
  to?: string;
  href?: string;
  download?: boolean;
  action?: LucideIcon;
  count?: { value: string; label: string };
  body?: ReactNode;
}

const edu = education[0];

const aboutCards: AboutCard[] = [
  {
    path: 'about/experience',
    title: 'Work Experience',
    subtitle: 'Pentesting & incident response',
    color: '#a78bfa',
    icon: BriefcaseBusiness,
    variant: 'wide',
    className: 'sm:col-span-2 lg:col-span-3',
    to: '/experience',
    count: { value: '02', label: 'roles' },
    body: <HudTags items={experience.slice(0, 2).map((e) => e.title)} />,
  },
  {
    path: 'about/education',
    title: 'Education',
    subtitle: edu.degree,
    color: '#38bdf8',
    icon: GraduationCap,
    variant: 'wide',
    className: 'sm:col-span-2 lg:col-span-3',
    to: '/education',
    count: { value: '3.92', label: 'CGPA / 4.00' },
    body: <HudTags items={[edu.school, edu.period]} />,
  },
  {
    path: 'about/research',
    title: 'Research',
    subtitle: 'Post-quantum cryptography',
    color: '#34d399',
    icon: FlaskConical,
    variant: 'tile',
    className: 'sm:col-span-2 lg:col-span-2',
    to: '/research',
    body: <HudTags items={['Hybrid KEMs', 'Timing side channels', 'ML-KEM + BIKE']} />,
  },
  {
    path: 'about/certs',
    title: 'Certifications',
    subtitle: 'From offense to intelligence',
    color: '#f59e0b',
    icon: Award,
    variant: 'tile',
    className: 'sm:col-span-2 lg:col-span-2',
    to: '/certifications',
    count: { value: pad2(certs.length), label: 'credentials' },
    body: <HudTags items={[...new Set(certs.map((c) => c.category))]} />,
  },
  {
    path: 'about/leadership',
    title: 'Leadership & Community',
    subtitle: 'Organising, teaching & volunteering',
    color: '#fb7185',
    icon: Users,
    variant: 'tile',
    className: 'sm:col-span-2 lg:col-span-2',
    to: '/leadership',
    count: { value: pad2(leadership.length), label: 'roles' },
    body: <HudTags items={['Lead Organiser', 'Problem Setter', 'Session Instructor', 'Volunteer']} />,
  },
];

function SectionIntro({
  eyebrow,
  title,
  highlight,
  gradient,
  desc,
  cmd,
  items,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  gradient: string;
  desc: string;
  cmd: string;
  items: { label: string; color: string }[];
}) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
          {title} <span className={`bg-gradient-to-r bg-clip-text text-transparent ${gradient}`}>{highlight}</span>
        </h2>
        <p className="mt-3 text-slate-400">{desc}</p>
      </div>
      <div className="glass hidden max-w-md shrink-0 rounded-xl px-4 py-3 font-mono text-xs text-slate-400 md:block">
        <p>
          <span className="text-emerald-400">nayeem@lab</span>:<span className="text-sky-400">~</span>$ {cmd}
        </p>
        <p className="mt-1 flex flex-wrap gap-x-3">
          {items.map((it) => (
            <span key={it.label} style={{ color: it.color }}>
              {it.label}/
            </span>
          ))}
        </p>
      </div>
    </Reveal>
  );
}

export default function Home() {
  useAccent();
  useTitle();
  const scrollToDomains = () => document.getElementById('domains')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <>
      <AmbientBackground />

      {/* Hero */}
      <section className="container-x relative isolate pb-16 pt-32 sm:pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}brand/desk.webp`}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover object-[32%_50%] opacity-70 lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/55 to-ink-950/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-transparent to-ink-950" />
        </div>
        <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="eyebrow"
            >
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="mt-5 text-[2.6rem] font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
            >
              Explore My
              <br />
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                Security Work
              </span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease }}
            >
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">
                Hi, I&apos;m <span className="font-semibold text-white">{profile.name}</span>. {profile.bio}
              </p>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 lg:justify-start">
                <MapPin size={14} /> {profile.location}
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                <button onClick={scrollToDomains} className="btn-accent">
                  Explore domains <ArrowDown size={16} />
                </button>
                <a href={profile.cv} target="_blank" rel="noreferrer" className="btn-ghost">
                  <Download size={16} /> Resume
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="relative mx-auto w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[420px]"
          >
            <div aria-hidden className="absolute inset-[12%] rounded-full bg-blue-600/15 blur-[100px]" />
            <img
              src={profile.heroPhoto}
              alt={profile.name}
              width={792}
              height={1024}
              className="hero-blend relative w-full select-none"
              draggable={false}
            />
          </motion.div>
        </div>

        {/* Certifications ticker */}
        <Reveal>
          <Link
            to="/certifications"
            aria-label={`Certifications: ${certs.map((c) => c.name).join(', ')}`}
            className="glass group/marquee mt-16 block overflow-hidden rounded-2xl py-4 transition-colors hover:border-accent"
          >
            <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
            <div aria-hidden className="animate-marquee flex w-max">
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0 items-center">
                  {certs.map((c) => (
                    <li key={c.name} className="flex items-center gap-3 whitespace-nowrap px-5 text-sm text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {c.name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Domains */}
      <section id="domains" className="container-x scroll-mt-24 py-16">
        <SectionDivider index={1} total={2} label="Domains" icon={Layers} />
        <SectionIntro
          eyebrow="Domains"
          title="Choose where to"
          highlight="dive in"
          gradient="from-red-400 via-fuchsia-400 to-cyan-300"
          desc="Select a domain to view my projects, blogs, case studies and more."
          cmd="ls ./domains"
          items={domains.map((d) => ({ label: d.id, color: d.color }))}
        />
        <div className="grid auto-rows-[minmax(220px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((d, i) => {
            const variant = domainLayout[d.id]?.variant ?? 'tile';
            return (
              <Reveal key={d.id} delay={i * 0.05} className={domainLayout[d.id]?.className ?? ''}>
                <DomainCard domain={d} count={countFor(d.id)} index={i} total={domains.length} variant={variant} />
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section id="about" className="container-x scroll-mt-24 py-16">
        <SectionDivider index={2} total={2} label="About" icon={UserRound} />
        <SectionIntro
          eyebrow="About"
          title="The person behind"
          highlight="the terminal"
          gradient="from-sky-400 via-violet-400 to-amber-300"
          desc="Education, work, research, leadership and certifications — open a card for the full story."
          cmd="cat ./about/*"
          items={aboutCards.map((c) => ({ label: `${c.path.split('/').pop()}`, color: c.color }))}
        />
        <div className="grid auto-rows-[minmax(220px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {aboutCards.map((c, i) => (
            <Reveal key={c.path} delay={i * 0.05} className={c.className}>
              <HudCard
                rgb={hexToTriplet(c.color)}
                to={c.to}
                href={c.href}
                download={c.download}
                label={c.title}
                index={i}
                total={aboutCards.length}
                path={c.path}
                title={c.title}
                subtitle={c.subtitle}
                variant={c.variant}
                icon={c.icon}
                action={c.action}
                count={c.count}
              >
                {c.body}
              </HudCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-16">
        <Reveal>
          <div className="glass-accent relative overflow-hidden rounded-3xl p-8 text-center sm:p-14">
            <div className="bg-grid absolute inset-0 opacity-60" />
            <div className="relative">
              <h2 className="text-balance text-3xl font-semibold sm:text-4xl">Let&apos;s secure something together.</h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-400">
                Penetration testing, incident response, CTF collaboration or research. My inbox is open.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn-accent">
                  Get in touch <ArrowRight size={16} />
                </Link>
                <Link to="/learning" className="btn-ghost">
                  My learning curve
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
