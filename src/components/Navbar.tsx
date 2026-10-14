import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { domains } from '../data/domains';
import { aboutLinks } from '../data/nav';
import { profile } from '../data/profile';
import { hexToRgba } from '../lib/accent';
import { DragonLogo } from './DragonLogo';
import { ScrambleBrand } from './ScrambleBrand';

const links = [
  { to: '/learning', label: 'Learning' },
  { to: '/contact', label: 'Contact' },
];

type MenuId = 'domains' | 'about';

const isWorkPath = (p: string) => /^\/(d|project|case|ctf|writeup)\//.test(p);
const isAboutPath = (p: string) => aboutLinks.some((a) => a.to === p);

function NavIcon({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span
      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border"
      style={{ color, background: hexToRgba(color, 0.12), borderColor: hexToRgba(color, 0.3) }}
    >
      {children}
    </span>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number>();

  /** Section shortcuts always land on the home page grid — a plain link to "/" does nothing when already home. */
  const goSection = (id: MenuId) => {
    setOpen(false);
    setMenu(null);
    if (pathname !== '/') {
      navigate('/');
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hoverOpen = (id: MenuId) => {
    window.clearTimeout(hoverTimer.current);
    setMenu(id);
  };
  const hoverClose = () => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMenu(null), 160);
  };

  useEffect(() => {
    setOpen(false);
    setMenu(null);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menu && !open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(null);
        setOpen(false);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onDown);
    };
  }, [menu, open]);

  const topClass = (active: boolean) =>
    `inline-flex items-center gap-1 rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
      active ? 'text-white' : 'text-slate-400 hover:text-white'
    }`;

  const panel = (id: MenuId, content: ReactNode, width: string) => (
    <AnimatePresence>
      {menu === id && (
        <div className={`absolute right-0 top-full z-50 pt-3 ${width}`}>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="rounded-2xl border border-white/10 bg-ink-950/95 p-3 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            {content}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const domainsPanel = (
    <>
      <div className="grid grid-cols-2 gap-1">
        {domains.map((d) => {
          const Icon = d.icon;
          const active = pathname === `/d/${d.id}`;
          return (
            <Link
              key={d.id}
              to={`/d/${d.id}`}
              className={`flex items-center gap-3 rounded-xl p-2.5 transition-colors ${active ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'}`}
            >
              <NavIcon color={d.color}>
                <Icon size={17} />
              </NavIcon>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-white">{d.label}</span>
                <span className="block truncate text-xs text-slate-500">{d.short}</span>
              </span>
            </Link>
          );
        })}
      </div>
      <button
        onClick={() => goSection('domains')}
        className="mt-2 flex w-full items-center justify-between rounded-xl border-t border-white/[0.06] px-3 pb-1 pt-3 text-xs text-slate-400 transition-colors hover:text-white"
      >
        All domains on the home page <ArrowRight size={14} />
      </button>
    </>
  );

  const aboutPanel = (
    <>
      <div className="flex flex-col gap-1">
        {aboutLinks.map((a) => {
          const Icon = a.icon;
          const active = pathname === a.to;
          return (
            <Link
              key={a.to}
              to={a.to}
              className={`flex items-center gap-3 rounded-xl p-2.5 transition-colors ${active ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'}`}
            >
              <NavIcon color={a.color}>
                <Icon size={17} />
              </NavIcon>
              <span className="min-w-0">
                <span className="block text-sm font-medium text-white">{a.label}</span>
                <span className="block truncate text-xs text-slate-500">{a.desc}</span>
              </span>
            </Link>
          );
        })}
      </div>
      <button
        onClick={() => goSection('about')}
        className="mt-2 flex w-full items-center justify-between rounded-xl border-t border-white/[0.06] px-3 pb-1 pt-3 text-xs text-slate-400 transition-colors hover:text-white"
      >
        About overview on the home page <ArrowRight size={14} />
      </button>
    </>
  );

  /** `anchorToBar` pins the panel to the right edge of the whole link bar so wide panels never leave the viewport. */
  const dropdown = (id: MenuId, label: string, active: boolean, content: ReactNode, width: string, anchorToBar = false) => (
    <div className={anchorToBar ? '' : 'relative'} onMouseEnter={() => hoverOpen(id)} onMouseLeave={hoverClose}>
      <button
        onClick={() => setMenu((m) => (m === id ? null : id))}
        aria-expanded={menu === id}
        aria-haspopup="true"
        className={topClass(active || menu === id)}
      >
        {label}
        <ChevronDown size={13} className={`transition-transform duration-200 ${menu === id ? 'rotate-180' : ''}`} />
      </button>
      {panel(id, content, width)}
    </div>
  );

  const mobileItem = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-sm ${active ? 'bg-accent-soft text-white' : 'text-slate-300'}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-white/[0.06] bg-ink-950/75 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
          <DragonLogo className="-mr-[15px] h-12 w-[64px] shrink-0 transition-transform duration-300 group-hover:scale-110" />
          <ScrambleBrand />
        </Link>

        <div ref={navRef} className="relative hidden items-center gap-1 md:flex">
          {dropdown('domains', 'Domains', isWorkPath(pathname), domainsPanel, 'w-[560px]', true)}
          {dropdown('about', 'About', isAboutPath(pathname), aboutPanel, 'w-[340px]')}
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => topClass(isActive)}>
              {l.label}
            </NavLink>
          ))}
          <a href={profile.cv} target="_blank" rel="noreferrer" className="btn-outline ml-3 !py-1.5 text-xs uppercase tracking-[0.16em]">
            Resume
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-slate-200 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/[0.06] md:hidden"
          >
            <div className="container-x max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain py-4">
              <p className="px-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Domains</p>
              <div className="mt-1.5 grid grid-cols-2 gap-1">
                {domains.map((d) => {
                  const Icon = d.icon;
                  return (
                    <Link key={d.id} to={`/d/${d.id}`} className={mobileItem(pathname === `/d/${d.id}`)}>
                      <Icon size={16} style={{ color: d.color }} className="shrink-0" />
                      <span className="truncate">{d.name}</span>
                    </Link>
                  );
                })}
              </div>

              <p className="mt-4 px-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">About me</p>
              <div className="mt-1.5 flex flex-col gap-0.5">
                {aboutLinks.map((a) => {
                  const Icon = a.icon;
                  return (
                    <Link key={a.to} to={a.to} className={mobileItem(pathname === a.to)}>
                      <Icon size={16} style={{ color: a.color }} className="shrink-0" />
                      {a.label}
                    </Link>
                  );
                })}
              </div>

              <p className="mt-4 px-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Explore</p>
              <div className="mt-1.5 grid grid-cols-2 gap-1">
                <Link to="/" className={mobileItem(pathname === '/')}>
                  Home
                </Link>
                {links.map((l) => (
                  <Link key={l.to} to={l.to} className={mobileItem(pathname === l.to)}>
                    {l.label}
                  </Link>
                ))}
              </div>

              <a href={profile.cv} target="_blank" rel="noreferrer" className="btn-accent mt-4 w-full">
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
