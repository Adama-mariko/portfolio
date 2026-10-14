<script lang="ts">
	import type { SimpleIcon } from 'simple-icons';

	/** Logo de marque (GitHub, WhatsApp…) dessiné dans la couleur du texte. */
	let { icon, size = 16 }: { icon: Pick<SimpleIcon, 'path'>; size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
	<path d={icon.path} />
</svg>
