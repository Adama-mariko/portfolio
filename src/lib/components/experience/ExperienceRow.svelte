<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Building2, ChevronDown, MapPin } from '@lucide/svelte';
	import TechChip from '#lib/components/ui/TechChip.svelte';
	import type { Experience } from '#lib/types/portfolio.ts';

	interface Props {
		job: Experience;
		isHead: boolean;
		open: boolean;
		onToggle: () => void;
	}

	let { job, isHead, open, onToggle }: Props = $props();
</script>

<li class="entry" class:open>
	<button class="summary" aria-expanded={open} onclick={onToggle}>
		<span class="node" class:current={job.current}></span>
		<span class="hash mono">{job.hash}</span>
		{#if isHead}<span class="head mono">HEAD → main</span>{/if}

		<span class="title">
			<span class="role">{job.role}</span>
			<span class="company mono">@ {job.company}</span>
			<span class="period-inline mono">{job.period}</span>
		</span>

		<span class="type label">{job.type}</span>
		<span class="period mono">{job.period}</span>
		<span class="chevron"><ChevronDown size={14} /></span>
	</button>

	{#if open}
		<div class="details" transition:slide={{ duration: 300 }}>
			<div class="card">
				<div class="card-head">
					<span class="company-icon"><Building2 size={18} /></span>
					<div>
						<p class="mono company-name">{job.company}</p>
						{#if job.location}
							<p class="mono location"><MapPin size={10} /> {job.location}</p>
						{/if}
					</div>
				</div>

				{#if job.context}<p class="context">{job.context}</p>{/if}

				<p class="label changelog-title">// changelog</p>
				<ul class="changelog">
					{#each job.changelog as change (change)}
						<li><span class="mono plus">+</span>{change}</li>
					{/each}
				</ul>

				<div class="chips">
					{#each job.stack as tech (tech)}<TechChip {tech} />{/each}
				</div>
			</div>
		</div>
	{/if}
</li>

<style>
	.entry {
		position: relative;
	}

	.summary {
		position: relative;
		display: flex;
		align-items: center;
		gap: 16px;
		width: 100%;
		padding: 14px 20px;
		text-align: left;
		transition: background 0.3s ease;
	}

	.summary:hover {
		background: rgba(5, 223, 114, 0.03);
	}

	.node {
		position: relative;
		z-index: 1;
		flex-shrink: 0;
		width: 13px;
		height: 13px;
		margin-left: 5px;
		border: 2px solid var(--fg-faint);
		border-radius: 50%;
		background: var(--bg-card);
	}

	.node.current {
		border-color: var(--accent);
		background: var(--accent);
		box-shadow: 0 0 10px rgba(5, 223, 114, 0.6);
	}

	.hash {
		flex-shrink: 0;
		font-size: 11px;
		color: #facc15;
	}

	.head {
		flex-shrink: 0;
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		background: var(--accent-glow);
		font-size: 9px;
		color: var(--accent);
	}

	.title {
		display: flex;
		align-items: baseline;
		gap: 8px;
		flex: 1;
		min-width: 0;
	}

	.role {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 14px;
	}

	.company {
		flex-shrink: 0;
		font-size: 10px;
		color: var(--accent);
	}

	.type {
		flex-shrink: 0;
		padding: 2px 6px;
		border: 1px solid var(--border-medium);
		border-radius: var(--radius-sm);
		font-size: 9px;
		letter-spacing: 0.15em;
	}

	.period {
		flex-shrink: 0;
		font-size: 10px;
		color: var(--fg-faint);
	}

	/* Sur mobile, la période passe sous le titre */
	.period-inline {
		display: none;
		font-size: 10px;
		color: var(--fg-faint);
	}

	.chevron {
		display: grid;
		flex-shrink: 0;
		color: var(--fg-faint);
		transition: transform 0.3s ease;
	}

	.open .chevron {
		transform: rotate(180deg);
		color: var(--accent);
	}

	.details {
		padding: 4px 24px 24px 64px;
	}

	.card {
		padding: 20px;
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius);
		background: var(--bg-elevated);
	}

	.card-head {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 16px;
	}

	.company-icon {
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: var(--radius);
		background: var(--accent-glow);
		color: var(--accent);
	}

	.company-name {
		font-size: 12px;
	}

	.location {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 10px;
		color: var(--fg-faint);
	}

	.context {
		margin-bottom: 16px;
		font-size: 14px;
		line-height: 1.7;
		color: var(--fg-muted);
	}

	.changelog-title {
		margin-bottom: 10px;
		font-size: 9px;
	}

	.changelog {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 16px;
	}

	.changelog li {
		display: flex;
		gap: 10px;
		font-size: 13px;
		line-height: 1.6;
		color: var(--fg-muted);
	}

	.plus {
		flex-shrink: 0;
		color: var(--accent);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	@media (max-width: 1023px) {
		.type {
			display: none;
		}
	}

	@media (max-width: 767px) {
		.head {
			display: none;
		}

		.title {
			flex-direction: column;
			align-items: flex-start;
			gap: 2px;
		}

		.role {
			white-space: normal;
		}

		.period {
			display: none;
		}

		.period-inline {
			display: block;
		}
	}

	@media (max-width: 640px) {
		.summary {
			gap: 12px;
			padding-inline: 16px;
		}

		.hash {
			display: none;
		}

		.node {
			margin-left: 3px;
		}

		.details {
			padding: 4px 16px 20px 44px;
		}
	}
</style>
