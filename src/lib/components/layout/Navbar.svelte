<script lang="ts">
	import { onMount } from 'svelte';
	import { Menu, X } from '@lucide/svelte';
	import Logo from './Logo.svelte';
	import MobileMenu from './MobileMenu.svelte';
	import { navigation } from '#lib/data/index.ts';
	import { ui } from '#lib/stores/ui.svelte.ts';

	let scrolled = $state(false);
	let activeId = $state('');

	onMount(() => {
		const onScroll = () => (scrolled = window.scrollY > 40);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });

		// Met en évidence le lien de la section visible au centre de l'écran
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) if (entry.isIntersecting) activeId = entry.target.id;
			},
			{ rootMargin: '-45% 0px -50% 0px' }
		);
		for (const item of navigation) {
			const section = document.getElementById(item.id);
			if (section) observer.observe(section);
		}

		return () => {
			window.removeEventListener('scroll', onScroll);
			observer.disconnect();
		};
	});
</script>

<header class:scrolled>
	<div class="inner">
		<Logo />

		<nav aria-label="Navigation principale">
			<ul>
				{#each navigation as item (item.id)}
					<li>
						<a href="#{item.id}" class:active={activeId === item.id}>
							{item.label}
							<span class="indicator"></span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<button
			class="menu-toggle"
			aria-expanded={ui.menuOpen}
			aria-controls="mobile-menu"
			onclick={() => (ui.menuOpen = !ui.menuOpen)}
		>
			<span class="label">{ui.menuOpen ? 'fermer' : 'menu'}</span>
			{#if ui.menuOpen}<X size={20} />{:else}<Menu size={20} />{/if}
		</button>
	</div>
</header>

<MobileMenu />

<style>
	header {
		position: fixed;
		inset: 0 0 auto;
		z-index: 200;
		border-bottom: 1px solid transparent;
		transition:
			background 0.4s ease,
			border-color 0.4s ease;
	}

	header.scrolled {
		background: rgba(5, 7, 10, 0.8);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-bottom-color: var(--border-subtle);
	}

	.inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: var(--container);
		margin-inline: auto;
		padding: 14px 24px;
	}

	ul {
		display: flex;
		align-items: center;
		gap: 28px;
	}

	nav a {
		position: relative;
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--fg-muted);
		transition: color 0.3s ease;
	}

	nav a:hover,
	nav a.active {
		color: var(--accent);
	}

	.indicator {
		position: absolute;
		left: 0;
		right: 0;
		bottom: -6px;
		height: 1px;
		background: var(--accent);
		transform: scaleX(0);
		transition: transform 0.4s var(--ease-out);
	}

	nav a.active .indicator {
		transform: scaleX(1);
	}

	.menu-toggle {
		position: relative;
		z-index: 210;
		display: none;
		align-items: center;
		gap: 8px;
		color: var(--fg-muted);
		transition: color 0.3s ease;
	}

	.menu-toggle:hover {
		color: var(--accent);
	}

	.menu-toggle .label {
		color: inherit;
		letter-spacing: 0.2em;
	}

	@media (max-width: 1023px) {
		nav {
			display: none;
		}

		.menu-toggle {
			display: flex;
		}
	}

	@media (max-width: 640px) {
		.inner {
			padding-inline: 16px;
		}

		.menu-toggle .label {
			display: none;
		}
	}
</style>
