<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * Champ d'étoiles reliées entre elles. Les étoiles suivent légèrement
	 * la souris et peuvent être attrapées et déplacées.
	 */
	interface Props {
		/** Nombre d'étoiles pour 10 000 px² (densité). */
		density?: number;
		interactive?: boolean;
	}

	let { density = 0.9, interactive = true }: Props = $props();

	interface Star {
		x: number;
		y: number;
		vx: number;
		vy: number;
		radius: number;
		phase: number;
	}

	const LINK_DISTANCE = 130;
	const MOUSE_DISTANCE = 170;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const context = canvas.getContext('2d');
		if (!context) return;
		const ctx = context;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const mouse = { x: -9999, y: -9999 };
		let stars: Star[] = [];
		let grabbed: Star | null = null;
		let width = 0;
		let height = 0;
		let frame = 0;

		function createStars() {
			const count = Math.min(120, Math.round(((width * height) / 10000) * density));
			stars = Array.from({ length: count }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * 0.25,
				vy: (Math.random() - 0.5) * 0.25,
				radius: Math.random() * 1.4 + 0.4,
				phase: Math.random() * Math.PI * 2
			}));
		}

		function resize() {
			const rect = canvas.getBoundingClientRect();
			const ratio = Math.min(window.devicePixelRatio || 1, 2);
			width = rect.width;
			height = rect.height;
			canvas.width = width * ratio;
			canvas.height = height * ratio;
			ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
			createStars();
		}

		function toLocal(event: PointerEvent) {
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
			return { x, y, inside };
		}

		function onPointerMove(event: PointerEvent) {
			const point = toLocal(event);
			mouse.x = point.inside ? point.x : -9999;
			mouse.y = point.inside ? point.y : -9999;
			if (grabbed) {
				grabbed.x = point.x;
				grabbed.y = point.y;
			}
		}

		function onPointerDown(event: PointerEvent) {
			if ((event.target as HTMLElement).closest('a, button, input, textarea')) return;
			const point = toLocal(event);
			if (!point.inside) return;
			grabbed = stars.find((star) => Math.hypot(star.x - point.x, star.y - point.y) < 36) ?? null;
		}

		function onPointerUp() {
			grabbed = null;
		}

		function moveStar(star: Star) {
			const dx = mouse.x - star.x;
			const dy = mouse.y - star.y;
			const distance = Math.hypot(dx, dy);
			if (distance < MOUSE_DISTANCE && distance > 1) {
				star.vx += (dx / distance) * 0.004;
				star.vy += (dy / distance) * 0.004;
			}
			star.vx *= 0.995;
			star.vy *= 0.995;
			star.x += star.vx;
			star.y += star.vy;
			if (star.x < 0 || star.x > width) star.vx *= -1;
			if (star.y < 0 || star.y > height) star.vy *= -1;
		}

		function drawLine(a: { x: number; y: number }, b: { x: number; y: number }, color: string) {
			ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(a.x, a.y);
			ctx.lineTo(b.x, b.y);
			ctx.stroke();
		}

		function draw(time: number) {
			ctx.clearRect(0, 0, width, height);
			ctx.lineWidth = 1;

			for (const star of stars) {
				if (star !== grabbed && !reducedMotion) moveStar(star);
			}

			for (let i = 0; i < stars.length; i++) {
				const a = stars[i];
				for (let j = i + 1; j < stars.length; j++) {
					const b = stars[j];
					const distance = Math.hypot(a.x - b.x, a.y - b.y);
					if (distance < LINK_DISTANCE) {
						drawLine(a, b, `rgba(5, 223, 114, ${0.16 * (1 - distance / LINK_DISTANCE)})`);
					}
				}
				const toMouse = Math.hypot(a.x - mouse.x, a.y - mouse.y);
				if (toMouse < MOUSE_DISTANCE) {
					drawLine(a, mouse, `rgba(123, 241, 168, ${0.25 * (1 - toMouse / MOUSE_DISTANCE)})`);
				}
			}

			for (const star of stars) {
				const twinkle = reducedMotion ? 0.8 : 0.55 + 0.45 * Math.sin(time / 900 + star.phase);
				ctx.fillStyle = star === grabbed ? '#7bf1a8' : `rgba(230, 237, 243, ${twinkle})`;
				ctx.beginPath();
				ctx.arc(star.x, star.y, star === grabbed ? star.radius + 2 : star.radius, 0, Math.PI * 2);
				ctx.fill();
			}

			frame = requestAnimationFrame(draw);
		}

		resize();
		frame = requestAnimationFrame(draw);

		const observer = new ResizeObserver(resize);
		observer.observe(canvas);

		if (interactive) {
			window.addEventListener('pointermove', onPointerMove, { passive: true });
			window.addEventListener('pointerdown', onPointerDown);
			window.addEventListener('pointerup', onPointerUp);
		}

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener('pointermove', onPointerMove);
			window.removeEventListener('pointerdown', onPointerDown);
			window.removeEventListener('pointerup', onPointerUp);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
