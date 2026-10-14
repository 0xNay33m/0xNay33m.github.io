import type { LucideIcon } from 'lucide-react';

/** Animated, icon-centred radar visual tinted with the current accent colour. */
export function HeroVisual({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div aria-hidden className="relative mx-auto aspect-square w-full max-w-[240px] sm:max-w-[320px] lg:max-w-[380px]">
      <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: 'rgb(var(--accent-rgb) / 0.18)' }} />
      <svg viewBox="0 0 400 400" className="animate-spin-slow absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M200 200 L200 20 A180 180 0 0 1 355 110 Z" fill="url(#sweep)" opacity="0.35" />
        <circle cx="200" cy="200" r="180" fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeDasharray="2 8" />
      </svg>
      <svg viewBox="0 0 400 400" className="animate-spin-slower absolute inset-0 h-full w-full">
        <circle cx="200" cy="200" r="140" fill="none" stroke="var(--accent)" strokeOpacity="0.25" strokeDasharray="60 20 4 20" />
        <circle cx="200" cy="60" r="3" fill="var(--accent)" />
        <circle cx="340" cy="200" r="2" fill="var(--accent)" opacity="0.7" />
      </svg>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(255,255,255,0.08)" />
        <circle cx="200" cy="200" r="60" fill="none" stroke="rgba(255,255,255,0.06)" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(255,255,255,0.05)" />
        <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(255,255,255,0.05)" />
        <circle cx="270" cy="140" r="4" fill="var(--accent)">
          <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="130" cy="275" r="3" fill="var(--accent)">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="animate-pulse-ring absolute inset-0 rounded-3xl border border-accent" />
        <div className="relative grid h-28 w-28 place-items-center rounded-3xl border border-accent bg-ink-900/80 text-accent backdrop-blur sm:h-32 sm:w-32">
          <Icon size={52} strokeWidth={1.4} />
        </div>
      </div>
    </div>
  );
}
