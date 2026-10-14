<script lang="ts">
	import type { Snippet } from 'svelte';

	/** En-tête de fenêtre façon terminal : titre à gauche, contenu libre à droite. */
	let { title, children }: { title: string; children?: Snippet } = $props();
</script>

<div class="bar">
	<div class="title">
		<span class="dot pulse"></span>
		<span class="label">{title}</span>
	</div>
	{#if children}
		<div class="right">{@render children()}</div>
	{/if}
</div>

<style>
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 10px 16px;
		border-bottom: 1px solid var(--border-subtle);
		background: var(--bg-elevated);
	}

	.title {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
	}

	.dot {
		flex-shrink: 0;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
	}

	.right {
		display: flex;
		align-items: center;
		gap: 12px;
	}
</style>
