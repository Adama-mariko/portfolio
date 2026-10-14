<script lang="ts">
	import { Database, Layers, Plug, Wallet } from '@lucide/svelte';
	import { getTech, readableColor } from '#lib/utils/tech-icons.ts';
	import type { TechKey } from '#lib/types/portfolio.ts';

	interface Props {
		tech: TechKey;
		size?: number;
		/** Affiche le logo dans sa couleur de marque plutôt qu'en couleur du texte. */
		colored?: boolean;
	}

	let { tech, size = 16, colored = true }: Props = $props();

	const data = $derived(getTech(tech));
	const color = $derived(colored ? readableColor(data.color) : 'currentColor');

	const fallbacks = { database: Database, api: Plug, wallet: Wallet, layers: Layers };
	const Fallback = $derived(fallbacks[data.fallback ?? 'layers']);
</script>

{#if data.icon}
	<svg width={size} height={size} viewBox="0 0 24 24" fill={color} role="img" aria-label={data.label}>
		<path d={data.icon.path} />
	</svg>
{:else}
	<Fallback
		{size}
		color={colored ? readableColor(data.color) : 'currentColor'}
		strokeWidth={1.8}
		aria-label={data.label}
	/>
{/if}
