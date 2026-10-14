<script lang="ts">
	import { Award, GraduationCap, Target } from '@lucide/svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { education, studyGoal } from '#lib/data/index.ts';
</script>

<section id="education" class="section">
	<div class="container container-narrow">
		<SectionHeading
			label="04 // formation"
			title="Formation &"
			accent="certifications"
			description="Un parcours académique mené en parallèle d'une activité professionnelle continue."
		/>

		<div class="layout">
			<ol class="timeline">
				{#each education as item, index (item.degree)}
					<li class="panel glow item" class:current={item.current} use:reveal={index * 70}>
						<span class="icon">
							{#if item.kind === 'certificate'}<Award size={18} />{:else}<GraduationCap size={18} />{/if}
						</span>

						<div class="body">
							<div class="meta">
								<span class="label period">{item.period}</span>
							</div>
							<h3>{item.degree}</h3>
							{#if item.field}<p class="field">{item.field}</p>{/if}
							<p class="school mono">{item.school}</p>
						</div>
					</li>
				{/each}
			</ol>

			<aside class="panel hud-corners goal" use:reveal={120}>
				<span class="label">// objectif</span>
				<span class="goal-icon"><Target size={22} /></span>
				<h3>{studyGoal.title}</h3>
				<p>{studyGoal.text}</p>
			</aside>
		</div>
	</div>
</section>

<style>
	.layout {
		display: grid;
		grid-template-columns: 3fr 2fr;
		gap: 24px;
		align-items: start;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.item {
		display: flex;
		gap: 20px;
		padding: 24px;
		border-radius: var(--radius-lg);
	}

	.item.current {
		border-color: var(--accent-border);
	}

	.icon {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		border-radius: var(--radius);
		background: var(--bg-elevated);
		color: var(--fg-muted);
	}

	.current .icon {
		background: var(--accent-glow);
		color: var(--accent);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 6px;
	}

	.period {
		color: var(--accent);
	}

	h3 {
		font-size: 18px;
		font-weight: 600;
	}

	.field {
		margin-top: 2px;
		font-size: 15px;
		color: var(--fg);
	}

	.school {
		margin-top: 6px;
		font-size: 11px;
		color: var(--fg-muted);
	}

	.goal {
		position: sticky;
		top: calc(var(--nav-height) + 24px);
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 32px;
		border-radius: var(--radius-lg);
		background: radial-gradient(circle at 100% 0%, var(--accent-glow), transparent 60%), var(--bg-card);
	}

	.goal-icon {
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		border-radius: var(--radius);
		background: var(--accent-glow);
		color: var(--accent);
	}

	.goal h3 {
		font-size: 22px;
	}

	.goal p {
		font-size: 15px;
		line-height: 1.75;
		color: var(--fg-muted);
	}

	@media (max-width: 1023px) {
		.layout {
			grid-template-columns: 1fr;
		}

		.goal {
			position: static;
		}
	}

	@media (max-width: 480px) {
		.item {
			padding: 20px;
			gap: 16px;
		}
	}
</style>
