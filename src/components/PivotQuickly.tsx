import { Link } from 'react-router-dom';
import { domains } from '../data/domains';
import { aboutLinks } from '../data/nav';
import type { DomainId } from '../data/types';

interface PivotLink {
  to: string;
  label: string;
  color: string;
}

const explore: PivotLink[] = [
  { to: '/', label: 'Home', color: '#94a3b8' },
  { to: '/learning', label: 'Learning', color: '#94a3b8' },
  { to: '/contact', label: 'Contact', color: '#94a3b8' },
];

/**
 * Sidebar shortcut list. The visitor's own area comes first with the current
 * page left out: a domain id on domain pages, or the About page's path.
 */
export function PivotQuickly({ domain, aboutPath }: { domain?: DomainId; aboutPath?: string }) {
  const domainGroup = {
    title: domain ? 'Other domains' : 'Domains',
    links: domains.filter((d) => d.id !== domain).map((d) => ({ to: `/d/${d.id}`, label: d.name, color: d.color })),
  };
  const aboutGroup = {
    title: aboutPath ? 'Other sections' : 'About me',
    links: aboutLinks.filter((a) => a.to !== aboutPath).map((a) => ({ to: a.to, label: a.label, color: a.color })),
  };
  const groups: { title: string; links: PivotLink[] }[] = [
    ...(aboutPath ? [aboutGroup, domainGroup] : [domainGroup, aboutGroup]),
    { title: 'Explore', links: explore },
  ];

  return (
    <div className="mt-8 border-t border-white/[0.06] pt-6">
      <p className="px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Pivot quickly</p>
      {groups.map((g) => (
        <div key={g.title} className="mt-4">
          <p className="px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">{g.title}</p>
          <div className="mt-1.5 flex flex-col gap-0.5">
            {g.links.map((l) => (
              <Link key={l.to} to={l.to} className="flex items-center gap-2.5 rounded-md px-3 py-1.5 text-xs text-slate-500 hover:text-white">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: l.color }} />
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
