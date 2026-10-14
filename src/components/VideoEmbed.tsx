import { Play } from 'lucide-react';
import { useState } from 'react';
import { youtubeThumb } from '../data/projects';

export function VideoEmbed({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-accent bg-ink-900 shadow-[0_30px_80px_-30px_rgb(var(--accent-rgb)/0.6)]">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button onClick={() => setPlaying(true)} className="group absolute inset-0 h-full w-full" aria-label={`Play ${title}`}>
          <img src={youtubeThumb(id)} alt="" className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" />
          <span className="absolute inset-0 bg-gradient-to-t from-ink-950/80 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-white shadow-[0_0_0_10px_rgb(var(--accent-rgb)/0.18)] transition-transform duration-300 group-hover:scale-110">
            <Play size={24} className="ml-1" fill="currentColor" />
          </span>
          <span className="absolute bottom-4 left-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-300">Watch demo</span>
        </button>
      )}
    </div>
  );
}
