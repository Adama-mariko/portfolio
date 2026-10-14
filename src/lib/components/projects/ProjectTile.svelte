<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import ProjectCover from './ProjectCover.svelte';
	import type { Project } from '#lib/types/portfolio.ts';

	interface Props {
		project: Project;
		/** Hauteur du visuel généré, pour varier la mosaïque. */
		coverRatio?: string;
		onOpen: () => void;
	}

	let { project, coverRatio = '4 / 5', onOpen }: Props = $props();

	const status = $derived(
		project.links.some((link) => link.kind === 'live')
			? 'en ligne'
			: project.links.some((link) => link.kind === 'download')
				? 'apk android'
				: null
	);
</script>

<button class="tile" onclick={onOpen} aria-label="Voir le détail de {project.name}">
	{#if project.image}
		<img src={project.image} alt="" loading="lazy" width="1200" height="750" />
	{:else}
		<div class="cover" style:aspect-ratio={coverRatio}><ProjectCover {project} /></div>
	{/if}

	{#if status}
		<span class="live label"><span class="dot pulse"></span>{status}</span>
	{/if}

	<span class="caption label">
		<span class="name">{project.name}</span>
		<span class="year">{project.year} <ArrowUpRight size={11} /></span>
	</span>
</button>

<style>
	.tile {
		position: relative;
		display: block;
		width: 100%;
		margin-bottom: 16px;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius);
		overflow: hidden;
		break-inside: avoid;
		text-align: left;
		background: var(--bg-card);
		transition:
			box-shadow 0.3s ease,
			border-color 0.3s ease;
	}

	.tile:hover {
		border-color: var(--accent-border);
		box-shadow: 0 0 30px var(--accent-glow);
	}

	img,
	.cover {
		width: 100%;
		transition: transform 0.5s var(--ease-out);
	}

	img {
		height: auto;
	}

	.tile:hover img,
	.tile:hover .cover {
		transform: scale(1.03);
	}

	.live {
		position: absolute;
		top: 10px;
		right: 10px;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 3px 8px;
		border-radius: var(--radius-sm);
		background: rgba(5, 7, 10, 0.8);
		font-size: 8px;
		letter-spacing: 0.15em;
		color: var(--accent);
	}

	.dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--accent);
	}

	.caption {
		position: absolute;
		inset: auto 0 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		padding: 28px 10px 8px;
		background: linear-gradient(transparent, rgba(5, 7, 10, 0.95));
		font-size: 9px;
		letter-spacing: 0.1em;
		color: var(--fg-muted);
	}

	.name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		transition: color 0.3s ease;
	}

	.tile:hover .name {
		color: var(--fg);
	}

	.year {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-shrink: 0;
	}
</style>
