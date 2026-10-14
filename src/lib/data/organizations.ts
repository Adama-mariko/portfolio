import type { Organization, Stat } from '#lib/types/portfolio.ts';

/** Projets réalisés au sein d'organisations GitHub (code privé ou partagé). */
export const organizations: Organization[] = [
	{
		name: 'TransfertCM',
		description:
			'Plateforme camerounaise de recharge de crédit, de forfaits et de transferts mobile money sur MTN et Orange, avec des agents partenaires qui exécutent les commandes.',
		role: 'Développeur full stack — web et mobile',
		url: 'https://github.com/Transfertcm',
		projects: [
			{
				slug: 'transfertcm-web',
				name: 'TransfertCM',
				kind: 'Site et back-office',
				year: '2026',
				categories: ['web', 'backoffice', 'fullstack'],
				summary:
					'Site public et back-office d’une plateforme de recharge de crédit, de forfaits et de transferts mobile money au Cameroun.',
				mission:
					'Remplacer l’achat en cabine par un parcours 100 % mobile, et donner à l’administration et aux agents partenaires un outil unique pour traiter les commandes et suivre les flux financiers.',
				role: 'Développeur frontend',
				highlights: [
					'Site vitrine : services, parcours, tarifs et FAQ',
					'Back-office de plus de 20 modules : commandes, UV, finance, salaires, rémunérations',
					'Détection de fraude, réclamations, call center et messagerie',
					'Espace cabine pour les agents : commandes, performance, documents'
				],
				stack: ['svelte', 'typescript', 'tailwind'],
				links: [
					{ label: 'Visiter', url: 'https://transfertcm.miaba.africa/', kind: 'live' },
					{ label: 'Back-office', url: 'https://transfertcm.miaba.africa/login', kind: 'live' },
					{ label: 'Code', url: 'https://github.com/Transfertcm/transfertcm-frontend', kind: 'code' }
				],
				image: '/images/projects/transfertcm.webp',
				showcase: true
			},
			{
				slug: 'transfertcm-mobile',
				name: 'TransfertCM Mobile',
				kind: 'Application Android',
				year: '2026',
				categories: ['mobile'],
				summary:
					'Application Flutter pour les clients (portefeuille, crédit, forfaits, transferts) et pour les agents en cabine.',
				mission:
					'Permettre de recharger son portefeuille par MTN MoMo ou Orange Money, puis d’acheter crédit et forfaits pour soi ou un proche, pendant que les agents traitent les commandes en temps réel.',
				role: 'Développeur mobile',
				highlights: [
					'Espace client : portefeuille, commandes, contacts, transferts programmés, réclamations',
					'Espace cabine : commandes en temps réel et messagerie avec l’administration',
					'Architecture par fonctionnalités (data, domain, presentation) avec Riverpod',
					'Sécurité par code PIN'
				],
				stack: ['flutter', 'dart', 'riverpod'],
				links: [
					{
						label: 'Télécharger l’APK',
						url: 'https://drive.google.com/file/d/1B_bPj2K0UZ8tF_FTdXJAtMfBXsEO5G46/view?usp=sharing',
						kind: 'download'
					}
				],
				private: true,
				showcase: true
			}
		]
	},
	{
		name: 'Jeko',
		description: 'Fintech ivoirienne : encaissement multicanal pour les commerçants du secteur informel.',
		role: 'Développeur Web Full Stack',
		projects: [
			{
				slug: 'jeko-cockpit',
				name: 'Jeko Cockpit',
				kind: 'Outil de gestion interne',
				year: '2026',
				categories: ['backoffice', 'web'],
				summary: 'Cockpit de suivi des abonnements, des campagnes de relance et de la facturation.',
				mission: 'Donner aux équipes une vue claire sur les abonnements et automatiser les relances.',
				role: 'Développeur full stack',
				highlights: ['Suivi des abonnements', 'Campagnes de relance', 'Facturation'],
				stack: ['svelte', 'typescript', 'postgresql'],
				links: [],
				private: true
			},
			{
				slug: 'jeko-pay',
				name: 'Jeko Pay',
				kind: 'API de paiement',
				year: '2026',
				categories: ['fullstack'],
				summary:
					'Intégration d’une API de paiement unifiée : Wave, Djamo, Orange Money, MTN, Moov, Visa et Mastercard.',
				mission: 'Un seul point d’intégration pour encaisser sur tous les canaux utilisés en Côte d’Ivoire.',
				role: 'Développeur full stack',
				highlights: ['7 canaux d’encaissement', 'Solutions pour le terminal Jeko Box'],
				stack: ['typescript', 'rest', 'payments'],
				links: [],
				private: true
			},
			{
				slug: 'jeko-backoffice',
				name: 'Jeko Back-office',
				kind: 'Back-office',
				year: '2026',
				categories: ['backoffice', 'web'],
				summary: 'Interface d’administration des marchands et des opérations.',
				mission: 'Outiller les équipes opérationnelles au quotidien.',
				role: 'Contributeur',
				highlights: ['Administration des marchands', 'Suivi des opérations'],
				stack: ['svelte', 'typescript'],
				links: [],
				private: true
			}
		]
	}
];

export const organizationStats: Stat[] = [
	{ value: '2', label: 'Organisations' },
	{ value: '5', label: 'Projets d’équipe' },
	{ value: '20+', label: 'Modules livrés' },
	{ value: '7', label: 'Canaux de paiement' },
	{ value: '2', label: 'Plateformes' }
];
