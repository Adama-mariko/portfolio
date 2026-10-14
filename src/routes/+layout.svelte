<script lang="ts">
	import '#lib/styles/tokens.css';
	import '#lib/styles/base.css';
	import '#lib/styles/utilities.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

{@render children()}
