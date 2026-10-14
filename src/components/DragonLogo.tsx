import { useReducedMotion } from 'framer-motion';
import { useId, type CSSProperties } from 'react';

/**
 * The dragon itself is raster artwork (public/brand/dragon.webp, black background keyed to transparency);
 * the fire, embers and glow are SVG drawn in the artwork's own 912x938 pixel coordinates so they stay
 * aligned with the mouth at any rendered size. The viewBox is wider than the art to leave room for the flame.
 * The fire is drawn beneath the artwork, so the teeth and jaws overlap its base and it emerges from the mouth.
 */
const ART_W = 912;
const ART_H = 938;
const VIEW_W = 1240;
const MOUTH = { x: 800, y: 452, angle: 32, length: 12, width: 11 };
const EYE = { x: 790, y: 361 };

/**
 * Flame layers in mouth-local units: x runs forward out of the jaws, y across the stream.
 * Each layer starts as a narrow jet at the mouth and fans out into sharp, ragged tongues.
 */
const FLAME_OUTER =
  'M0 -0.6 C4 -1.5 8 -3 11 -4.5 L13 -7.5 L14.5 -4.8 C17 -5.8 19 -6.8 21 -8 L25 -12.5 L24.2 -7.6 C27 -7.6 29 -6.5 31 -6.8 L36 -8.6 L32.5 -4.2 C34.5 -3 36 -2 39 -2.2 L34 0.2 L40 2.6 C36 3 34 3.6 32 4.6 L35.5 8.4 L29.5 6.4 C27 7.2 25 8 23 8.4 L24.5 13 L20 8.6 C17 8 15 7 13 6 L12 8.8 L10.2 5 C7 3.4 4 1.8 0 0.6 Z';
const FLAME_MID =
  'M0 -0.45 C3.5 -1.2 7 -2.4 10 -3.4 L12.5 -6 L12.6 -3.4 C15.5 -4 18 -4.6 20 -5.6 L23.5 -8.6 L22.4 -4.4 C25 -3.8 27 -3 29 -3.2 L32 -4.4 L29.6 -1.2 C31 -0.4 32 0.4 33.5 1 L29.5 2 C27.5 2.6 25.5 3.8 23.5 4.6 L25 8 L20.4 5.2 C17.5 5.4 14.5 5 12 4.2 L11 6.6 L9.6 3.4 C6.5 2.4 3.5 1.4 0 0.45 Z';
const FLAME_CORE =
  'M0 -0.3 C3 -0.8 6 -1.5 9 -2 L11.5 -3.6 L11.2 -1.8 C14 -1.8 16.5 -1.6 19 -2.2 L21.5 -2.8 L19.4 -0.6 C20.5 0 21.5 0.6 23 0.9 L19.2 1.6 C16.5 2.2 13.5 2.4 11 2.2 L11.6 3.8 L9 2.4 C6 1.6 3 0.9 0 0.3 Z';
const FLAME_HOT = 'M0 -0.2 C3 -0.6 6 -0.9 9.5 -0.6 C11 -0.2 11 0.3 9.5 0.6 C6 0.9 3 0.6 0 0.2 Z';
const WISPS =
  'M26 -10.6 C27.6 -12.2 28.8 -13.8 29.8 -15.8 C29.6 -13.4 29.2 -11.6 28.4 -10 Z M33 7.4 C34.8 8.4 36.6 9.4 38.6 10.8 C36.6 10.6 34.8 10 33.4 9.2 Z M38.4 -3.8 C40 -4.4 41.6 -5 43.6 -5.8 C42.2 -4.6 40.8 -3.4 39.4 -2.6 Z M18.2 9.4 C18.6 11 19 12.6 19.4 14.6 C19.8 12.6 20.2 11 20.6 9.2 Z';
const SPARKS: { y: number; d: number; r: number }[] = [
  { y: -7, d: 0, r: 0.45 },
  { y: 5, d: 0.22, r: 0.35 },
  { y: -2.5, d: 0.47, r: 0.4 },
  { y: 8, d: 0.12, r: 0.3 },
  { y: -9.5, d: 0.35, r: 0.3 },
];

