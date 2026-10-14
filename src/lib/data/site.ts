/**
 * Réglages SEO du site.
 * `url` : adresse publique définitive (ex. https://adama-mariko.vercel.app), sans « / » final.
 * Tant qu'elle est vide, les balises qui exigent une adresse absolue (canonical, og:url) ne sont pas générées.
 */
export const site = {
	url: '',
	locale: 'fr_FR',
	description:
		'Adama Mariko, développeur full stack à Abidjan : SvelteKit, Laravel, Django, Flutter. API de paiement, back-offices et applications web et mobiles en production. Étudiant en Licence Génie Logiciel et Réseaux (UVCI).',
	keywords: [
		'Adama Mariko',
		'développeur full stack',
		'développeur Abidjan',
		'SvelteKit',
		'Laravel',
		'Django',
		'Flutter',
		'API de paiement',
		'Mobile Money',
		'Côte d’Ivoire'
	]
};
