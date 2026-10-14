<script lang="ts">
	import ExperienceRow from '#lib/components/experience/ExperienceRow.svelte';
	import SectionHeading from '#lib/components/ui/SectionHeading.svelte';
	import { reveal } from '#lib/actions/reveal.ts';
	import { experiences } from '#lib/data/index.ts';

	let openHash = $state<string | null>(experiences[0].hash);

	function toggle(hash: string) {
		openHash = openHash === hash ? null : hash;
	}
</script>

<section id="experience" class="section">
	<div class="container container-narrow">
		<SectionHeading
			label="03 // parcours"
			title="Historique"
			accent="des commits"
			description="Mon parcours professionnel, du plus récent au plus ancien. Cliquez sur une ligne pour voir le détail."
		/>

		<div class="panel hud-corners log" use:reveal>
			<div class="command mono">
				<span class="accent">$</span>
				<span>git log --oneline --all</span>
				<span class="cursor blink"></span>
				<span class="label count">{experiences.length} commits</span>
			</div>

			<div class="entries">
				<span class="rail" aria-hidden="true"></span>
				<ol>
					{#each experiences as job, index (job.hash)}
						<ExperienceRow
							{job}
							isHead={index === 0}
							open={openHash === job.hash}
							onToggle={() => toggle(job.hash)}
						/>
					{/each}
				</ol>
			</div>

			<div class="command mono footer">
				<span class="accent">$</span>
				<span class="cursor blink"></span>
			</div>
		</div>
	</div>
</section>

<style>
	.log {
		border-radius: var(--radius-lg);
	}

	.command {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px 20px;
		border-bottom: 1px solid var(--border-subtle);
		font-size: 11px;
		color: var(--fg-muted);
	}

	.command.footer {
		border-top: 1px solid var(--border-subtle);
		border-bottom: 0;
	}

	.accent {
		color: var(--accent);
	}

	.cursor {
		display: inline-block;
		width: 7px;
		height: 12px;
		background: var(--accent);
	}

	.count {
		margin-left: auto;
		font-size: 9px;
		letter-spacing: 0.2em;
	}

	.entries {
		position: relative;
		padding-block: 8px;
	}

	/* Ligne verticale qui relie les commits */
	.rail {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 31px;
		width: 1px;
		background: var(--border-medium);
	}

	@media (max-width: 640px) {
		.count {
			display: none;
		}

		.rail {
			left: 25px;
		}
	}
</style>
