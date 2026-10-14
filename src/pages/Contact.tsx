import { ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { AmbientBackground } from '../components/Backgrounds';
import { GithubIcon, LinkedinIcon, MediumIcon, XIcon } from '../components/Icons';
import { Reveal } from '../components/Reveal';
import { profile } from '../data/profile';
import { useAccent } from '../lib/accent';
import { useTitle } from '../lib/useTitle';
const channels = [
  { label: 'X / Twitter', value: '@0xNay33m', href: profile.socials.x, Icon: XIcon, note: 'Quick thoughts, CTF news' },
  { label: 'LinkedIn', value: 'Md Nayeem Ahmed', href: profile.socials.linkedin, Icon: LinkedinIcon, note: 'Professional inquiries' },
  { label: 'GitHub', value: '0xNay33m', href: profile.socials.github, Icon: GithubIcon, note: 'Code & tooling' },
  { label: 'Medium', value: '@mdnayeemahmed666', href: profile.socials.medium, Icon: MediumIcon, note: 'Writeups & walkthroughs' },
];

export default function Contact() {
  useAccent();
  useTitle('Contact');
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <AmbientBackground />
      <div className="container-x pt-28 sm:pt-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
            Let&apos;s <span className="text-accent">talk security.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-400">
            Pentest engagements, incident response, CTF collaborations, speaking or research. Pick a channel.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={14} /> {profile.location}
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="glass-accent relative overflow-hidden rounded-3xl p-6 sm:p-10">
            <div className="bg-grid absolute inset-0 opacity-50" />
            <div className="relative flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent text-white">
                <Mail size={24} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">Email · preferred</p>
                <p className="mt-1 break-all text-lg font-semibold text-white sm:text-2xl">{profile.email}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={copy} className="btn-ghost" aria-label="Copy email">
                  {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy'}
                </button>
                <a href={`mailto:${profile.email}`} className="btn-accent">
                  Send <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {channels.map(({ label, value, href, Icon, note }, i) => (
            <Reveal key={label} delay={i * 0.05}>
              <a href={href} target="_blank" rel="noreferrer" className="glass group card-hover flex items-center gap-4 rounded-2xl p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-colors group-hover:text-accent">
                  <Icon size={18} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-slate-500">{label}</span>
                  <span className="block truncate font-medium text-white">{value}</span>
                  <span className="block text-xs text-slate-500">{note}</span>
                </span>
                <ArrowUpRight size={16} className="text-slate-500 transition-colors group-hover:text-accent" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
