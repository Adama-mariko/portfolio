<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { X } from '@lucide/svelte';
	import { execute, type TerminalContext } from './commands.ts';
	import { ui } from '#lib/stores/ui.svelte.ts';

	type LineKind = 'input' | 'output' | 'info' | 'error';

	const PROMPT = 'visiteur@am.dev:~$';

	let lines = $state<{ kind: LineKind; text: string }[]>([
		{ kind: 'info', text: 'am.dev terminal v1.0 — tapez « help » pour la liste des commandes.' }
	]);
	let input = $state('');
	let history: string[] = [];
	let historyIndex = -1;

	let field: HTMLInputElement;
	let screen: HTMLDivElement;

	const context: TerminalContext = {
		clear: () => (lines = []),
		close: () => (ui.terminalOpen = false),
		openMatrix: () => (ui.matrixOpen = true)
	};

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const value = input.trim();
		input = '';
		if (!value) return;

		history.unshift(value);
		historyIndex = -1;
		lines.push({ kind: 'input', text: value });

		const result = execute(value, context);
		for (const text of result.lines) lines.push({ kind: result.error ? 'error' : 'output', text });

		await tick();
		screen?.scrollTo({ top: screen.scrollHeight });
	}

	function browseHistory(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			context.close();
		} else if (event.key === 'ArrowUp' && history.length) {
			event.preventDefault();
			historyIndex = Math.min(historyIndex + 1, history.length - 1);
			input = history[historyIndex];
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			historyIndex = Math.max(historyIndex - 1, -1);
			input = historyIndex === -1 ? '' : history[historyIndex];
		}
	}

	onMount(() => field.focus());
</script>

<div
	class="backdrop"
	role="presentation"
	onclick={(event) => event.target === event.currentTarget && context.close()}
>
	<div class="window panel hud-corners" role="dialog" aria-modal="true" aria-label="Terminal">
		<div class="bar">
			<span class="label">am — terminal</span>
			<button class="close" onclick={context.close} aria-label="Fermer le terminal">
				<X size={16} />
			</button>
		</div>

		<div class="screen mono" bind:this={screen}>
			{#each lines as line, index (index)}
				<p class="line {line.kind}">
					{#if line.kind === 'input'}<span class="prompt">{PROMPT}</span>{/if}
					<span>{line.text}</span>
				</p>
			{/each}

			<form onsubmit={submit}>
				<label class="prompt" for="terminal-input">{PROMPT}</label>
				<input
					id="terminal-input"
					bind:this={field}
					bind:value={input}
					onkeydown={browseHistory}
					autocomplete="off"
					autocapitalize="off"
					spellcheck="false"
				/>
			</form>
		</div>
	</div>
</div>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		z-index: 350;
		display: grid;
		place-items: center;
		padding: 16px;
		background: rgba(2, 4, 3, 0.7);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
	}

	.window {
		display: flex;
		flex-direction: column;
		width: min(760px, 100%);
		height: min(520px, 80vh);
		border-radius: var(--radius-lg);
		box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px 16px;
		border-bottom: 1px solid var(--border-subtle);
		background: var(--bg-elevated);
		border-radius: var(--radius-lg) var(--radius-lg) 0 0;
	}

	.close {
		display: grid;
		color: var(--fg-faint);
		transition: color 0.2s ease;
	}

	.close:hover {
		color: var(--accent);
	}

	.screen {
		flex: 1;
		overflow-y: auto;
		padding: 16px 18px;
		font-size: 12.5px;
		line-height: 1.7;
	}

	.line {
		display: flex;
		gap: 8px;
		color: var(--fg-muted);
	}

	/* Conserve l'alignement en colonnes des sorties de commandes */
	.line span:last-child {
		min-width: 0;
		white-space: pre-wrap;
		word-break: break-word;
	}

	.input {
		color: var(--fg);
	}

	.info {
		color: var(--accent);
	}

	.error {
		color: #f87171;
	}

	.prompt {
		color: var(--accent);
		white-space: nowrap;
	}

	form {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	input {
		flex: 1;
		min-width: 0;
		border: 0;
		outline: none;
		background: transparent;
		color: var(--fg);
		font: inherit;
		caret-color: var(--accent);
	}
</style>
