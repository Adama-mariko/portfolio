<script lang="ts">
	import { Mail } from '@lucide/svelte';
	import SocialIcon from '#lib/components/ui/SocialIcon.svelte';
	import { navigation, profile, socials } from '#lib/data/index.ts';

	const year = new Date().getFullYear();
</script>

<footer>
	<div class="inner">
		<p class="giant" aria-hidden="true">{profile.lastName}</p>

		<div class="content">
			<nav class="links" aria-label="Navigation de pied de page">
				{#each navigation as item (item.id)}
					<a class="label" href="#{item.id}">{item.label}</a>
				{/each}
			</nav>

			<div class="socials">
				{#each socials as social (social.id)}
					<a
						class="panel hud-corners social"
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.label}
					>
						<SocialIcon id={social.id} />
					</a>
				{/each}
				<a class="panel hud-corners social" href="mailto:{profile.email}" aria-label="Email">
					<Mail size={16} />
				</a>
			</div>

			<div class="fade-line"></div>

			<div class="bottom mono">
				<div class="credit">
					<img src="/images/favicon.png" alt="" width="16" height="16" />
					<span>© {year} {profile.firstName} {profile.lastName}</span>
				</div>
				<span>Conçu et développé à Abidjan · SvelteKit</span>
			</div>
		</div>
	</div>
</footer>

<style>
	footer {
		position: relative;
		z-index: 1;
		overflow: hidden;
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 80px 24px 32px;
	}

	.giant {
		margin-bottom: 40px;
		font-size: clamp(70px, 16vw, 180px);
		font-weight: 600;
		line-height: 1;
		letter-spacing: -0.02em;
		text-transform: uppercase;
		text-align: center;
		user-select: none;
		background: linear-gradient(180deg, var(--border-medium), transparent 95%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.content {
		width: 100%;
		max-width: var(--container);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 24px;
		margin-bottom: 40px;
	}

	.links a {
		letter-spacing: 0.2em;
		color: var(--fg-muted);
		transition: color 0.3s ease;
	}

	.links a:hover {
		color: var(--accent);
	}

	.socials {
		display: flex;
		justify-content: center;
		gap: 16px;
		margin-bottom: 40px;
	}

	.social {
		display: flex;
		padding: 12px;
		border-radius: var(--radius);
		color: var(--fg-muted);
		transition: color 0.3s ease;
	}

	.social:hover {
		color: var(--accent);
	}

	.fade-line {
		margin-bottom: 24px;
	}

	.bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		font-size: 10px;
		letter-spacing: 0.05em;
		color: var(--fg-faint);
	}

	.credit {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.credit img {
		border-radius: 3px;
		opacity: 0.5;
	}

	@media (max-width: 640px) {
		.bottom {
			justify-content: center;
			text-align: center;
		}
	}
</style>
