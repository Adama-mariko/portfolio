<script lang="ts">
	import { profile } from '#lib/data/index.ts';
	import { ui } from '#lib/stores/ui.svelte.ts';

	const [name, domain] = profile.handle.split('.');
</script>

<a href="#hero" class="logo" aria-label="Retour en haut de page" onclick={() => (ui.menuOpen = false)}>
	<img src="/images/favicon.png" alt="" width="28" height="28" />
	<span class="mono">{name}<span class="dot">.</span>{domain}</span>
</a>

<style>
	.logo {
		position: relative;
		z-index: 210;
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 11px;
		letter-spacing: 0.15em;
	}

	img {
		border-radius: 6px;
	}

	.dot {
		color: var(--accent);
	}
</style>
