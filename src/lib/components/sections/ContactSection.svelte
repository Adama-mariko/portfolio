<script lang="ts">
	import { ArrowUpRight, FileDown, Mail, Phone, Send } from '@lucide/svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import SocialIcon from '#lib/components/ui/SocialIcon.svelte';
	import WindowBar from '#lib/components/ui/WindowBar.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { profile, socials } from '#lib/data/index.ts';
	import type { SocialId } from '#lib/types/portfolio.ts';

	interface Channel {
		id: 'email' | 'phone' | SocialId;
		label: string;
		value: string;
		href: string;
	}

	/** Email et téléphone en premier, puis les réseaux déclarés dans data/profile.ts. */
	const channels: Channel[] = [
		{ id: 'email', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
		{
			id: 'phone',
			label: 'Téléphone',
			value: profile.phones[1],
			href: `tel:${profile.phones[1].replaceAll(' ', '')}`
		},
		...socials.map((social) => ({
			id: social.id,
			label: social.label,
			value: social.handle,
			href: social.url
		}))
	];

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let opened = $state(false);

	/** Pas de serveur : le message est préparé dans la messagerie du visiteur. */
	function compose(event: SubmitEvent) {
		event.preventDefault();
		const subject = encodeURIComponent(`Contact portfolio — ${name}`);
		const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
		window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
		opened = true;
	}
</script>

<section id="contact" class="section">
	<div class="container container-narrow">
		<SectionHeading
			label="07 // transmission"
			title="Travaillons"
			accent="ensemble"
			description="Une offre de poste, une mission ou une question sur mon parcours ? Écrivez-moi, je réponds sous 24 heures."
		/>

		<div class="layout">
			<div class="panel hud-corners channels" use:reveal>
				<WindowBar title="comm_channels — {channels.length} actifs" />

				<ul>
					{#each channels as channel (channel.id)}
						<li>
							<a
								href={channel.href}
								target={channel.href.startsWith('http') ? '_blank' : undefined}
								rel="noopener noreferrer"
							>
								<span class="channel-icon">
									{#if channel.id === 'email'}<Mail size={16} />
									{:else if channel.id === 'phone'}<Phone size={16} />
									{:else}<SocialIcon id={channel.id} />{/if}
								</span>
								<span class="channel-text">
									<span class="label">{channel.label}</span>
									<span class="value">{channel.value}</span>
								</span>
								<span class="arrow"><ArrowUpRight size={16} /></span>
							</a>
						</li>
					{/each}
				</ul>

				<a class="cv" href={profile.cv} download>
					<FileDown size={16} />
					<span class="mono">Télécharger mon CV (PDF)</span>
				</a>
			</div>

			<form class="panel hud-corners form" onsubmit={compose} use:reveal={100}>
				<WindowBar title="compose( )">
					<span class="label secure">canal sécurisé</span>
				</WindowBar>

				<div class="fields">
					<label>
						<span class="label">Nom</span>
						<input bind:value={name} required autocomplete="name" placeholder="Votre nom" />
					</label>
					<label>
						<span class="label">Email</span>
						<input
							bind:value={email}
							type="email"
							required
							autocomplete="email"
							placeholder="vous@exemple.com"
						/>
					</label>
					<label>
						<span class="label">Message</span>
						<textarea
							bind:value={message}
							required
							rows="6"
							placeholder="Présentez votre projet ou votre offre"></textarea>
					</label>

					<button type="submit" class="submit">
						<Send size={14} />
						envoyer( )
					</button>

					{#if opened}
						<p class="mono feedback">&gt; ouverture de votre messagerie <span class="ok">[OK]</span></p>
					{/if}
				</div>
			</form>
		</div>
	</div>
</section>

<style>
	.layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 24px;
		align-items: start;
	}

	.channels,
	.form {
		border-radius: var(--radius-lg);
	}

	.channels li + li {
		border-top: 1px solid var(--border-subtle);
	}

	.channels a {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 16px 20px;
		transition: background 0.3s ease;
	}

	.channels a:hover {
		background: rgba(5, 223, 114, 0.03);
	}

	.channel-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 40px;
		height: 40px;
		border-radius: var(--radius);
		background: var(--accent-glow);
		color: var(--accent);
	}

	.channel-text {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
	}

	.channel-text .label {
		font-size: 9px;
	}

	.value {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.arrow {
		display: grid;
		color: var(--fg-faint);
		transition:
			color 0.3s ease,
			transform 0.3s ease;
	}

	.channels a:hover .arrow {
		color: var(--accent);
		transform: translate(2px, -2px);
	}

	.cv {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 16px;
		border-top: 1px solid var(--border-subtle);
		background: var(--bg-elevated);
		font-size: 12px;
		color: var(--fg-muted);
		transition: color 0.3s ease;
	}

	.cv:hover {
		color: var(--accent);
	}

	.secure {
		color: var(--accent);
	}

	.fields {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 24px;
	}

	label .label {
		display: block;
		margin-bottom: 8px;
		font-size: 9px;
	}

	input,
	textarea {
		width: 100%;
		padding: 12px 14px;
		border: 1px solid var(--border-medium);
		border-radius: var(--radius);
		background: var(--bg);
		color: var(--fg);
		font-size: 15px;
		resize: vertical;
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	input::placeholder,
	textarea::placeholder {
		color: var(--fg-faint);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent);
		box-shadow: 0 0 0 3px var(--accent-glow);
	}

	.submit {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 14px;
		border-radius: var(--radius-sm);
		background: var(--accent);
		color: var(--bg);
		font-family: var(--font-mono);
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		transition: box-shadow 0.5s ease;
	}

	.submit:hover {
		box-shadow: 0 0 30px rgba(5, 223, 114, 0.35);
	}

	.feedback {
		font-size: 11px;
		color: var(--fg-muted);
	}

	.ok {
		color: var(--accent);
	}

	@media (max-width: 1023px) {
		.layout {
			grid-template-columns: 1fr;
		}
	}
</style>
