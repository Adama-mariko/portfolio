<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { Calendar, Download, ExternalLink, Lock, Tag, User, X } from '@lucide/svelte';
	import { siGithub } from 'simple-icons';
	import BrandIcon from '#lib/components/ui/BrandIcon.svelte';
	import TechChip from '#lib/components/ui/TechChip.svelte';
	import ProjectCover from './ProjectCover.svelte';
	import type { Project } from '#lib/types/portfolio.ts';

	let { project, onClose }: { project: Project; onClose: () => void } = $props();

	const isLive = $derived(project.links.some((link) => link.kind === 'live'));

	onMount(() => {
		// Empêche la page de défiler derrière la fenêtre
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => (document.body.style.overflow = previous);
	});
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && onClose()} />

<div
	class="backdrop"
	role="presentation"
	transition:fade={{ duration: 200 }}
	onclick={(event) => event.target === event.currentTarget && onClose()}
>
	<div
		class="modal panel hud-corners"
		role="dialog"
		aria-modal="true"
		aria-labelledby="project-title"
		transition:scale={{ start: 0.96, duration: 250 }}
	>
		<div class="bar">
			<span class="label title"><span class="dot pulse"></span>// project_file — {project.slug}</span>
			<button class="close" onclick={onClose} aria-label="Fermer"><X size={18} /></button>
		</div>

		<div class="layout">
			<div class="visual">
				{#if project.image}
					<img src={project.image} alt="Capture d'écran de {project.name}" />
				{:else}
					<ProjectCover {project} />
				{/if}
				<div class="scanlines overlay"></div>

				<span class="status label" class:live={isLive}>
					{#if isLive}
						<span class="dot pulse"></span>en ligne
					{:else if project.private}
						<Lock size={10} /> code privé
					{:else}
						open source
					{/if}
				</span>

				<div class="visual-caption">
					<h3 id="project-title">{project.name}</h3>
					<div class="meta mono">
						<span><Calendar size={12} /> {project.year}</span>
						<span><Tag size={12} /> {project.kind}</span>
						<span><User size={12} /> {project.role}</span>
					</div>
				</div>
			</div>

			<div class="info">
				<div>
					<p class="label heading">// mission_brief</p>
					<p class="mission">{project.mission}</p>
				</div>

				<div>
					<p class="label heading">// highlights</p>
					<ul class="highlights">
						{#each project.highlights as highlight (highlight)}
							<li><span class="mono plus">+</span>{highlight}</li>
						{/each}
					</ul>
				</div>

				<div>
					<p class="label heading">// stack</p>
					<div class="chips">
						{#each project.stack as tech (tech)}<TechChip {tech} />{/each}
					</div>
				</div>

				{#if project.links.length}
					<div class="links">
						{#each project.links as link (link.url)}
							<a class="link underline-hover" href={link.url} target="_blank" rel="noopener noreferrer">
								{#if link.kind === 'live'}<ExternalLink
										size={12}
									/>{:else if link.kind === 'download'}<Download size={12} />{:else}<BrandIcon
										icon={siGithub}
										size={12}
									/>{/if}
								{link.label}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 320;
		display: grid;
		place-items: center;
		padding: 16px;
		background: rgba(2, 4, 3, 0.8);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		overflow-y: auto;
	}

	.modal {
		width: min(1100px, 100%);
		border-radius: var(--radius-lg);
		overflow: hidden;
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 16px;
		border-bottom: 1px solid var(--border-subtle);
	}

	.title {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
		overflow: hidden;
		white-space: nowrap;
	}

	.dot {
		flex-shrink: 0;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
	}

	.close {
		display: grid;
		color: var(--fg-muted);
		transition: color 0.2s ease;
	}

	.close:hover {
		color: var(--accent);
	}

	.layout {
		display: grid;
		grid-template-columns: 2fr 1fr;
	}

	.visual {
		position: relative;
		height: 500px;
		overflow: hidden;
	}

	.visual img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
	}

	.overlay {
		position: absolute;
		inset: 0;
		opacity: 0.3;
		pointer-events: none;
	}

	.status {
		position: absolute;
		top: 16px;
		right: 16px;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 4px 8px;
		border-radius: var(--radius-sm);
		background: rgba(5, 7, 10, 0.85);
		font-size: 9px;
		letter-spacing: 0.1em;
	}

	.status.live {
		color: var(--accent);
	}

	.visual-caption {
		position: absolute;
		inset: auto 0 0;
		padding: 56px 20px 16px;
		background: linear-gradient(transparent, rgba(5, 7, 10, 0.95));
	}

	h3 {
		margin-bottom: 6px;
		font-size: clamp(1.25rem, 2.5vw, 1.5rem);
		font-weight: 500;
		line-height: 1.2;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 16px;
		font-size: 10px;
		color: var(--fg-muted);
	}

	.meta span {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 24px;
		border-left: 1px solid var(--border-subtle);
	}

	.heading {
		margin-bottom: 8px;
		font-size: 9px;
	}

	.mission {
		font-size: 14px;
		line-height: 1.7;
		color: var(--fg-muted);
	}

	.highlights {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.highlights li {
		display: flex;
		gap: 8px;
		font-size: 12px;
		line-height: 1.6;
		color: var(--fg-muted);
	}

	.plus {
		flex-shrink: 0;
		color: var(--accent);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		margin-top: auto;
		padding-top: 8px;
	}

	.link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--fg);
		transition: color 0.3s ease;
	}

	.link:hover {
		color: var(--accent);
	}

	@media (max-width: 1023px) {
		.layout {
			grid-template-columns: 1fr;
		}

		.visual {
			height: 280px;
		}

		.info {
			border-left: 0;
			border-top: 1px solid var(--border-subtle);
		}
	}
</style>
