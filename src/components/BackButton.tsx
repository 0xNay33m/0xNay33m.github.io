import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function BackButton() {
  const { pathname, key } = useLocation();
  const navigate = useNavigate();

  /** A "default" key means this is the first page of the visit (direct link / new tab), so there is no in-site page to return to. */
  const goBack = () => (key === 'default' ? navigate('/') : navigate(-1));

  return (
    <div className="pointer-events-none fixed inset-x-0 top-[4.75rem] z-40">
      <div className="container-x flex justify-end">
        <AnimatePresence>
          {pathname !== '/' && (
            <motion.button
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onClick={goBack}
              aria-label="Go back"
              title="Go back"
              className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink-950/80 text-slate-300 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.7)] backdrop-blur-md transition-colors hover:border-accent hover:text-white"
            >
              <ArrowLeft size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
