import { MotionConfig } from 'framer-motion';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { BackButton } from './components/BackButton';
import { BackToTop } from './components/BackToTop';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { hasBottomBar } from './data/nav';
import CasePage from './pages/CasePage';
import ChallengePage from './pages/ChallengePage';
import Contact from './pages/Contact';
import DomainPage from './pages/DomainPage';
import Home from './pages/Home';
import Lab from './pages/Lab';
import Learning from './pages/Learning';
import NotFound from './pages/NotFound';
import ProjectPage from './pages/ProjectPage';
import SectionPage from './pages/SectionPage';
import WriteupPage from './pages/WriteupPage';

const scrollMemory = new Map<string, number>();

/** New pages open at the top; going back returns to where the visitor left off. */
function ScrollManager() {
  const { pathname, key } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    const save = () => scrollMemory.set(key, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [key]);

  useEffect(() => {
    const target = navType === 'POP' ? scrollMemory.get(key) ?? 0 : 0;
    window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior });
    if (!target) return;
    // Lazy content can still be growing the page, so retry until the saved offset is reachable.
    let tries = 0;
    const id = window.setInterval(() => {
      window.scrollTo({ top: target, behavior: 'instant' as ScrollBehavior });
      if (Math.abs(window.scrollY - target) < 2 || ++tries > 10) window.clearInterval(id);
    }, 60);
    return () => window.clearInterval(id);
  }, [pathname, key, navType]);

  return null;
}

/** Typing "sudo lab" anywhere opens the hidden lab. */
function useSecretKnock() {
  const navigate = useNavigate();
  useEffect(() => {
    const secret = 'sudolab';
    let buffer = '';
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, [contenteditable]')) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).replace(/\s/g, '').slice(-secret.length);
      if (buffer === secret) navigate('/lab');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);
}

export default function App() {
  useSecretKnock();
  const { pathname } = useLocation();
  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('main')?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-ink-950">
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-screen outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/d/:id" element={<DomainPage />} />
          <Route path="/project/:slug" element={<ProjectPage />} />
          <Route path="/case/:slug" element={<CasePage />} />
          <Route path="/ctf/:slug" element={<ChallengePage />} />
          <Route path="/writeup/:slug" element={<WriteupPage />} />
          <Route path="/experience" element={<SectionPage id="experience" />} />
          <Route path="/education" element={<SectionPage id="education" />} />
          <Route path="/research" element={<SectionPage id="research" />} />
          <Route path="/certifications" element={<SectionPage id="certifications" />} />
          <Route path="/leadership" element={<SectionPage id="leadership" />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      {hasBottomBar(pathname) && <div aria-hidden className="h-20 lg:hidden" />}
      <BackButton />
      <BackToTop />
    </MotionConfig>
  );
}
