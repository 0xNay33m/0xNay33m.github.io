import { Link } from 'react-router-dom';
import { domainMap } from '../data/domains';
import type { DomainId } from '../data/types';
import { hexToRgba } from '../lib/accent';

export function DomainChips({ ids }: { ids: DomainId[] }) {
  return (
    <>
      {ids.map((id) => {
        const d = domainMap[id];
        return (
          <Link
            key={id}
            to={`/d/${id}`}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold transition-opacity hover:opacity-80"
            style={{ color: d.color, background: hexToRgba(d.color, 0.12), border: `1px solid ${hexToRgba(d.color, 0.35)}` }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: d.color }} />
            {d.name}
          </Link>
        );
      })}
    </>
  );
}
