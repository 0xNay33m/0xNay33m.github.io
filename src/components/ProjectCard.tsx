import { ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { domainMap } from '../data/domains';
import { youtubeThumb } from '../data/projects';
import type { DomainId, Project } from '../data/types';

export function ProjectThumb({ project, className = '' }: { project: Project; className?: string }) {
  const src = project.youtube ? youtubeThumb(project.youtube) : project.cover;
  return (
    <div className={`relative aspect-video overflow-hidden bg-ink-850 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full scale-[1.02] object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.07] group-hover:opacity-100"
        />
      ) : (
        <TerminalPlaceholder title={project.title} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
      {project.youtube && (
        <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-ink-950/60 text-white backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-accent">
          <Play size={18} className="ml-0.5" fill="currentColor" />
        </span>
      )}
      <div className="absolute right-3 top-3 flex gap-1">
        {project.domains.map((d) => (
          <span key={d} className="h-1.5 w-6 rounded-full" style={{ background: domainMap[d].color }} title={domainMap[d].name} />
        ))}
      </div>
    </div>
  );
}

function TerminalPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full flex-col bg-gradient-to-br from-ink-800 to-ink-950 p-4 font-mono text-[11px] leading-relaxed">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
      </div>
      <span className="text-accent">$ python3 {title.toLowerCase()}.py</span>
      <span className="text-slate-500">[+] loading modules...</span>
      <span className="text-slate-500">[+] recon · dns · xss · sqli · clickjacking</span>
      <span className="text-slate-400">
        [*] ready<span className="animate-blink">_</span>
      </span>
    </div>
  );
}

export function ProjectCard({ project, from }: { project: Project; from?: DomainId }) {
  return (
    <Link
      to={`/project/${project.slug}${from ? `?from=${from}` : ''}`}
      className="glass group card-hover flex h-full flex-col overflow-hidden rounded-2xl"
    >
      <ProjectThumb project={project} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-white">{project.title}</h3>
          <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-slate-500 transition-colors group-hover:text-accent" />
        </div>
        <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-slate-400">{project.summary}</p>
        <dl className="mt-4 grid grid-cols-3 divide-x divide-white/[0.07] rounded-lg border border-white/[0.07] bg-white/[0.02]">
          {project.glance.map((g) => (
            <div key={g.label} className="min-w-0 px-2.5 py-2">
              <dt className="sr-only">{g.label}</dt>
              <dd className="text-[13px] font-semibold leading-tight text-white">{g.value}</dd>
              <dd className="mt-0.5 text-[10px] leading-snug text-slate-500">{g.label}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.tags.slice(0, 3).map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
