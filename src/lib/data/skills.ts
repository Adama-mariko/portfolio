import type { SkillCategory, Stat } from '#lib/types/portfolio.ts';

export const skillCategories: SkillCategory[] = [
	{
		id: 'frontend',
		label: 'Frontend',
		techs: [
			'svelte',
			'react',
			'nextjs',
			'angular',
			'redux',
			'reactquery',
			'tailwind',
			'bootstrap',
			'jquery',
			'html',
			'css'
		]
	},
	{
		id: 'backend',
		label: 'Backend',
		techs: ['laravel', 'django', 'flask', 'adonis', 'rest', 'jwt']
	},
	{
		id: 'mobile',
		label: 'Mobile',
		techs: ['flutter', 'dart', 'riverpod', 'androidstudio']
	},
	{
		id: 'languages',
		label: 'Langages',
		techs: ['typescript', 'javascript', 'php', 'python', 'java', 'sql']
	},
	{
		id: 'data',
		label: 'Données',
		techs: ['mysql', 'postgresql', 'sqlserver', 'sqlite', 'access']
	},
	{
		id: 'tools',
		label: 'Outils',
		techs: ['git', 'github', 'vercel', 'netlify', 'vite']
	}
];

export const skillStats: Stat[] = [
	{ value: '30+', label: 'Technologies' },
	{ value: '6', label: 'Frameworks web' },
	{ value: '25', label: 'Dépôts GitHub' },
	{ value: '2', label: 'Organisations' }
];
