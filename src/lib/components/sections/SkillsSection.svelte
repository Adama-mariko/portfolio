<script lang="ts">
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import StatCard from '#lib/components/ui/StatCard.svelte';
	import TechTile from '#lib/components/ui/TechTile.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { skillCategories, skillStats } from '#lib/data/index.ts';

	let activeId = $state('all');

	const allTechs = [...new Set(skillCategories.flatMap((category) => category.techs))];
	const visibleTechs = $derived(
		activeId === 'all'
			? allTechs
			: (skillCategories.find((category) => category.id === activeId)?.techs ?? [])
	);
</script>

<section id="skills" class="section">
	<div class="container container-narrow">
		<SectionHeading
			label="02 // stack"
			title="Outils &"
			accent="technologies"
			description="Les technologies que j'utilise au quotidien, du frontend au déploiement, en passant par le mobile et les bases de données."
		/>

		<div class="panel hud-corners board" use:reveal>
			<div class="board-head">
				<span class="label">// stack — {allTechs.length} modules</span>

				<div class="tabs" role="tablist" aria-label="Filtrer par catégorie">
					<button
						role="tab"
						aria-selected={activeId === 'all'}
						class:active={activeId === 'all'}
						onclick={() => (activeId = 'all')}
					>
						Tous
					</button>
					{#each skillCategories as category (category.id)}
						<button
							role="tab"
							aria-selected={activeId === category.id}
							class:active={activeId === category.id}
							onclick={() => (activeId = category.id)}
						>
							{category.label}
						</button>
					{/each}
				</div>
			</div>

			<div class="mosaic">
				{#each visibleTechs as tech (tech)}
					<TechTile {tech} />
				{/each}
			</div>
		</div>

		<div class="stats">
			{#each skillStats as stat, index (stat.label)}
				<div use:reveal={index * 60}><StatCard {stat} /></div>
			{/each}
		</div>
	</div>
</section>

<style>
	.board {
		margin-bottom: 64px;
		border-radius: 16px;
	}

	.board-head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 16px;
		border-bottom: 1px solid var(--border-subtle);
	}

	.tabs {
		display: flex;
		flex-wrap: wrap;
		border: 1px solid var(--border-subtle);
		border-radius: 6px;
		overflow: hidden;
	}

	.tabs button {
		padding: 5px 10px;
		font-family: var(--font-mono);
		font-size: 9px;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--fg-faint);
		transition:
			background 0.3s ease,
			color 0.3s ease;
	}

	.tabs button:hover {
		color: var(--fg);
	}

	.tabs button.active {
		background: var(--accent);
		color: var(--bg);
	}

	.mosaic {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
		gap: 8px;
		padding: 16px;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}

	@media (max-width: 767px) {
		.mosaic {
			grid-template-columns: repeat(auto-fill, minmax(72px, 1fr));
			gap: 6px;
			padding: 12px;
		}

		.stats {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
