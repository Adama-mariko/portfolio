<script lang="ts">
	import { ArrowUpRight, Lock } from '@lucide/svelte';
	import { siGithub } from 'simple-icons';
	import BrandIcon from '#lib/components/ui/BrandIcon.svelte';
	import ProjectModal from '#lib/components/projects/ProjectModal.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import StatCard from '#lib/components/ui/StatCard.svelte';
	import TechChip from '#lib/components/ui/TechChip.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { organizationStats, organizations } from '#lib/data/index.ts';
	import type { Project } from '#lib/types/portfolio.ts';

	let activeName = $state(organizations[0].name);
	let selected = $state<Project | null>(null);

	const active = $derived(
		organizations.find((organization) => organization.name === activeName) ?? organizations[0]
	);
</script>

<section id="organizations" class="section">
	<div class="container">
		<SectionHeading
			label="06 // équipes"
			title="Projets"
			accent="en équipe"
			description="Projets menés au sein d'organisations GitHub, avec revues de code et livraisons partagées. Le code de la plupart est privé."
		/>

		<div class="tabs" role="tablist" aria-label="Organisations" use:reveal>
			{#each organizations as organization (organization.name)}
				<button
					role="tab"
					aria-selected={activeName === organization.name}
					class:active={activeName === organization.name}
					onclick={() => (activeName = organization.name)}
				>
					{organization.name}
				</button>
			{/each}
		</div>

		<div class="org-head">
			<div>
				<p class="description">{active.description}</p>
				<p class="label role">Rôle : {active.role}</p>
			</div>
			{#if active.url}
				<a class="label github underline-hover" href={active.url} target="_blank" rel="noopener noreferrer">
					<BrandIcon icon={siGithub} size={12} /> Organisation GitHub
				</a>
			{/if}
		</div>

		<div class="cards">
			{#each active.projects as project (project.slug)}
				<button class="panel glow card" onclick={() => (selected = project)}>
					<div class="card-top">
						<span class="label kind">{project.kind}</span>
						{#if project.private}
							<span class="label private"><Lock size={10} /> privé</span>
						{/if}
					</div>
					<h3>{project.name}</h3>
					<p>{project.summary}</p>
					<div class="chips">
						{#each project.stack as tech (tech)}<TechChip {tech} />{/each}
					</div>
					<span class="label open">Voir la fiche <ArrowUpRight size={12} /></span>
				</button>
			{/each}
		</div>

		<div class="stats">
			{#each organizationStats as stat, index (stat.label)}
				<div use:reveal={index * 60}><StatCard {stat} size="sm" /></div>
			{/each}
		</div>
	</div>
</section>

{#if selected}
	<ProjectModal project={selected} onClose={() => (selected = null)} />
{/if}

<style>
	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-bottom: 40px;
	}

	.tabs button {
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

	.tabs button:hover {
		color: var(--fg);
	}

	.tabs button.active {
		border-color: var(--accent);
		background: var(--accent);
		color: var(--bg);
	}

	.org-head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 24px;
	}

	.description {
		max-width: 40rem;
		font-size: 16px;
		color: var(--fg-muted);
	}

	.role {
		margin-top: 8px;
		color: var(--accent);
	}

	.github {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--fg-muted);
	}

	.github:hover {
		color: var(--accent);
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 16px;
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 24px;
		border-radius: var(--radius-lg);
		text-align: left;
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		gap: 12px;
	}

	.kind {
		color: var(--accent);
	}

	.private {
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}

	h3 {
		font-size: 20px;
		font-weight: 600;
	}

	.card p {
		flex: 1;
		font-size: 14px;
		line-height: 1.7;
		color: var(--fg-muted);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.open {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 4px;
		transition: color 0.3s ease;
	}

	.card:hover .open {
		color: var(--accent);
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 16px;
		margin-top: 64px;
	}

	@media (max-width: 767px) {
		.cards {
			grid-template-columns: 1fr;
		}

		.stats {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
