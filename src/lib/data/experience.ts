import type { Experience } from '#lib/types/portfolio.ts';

export const experiences: Experience[] = [
	{
		hash: 'a7e3f21',
		company: 'Jeko',
		role: 'Développeur Web Full Stack',
		type: 'CDI',
		period: 'Juil. 2026 — Présent',
		current: true,
		location: 'Ivoire Trade Center, Abidjan',
		context:
			'Fintech issue du startup studio Mstudio, qui numérise le secteur informel en Afrique francophone.',
		changelog: [
			"Développement et intégration d'une API de paiement unifiée couvrant tous les canaux d'encaissement : Wave, Djamo, Visa, Mastercard, Orange Money, MTN Money et Moov Money.",
			"Conception de solutions d'encaissement pour les équipes commerciales via le terminal unique Jeko Box.",
			"Création d'un cockpit de gestion en SvelteKit pour le suivi des abonnements, des campagnes de relance et de la facturation."
		],
		stack: ['svelte', 'typescript', 'rest', 'payments', 'postgresql']
	},
	{
		hash: '5c19b0d',
		company: 'Mg digital Plus',
		role: 'Développeur Web Full Stack',
		type: 'Freelance',
		period: '2025 — Présent',
		current: true,
		changelog: [
			"Développement complet d'applications web, avec optimisation des performances frontend et de l'intégration des API backend.",
			'Support technique et maintenance de systèmes critiques.'
		],
		stack: ['laravel', 'react', 'mysql', 'rest']
	},
	{
		hash: '9d42ea8',
		company: 'Université Félix Houphouët-Boigny',
		role: 'Développeur principal — Application de workflow',
		type: 'Projet',
		period: '2024 — 2025',
		current: false,
		changelog: [
			"Développement d'une plateforme de workflow sécurisée pour la gestion et l'automatisation des processus administratifs.",
			"Conception de l'architecture front (Next.js) et back (Laravel)."
		],
		stack: ['nextjs', 'laravel', 'mysql', 'jwt']
	},
	{
		hash: '3f8c7b2',
		company: 'Projet personnel',
		role: 'Développeur Full Stack — Plateforme e-commerce',
		type: 'Personnel',
		period: 'Déc. 2024',
		current: false,
		changelog: [
			"Conception et réalisation d'une plateforme e-commerce et de gestion de pharmacie avec Django."
		],
		stack: ['django', 'python', 'sqlite', 'bootstrap']
	},
	{
		hash: 'e01d6a4',
		company: 'Projets personnels',
		role: 'Développeur Web Full Stack',
		type: 'Personnel',
		period: '2022 — 2023',
		current: false,
		changelog: [
			"Développement complet d'applications web, avec optimisation des systèmes frontend et backend.",
			"Intégration d'API REST et de moyens de paiement."
		],
		stack: ['php', 'javascript', 'mysql', 'jquery']
	}
];
