import type { LucideIcon } from 'lucide-react';

export type DomainId =
  | 'offensive'
  | 'defensive'
  | 'forensics'
  | 'intelligence'
  | 'ctf'
  | 'aiml'
  | 'development';

export type SectionId =
  | 'overview'
  | 'projects'
  | 'writeups'
  | 'cases'
  | 'investigations'
  | 'tools'
  | 'organized'
  | 'judged'
  | 'challenges'
  | 'participation'
  | 'research';

export interface ToolGroup {
  category: string;
  items: string[];
}

export interface Domain {
  id: DomainId;
  name: string;
  label: string;
  short: string;
  color: string;
  rgb: string;
  icon: LucideIcon;
  headline: [string, string];
  intro: string;
  overview: string[];
  focus: string[];
  sections: SectionId[];
  tools: ToolGroup[];
  services?: DomainServices;
}

export interface DomainServices {
  eyebrow: string;
  title: string;
  pitch: string;
  items: { name: string; detail: string }[];
  note?: string;
}

export interface Metric {
  label: string;
  value: string;
  hint?: string;
}

export interface Figure {
  src: string;
  caption: string;
}

export interface DetailItem {
  title: string;
  text: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  domains: DomainId[];
  tags: string[];
  youtube?: string;
  cover?: string;
  summary: string;
  /** Short facts shown in the hero, e.g. { value: '6', label: 'integrated tools' }. */
  glance: Metric[];
  /** The gap or pain point the project addresses. */
  problem: string;
  description: string[];
  features: DetailItem[];
  workflow: DetailItem[];
  impact: DetailItem[];
  audience: string[];
  /** Responsible-use / scope statement. */
  scope?: string;
  stack: string[];
  architecture?: string[];
  metrics?: Metric[];
  figures?: Figure[];
  links: { label: string; href: string; kind: 'github' | 'demo' | 'docs' | 'paper' | 'video' }[];
  year: string;
  featured?: boolean;
}

export interface Blog {
  title: string;
  url: string;
  cover?: string;
  summary: string;
  domains: DomainId[];
  tags: string[];
}

/** A single challenge or vulnerability documented inside a writeup. */
export interface WriteupEntry {
  name: string;
  /** Category (Web, Pwn / Jail, DFIR, ...) for CTFs, or severity (Critical, High) for bug bounty. */
  tag: string;
  summary: string;
  /** Set when this entry was solved by a teammate rather than the author. */
  by?: string;
  flagFormat?: string;
  /** Vulnerable endpoint or path, shown as a mono line. */
  endpoint?: string;
  /** Full reproduction: ordered steps with optional command/request blocks. */
  repro?: { text?: string; code?: string; lang?: string }[];
  /** Business impact bullets. */
  impact?: string[];
}

export interface Writeup {
  slug: string;
  title: string;
  event: string;
  year: string;
  author: string;
  team?: string;
  placement?: string;
  kind: 'ctf' | 'bugbounty';
  domains: DomainId[];
  cover?: string;
  /** Hosted PDF of the original report, opened in a new tab. */
  file?: string;
  summary: string;
  glance: Metric[];
  overview: string[];
  entriesLabel: string;
  entries: WriteupEntry[];
  skills: string[];
}

export interface TimelineEvent {
  when: string;
  what: string;
}

export interface AttackTechnique {
  id: string;
  name: string;
  evidence: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  cover?: string;
  domains: DomainId[];
  tags: string[];
  date: string;
  role: string;
  classification: string;
  summary: string;
  incident: string;
  lead: string;
  evidence: string[];
  methodology: string[];
  timeline: TimelineEvent[];
  attack: AttackTechnique[];
  rootCause: string;
  impact: string;
  remediation: string[];
  tools: string[];
  outcome: string;
  /** When present, the case renders as an investigation report instead of a full walkthrough. */
  investigation?: Investigation;
}

export interface Investigation {
  glance: Metric[];
  attackPath: DetailItem[];
  behaviour: DetailItem[];
  correlations: { plane: string; finding: string }[];
  convergence: string;
  reasoning: DetailItem[];
  outcomes: DetailItem[];
  report: {
    title: string;
    caseId: string;
    pages: number;
    sections: { name: string; page: number }[];
  };
  artifacts: { id: string; name: string; detail: string }[];
}
