import { blogs } from '../data/blogs';
import { caseStudies } from '../data/caseStudies';
import { projects } from '../data/projects';
import { writeups } from '../data/writeups';
import type { DomainId } from '../data/types';

export const projectsFor = (id: DomainId) => projects.filter((p) => p.domains.includes(id));
export const blogsFor = (id: DomainId) => blogs.filter((b) => b.domains.includes(id));
export const casesFor = (id: DomainId) => caseStudies.filter((c) => c.domains.includes(id));
export const writeupsFor = (id: DomainId) => writeups.filter((w) => w.domains.includes(id));

export const countFor = (id: DomainId) =>
  projectsFor(id).length + blogsFor(id).length + casesFor(id).length + writeupsFor(id).length;
