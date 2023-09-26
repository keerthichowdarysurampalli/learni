<script lang="ts">
	// your script goes here
	import dotsThreeOutlineVerticalFill from '@iconify/icons-ph/dots-three-outline-vertical-fill';
	import Icon from '@iconify/svelte';

	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import xBold from '@iconify/icons-ph/x-bold';
	import {
		changeCol,
		col1EditToggle,
		col2EditToggle,
		col3EditToggle,
		isColFull,
		showWidgetList
	} from './layoutStore';
	let showWidgetOptions = false;
	export let colNumber: number;

	const isFull = $isColFull(colNumber);
</script>

<button
	class="relative flex flex-col items-end icon-btn"
	on:click={() => {
		showWidgetOptions = !showWidgetOptions;
	}}
	on:keydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			showWidgetOptions = !showWidgetOptions;
		}
	}}
>
	{#if showWidgetOptions}
		<Icon icon={xBold} class="w-4 h-4 text-gray-400 cursor-pointer" />

		<!-- content here -->
	{:else}
		<Icon icon={dotsThreeOutlineVerticalFill} class="w-4 h-4 text-gray-400 cursor-pointer" />
	{/if}

	{#if showWidgetOptions}
		<div
			transition:scale={{
				duration: 200,
				opacity: 0,
				start: 0.7,
				easing: quintOut
			}}
			class="fixed flex flex-col items-end text-sm divide-y top-10 rounded-xl widget-options"
		>
			<button
				class="w-full px-4 py-2 text-center duration-200 bg-white hover:text-emerald-400 rounded-t-xl"
				on:click={() => {
					if (colNumber === 1) {
						$col1EditToggle = true;
					} else if (colNumber === 2) {
						$col2EditToggle = true;
					} else if (colNumber === 3) {
						$col3EditToggle = true;
					}
					// $col1EditToggle = true;
					$showWidgetList = true;
				}}>Edit Widget</button
			>
			<button
				class="w-full px-4 py-2 text-center duration-200 bg-white hover:text-emerald-400"
				on:click={() => {
					if (isFull) changeCol(colNumber, false);
					else changeCol(colNumber, true);
				}}
			>
				{#if isFull}
					Split Widget
				{:else}
					Merge Widget
				{/if}
			</button>
			<button
				class="w-full px-4 py-2 text-center duration-200 bg-white hover:text-emerald-400 rounded-b-xl"
				on:click={() => {
					$col1EditToggle = true;
					$col2EditToggle = true;
					$col3EditToggle = true;
					$showWidgetList = true;
				}}>Edit Layout</button
			>
		</div>
	{/if}
</button>
