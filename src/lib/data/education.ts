import type { Education } from '#lib/types/portfolio.ts';

export const education: Education[] = [
	{
		degree: 'Licence 2',
		field: 'Génie Logiciel et Réseaux (IAN-GLR)',
		school: 'Université Virtuelle de Côte d’Ivoire (UVCI)',
		period: 'En cours',
		current: true,
		kind: 'diploma'
	},
	{
		degree: 'BTS',
		school: 'Institut de formation Saint Marie',
		period: '2022 — 2024',
		kind: 'diploma'
	},
	{
		degree: 'Lycée moderne Goffry Kouassi',
		school: 'Sassandra',
		period: '2021 — 2022',
		kind: 'diploma'
	},
	{
		degree: 'Certificat React.js',
		school: 'Udemy',
		period: 'Nov. 2025',
		kind: 'certificate'
	}
];

/** Projet d'études, mis en avant pour les candidatures (Campus France). */
export const studyGoal = {
	title: 'Poursuivre mes études en France',
	text: "Après ma Licence 2 à l'UVCI, je souhaite poursuivre en Licence 3 puis en Master en génie logiciel ou réseaux en France, pour consolider une pratique professionnelle déjà engagée dans la fintech par une formation académique exigeante."
};
