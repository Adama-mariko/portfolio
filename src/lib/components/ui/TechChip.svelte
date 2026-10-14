<script lang="ts">
	import TechIcon from './TechIcon.svelte';
	import { getTech } from '#lib/utils/tech-icons.ts';
	import type { TechKey } from '#lib/types/portfolio.ts';

	let { tech }: { tech: TechKey } = $props();
</script>

<span class="chip">
	<TechIcon {tech} size={12} />
	{getTech(tech).label}
</span>

<style>
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 8px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border-subtle);
		background: var(--bg-elevated);
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--fg-muted);
		white-space: nowrap;
	}
</style>
