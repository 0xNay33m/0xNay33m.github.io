import { domainMap } from '../data/domains';
import type { DomainId } from '../data/types';
import { hexToRgba } from '../lib/accent';

export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="bg-grid absolute inset-0" />
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-[120px] transition-colors duration-700"
        style={{ background: 'rgb(var(--accent-rgb) / 0.12)' }}
      />
      <div className="absolute bottom-[-200px] right-[-120px] h-[420px] w-[520px] rounded-full bg-indigo-500/[0.05] blur-[120px]" />
      <div className="bg-noise absolute inset-0" />
    </div>
  );
}

/**
 * Splits the page background into the colours of every domain a project belongs to.
 * Content stays neutral; only the backdrop carries the domain colours.
 */
export function SplitBackground({ ids }: { ids: DomainId[] }) {
  const colors = ids.map((id) => domainMap[id].color);
  const n = colors.length;

  const stops = colors
    .map((c, i) => {
      const from = (i / n) * 100;
      const to = ((i + 1) / n) * 100;
      return `${hexToRgba(c, 0.16)} ${from}%, ${hexToRgba(c, 0.16)} ${to}%`;
    })
    .join(', ');

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(115deg, ${stops})` }} />
      {n > 1 &&
        colors.slice(1).map((_, i) => (
          <div
            key={i}
            className="absolute top-[-20%] h-[140%] w-px origin-top"
            style={{
              left: `${((i + 1) / n) * 100}%`,
              transform: 'rotate(25deg)',
              background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.18), transparent)',
            }}
          />
        ))}
      {colors.map((c, i) => (
        <div
          key={c}
          className="absolute h-[480px] w-[480px] rounded-full blur-[140px]"
          style={{
            background: hexToRgba(c, 0.28),
            left: `${((i + 0.5) / n) * 100}%`,
            top: i % 2 === 0 ? '-10%' : '45%',
            transform: 'translateX(-50%)',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/70 to-ink-950" />
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="bg-noise absolute inset-0" />
    </div>
  );
}
