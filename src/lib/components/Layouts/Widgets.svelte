<script>
	import FullWidget from './FullWidget.svelte';
	import SplitWidget from './SplitWidget.svelte';
	import { isColFull } from '$lib/components/Layouts/layoutStore';
</script>

{#if $isColFull(1)}
	<!-- <BigCol1 /> -->
	<FullWidget colNumber={1} />
{:else}
	<SplitWidget colNumber={1} />
{/if}

{#if $isColFull(2)}
	<!-- <BigCol2 /> -->
	<FullWidget colNumber={2} />
{:else}
	<SplitWidget colNumber={2} />
{/if}

{#if $isColFull(3)}
	<FullWidget colNumber={3} />
	<!-- <BigCol3 /> -->
{:else}
	<SplitWidget colNumber={3} />
{/if}
