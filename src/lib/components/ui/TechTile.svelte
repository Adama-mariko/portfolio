<script lang="ts">
	import TechIcon from './TechIcon.svelte';
	import { getTech, readableColor } from '#lib/utils/tech-icons.ts';
	import type { TechKey } from '#lib/types/portfolio.ts';

	let { tech }: { tech: TechKey } = $props();

	const data = $derived(getTech(tech));
</script>

<div class="tile" style:--tint={readableColor(data.color)}>
	<span class="tile-glow" aria-hidden="true"></span>
	<span class="tile-icon"><TechIcon {tech} size={30} /></span>
	<span class="tile-label">{data.label}</span>
</div>

<style>
	.tile {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 14px 6px;
		border-radius: 10px;
		border: 1px solid var(--border-subtle);
		background: var(--bg-elevated);
		overflow: hidden;
		transition:
			border-color 0.25s ease,
			transform 0.25s ease;
	}

	.tile:hover {
		border-color: var(--tint);
		transform: translateY(-2px);
	}

	.tile-glow {
		position: absolute;
		inset: 0;
		opacity: 0;
		background: radial-gradient(
			circle at 50% 0%,
			color-mix(in srgb, var(--tint) 22%, transparent),
			transparent 70%
		);
		transition: opacity 0.25s ease;
		pointer-events: none;
	}

	.tile:hover .tile-glow {
		opacity: 1;
	}

	.tile-icon {
		opacity: 0.85;
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}

	.tile:hover .tile-icon {
		opacity: 1;
		transform: scale(1.08);
	}

	.tile-label {
		position: relative;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.04em;
		color: var(--fg-muted);
		transition: color 0.25s ease;
	}

	.tile:hover .tile-label {
		color: var(--fg);
	}

	@media (max-width: 480px) {
		.tile {
			padding: 10px 4px;
			gap: 6px;
		}

		.tile-label {
			font-size: 8.5px;
		}
	}
</style>
