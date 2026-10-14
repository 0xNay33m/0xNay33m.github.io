import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Lightbox } from './Lightbox';

export function ImageCarousel({
  images,
  label,
  interval = 4000,
  className = 'aspect-[4/3] rounded-xl border border-white/10',
}: {
  images: string[];
  label: string;
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const count = images.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const close = useCallback(() => setZoom(null), []);

  useEffect(() => {
    if (reduce || paused || zoom || count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => window.clearInterval(id);
  }, [reduce, paused, zoom, count, interval]);

  if (!count) return null;
  const src = images[index];

  return (
    <div
      className={`group/car relative overflow-hidden bg-ink-950 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.button
            key={src}
            type="button"
            onClick={() => setZoom(src)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 cursor-zoom-in"
            aria-label={`Enlarge photo ${index + 1} of ${count}`}
          >
            <img src={src} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-xl" />
            <img src={src} alt={`${label}, photo ${index + 1}`} loading="lazy" className="relative h-full w-full object-contain" />
          </motion.button>
        </AnimatePresence>
        <span className="pointer-events-none absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-ink-950/70 text-white opacity-0 transition group-hover/car:opacity-100">
          <Expand size={14} />
        </span>
      </div>

      {count > 1 && (
        <>
          {[
            { step: -1, Icon: ChevronLeft, side: 'left-2', name: 'Previous photo' },
            { step: 1, Icon: ChevronRight, side: 'right-2', name: 'Next photo' },
          ].map(({ step, Icon, side, name }) => (
            <button
              key={name}
              type="button"
              onClick={() => go(step)}
              className={`absolute ${side} top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-950/70 text-white opacity-0 backdrop-blur transition hover:border-accent hover:text-accent focus-visible:opacity-100 group-hover/car:opacity-100`}
              aria-label={name}
            >
              <Icon size={18} />
            </button>
          ))}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-ink-950/90 to-transparent px-3 pb-2.5 pt-6">
            <div className="flex flex-wrap gap-1.5">
              {images.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? 'w-5 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-slate-300">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
          </div>
        </>
      )}

      {createPortal(<Lightbox src={zoom} caption={label} onClose={close} />, document.body)}
    </div>
  );
}
