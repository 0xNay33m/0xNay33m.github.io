import { ArrowUpRight } from 'lucide-react';
import { AmbientBackground } from '../components/Backgrounds';
import { Reveal } from '../components/Reveal';
import { platforms } from '../data/learning';
import { hexToRgba, useAccent } from '../lib/accent';
import { useTitle } from '../lib/useTitle';
export default function Learning() {
  useAccent();
  useTitle('Learning Curve');
  return (
    <>
      <AmbientBackground />
      <div className="container-x pt-28 sm:pt-32">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Learning curve</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Where I learned <span className="text-accent">to break things.</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-slate-400">
            Every skill on this site was earned on a platform, in a lab or under a CTF clock. These are the places that shaped how I think.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.05}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: hexToRgba(p.color, 0.22),
                  background: `linear-gradient(140deg, ${hexToRgba(p.color, 0.1)}, rgba(9,12,18,0.85) 60%)`,
                }}
              >
                <span
                  className="absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                  style={{ background: hexToRgba(p.color, 0.45) }}
                />
                <div className="relative flex items-start justify-between">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl font-mono text-sm font-bold"
                    style={{ background: hexToRgba(p.color, 0.15), color: p.color, border: `1px solid ${hexToRgba(p.color, 0.35)}` }}
                  >
                    {p.name
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 3)}
                  </span>
                  <ArrowUpRight size={18} className="text-slate-500 transition-colors group-hover:text-white" />
                </div>
                <h3 className="relative mt-5 text-lg font-semibold text-white">{p.name}</h3>
                <p className="relative text-xs uppercase tracking-[0.14em]" style={{ color: p.color }}>
                  {p.tagline}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-slate-400">{p.detail}</p>
                {p.stat && (
                  <span
                    className="relative mt-auto w-fit pt-4 font-mono text-xs font-semibold"
                    style={{ color: p.color }}
                  >
                    ▲ {p.stat}
                  </span>
                )}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
