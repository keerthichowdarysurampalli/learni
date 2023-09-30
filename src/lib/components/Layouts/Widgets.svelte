<script lang="ts">
	import FullWidget from './FullWidget.svelte';
	import SplitWidget from './SplitWidget.svelte';
	import { isColFull, _getCol, getColWidgets, getHeading, getBody, showWidgetList } from '$lib/components/Layouts/layoutStore';
	import WidgetsListOverlay from './WidgetsListOverlay.svelte';
</script>

{#if $isColFull(1)}
	<!-- <BigCol1 /> -->
	<FullWidget colNumber={1}>
		<div slot="heading">
			{getHeading($getColWidgets(1).firstWidget)}
		</div>
		<svelte:component this={getBody($getColWidgets(1).firstWidget)} isFull={true} slot="body" />
	</FullWidget>
{:else}
	<SplitWidget colNumber={1}>
		<div slot="top-heading">
			{getHeading($getColWidgets(1).firstWidget)}
		</div>
		<svelte:component this={getBody($getColWidgets(1).firstWidget)}  isFull={false} slot="top-body" />
		{getBody($getColWidgets(1).firstWidget)}

		<div slot="bottom-heading">
			{getHeading($getColWidgets(1).secondWidget)}
		</div>
		<svelte:component this={getBody($getColWidgets(1).secondWidget)}  isFull={false} slot="bottom-body" />
	</SplitWidget>
{/if}

{#if $isColFull(2)}
	<!-- <BigCol2 /> -->
	<FullWidget colNumber={2}>
		<div slot="heading">
			{getHeading($getColWidgets(2).firstWidget)}
		</div>
		<svelte:component this={getBody($getColWidgets(2).firstWidget)} isFull={true} slot="body" />
	</FullWidget>
{:else}
	<SplitWidget colNumber={2}>
		<div slot="top-heading">
			{getHeading($getColWidgets(2).firstWidget)}
		</div>
		<svelte:component this={getBody($getColWidgets(2).firstWidget)} isFull={false} slot="top-body" />

		<div slot="bottom-heading">
			{getHeading($getColWidgets(2).secondWidget)}
		</div>
		<svelte:component this={getBody($getColWidgets(2).secondWidget)} isFull={false} slot="bottom-body" />
	</SplitWidget>
{/if}

{#if $isColFull(3)}
	<FullWidget colNumber={3}>
		<div slot="heading">
			{getHeading($getColWidgets(3).firstWidget)}
		</div>
		<svelte:component this={getBody($getColWidgets(3).firstWidget)} isFull={true} slot="body" />
	</FullWidget>
	<!-- <BigCol3 /> -->
{:else}
	<SplitWidget colNumber={3}>
		<div slot="top-heading">
			{getHeading($getColWidgets(3).firstWidget)}
		</div>
		<svelte:component this={getBody($getColWidgets(3).firstWidget)} isFull={false} slot="top-body" />

		<div slot="bottom-heading">
			{getHeading($getColWidgets(3).secondWidget)}
		</div>
		<svelte:component this={getBody($getColWidgets(3).secondWidget)} isFull={false} slot="bottom-body" />
	</SplitWidget>
{/if}

{#if $showWidgetList}
	<WidgetsListOverlay />
{/if}