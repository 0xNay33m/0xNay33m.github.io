import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

export function Lightbox({ src, caption, onClose }: { src: string | null; caption?: string; onClose: () => void }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-ink-950/90 p-4 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={caption}
        >
          <button className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white" aria-label="Close">
            <X size={18} />
          </button>
          <motion.figure initial={{ scale: 0.96 }} animate={{ scale: 1 }} className="max-h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img src={src} alt={caption ?? ''} className="max-h-[80vh] w-auto rounded-xl border border-white/10 bg-white object-contain" />
            {caption && <figcaption className="mt-3 text-center text-sm text-slate-400">{caption}</figcaption>}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
