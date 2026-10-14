export * from './profile.ts';
export * from './skills.ts';
export * from './experience.ts';
export * from './education.ts';
export * from './projects.ts';
export * from './organizations.ts';

import { organizations } from './organizations.ts';
import { projects } from './projects.ts';

/** Mosaïque des projets : projets d'équipe mis en avant, puis projets personnels. */
export const showcaseProjects = [
	...organizations.flatMap((organization) => organization.projects).filter((project) => project.showcase),
	...projects
];
export * from './site.ts';
