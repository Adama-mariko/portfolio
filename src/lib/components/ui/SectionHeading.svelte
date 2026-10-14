<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '#lib/actions/reveal.ts';

	interface Props {
		/** Ex. « 02 // stack » */
		label: string;
		title: string;
		/** Seconde ligne du titre, en couleur d'accent. */
		accent: string;
		description?: string;
		aside?: Snippet;
	}

	let { label, title, accent, description, aside }: Props = $props();
</script>

<header class="heading" use:reveal>
	<div class="topline">
		<span class="label tag">[ {label} ]</span>
		<span class="fade-line line"></span>
		<span class="mono plus">+</span>
	</div>

	<div class="row">
		<h2>
			<span>{title}</span>
			<span class="accent">{accent}</span>
		</h2>
		{#if aside}
			<div class="aside">{@render aside()}</div>
		{/if}
	</div>

	{#if description}
		<p class="description">{description}</p>
	{/if}
</header>

<style>
	.heading {
		margin-bottom: 80px;
	}

	.topline {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 24px;
	}

	.tag {
		font-size: 11px;
		letter-spacing: 0.3em;
		color: var(--accent);
	}

	.line {
		flex: 1;
	}

	.plus {
		font-size: 10px;
		color: var(--fg-faint);
	}

	.row {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 32px;
	}

	h2 {
		display: flex;
		flex-direction: column;
		font-size: clamp(2.25rem, 6vw, 4.5rem);
		font-weight: 600;
		line-height: 0.95;
		letter-spacing: -0.025em;
		text-transform: uppercase;
	}

	.accent {
		color: var(--accent);
	}

	.aside {
		flex-shrink: 0;
	}

	.description {
		margin-top: 24px;
		max-width: 36rem;
		font-size: 15px;
		line-height: 1.7;
		color: var(--fg-muted);
	}

	@media (max-width: 1023px) {
		.aside {
			display: none;
		}
	}

	@media (min-width: 1024px) {
		.heading {
			margin-bottom: 112px;
		}
	}
</style>
