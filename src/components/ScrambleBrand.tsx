import { useEffect, useState } from 'react';

const WORDS: { text: string; tone: string }[] = [
  { text: '0xNay33m', tone: 'text-white' },
  { text: 'WIZ4RD', tone: 'text-red-500' },
  { text: 'AQU4M4N', tone: 'text-white' },
];
const GLYPHS = '零一二三四五六七八九十百千万ｱｳｴｶｷｸｹｺｻｼｽｾﾀﾂﾃﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜ0123456789#$%&*+=<>';
const SLOTS = Math.max(...WORDS.map((w) => w.text.length));
const HOLD_MS = 2800;
const FRAME_MS = 55;
/** Frames before the first character locks in, then one more lock every STEP frames, left to right. */
const LEAD = 6;
const STEP = 2;

/** Full-width CJK numerals are twice a mono character's width, so they are drawn smaller to stay inside their slot. */
const isWide = (ch: string) => /[\u4e00-\u9fff]/.test(ch);

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

interface Cell {
  ch: string;
  settled: boolean;
  tone: string;
}

const settledCells = ({ text, tone }: (typeof WORDS)[number]): Cell[] =>
  Array.from({ length: SLOTS }, (_, i) => ({ ch: text[i] ?? '', settled: true, tone }));

export function ScrambleBrand() {
  const [cells, setCells] = useState<Cell[]>(() => settledCells(WORDS[0]));

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let index = 0;
    let frameTimer: number | undefined;

    const scrambleTo = (target: (typeof WORDS)[number]) => {
      if (reduced) {
        setCells(settledCells(target));
        return;
      }
      let frame = 0;
      const last = LEAD + (SLOTS - 1) * STEP;
      frameTimer = window.setInterval(() => {
        setCells(
          Array.from({ length: SLOTS }, (_, i) => {
            const done = frame >= LEAD + i * STEP;
            if (done) return { ch: target.text[i] ?? '', settled: true, tone: target.tone };
            return { ch: randomGlyph(), settled: false, tone: target.tone };
          }),
        );
        if (++frame > last) window.clearInterval(frameTimer);
      }, FRAME_MS);
    };

    const cycle = window.setInterval(() => {
      index = (index + 1) % WORDS.length;
      window.clearInterval(frameTimer);
      scrambleTo(WORDS[index]);
    }, HOLD_MS + (LEAD + SLOTS * STEP) * FRAME_MS);

    return () => {
      window.clearInterval(cycle);
      window.clearInterval(frameTimer);
    };
  }, []);

  return (
    <span className="font-mono text-sm font-semibold">
      <span className="sr-only">0xNay33m, also known as WIZ4RD and AQU4M4N</span>
      <span aria-hidden className="inline-flex whitespace-nowrap">
        {cells.map((c, i) => (
          <span key={i} className={`inline-block w-[1ch] text-center ${c.tone}`}>
            {c.settled ? c.ch : <span className={`text-accent opacity-80 ${isWide(c.ch) ? 'text-[0.6em]' : ''}`}>{c.ch}</span>}
          </span>
        ))}
      </span>
    </span>
  );
}
