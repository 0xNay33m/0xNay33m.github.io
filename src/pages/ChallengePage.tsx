import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Copy, Download, ExternalLink, Eye, EyeOff, Flag, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AmbientBackground } from '../components/Backgrounds';
import { Reveal } from '../components/Reveal';
import { challengeMap, ctfChallenges, difficultyClass, type Challenge } from '../data/ctfChallenges';
import { useAccent } from '../lib/accent';
import { useTitle } from '../lib/useTitle';
export default function ChallengePage() {
  const { slug } = useParams();
  const ch = slug ? challengeMap[slug] : undefined;
  if (!ch) return <Navigate to="/d/ctf" replace />;
  return <ChallengeView key={ch.slug} ch={ch} />;
}

export function CodeBlock({ code, lang }: { code: string; lang?: string }) {  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="group relative mt-3 overflow-hidden rounded-xl border border-white/[0.08] bg-ink-950/90">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{lang ?? 'code'}</span>
        <button onClick={copy} className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-white" aria-label="Copy code">
          {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ChallengeView({ ch }: { ch: Challenge }) {
  useAccent('ctf');
  useTitle(`${ch.name} · CTF`);
  const [showWriteup, setShowWriteup] = useState(false);
  const [showFlag, setShowFlag] = useState(false);

  const siblings = ctfChallenges.filter((c) => c.event === ch.event);
  const next = siblings[(siblings.findIndex((c) => c.slug === ch.slug) + 1) % siblings.length];
  const solver = ch.role === 'solver';

  return (
    <>
      <AmbientBackground />
      <article className="container-x max-w-6xl pt-24 sm:pt-28">
        <Link to="/d/ctf" className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white">
          <ArrowLeft size={16} /> Back to CTF
        </Link>

        <motion.header initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip">{ch.category}</span>
            <span className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${difficultyClass(ch.difficulty)}`}>{ch.difficulty}</span>
            <span className="chip-neutral">{ch.event}</span>
          </div>
          <h1 className="mt-5 font-mono text-4xl font-semibold sm:text-5xl">{ch.name}</h1>
          <p className="mt-3 text-lg text-slate-400">{ch.summary}</p>
        </motion.header>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          <div className="flex min-w-0 flex-col gap-6">
            <Reveal>
              <section className="glass-accent rounded-2xl p-6 sm:p-8">
                <p className="eyebrow mb-4">Challenge description</p>
                <blockquote className="border-l-2 border-accent pl-4 text-[15px] italic leading-relaxed text-slate-300">{ch.description}</blockquote>
                <div className="mt-5 grid gap-3 font-mono text-xs sm:grid-cols-2">
                  <p className="text-slate-500">
                    {solver ? 'Solved by' : 'Author'}: <span className="text-slate-200">{ch.solvedBy ?? '0xNay33m'}</span>
                  </p>
                  <p className="text-slate-500">
                    Flag format: <span className="text-accent">{ch.flagFormat}</span>
                  </p>
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section className="glass rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="eyebrow mb-1">Writeup</p>
                    <h2 className="text-lg font-semibold text-white">{solver ? 'My solution' : 'Intended solution'}</h2>
                  </div>
                  <button onClick={() => setShowWriteup((v) => !v)} className={showWriteup ? 'btn-ghost' : 'btn-accent'}>
                    {showWriteup ? <EyeOff size={16} /> : <Eye size={16} />} {showWriteup ? 'Hide writeup' : 'Reveal writeup'}
                  </button>
                </div>
                {!showWriteup && (
                  <p className="mt-5 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 text-sm text-amber-200/90">
                    <ShieldAlert size={16} className="mt-0.5 shrink-0" />
                    Spoiler ahead. {solver ? 'Full solution below.' : 'Grab the files and try it yourself first.'}
                  </p>
                )}

                <AnimatePresence initial={false}>
                  {showWriteup && (
                    <motion.ol
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-8 overflow-hidden pl-4"
                    >
                      {ch.steps.map((s, i) => (
                        <li key={s.title} className="relative border-l border-white/10 pb-8 pl-8 last:border-transparent last:pb-0">
                          <span className="absolute -left-[14px] top-0 grid h-7 w-7 place-items-center rounded-full border border-accent bg-ink-900 font-mono text-[11px] font-semibold text-accent">
                            {i + 1}
                          </span>
                          <h3 className="font-semibold text-white">{s.title}</h3>
                          {s.text && <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>}
                          {s.code && <CodeBlock code={s.code} lang={s.lang} />}
                        </li>
                      ))}

                      {ch.flag && (
                        <li className="mt-8 list-none rounded-xl border border-accent bg-accent-soft p-5">
                          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                            <p className="flex items-center gap-2 text-sm font-semibold text-white">
                              <Flag size={16} className="text-accent" /> Flag
                            </p>
                            <button onClick={() => setShowFlag((v) => !v)} className="btn-ghost !py-1.5 text-xs">
                              {showFlag ? <EyeOff size={14} /> : <Eye size={14} />} {showFlag ? 'Hide' : 'Show flag'}
                            </button>
                          </div>
                          <code
                            className={`mt-3 block break-all font-mono text-sm transition-all duration-300 ${
                              showFlag ? 'text-accent' : 'select-none text-slate-400 blur-[6px]'
                            }`}
                          >
                            {ch.flag}
                          </code>
                        </li>
                      )}
                    </motion.ol>
                  )}
                </AnimatePresence>
              </section>
            </Reveal>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="glass rounded-2xl p-6">
                <p className="eyebrow mb-4">Original files</p>
                <div className="flex flex-col gap-2">
                  {ch.files.map((f) => {
                    const external = f.href.startsWith('http');
                    return (
                      <a
                        key={f.href}
                        href={f.href}
                        {...(external ? { target: '_blank', rel: 'noreferrer' } : { download: true })}
                        className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm text-slate-200 transition-colors hover:border-accent hover:text-white"
                      >
                        <span className="truncate font-mono text-xs">{f.label}</span>
                        {external ? <ExternalLink size={14} className="shrink-0 text-accent" /> : <Download size={14} className="shrink-0 text-accent" />}
                      </a>
                    );
                  })}
                  {ch.writeupSource && (
                    <a
                      href={ch.writeupSource}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-accent"
                    >
                      Original writeup <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="glass rounded-2xl p-6">
                <p className="eyebrow mb-4">Skills tested</p>
                <div className="flex flex-wrap gap-2">
                  {ch.skills.map((s) => (
                    <span key={s} className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>

        <Reveal className="mt-14">
          <Link to={`/ctf/${next.slug}`} className="glass group card-hover flex items-center justify-between rounded-2xl p-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">Next challenge</p>
              <p className="mt-1 font-mono text-lg font-semibold text-white">{next.name}</p>
              <p className="text-sm text-slate-400">
                {next.category} · {next.event}
              </p>
            </div>
            <ArrowRight className="text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        </Reveal>
      </article>
    </>
  );
}
