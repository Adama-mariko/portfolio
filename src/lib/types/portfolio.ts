/** Types partagés par les données et les composants du portfolio. */

import type { TechId } from '#lib/utils/tech-icons.ts';

export interface Profile {
	firstName: string;
	lastName: string;
	handle: string;
	role: string;
	tagline: string;
	summary: string;
	about: string[];
	email: string;
	phones: string[];
	location: string;
	coordinates: string;
	photo: string;
	logo: string;
	cv: string;
	links: {
		github: string;
		whatsapp: string;
	};
}

export type SocialId = 'github' | 'linkedin' | 'facebook' | 'instagram' | 'x' | 'whatsapp';

export interface SocialLink {
	id: SocialId;
	label: string;
	/** Texte affiché à côté de l'icône (pseudo, numéro…). */
	handle: string;
	url: string;
}

export interface Stat {
	value: string;
	label: string;
}

export interface NavItem {
	id: string;
	label: string;
}

/** Clé d'une technologie déclarée dans `utils/tech-icons.ts`. */
export type TechKey = TechId;

export interface SkillCategory {
	id: string;
	label: string;
	techs: TechKey[];
}

export interface Experience {
	hash: string;
	company: string;
	role: string;
	type: 'CDI' | 'Freelance' | 'Projet' | 'Personnel';
	period: string;
	current: boolean;
	location?: string;
	context?: string;
	changelog: string[];
	stack: TechKey[];
}

export interface Education {
	degree: string;
	field?: string;
	school: string;
	period: string;
	current?: boolean;
	kind: 'diploma' | 'certificate';
}

export type ProjectCategory = 'web' | 'mobile' | 'fullstack' | 'backoffice';

export interface ProjectLink {
	label: string;
	url: string;
	kind: 'live' | 'code' | 'download';
}

export interface Project {
	slug: string;
	name: string;
	kind: string;
	year: string;
	categories: ProjectCategory[];
	summary: string;
	mission: string;
	role: string;
	highlights: string[];
	stack: TechKey[];
	links: ProjectLink[];
	image?: string;
	private?: boolean;
	/** Affiché aussi dans la mosaïque des projets (section 05). */
	showcase?: boolean;
}

export interface Organization {
	name: string;
	description: string;
	role: string;
	url?: string;
	projects: Project[];
}

export interface Value {
	icon: 'code' | 'shield' | 'users' | 'zap';
	title: string;
	text: string;
}
