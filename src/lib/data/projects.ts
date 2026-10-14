import type { Project, ProjectCategory } from '#lib/types/portfolio.ts';

const github = (repo: string, owner = 'Adama-mariko') => `https://github.com/${owner}/${repo}`;

export const projectFilters: { id: 'all' | ProjectCategory; label: string }[] = [
	{ id: 'all', label: 'Tous' },
	{ id: 'web', label: 'Web' },
	{ id: 'fullstack', label: 'Full stack' },
	{ id: 'mobile', label: 'Mobile' },
	{ id: 'backoffice', label: 'Back-office' }
];

/** Projets personnels et clients, du plus récent au plus ancien. */
export const projects: Project[] = [
	{
		slug: 'ecommerce-nextjs',
		name: 'Boutique Next.js',
		kind: 'E-commerce',
		year: '2026',
		categories: ['web', 'fullstack', 'backoffice'],
		summary:
			'Boutique en ligne complète : catalogue, panier, favoris, paiement, compte client, blog et back-office d’administration.',
		mission:
			'Offrir un parcours d’achat complet et multilingue, avec un espace d’administration pour gérer produits, commandes et clients.',
		role: 'Conception et développement complet',
		highlights: [
			'Catalogue avec filtres, fiche produit, panier, favoris et paiement',
			'Back-office protégé : produits, commandes et clients',
			'Interface traduite en 12 langues, dont l’arabe et le chinois',
			'Authentification NextAuth et e-mails transactionnels'
		],
		stack: ['nextjs', 'react', 'typescript', 'tailwind', 'redux', 'reactquery'],
		links: [{ label: 'Visiter', url: 'https://ecommerce-nextjs-mu-eosin.vercel.app/', kind: 'live' }],
		image: '/images/projects/ecommerce-nextjs.webp',
		private: true
	},
	{
		slug: 'arado-trans',
		name: 'Arado Trans',
		kind: 'Plateforme de réservation',
		year: '2026',
		categories: ['web', 'fullstack'],
		summary:
			'Site de transport privé à Abidjan : transferts aéroport, chauffeurs à disposition et location de véhicules.',
		mission:
			'Permettre de réserver un trajet en quelques étapes, avec estimation de distance sur carte, suivi de réservation et devis entreprise, en français et en anglais.',
		role: 'Conception et développement complet',
		highlights: [
			'Tunnel de réservation de 6 à 8 étapes avec carte OpenStreetMap',
			'Internationalisation FR / EN avec Paraglide, contrôle des clés au build',
			'SEO avancé : hreflang, JSON-LD, sitemap, 9 pages d’atterrissage'
		],
		stack: ['svelte', 'typescript', 'tailwind', 'vercel'],
		links: [{ label: 'Visiter', url: 'https://arado-trans.vercel.app', kind: 'live' }],
		image: '/images/projects/arado-trans.webp',
		private: true
	},
	{
		slug: 'forage-ci',
		name: 'ForageCI',
		kind: 'Plateforme de mise en relation',
		year: '2026',
		categories: ['web', 'fullstack', 'backoffice'],
		summary:
			'Plateforme tripartite client, entreprise prestataire et administrateur pour les prestations de forage.',
		mission:
			'Digitaliser la mise en relation entre demandeurs de forage et entreprises, avec un budget client confidentiel et un administrateur tiers de confiance.',
		role: 'Développeur frontend',
		highlights: [
			'Trois espaces distincts : client, entreprise, administrateur',
			'Demandes géolocalisées avec sélection sur carte Leaflet',
			'Appels d’offres, comparatif des offres et messagerie contextuelle'
		],
		stack: ['svelte', 'typescript', 'tailwind', 'leaflet', 'axios'],
		links: [
			{ label: 'Visiter', url: 'https://forage-ci.vercel.app', kind: 'live' },
			{ label: 'Code', url: github('forage_ci'), kind: 'code' }
		],
		image: '/images/projects/forage-ci.webp'
	},
	{
		slug: 'ecoversion',
		name: 'ECOVERSION / EETROOV',
		kind: 'Site vitrine multi-entités',
		year: '2026',
		categories: ['web'],
		summary:
			'Site unifié pour ECOVERSION Group (cabinet), ECOVERSION ONG et EETROOV (formations en agriculture durable).',
		mission: 'Réunir trois entités sous une seule expérience claire, rapide et bien référencée.',
		role: 'Conception et développement',
		highlights: [
			'Pages prérendues pour la performance et le référencement',
			'Contenu centralisé dans une couche de services',
			'Redirections vers les sites officiels de chaque pôle'
		],
		stack: ['svelte', 'typescript', 'css', 'vercel'],
		links: [
			{ label: 'Visiter', url: 'https://eetrov.vercel.app', kind: 'live' },
			{ label: 'Code', url: github('eetrov'), kind: 'code' }
		],
		image: '/images/projects/eetroov.webp'
	},
	{
		slug: 'playshop',
		name: 'PlayShop',
		kind: 'E-commerce web et mobile',
		year: '2026',
		categories: ['web', 'mobile', 'fullstack'],
		summary: 'Boutique en ligne complète : API, site web et application mobile partageant le même backend.',
		mission: 'Livrer une même boutique sur le web et sur mobile, adossée à une seule API.',
		role: 'Développeur full stack',
		highlights: [
			'API AdonisJS et base MySQL',
			'Application mobile Flutter avec Riverpod',
			'Frontend web déployé sur Vercel'
		],
		stack: ['adonis', 'mysql', 'svelte', 'flutter', 'riverpod'],
		links: [
			{ label: 'Visiter', url: 'https://playshop-sandy.vercel.app', kind: 'live' },
			{ label: 'Code web', url: github('playshop'), kind: 'code' },
			{ label: 'Code mobile', url: github('mobile'), kind: 'code' }
		],
		image: '/images/projects/playshop.webp'
	},
	{
		slug: 'gestion-personnel',
		name: 'Gestion centralisée du personnel',
		kind: 'Application RH',
		year: '2026',
		categories: ['web', 'fullstack', 'backoffice'],
		summary:
			'Gestion et placement de collaborateurs dans des entreprises partenaires, avec remplacements et traçabilité.',
		mission: 'Centraliser le suivi des collaborateurs placés et l’historique de leurs mouvements.',
		role: 'Développeur full stack',
		highlights: [
			'API REST Flask sécurisée par JWT',
			'Interface Angular Material',
			'Gestion des remplacements et des mouvements'
		],
		stack: ['flask', 'python', 'mysql', 'jwt', 'angular', 'material'],
		links: [{ label: 'Code', url: github('syst-me-centralis-'), kind: 'code' }]
	},
	{
		slug: 'registre-vigiles',
		name: 'Registre numérique des vigiles',
		kind: 'Web et mobile',
		year: '2025',
		categories: ['web', 'mobile', 'fullstack'],
		summary: 'Remplacement du cahier papier des agents de sécurité par un registre numérique.',
		mission: 'Fiabiliser la saisie terrain et donner aux responsables une vue en temps réel.',
		role: 'Développeur full stack',
		highlights: ['Back-office Laravel', 'Application Flutter pour la saisie terrain'],
		stack: ['laravel', 'php', 'mysql', 'flutter', 'dart'],
		links: [
			{ label: 'Code web', url: github('registre-vigiles'), kind: 'code' },
			{ label: 'Code mobile', url: github('cahier_vigile'), kind: 'code' }
		]
	},
	{
		slug: 'gbat',
		name: 'GBAT Construction',
		kind: 'Site vitrine',
		year: '2026',
		categories: ['web'],
		summary: 'Site professionnel d’une entreprise ivoirienne de BTP, d’énergie et de promotion immobilière.',
		mission: 'Présenter les pôles d’activité de l’entreprise et faciliter la prise de contact.',
		role: 'Développeur frontend',
		highlights: ['Site responsive en React et TypeScript', 'Présentation des cinq pôles d’activité'],
		stack: ['react', 'typescript', 'vite'],
		links: [{ label: 'Code', url: github('GBAT-contruction'), kind: 'code' }]
	},
	{
		slug: 'notejour',
		name: 'NoteJour',
		kind: 'Gestion de tâches',
		year: '2025',
		categories: ['web', 'fullstack'],
		summary: 'Application de gestion de tâches avec notifications en temps réel et profils utilisateurs.',
		mission: 'Organiser le travail quotidien d’une équipe dans une interface simple.',
		role: 'Développeur full stack',
		highlights: ['API Flask', 'Interface React, Vite et Tailwind', 'Notifications en temps réel'],
		stack: ['flask', 'python', 'react', 'tailwind'],
		links: [{ label: 'Code', url: github('notejour'), kind: 'code' }]
	},
	{
		slug: 'pharmacie',
		name: 'Pharmacie en ligne',
		kind: 'E-commerce',
		year: '2024',
		categories: ['web', 'fullstack'],
		summary: 'Vente en ligne et gestion de pharmacie : produits, utilisateurs et commandes.',
		mission: 'Permettre à une pharmacie de vendre en ligne et de gérer son stock.',
		role: 'Développeur full stack',
		highlights: ['Catalogue produits et panier', 'Gestion des utilisateurs', 'Back-office Django'],
		stack: ['django', 'python', 'sqlite', 'bootstrap'],
		links: [{ label: 'Code', url: github('Projet-vente-en-ligne'), kind: 'code' }]
	},
	{
		slug: 'ecommerce-angular',
		name: 'Boutique Angular',
		kind: 'E-commerce',
		year: '2026',
		categories: ['web'],
		summary: 'Interface de boutique en ligne développée avec Angular 20.',
		mission: 'Explorer les dernières versions d’Angular sur un cas concret.',
		role: 'Développeur frontend',
		highlights: ['Catalogue et panier', 'Composants Angular standalone'],
		stack: ['angular', 'typescript', 'css'],
		links: [{ label: 'Code', url: github('ecommerce'), kind: 'code' }]
	},
	{
		slug: 'report-app',
		name: 'ReportApp',
		kind: 'Génération d’états',
		year: '2026',
		categories: ['web', 'backoffice'],
		summary: 'Application de génération et de consultation de rapports.',
		mission: 'Produire rapidement des états lisibles à partir de données métier.',
		role: 'Développeur frontend',
		highlights: ['Angular', 'Déploiement Netlify'],
		stack: ['angular', 'typescript', 'netlify'],
		links: [{ label: 'Code', url: github('Etats'), kind: 'code' }]
	},
	{
		slug: 'ecole',
		name: 'Gestion scolaire',
		kind: 'Application de gestion',
		year: '2025',
		categories: ['web', 'backoffice'],
		summary: 'Interface de gestion d’une école et de ses enseignants.',
		mission: 'Simplifier le suivi des enseignants et des classes.',
		role: 'Développeur frontend',
		highlights: ['React et TypeScript', 'Interface Tailwind'],
		stack: ['react', 'typescript', 'tailwind'],
		links: [{ label: 'Code', url: github('Ecole_prof'), kind: 'code' }]
	},
	{
		slug: 'meteo',
		name: 'Météo',
		kind: 'Application météo',
		year: '2025',
		categories: ['web'],
		summary: 'Prévisions météo consommées depuis une API publique.',
		mission: 'Consommer une API REST et présenter des données en temps réel.',
		role: 'Développeur frontend',
		highlights: ['Appels API asynchrones', 'React et TypeScript'],
		stack: ['react', 'typescript', 'vite'],
		links: [{ label: 'Code', url: github('meteo'), kind: 'code' }]
	},
	{
		slug: 'laravel-app',
		name: 'Application Laravel',
		kind: 'Application web',
		year: '2025',
		categories: ['web', 'fullstack'],
		summary: 'Application Laravel avec Blade, Tailwind et internationalisation.',
		mission: 'Mettre en œuvre l’écosystème Laravel complet.',
		role: 'Développeur full stack',
		highlights: ['Blade et Tailwind', 'Traductions intégrées'],
		stack: ['laravel', 'php', 'tailwind', 'mysql'],
		links: [{ label: 'Code', url: github('projet-laravel'), kind: 'code' }]
	}
];
