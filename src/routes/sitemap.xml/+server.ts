import { site } from '#lib/data/index.ts';

export const prerender = true;

/** Sitemap pour les moteurs de recherche (une seule page). */
export function GET() {
	const today = new Date().toISOString().slice(0, 10);
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>${site.url}/</loc>
		<lastmod>${today}</lastmod>
		<changefreq>monthly</changefreq>
		<priority>1.0</priority>
	</url>
</urlset>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
