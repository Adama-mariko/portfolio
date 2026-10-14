import {
	siAdonisjs,
	siAndroidstudio,
	siAngular,
	siAxios,
	siBootstrap,
	siCss,
	siDart,
	siDjango,
	siFlask,
	siFlutter,
	siGit,
	siGithub,
	siGo,
	siHtml5,
	siJavascript,
	siJquery,
	siJsonwebtokens,
	siLaravel,
	siLeaflet,
	siMastercard,
	siMui,
	siMysql,
	siNetlify,
	siNextdotjs,
	siOpenjdk,
	siOrange,
	siPhp,
	siPostgresql,
	siPython,
	siReact,
	siReactquery,
	siRedux,
	siSqlite,
	siSvelte,
	siTailwindcss,
	siTypescript,
	siVercel,
	siVisa,
	siVite,
	type SimpleIcon
} from 'simple-icons';

/** Icône générique (Lucide) pour les technos sans logo officiel. */
export type FallbackIcon = 'database' | 'api' | 'wallet' | 'layers';

export interface Tech {
	label: string;
	/** Couleur d'accent de la tuile (hex sans #). */
	color: string;
	icon?: SimpleIcon;
	fallback?: FallbackIcon;
}

const brand = (icon: SimpleIcon, label = icon.title): Tech => ({ label, icon, color: icon.hex });
const generic = (label: string, fallback: FallbackIcon, color = '05DF72'): Tech => ({
	label,
	fallback,
	color
});

export const techs = {
	// Langages
	typescript: brand(siTypescript),
	javascript: brand(siJavascript),
	php: brand(siPhp),
	python: brand(siPython),
	java: brand(siOpenjdk, 'Java'),
	dart: brand(siDart),
	go: brand(siGo),
	html: brand(siHtml5, 'HTML'),
	css: brand(siCss, 'CSS'),
	sql: generic('SQL', 'database'),

	// Frontend
	svelte: brand(siSvelte, 'SvelteKit'),
	react: brand(siReact),
	nextjs: brand(siNextdotjs, 'Next.js'),
	angular: brand(siAngular),
	tailwind: brand(siTailwindcss, 'Tailwind'),
	bootstrap: brand(siBootstrap),
	jquery: brand(siJquery),
	material: brand(siMui, 'Material'),
	leaflet: brand(siLeaflet),
	redux: brand(siRedux),
	reactquery: brand(siReactquery, 'React Query'),

	// Backend
	laravel: brand(siLaravel),
	django: brand(siDjango),
	flask: brand(siFlask),
	adonis: brand(siAdonisjs, 'AdonisJS'),
	jwt: brand(siJsonwebtokens, 'JWT'),
	axios: brand(siAxios),
	rest: generic('API REST', 'api'),

	// Mobile
	flutter: brand(siFlutter),
	riverpod: generic('Riverpod', 'layers', '45C0F2'),

	// Données
	mysql: brand(siMysql, 'MySQL'),
	postgresql: brand(siPostgresql, 'PostgreSQL'),
	sqlite: brand(siSqlite, 'SQLite'),
	sqlserver: generic('SQL Server', 'database', 'CC2927'),
	access: generic('MS Access', 'database', 'A4373A'),

	// Paiements
	payments: generic('Mobile Money', 'wallet'),
	orange: brand(siOrange, 'Orange Money'),
	visa: brand(siVisa),
	mastercard: brand(siMastercard),

	// Outils
	git: brand(siGit),
	github: brand(siGithub, 'GitHub'),
	vercel: brand(siVercel),
	netlify: brand(siNetlify),
	vite: brand(siVite),
	androidstudio: brand(siAndroidstudio, 'Android Studio')
} satisfies Record<string, Tech>;

export type TechId = keyof typeof techs;

export function getTech(id: string): Tech {
	return (techs as Record<string, Tech>)[id] ?? generic(id, 'layers');
}

/**
 * Les logos très sombres (Next.js, Vercel, GitHub…) seraient invisibles
 * sur fond noir : on les éclaircit.
 */
export function readableColor(hex: string): string {
	const n = parseInt(hex, 16);
	const r = (n >> 16) & 255;
	const g = (n >> 8) & 255;
	const b = n & 255;
	const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
	return luminance < 0.25 ? '#E6EDF3' : `#${hex}`;
}
