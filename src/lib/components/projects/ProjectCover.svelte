<script lang="ts">
	import TechIcon from '#lib/components/ui/TechIcon.svelte';
	import type { Project } from '#lib/types/portfolio.ts';

	/** Visuel généré pour les projets sans capture d'écran. */
	let { project }: { project: Project } = $props();

	const [mainTech, ...otherTechs] = $derived(project.stack);
</script>

<div class="cover">
	<div class="grid-pattern" aria-hidden="true"></div>
	<span class="main-icon"><TechIcon tech={mainTech} size={44} /></span>
	<div class="others">
		{#each otherTechs.slice(0, 4) as tech (tech)}
			<TechIcon {tech} size={14} colored={false} />
		{/each}
	</div>
	<span class="kind label">{project.kind}</span>
</div>

<style>
	.cover {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 16px;
		width: 100%;
		height: 100%;
		min-height: 200px;
		padding: 32px 16px 48px;
		background: radial-gradient(circle at 50% 35%, var(--accent-glow), transparent 65%), var(--bg-elevated);
		overflow: hidden;
	}

	.grid-pattern {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(var(--border-subtle) 1px, transparent 1px),
			linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
		background-size: 24px 24px;
		mask-image: radial-gradient(circle at center, #000 20%, transparent 75%);
		-webkit-mask-image: radial-gradient(circle at center, #000 20%, transparent 75%);
	}

	.main-icon {
		position: relative;
		display: grid;
		place-items: center;
		width: 84px;
		height: 84px;
		border: 1px solid var(--border-medium);
		border-radius: 20px;
		background: var(--bg-card);
	}

	.others {
		position: relative;
		display: flex;
		gap: 12px;
		color: var(--fg-faint);
	}

	.kind {
		position: relative;
		font-size: 9px;
		text-align: center;
	}
</style>
