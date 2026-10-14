<script lang="ts">
	import { Briefcase, Code, GraduationCap, MapPin, ShieldCheck, Users, Zap } from '@lucide/svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import StatCard from '#lib/components/ui/StatCard.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { aboutStats, identity, profile, values } from '#lib/data/index.ts';

	const facts = [
		{ icon: Briefcase, text: 'Développeur full stack chez Jeko, fintech de paiement' },
		{ icon: GraduationCap, text: 'Licence 2 Génie Logiciel et Réseaux à l’UVCI' },
		{ icon: MapPin, text: 'Basé à Abidjan, ouvert à la mobilité en France' }
	];

	const valueIcons = { code: Code, shield: ShieldCheck, users: Users, zap: Zap };
</script>

<section id="about" class="section">
	<div class="container container-narrow">
		<SectionHeading label="01 // profil" title="Qui" accent="suis-je" description={profile.summary}>
			{#snippet aside()}
				<div class="signature">
					<span class="label">// signature</span>
					<img src={profile.logo} alt="Logo AM" width="120" height="76" />
				</div>
			{/snippet}
		</SectionHeading>

		<div class="grid">
			<article class="panel hud-corners id-card" use:reveal>
				<div class="card-head">
					<span class="label">// id_card</span>
					<img src="/images/favicon.png" alt="" width="28" height="28" />
				</div>

				<div class="photo">
					<img
						src={profile.photo}
						alt="Portrait de {profile.firstName} {profile.lastName}"
						width="420"
						height="495"
					/>
					<div class="scanlines photo-overlay"></div>
				</div>

				<dl>
					{#each identity as [key, value] (key)}
						<div class="row">
							<dt class="label">{key}</dt>
							<dd>{value}</dd>
						</div>
					{/each}
				</dl>
			</article>

			<div class="content">
				<div class="text" use:reveal={80}>
					{#each profile.about as paragraph (paragraph)}
						<p>{paragraph}</p>
					{/each}
				</div>

				<ul class="facts" use:reveal={120}>
					{#each facts as fact (fact.text)}
						<li>
							<span class="fact-icon"><fact.icon size={16} /></span>
							{fact.text}
						</li>
					{/each}
				</ul>

				<div class="stats" use:reveal={160}>
					{#each aboutStats as stat (stat.label)}
						<StatCard {stat} size="sm" />
					{/each}
				</div>
			</div>
		</div>

		<div class="values">
			{#each values as value, index (value.title)}
				{@const Icon = valueIcons[value.icon]}
				<article class="panel glow value" use:reveal={index * 80}>
					<div class="value-head">
						<span class="value-icon"><Icon size={16} /></span>
						<span class="label">0{index + 1}</span>
					</div>
					<h3>{value.title}</h3>
					<p>{value.text}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.signature {
		position: relative;
		padding-bottom: 12px;
		border-bottom: 1px solid var(--accent-border);
	}

	.signature .label {
		position: absolute;
		top: -18px;
		right: 0;
		font-size: 9px;
		white-space: nowrap;
	}

	.signature img {
		height: 56px;
		width: auto;
		border-radius: var(--radius-sm);
		opacity: 0.85;
	}

	.grid {
		display: grid;
		grid-template-columns: 2fr 3fr;
		gap: 24px;
		margin-bottom: 80px;
	}

	.id-card {
		padding: 32px;
		border-radius: var(--radius-lg);
	}

	.card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 24px;
	}

	.card-head img {
		border-radius: 6px;
		opacity: 0.7;
	}

	.photo {
		position: relative;
		margin-bottom: 20px;
		border: 1px solid var(--border-medium);
		border-radius: var(--radius);
		overflow: hidden;
		aspect-ratio: 4 / 4.2;
	}

	.photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: top;
	}

	.photo-overlay {
		position: absolute;
		inset: 0;
		opacity: 0.25;
	}

	.row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		padding-block: 12px;
		border-bottom: 1px solid var(--border-subtle);
		font-family: var(--font-mono);
		font-size: 12px;
	}

	.row:last-child {
		border-bottom: 0;
	}

	dt {
		flex-shrink: 0;
		letter-spacing: 0.15em;
	}

	dd {
		margin: 0;
		min-width: 0;
		text-align: right;
		overflow-wrap: anywhere;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 32px;
	}

	.text {
		display: flex;
		flex-direction: column;
		gap: 16px;
		font-size: clamp(1.05rem, 1.6vw, 1.25rem);
		font-weight: 300;
		line-height: 1.7;
		color: var(--fg-muted);
	}

	.facts li {
		display: flex;
		align-items: center;
		gap: 16px;
		padding-block: 14px;
		border-bottom: 1px solid var(--border-subtle);
		font-size: 15px;
		font-weight: 300;
	}

	.fact-icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 32px;
		height: 32px;
		border-radius: var(--radius);
		background: var(--accent-glow);
		color: var(--accent);
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
	}

	.values {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.value {
		padding: 24px;
		border-radius: var(--radius-lg);
	}

	.value-head {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-bottom: 16px;
	}

	.value-icon {
		display: grid;
		padding: 10px;
		border-radius: var(--radius-sm);
		background: var(--bg-elevated);
		color: var(--fg-muted);
		transition: color 0.5s ease;
	}

	.value:hover .value-icon {
		color: var(--accent);
	}

	.value h3 {
		margin-bottom: 8px;
		font-size: 16px;
		font-weight: 500;
	}

	.value p {
		font-size: 14px;
		line-height: 1.7;
		color: var(--fg-muted);
	}

	@media (max-width: 1023px) {
		.grid,
		.values {
			grid-template-columns: 1fr;
		}

		.id-card {
			padding: 24px;
		}
	}
</style>
