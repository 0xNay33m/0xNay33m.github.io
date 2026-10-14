import { ArrowUpRight, BookOpen, Bug, FileSearch, Flag, Trophy, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { domainMap } from '../data/domains';
import { MediumIcon } from './Icons';
import type { Blog, CaseStudy, ToolGroup, Writeup } from '../data/types';

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function SectionDivider({
  index,
  total,
  label,
  icon: Icon,
}: {
  index: number;
  total: number;
  label: string;
  icon?: LucideIcon;
}) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div aria-hidden className="mb-10 flex items-center gap-3 sm:gap-4">
      {Icon && (
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-accent bg-accent-soft text-accent">
          <Icon size={15} />
        </span>
      )}
      <span className="shrink-0 font-mono text-[11px] tracking-[0.2em] text-slate-500">
        <span className="text-accent">{pad(index)}</span> / {pad(total)}
      </span>
      <span className="h-px w-6 shrink-0 bg-accent opacity-70 sm:w-10" />
      <span className="min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.15em] text-slate-300 sm:tracking-[0.25em]">{label}</span>
      <span className="relative h-px min-w-6 flex-1 bg-gradient-to-r from-white/20 via-white/10 to-white/[0.04]">
        <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border border-accent bg-ink-950" />
      </span>
    </div>
  );
}

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <a href={blog.url} target="_blank" rel="noreferrer" className="glass group card-hover flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[2/1] overflow-hidden bg-ink-850">
        {blog.cover ? (
          <img
            src={blog.cover}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <div className="bg-grid grid h-full w-full place-items-center [background-color:rgb(var(--accent-rgb)/0.1)]">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-accent bg-ink-950/70 text-accent">
              <BookOpen size={24} />
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
        <span className="absolute bottom-2.5 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/70 px-2.5 py-1 text-[11px] font-medium text-slate-200 backdrop-blur">
          <MediumIcon size={12} /> Medium
        </span>
        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-ink-950/70 text-slate-300 backdrop-blur transition-colors group-hover:bg-accent group-hover:text-white">
          <ArrowUpRight size={15} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[15px] font-semibold leading-snug text-white transition-colors group-hover:text-accent">{blog.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-slate-400">{blog.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {blog.tags.map((t) => (
            <span key={t} className="chip-neutral">
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <Link to={`/case/${study.slug}`} className="glass group card-hover relative flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-video overflow-hidden bg-ink-850">
        {study.cover && (
          <img
            src={study.cover}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />
        <div className="absolute inset-x-0 top-0 flex h-1">
          {study.domains.map((d) => (
            <span key={d} className="flex-1" style={{ background: domainMap[d].color }} />
          ))}
        </div>
        <span className="absolute bottom-3 left-4 grid h-9 w-9 place-items-center rounded-xl border border-accent bg-ink-950/70 text-accent backdrop-blur">
          <FileSearch size={16} />
        </span>
        <span className="absolute bottom-4 right-4 rounded-full border border-white/10 bg-ink-950/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300 backdrop-blur">
          {study.date}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-accent">{study.title}</h3>
        <p className="mt-1 text-sm font-medium text-accent">{study.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{study.summary}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {study.tags.slice(0, 3).map((t) => (
            <span key={t} className="chip-neutral">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function WriteupCard({ writeup }: { writeup: Writeup }) {
  const Icon = writeup.kind === 'bugbounty' ? Bug : Flag;
  const kindLabel = writeup.kind === 'bugbounty' ? 'Bug bounty' : 'CTF writeups';
  return (
    <Link to={`/writeup/${writeup.slug}`} className="glass group card-hover relative flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative flex items-center gap-4 border-b border-white/10 p-6 [background:rgb(var(--accent-rgb)/0.06)]">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent bg-ink-950/60 text-accent">
          <Icon size={22} />
        </span>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">{kindLabel}</p>
          <p className="mt-1 truncate text-sm font-semibold text-white">{writeup.event}</p>
        </div>
        {writeup.placement && (
          <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-ink-950/70 px-2.5 py-1 text-[11px] font-medium text-slate-200">
            <Trophy size={12} className="text-accent" /> {writeup.placement}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-accent">{writeup.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">{writeup.summary}</p>
        <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-5">
          {writeup.glance.map((g) => (
            <div key={g.label} className="min-w-0">
              <dt className="truncate font-mono text-[10px] uppercase tracking-normal text-slate-500 sm:tracking-[0.15em]">{g.label}</dt>
              <dd className="mt-1 text-base font-semibold text-white">{g.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="font-mono text-[11px] text-slate-500">
            {writeup.entries.length} {writeup.kind === 'bugbounty' ? 'findings' : 'challenges'}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            Read writeup <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ToolGrid({ groups }: { groups: ToolGroup[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g) => (
        <div key={g.category} className="glass rounded-2xl p-5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{g.category}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {g.items.map((t) => (
              <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">{text}</div>
  );
}
