<script lang="ts">
	import { SquareTerminal } from '@lucide/svelte';
	import { ui } from '#lib/stores/ui.svelte.ts';

	/** Ouvre / ferme le terminal avec la touche ` (ou ² sur clavier AZERTY). */
	function onKeydown(event: KeyboardEvent) {
		if ((event.target as HTMLElement).closest('input, textarea')) return;
		if (event.key === '`' || event.key === '²') {
			event.preventDefault();
			ui.toggleTerminal();
		}
	}
</script>

<svelte:window onkeydown={onKeydown} />

<button
	class="launcher panel glow"
	onclick={() => ui.toggleTerminal()}
	aria-label="Ouvrir le terminal"
	title="Terminal ( ² )"
>
	<SquareTerminal size={20} />
</button>

<style>
	.launcher {
		position: fixed;
		right: 20px;
		bottom: 70px;
		z-index: 300;
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: var(--radius);
		color: var(--fg-muted);
	}

	.launcher:hover {
		color: var(--accent);
	}
</style>
