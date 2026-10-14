import { Award, BriefcaseBusiness, FlaskConical, GraduationCap, Users, type LucideIcon } from 'lucide-react';

export interface AboutLink {
  to: string;
  label: string;
  short: string;
  desc: string;
  color: string;
  icon: LucideIcon;
}

export const aboutLinks: AboutLink[] = [
  { to: '/experience', label: 'Work Experience', short: 'Experience', desc: 'Pentesting & incident response', color: '#a78bfa', icon: BriefcaseBusiness },
  { to: '/education', label: 'Education', short: 'Education', desc: 'BSc in Software Engineering', color: '#38bdf8', icon: GraduationCap },
  { to: '/research', label: 'Research', short: 'Research', desc: 'Post-quantum cryptography', color: '#34d399', icon: FlaskConical },
  { to: '/certifications', label: 'Certifications', short: 'Certifications', desc: 'From offense to intelligence', color: '#f59e0b', icon: Award },
  { to: '/leadership', label: 'Leadership & Community', short: 'Leadership', desc: 'Organising, teaching & volunteering', color: '#fb7185', icon: Users },
];

/** Pages that show the floating section bar at the bottom on mobile / tablet. */
export const hasBottomBar = (pathname: string) => pathname.startsWith('/d/') || aboutLinks.some((a) => a.to === pathname);
