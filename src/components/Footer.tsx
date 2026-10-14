import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { GithubIcon, LinkedinIcon, MediumIcon, XIcon } from './Icons';

export const socialLinks = [
  { label: 'GitHub', href: profile.socials.github, Icon: GithubIcon },
  { label: 'LinkedIn', href: profile.socials.linkedin, Icon: LinkedinIcon },
  { label: 'X', href: profile.socials.x, Icon: XIcon },
  { label: 'Medium', href: profile.socials.medium, Icon: MediumIcon },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/[0.06]">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm text-slate-400">Building a safer digital world.</p>
          <p className="mt-1 font-mono text-[11px] text-slate-600">
            © {new Date().getFullYear()} {profile.name}
            {/* the wise will find the lab */}
            <Link
              to="/lab"
              aria-label="lab"
              title="sudo ./curiosity"
              className="ml-2 inline-block text-slate-800 transition-colors duration-500 hover:text-accent"
            >
              ◈
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.07] text-slate-400 transition-all hover:-translate-y-0.5 hover:border-accent hover:text-white"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
