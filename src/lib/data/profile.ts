import type { NavItem, Profile, SocialLink, Stat, Value } from '#lib/types/portfolio.ts';

export const profile: Profile = {
	firstName: 'Adama',
	lastName: 'Mariko',
	handle: 'am.dev',
	role: 'Développeur Full Stack',
	tagline: 'développeur full stack — 4+ ans en production',
	summary:
		"Développeur full stack basé à Abidjan, spécialisé dans les applications web complètes, l'intégration d'API de paiement et la maintenance de systèmes critiques. Étudiant en Licence Génie Logiciel et Réseaux à l'UVCI.",
	about: [
		"Je conçois des applications web de bout en bout : modélisation des données, API, interfaces d'administration et applications mobiles.",
		"Aujourd'hui chez Jeko, une fintech ivoirienne, je travaille sur l'API de paiement unifiée (Wave, Orange Money, MTN, Moov, Djamo, Visa, Mastercard) et sur le cockpit de gestion en SvelteKit.",
		"En parallèle de mon activité, je poursuis une Licence en Génie Logiciel et Réseaux à l'Université Virtuelle de Côte d'Ivoire, avec l'objectif de continuer mes études en France."
	],
	email: 'dmsmariko@gmail.com',
	phones: ['+225 05 00 51 61 73', '+225 07 77 25 66 99'],
	location: 'Cocody Riviera Abatta, Abidjan',
	coordinates: 'lat 5.36°N — lon 3.96°W',
	photo: '/images/adama.webp',
	logo: '/images/logo-am.png',
	cv: '/cv/CV_Mariko_Adama.pdf',
	links: {
		github: 'https://github.com/Adama-mariko',
		whatsapp: 'https://wa.me/2250500516173'
	}
};

/** Réseaux affichés dans le pied de page, le menu mobile, le contact et les données SEO. */
export const socials: SocialLink[] = [
	{
		id: 'linkedin',
		label: 'LinkedIn',
		handle: 'mariko-adama',
		url: 'https://www.linkedin.com/in/mariko-adama/'
	},
	{ id: 'github', label: 'GitHub', handle: 'Adama-mariko', url: profile.links.github },
	{ id: 'whatsapp', label: 'WhatsApp', handle: profile.phones[0], url: profile.links.whatsapp },
	{
		id: 'facebook',
		label: 'Facebook',
		handle: 'Adama Mariko',
		url: 'https://www.facebook.com/profile.php?id=100088800630668'
	},
	{ id: 'instagram', label: 'Instagram', handle: '@ttfam8925', url: 'https://www.instagram.com/ttfam8925/' },
	{ id: 'x', label: 'X', handle: '@adama90968', url: 'https://x.com/adama90968' }
];

export const navigation: NavItem[] = [
	{ id: 'about', label: 'Profil' },
	{ id: 'skills', label: 'Stack' },
	{ id: 'experience', label: 'Parcours' },
	{ id: 'education', label: 'Formation' },
	{ id: 'projects', label: 'Projets' },
	{ id: 'organizations', label: 'Équipes' },
	{ id: 'contact', label: 'Contact' }
];

export const typedRoles = [
	'full stack developer',
	'payment api integrator',
	'sveltekit · laravel · django',
	'flutter mobile developer'
];

export const identity: [string, string][] = [
	['Nom', `${profile.lastName} ${profile.firstName}`],
	['Rôle', profile.role],
	['Base', 'Abidjan, Côte d’Ivoire'],
	['Poste', 'Jeko — fintech'],
	['Études', 'Licence 2 — UVCI'],
	['Langues', 'Français · Anglais'],
	['Intérêts', 'Football · Cybersécurité']
];

export const aboutStats: Stat[] = [
	{ value: '4+', label: 'Années' },
	{ value: '25', label: 'Dépôts' },
	{ value: '7', label: 'Moyens de paiement' }
];

export const values: Value[] = [
	{
		icon: 'code',
		title: 'Code propre',
		text: 'Architectures lisibles et maintenables, pensées pour durer et être reprises par une équipe.'
	},
	{
		icon: 'shield',
		title: 'Fiabilité',
		text: 'Maintenance de systèmes critiques et paiements : chaque transaction doit aboutir.'
	},
	{
		icon: 'users',
		title: 'Travail en équipe',
		text: 'Habitué aux revues de code, aux organisations GitHub et aux livraisons en continu.'
	}
];
