<script lang="ts">
	import { education, experiences, profile, site, skillCategories, socials } from '#lib/data/index.ts';
	import { getTech } from '#lib/utils/tech-icons.ts';

	const fullName = `${profile.firstName} ${profile.lastName}`;
	const title = `${fullName} — ${profile.role}`;
	const absolute = (path: string) => (site.url ? `${site.url}${path}` : path);

	const currentJob = experiences.find((job) => job.current);
	const currentSchool = education.find((item) => item.current);

	/** Données structurées schema.org : aident Google à relier le nom aux profils et au parcours. */
	const person = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: fullName,
		givenName: profile.firstName,
		familyName: profile.lastName,
		jobTitle: profile.role,
		description: site.description,
		email: `mailto:${profile.email}`,
		telephone: profile.phones[0].replaceAll(' ', ''),
		image: absolute(profile.photo),
		...(site.url && { url: site.url }),
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Abidjan',
			addressCountry: 'CI'
		},
		...(currentJob && { worksFor: { '@type': 'Organization', name: currentJob.company } }),
		...(currentSchool && { alumniOf: { '@type': 'CollegeOrUniversity', name: currentSchool.school } }),
		knowsAbout: skillCategories.flatMap((category) => category.techs).map((id) => getTech(id).label),
		knowsLanguage: ['fr', 'en'],
		sameAs: socials.map((social) => social.url)
	};

	// Échappe « < » pour qu'aucun texte ne puisse fermer la balise <script>
	const jsonLd = JSON.stringify(person).replace(/</g, '\u003c');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={site.description} />
	<meta name="keywords" content={site.keywords.join(', ')} />
	<meta name="author" content={fullName} />
	<meta name="robots" content="index, follow" />
	{#if site.url}
		<link rel="canonical" href="{site.url}/" />
		<meta property="og:url" content="{site.url}/" />
	{/if}

	<meta property="og:type" content="profile" />
	<meta property="og:site_name" content={fullName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:image" content={absolute('/images/logo-card.png')} />
	<meta property="og:locale" content={site.locale} />
	<meta property="profile:first_name" content={profile.firstName} />
	<meta property="profile:last_name" content={profile.lastName} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={site.description} />
	<meta name="twitter:image" content={absolute('/images/logo-card.png')} />

	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
