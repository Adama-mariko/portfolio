<script lang="ts">
	import type { Stat } from '#lib/types/portfolio.ts';

	let { stat, size = 'md' }: { stat: Stat; size?: 'sm' | 'md' } = $props();
</script>

<div class="panel glow stat" class:sm={size === 'sm'}>
	<strong>{stat.value}</strong>
	<span class="label">{stat.label}</span>
</div>

<style>
	.stat {
		min-width: 0;
		padding: 28px 12px;
		border-radius: var(--radius-lg);
		text-align: center;
	}

	strong {
		display: block;
		margin-bottom: 6px;
		font-size: clamp(1.75rem, 4vw, 3rem);
		font-weight: 600;
		line-height: 1.1;
		color: var(--accent);
	}

	.label {
		display: block;
		font-size: 9px;
		letter-spacing: 0.2em;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.sm {
		padding: 18px 10px;
	}

	.sm strong {
		font-size: clamp(1.5rem, 3vw, 2.25rem);
	}

	@media (max-width: 480px) {
		.label {
			font-size: 8px;
			letter-spacing: 0.1em;
		}
	}
</style>
