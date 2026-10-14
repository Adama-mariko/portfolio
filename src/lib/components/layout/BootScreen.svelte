<script lang="ts">
	import { onMount } from 'svelte';

	const lines = [
		{ text: '> boot am.dev --env=production', ok: true },
		{ text: '> mounting modules: sveltekit laravel flutter', ok: true },
		{ text: '> initializing interface...', ok: false }
	];

	let hidden = $state(false);
	let removed = $state(false);

	onMount(() => {
		const hideTimer = setTimeout(() => (hidden = true), 1600);
		const removeTimer = setTimeout(() => (removed = true), 2300);
		return () => {
			clearTimeout(hideTimer);
			clearTimeout(removeTimer);
		};
	});
</script>

{#if !removed}
	<div class="boot" class:hidden aria-hidden="true">
		<div class="log mono">
			{#each lines as line, index (line.text)}
				<div class="line" style:animation-delay="{0.2 + index * 0.5}s">
					{line.text}
					{#if line.ok}
						<span class="ok">[OK]</span>
					{:else}
						<span class="cursor blink"></span>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.boot {
		position: fixed;
		inset: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 16px;
		background: var(--bg);
		transition:
			opacity 0.6s ease,
			visibility 0.6s ease;
	}

	.boot.hidden {
		opacity: 0;
		visibility: hidden;
	}

	/* Sans JavaScript, l'écran ne disparaîtrait jamais : on ne l'affiche pas. */
	:global(html:not(.js)) .boot {
		display: none;
	}

	.log {
		font-size: 12px;
		line-height: 2;
		color: var(--fg-faint);
	}

	.line {
		opacity: 0;
		animation: appear 0.1s forwards;
	}

	.ok {
		color: var(--accent);
	}

	.cursor {
		display: inline-block;
		width: 7px;
		height: 13px;
		vertical-align: middle;
		background: var(--accent);
	}

	@keyframes appear {
		to {
			opacity: 1;
		}
	}
</style>
