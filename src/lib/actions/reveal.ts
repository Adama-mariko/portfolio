import type { Action } from 'svelte/action';

/**
 * Fait apparaître l'élément quand il entre dans l'écran.
 * Le style correspondant (`.reveal` / `.reveal.in`) est dans `styles/utilities.css`.
 */
export const reveal: Action<HTMLElement, number | undefined> = (node, delay = 0) => {
	node.classList.add('reveal');
	node.style.setProperty('--reveal-delay', `${delay}ms`);

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.classList.add('in');
				observer.disconnect();
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
	);
	observer.observe(node);

	return { destroy: () => observer.disconnect() };
};
