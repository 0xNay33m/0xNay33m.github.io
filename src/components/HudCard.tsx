import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { useRef, type MouseEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

export type HudVariant = 'feature' | 'wide' | 'tile';

interface Props {
  /** Space-separated RGB triplet, e.g. "239 68 68". */
  rgb: string;
  to?: string;
  href?: string;
  download?: boolean;
  label: string;
  index: number;
  total: number;
  path: string;
  title: string;
  subtitle: string;
  variant?: HudVariant;
  icon?: LucideIcon;
  /** Text badge used instead of an icon (e.g. platform initials). */
  mark?: string;
  action?: LucideIcon;
  count?: { value: string; label: string };
  children?: ReactNode;
}

const pad = (n: number) => String(n).padStart(2, '0');

export function hexToTriplet(hex: string) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

export function HudCard({
  rgb,
  to,
  href,
  download,
  label,
  index,
  total,
  path,
  title,
  subtitle,
  variant = 'tile',
  icon: Icon,
  mark,
  action: Action = ArrowUpRight,
  count,
  children,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const feature = variant === 'feature';

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const className = `domain-card group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-3xl border p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 sm:p-6
    [background:linear-gradient(160deg,rgb(var(--c)/0.09),rgba(8,11,17,0.92)_55%)]
    [border-color:rgb(var(--c)/0.18)]
    hover:[border-color:rgb(var(--c)/0.55)]
    hover:[box-shadow:0_30px_80px_-30px_rgb(var(--c)/0.65)]`;

  const watermarkClass = `pointer-events-none absolute transition-all duration-700 ease-out group-hover:rotate-[-8deg] group-hover:scale-110 ${
    feature ? '-bottom-10 -right-10 h-72 w-72' : '-bottom-8 -right-8 h-40 w-40'
  }`;

  const body = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100
          [background:radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgb(var(--c)/0.16),transparent_45%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgb(var(--c)/0.35)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(200deg,black,transparent_55%)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1/2 h-1/2 opacity-0 transition-all duration-[1200ms] ease-out group-hover:translate-y-[300%] group-hover:opacity-100
          [background:linear-gradient(180deg,transparent,rgb(var(--c)/0.12),transparent)]"
      />
      <span aria-hidden className="hud-corner left-3 top-3 border-l border-t" />
      <span aria-hidden className="hud-corner right-3 top-3 border-r border-t" />
      <span aria-hidden className="hud-corner bottom-3 left-3 border-b border-l" />
      <span aria-hidden className="hud-corner bottom-3 right-3 border-b border-r" />

      {Icon ? (
        <Icon
          aria-hidden
          strokeWidth={1}
          className={`${watermarkClass} [color:rgb(var(--c)/0.07)] group-hover:[color:rgb(var(--c)/0.14)]`}
        />
      ) : (
        <span
          aria-hidden
          className={`${watermarkClass} grid place-items-center font-mono font-bold leading-none [color:rgb(var(--c)/0.07)] group-hover:[color:rgb(var(--c)/0.14)] ${
            feature ? 'text-[9rem]' : 'text-[5rem]'
          }`}
        >
          {mark}
        </span>
      )}

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="relative grid h-11 w-11 place-items-center rounded-xl border font-mono text-sm font-bold [border-color:rgb(var(--c)/0.35)] [background:rgb(var(--c)/0.12)] [color:rgb(var(--c))]">
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:animate-[pulse-ring_1.8s_ease-out_infinite] group-hover:opacity-100 [box-shadow:0_0_0_1px_rgb(var(--c)/0.6)]"
            />
            {Icon ? <Icon size={20} strokeWidth={1.8} /> : mark}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
            {index < total ? (
              <>
                <span className="[color:rgb(var(--c))]">{pad(index + 1)}</span> / {pad(total)}
              </>
            ) : (
              <span className="[color:rgb(var(--c))]">view all</span>
            )}
          </span>
        </div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 group-hover:[border-color:rgb(var(--c)/0.6)] group-hover:[background:rgb(var(--c))] group-hover:text-ink-950">
          <Action size={16} className={Action === ArrowUpRight ? 'transition-transform duration-300 group-hover:rotate-45' : ''} />
        </span>
      </div>

      <div className="relative mt-auto pt-8">
        <p className="font-mono text-[11px] text-slate-500">
          <span className="[color:rgb(var(--c))]">~/</span>
          {path}
          <span className="ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 opacity-0 group-hover:animate-[blink_1s_steps(1)_infinite] group-hover:opacity-100 [background:rgb(var(--c))]" />
        </p>
        <h3 className={`mt-1 font-semibold tracking-tight text-white ${feature ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
          {title}
        </h3>
        <p className="mt-1 text-sm text-slate-400">{subtitle}</p>

        {children}

        {count && (
          <div className="mt-5 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
              <span className="text-sm font-semibold tracking-normal text-white">{count.value}</span> {count.label}
            </span>
            <span className="h-px flex-1 overflow-hidden bg-white/5">
              <span className="block h-full w-1/4 transition-all duration-700 ease-out group-hover:w-full [background:linear-gradient(90deg,rgb(var(--c)),transparent)]" />
            </span>
          </div>
        )}
      </div>
    </>
  );

  const common = {
    ref,
    onMouseMove: onMove,
    'aria-label': label,
    style: { ['--c' as string]: rgb },
    className,
  };

  if (to) {
    return (
      <Link to={to} {...common}>
        {body}
      </Link>
    );
  }
  return (
    <a href={href} {...common} {...(download ? { download: '' } : { target: '_blank', rel: 'noreferrer' })}>
      {body}
    </a>
  );
}

export function HudTags({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border px-2.5 py-1 text-[11px] text-slate-300 [border-color:rgb(var(--c)/0.2)] [background:rgb(var(--c)/0.06)]"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export const pad2 = pad;
