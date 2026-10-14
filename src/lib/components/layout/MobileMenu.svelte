<script lang="ts">
	import { navigation, socials } from '#lib/data/index.ts';
	import { ui } from '#lib/stores/ui.svelte.ts';

	const close = () => (ui.menuOpen = false);
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && close()} />

<div id="mobile-menu" class="overlay" class:open={ui.menuOpen} aria-hidden={!ui.menuOpen}>
	<nav aria-label="Navigation mobile">
		{#each navigation as item, index (item.id)}
			<a href="#{item.id}" onclick={close} tabindex={ui.menuOpen ? 0 : -1} style:--i={index}>
				<span class="mono index">0{index + 1}</span>
				<span class="mono name">{item.label}</span>
			</a>
		{/each}
	</nav>

	<div class="socials">
		{#each socials as social (social.id)}
			<a
				class="label underline-hover"
				href={social.url}
				target="_blank"
				rel="noopener noreferrer"
				tabindex={ui.menuOpen ? 0 : -1}
			>
				{social.label}
			</a>
		{/each}
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 150;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(5, 7, 10, 0.97);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.4s ease,
			visibility 0.4s ease;
	}

	.overlay.open {
		opacity: 1;
		visibility: visible;
	}

	nav {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 4px;
		padding-inline: 32px;
	}

	nav a {
		display: flex;
		align-items: baseline;
		gap: 20px;
		padding-block: 10px;
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.5s var(--ease-out),
			transform 0.5s var(--ease-out);
		transition-delay: calc(var(--i) * 50ms);
	}

	.open nav a {
		opacity: 1;
		transform: none;
	}

	.index {
		font-size: 10px;
		color: var(--accent);
	}

	.name {
		font-size: clamp(1.875rem, 8vw, 3rem);
		text-transform: uppercase;
		letter-spacing: -0.02em;
		transition:
			color 0.3s ease,
			transform 0.3s ease;
	}

	nav a:hover .name {
		color: var(--accent);
		transform: translateX(8px);
	}

	.socials {
		position: absolute;
		bottom: 48px;
		display: flex;
		gap: 32px;
	}

	.socials a {
		font-size: 11px;
		letter-spacing: 0.2em;
		color: var(--fg-muted);
	}

	.socials a:hover {
		color: var(--accent);
	}
</style>
