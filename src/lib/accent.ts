import { useLayoutEffect } from 'react';
import { domainMap } from '../data/domains';
import type { DomainId } from '../data/types';

export const DEFAULT_ACCENT = { color: '#60a5fa', rgb: '96 165 250' };

export function useAccent(id?: DomainId) {
  useLayoutEffect(() => {
    const { color, rgb } = id ? domainMap[id] : DEFAULT_ACCENT;
    const root = document.documentElement.style;
    root.setProperty('--accent', color);
    root.setProperty('--accent-rgb', rgb);
  }, [id]);
}

export function hexToRgba(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
