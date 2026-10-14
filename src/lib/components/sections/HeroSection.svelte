<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowDown } from '@lucide/svelte';
	import Constellation from '#lib/components/effects/Constellation.svelte';
	import { profile, projects, typedRoles } from '#lib/data/index.ts';

	const liveCount = projects.filter((project) => project.links.some((link) => link.kind === 'live')).length;

	let typed = $state(typedRoles[0]);
	let scrollY = $state(0);
	let viewportHeight = $state(1);

	/** 0 en haut de page, 1 quand le hero a fini de défiler. */
	const progress = $derived(Math.min(scrollY / (viewportHeight * 0.5), 1));

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let roleIndex = 0;
		let length = typedRoles[0].length;
		let deleting = true;
		let timer: ReturnType<typeof setTimeout>;

		// Effet machine à écrire : efface puis tape le rôle suivant
		function step() {
			const role = typedRoles[roleIndex];
			let delay = deleting ? 30 : 65;

			if (deleting) {
				length--;
				if (length === 0) {
					deleting = false;
					roleIndex = (roleIndex + 1) % typedRoles.length;
				}
			} else {
				length++;
				if (length === role.length) {
					deleting = true;
					delay = 2400;
				}
			}

			typed = typedRoles[roleIndex].slice(0, length);
			timer = setTimeout(step, delay);
		}

		timer = setTimeout(step, 3000);
		return () => clearTimeout(timer);
	});
</script>

<svelte:window bind:scrollY bind:innerHeight={viewportHeight} />

<section id="hero" class="hero">
	<div class="sticky">
		<div class="background" aria-hidden="true">
			<Constellation />
			<div class="vignette"></div>
			<div class="scanlines overlay"></div>
		</div>

		<div class="frame" aria-hidden="true">
			<span class="corner top-left"></span>
			<span class="corner top-right"></span>
			<span class="corner bottom-left"></span>
			<span class="corner bottom-right"></span>
		</div>

		<div class="bar top label">
			<span>sys.am_dev // v2026</span>
			<span class="status">
				<span class="dot pulse"></span>
				Disponible
			</span>
		</div>

		<div class="center" style:opacity={1 - progress * 0.9} style:transform="scale({1 - progress * 0.08})">
			<p class="label kicker">[ {profile.tagline} ]</p>

			<h1>
				<span>{profile.firstName}</span>
				<span class="outlined">{profile.lastName}</span>
			</h1>

			<p class="typed mono" aria-label={profile.role}>
				<span class="accent">&gt;</span>
				<span>{typed}</span>
				<span class="caret blink"></span>
			</p>

			<div class="actions">
				<a href="#projects" class="button primary">voir_projets( )</a>
				<a href="#contact" class="button secondary hud-corners">init_contact( )</a>
			</div>
		</div>

		<div class="bar bottom label">
			<span>{profile.coordinates}</span>
			<a href="#about" class="scroll">
				défiler <ArrowDown size={12} />
			</a>
			<span class="hide-mobile">{liveCount} projets en ligne</span>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		height: 150vh;
	}

	.sticky {
		position: sticky;
		top: 0;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100vh;
		height: 100svh;
		overflow: hidden;
	}

	.background,
	.overlay,
	.vignette {
		position: absolute;
		inset: 0;
	}

	.vignette {
		background:
			radial-gradient(ellipse at 50% 45%, rgba(5, 223, 114, 0.08), transparent 55%),
			radial-gradient(ellipse at center, transparent 40%, var(--bg) 100%);
		pointer-events: none;
	}

	.overlay {
		opacity: 0.4;
		pointer-events: none;
	}

	/* Cadre de visée aux quatre coins */
	.frame {
		position: absolute;
		inset: 24px;
		z-index: 10;
		pointer-events: none;
	}

	.corner {
		position: absolute;
		width: 22px;
		height: 22px;
		border: 0 solid var(--accent);
		opacity: 0.7;
	}

	.top-left {
		top: 0;
		left: 0;
		border-top-width: 1px;
		border-left-width: 1px;
	}

	.top-right {
		top: 0;
		right: 0;
		border-top-width: 1px;
		border-right-width: 1px;
	}

	.bottom-left {
		bottom: 0;
		left: 0;
		border-bottom-width: 1px;
		border-left-width: 1px;
	}

	.bottom-right {
		bottom: 0;
		right: 0;
		border-bottom-width: 1px;
		border-right-width: 1px;
	}

	.bar {
		position: relative;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-inline: 24px;
		padding: 8px 16px;
		letter-spacing: 0.2em;
	}

	.bar.top {
		margin-top: 70px;
	}

	.bar.bottom {
		margin-bottom: 24px;
	}

	.status {
		display: flex;
		align-items: center;
		gap: 8px;
		color: var(--accent);
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
	}

	.scroll {
		display: flex;
		align-items: center;
		gap: 8px;
		transition: color 0.3s ease;
	}

	.scroll:hover {
		color: var(--accent);
	}

	.center {
		position: relative;
		z-index: 20;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-inline: 24px;
		text-align: center;
		will-change: transform, opacity;
	}

	.kicker {
		margin-bottom: 32px;
		font-size: 11px;
		letter-spacing: 0.4em;
		color: var(--fg-muted);
	}

	h1 {
		display: flex;
		flex-direction: column;
		font-size: clamp(3.5rem, 13vw, 10rem);
		font-weight: 600;
		line-height: 0.9;
		letter-spacing: -0.02em;
		text-transform: uppercase;
	}

	.outlined {
		color: transparent;
		-webkit-text-stroke: 1.5px var(--accent);
	}

	.typed {
		display: flex;
		align-items: center;
		gap: 12px;
		height: 24px;
		margin-top: 32px;
		font-size: 14px;
		letter-spacing: 0.3em;
		color: var(--fg-muted);
	}

	.accent {
		color: var(--accent);
	}

	.caret {
		display: inline-block;
		width: 8px;
		height: 14px;
		background: var(--accent);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 16px;
		margin-top: 56px;
	}

	.button {
		padding: 14px 32px;
		border-radius: var(--radius-sm);
		font-family: var(--font-mono);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		transition:
			box-shadow 0.5s ease,
			color 0.3s ease;
	}

	.primary {
		background: var(--accent);
		color: var(--bg);
	}

	.primary:hover {
		box-shadow: 0 0 30px rgba(5, 223, 114, 0.35);
	}

	.secondary {
		border: 1px solid var(--border-medium);
		color: var(--fg);
	}

	.secondary:hover {
		color: var(--accent);
	}

	@media (max-width: 767px) {
		.frame {
			inset: 16px;
		}

		.bar {
			margin-inline: 16px;
			font-size: 9px;
		}

		.bar.top {
			margin-top: 64px;
		}

		.bar.bottom {
			margin-bottom: 16px;
		}

		.kicker {
			font-size: 9px;
			letter-spacing: 0.25em;
		}

		.typed {
			font-size: 11px;
			letter-spacing: 0.15em;
		}

		.hide-mobile {
			display: none;
		}
	}
</style>