/** Embers in 1/12-scale units so the shared ember keyframes drift a visible distance. */
const EMBERS: [number, number, number, number][] = [
  [14, 22, 0.6, 0],
  [30, 10, 0.5, 1.4],
  [20, 60, 0.55, 0.7],
  [56, 70, 0.5, 2.1],
];

export function DragonLogo({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  const id = useId().replace(/:/g, '');
  const aura = `${id}-aura`;
  const eye = `${id}-eye`;
  const outerFire = `${id}-fo`;
  const midFire = `${id}-fm`;
  const coreFire = `${id}-fc`;
  const flash = `${id}-fl`;
  const mouthAt = `translate(${MOUTH.x} ${MOUTH.y}) rotate(${MOUTH.angle}) scale(${MOUTH.length} ${MOUTH.width})`;

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${ART_H}`} aria-hidden className={`dragon-logo ${className}`}>
      <defs>
        <radialGradient id={aura}>
          <stop offset="0" stopColor="#ff1a0a" stopOpacity="0.22" />
          <stop offset="1" stopColor="#ff1a0a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={eye}>
          <stop offset="0" stopColor="#fff0d8" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#ff3a2a" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ff0a0a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={outerFire} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff3008" />
          <stop offset="0.5" stopColor="#e01208" />
          <stop offset="0.85" stopColor="#8a0006" stopOpacity="0.55" />
          <stop offset="1" stopColor="#5a0004" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={midFire} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffe08a" />
          <stop offset="0.4" stopColor="#ff9a1f" />
          <stop offset="0.85" stopColor="#ff4a0c" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ff3008" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={coreFire} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fffbe6" />
          <stop offset="0.5" stopColor="#ffe680" />
          <stop offset="1" stopColor="#ffb030" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={flash}>
          <stop offset="0" stopColor="#fff8e0" />
          <stop offset="0.4" stopColor="#ffb040" stopOpacity="0.6" />
          <stop offset="1" stopColor="#ff4010" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="460" cy="480" rx="470" ry="470" fill={`url(#${aura})`} className="dragon-aura" />

      <g className="dragon-breathe">
        {!reduce && (
          <g transform={mouthAt}>
            <g className="dragon-fire">
              <path d={FLAME_OUTER} fill={`url(#${outerFire})`} className="flame flame-outer" />
              <path d={WISPS} fill="#ff2a08" className="flame-tongues" />
              <path d={FLAME_MID} fill={`url(#${midFire})`} className="flame flame-mid" />
              <path d={FLAME_CORE} fill={`url(#${coreFire})`} className="flame flame-core" />
              <path d={FLAME_HOT} fill="#ffffff" opacity="0.9" className="flame flame-core" />
              {SPARKS.map(({ y, d, r }) => (
                <circle
                  key={y}
                  cx="6"
                  cy="0"
                  r={r}
                  fill="#ffd27a"
                  className="flame-spark"
                  style={{ animationDelay: `${d}s`, '--sy': `${y}px` } as CSSProperties}
                />
              ))}
            </g>
          </g>
        )}

        <image href={`${import.meta.env.BASE_URL}brand/dragon.webp`} width={ART_W} height={ART_H} />
        <ellipse cx={EYE.x} cy={EYE.y} rx="34" ry="22" fill={`url(#${eye})`} className="dragon-eye" />

        {!reduce && (
          <g transform={mouthAt}>
            <ellipse cx="2.5" cy="0" rx="4" ry="2.6" fill={`url(#${flash})`} className="dragon-flash" />
          </g>
        )}
      </g>

      {!reduce && (
        <g transform="scale(12)">
          {EMBERS.map(([x, y, r, d]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#ff4a1c" className="dragon-ember" style={{ animationDelay: `${d}s` }} />
          ))}
        </g>
      )}
    </svg>
  );
}
