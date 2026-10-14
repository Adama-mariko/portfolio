<script lang="ts">
	import { onMount } from 'svelte';
	import { ui } from '#lib/stores/ui.svelte.ts';

	const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\[]{}=+*#_';
	const FONT_SIZE = 16;
	const FRAME_INTERVAL = 45;

	let canvas: HTMLCanvasElement;

	function close() {
		ui.matrixOpen = false;
	}

	onMount(() => {
		const context = canvas.getContext('2d');
		if (!context) return;
		const ctx = context;

		let columns: number[] = [];
		let frame = 0;
		let lastTime = 0;

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			columns = Array.from({ length: Math.ceil(canvas.width / FONT_SIZE) }, () => Math.random() * -50);
			ctx.fillStyle = '#05070a';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}

		function draw(time: number) {
			frame = requestAnimationFrame(draw);
			if (time - lastTime < FRAME_INTERVAL) return;
			lastTime = time;

			ctx.fillStyle = 'rgba(5, 7, 10, 0.12)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

			columns.forEach((row, index) => {
				const character = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
				const y = row * FONT_SIZE;
				ctx.fillStyle = Math.random() > 0.96 ? '#dcfce7' : '#05df72';
				ctx.fillText(character, index * FONT_SIZE, y);
				columns[index] = y > canvas.height && Math.random() > 0.975 ? 0 : row + 1;
			});
		}

		function onKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') close();
		}

		resize();
		frame = requestAnimationFrame(draw);
		window.addEventListener('resize', resize);
		window.addEventListener('keydown', onKeydown);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('resize', resize);
			window.removeEventListener('keydown', onKeydown);
		};
	});
</script>

<button class="matrix" onclick={close} aria-label="Quitter la matrice">
	<canvas bind:this={canvas}></canvas>
	<span class="label hint">[ clic ou échap pour quitter la matrice ]</span>
</button>

<style>
	.matrix {
		position: fixed;
		inset: 0;
		z-index: 400;
		display: block;
		width: 100%;
		background: var(--bg);
	}

	.hint {
		position: absolute;
		left: 50%;
		bottom: 28px;
		transform: translateX(-50%);
		padding: 8px 14px;
		border: 1px solid var(--green-800);
		border-radius: var(--radius-sm);
		background: rgba(5, 7, 10, 0.85);
		color: var(--accent-bright);
		white-space: nowrap;
	}
</style>
