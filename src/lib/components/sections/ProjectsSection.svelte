<script lang="ts">
	import { Diamond } from '@lucide/svelte';
	import ProjectModal from '#lib/components/projects/ProjectModal.svelte';
	import ProjectTile from '#lib/components/projects/ProjectTile.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { projectFilters, showcaseProjects } from '#lib/data/index.ts';
	import type { Project, ProjectCategory } from '#lib/types/portfolio.ts';

	/** Hauteurs alternées des visuels générés, pour un rendu en mosaïque. */
	const COVER_RATIOS = ['4 / 5', '1 / 1', '4 / 3', '3 / 4'];

	let activeFilter = $state<'all' | ProjectCategory>('all');
	let selected = $state<Project | null>(null);

	const filtered = $derived(
		activeFilter === 'all'
			? showcaseProjects
			: showcaseProjects.filter((project) => project.categories.includes(activeFilter as ProjectCategory))
	);
	const activeLabel = $derived(projectFilters.find((filter) => filter.id === activeFilter)?.label);
</script>

<section id="projects" class="section">
	<div class="container">
		<SectionHeading
			label="05 // projets"
			title="Projets"
			accent="réalisés"
			description="Applications web, mobiles et back-offices que j'ai conçus et développés. Cliquez sur un projet pour ouvrir sa fiche."
		/>

		<div class="filters" role="tablist" aria-label="Filtrer les projets" use:reveal>
			{#each projectFilters as filter (filter.id)}
				<button
					role="tab"
					aria-selected={activeFilter === filter.id}
					class:active={activeFilter === filter.id}
					onclick={() => (activeFilter = filter.id)}
				>
					{filter.label}
				</button>
			{/each}
		</div>

		<div class="group-head label">
			<Diamond size={10} />
			<span>{activeLabel} — {filtered.length} projets</span>
			<span class="fade-line line"></span>
		</div>

		<div class="masonry">
			{#each filtered as project, index (project.slug)}
				<ProjectTile
					{project}
					coverRatio={COVER_RATIOS[index % COVER_RATIOS.length]}
					onOpen={() => (selected = project)}
				/>
			{/each}
		</div>
	</div>
</section>

{#if selected}
	<ProjectModal project={selected} onClose={() => (selected = null)} />
{/if}

<style>
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 56px;
	}

	.filters button {
		padding: 8px 16px;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--fg-muted);
		transition: all 0.3s ease;
	}

	.filters button:hover {
		border-color: var(--border-medium);
		color: var(--fg);
	}

	.filters button.active {
		border-color: var(--accent);
		background: var(--accent);
		color: var(--bg);
	}

	.group-head {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 24px;
		color: var(--accent);
	}

	.line {
		flex: 1;
	}

	.masonry {
		columns: 4;
		column-gap: 16px;
	}

	@media (max-width: 1023px) {
		.masonry {
			columns: 3;
		}
	}

	@media (max-width: 767px) {
		.masonry {
			columns: 2;
			column-gap: 12px;
		}
	}
</style>
