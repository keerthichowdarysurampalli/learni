<script lang="ts">
	import Icon from '@iconify/svelte';
	import dotsThreeOutlineVerticalFill from '@iconify/icons-ph/dots-three-outline-vertical-fill';
	import { onMount } from 'svelte';
	import './Layout.css';
	import {
		col1EditToggle,
		col2EditToggle,
		col3EditToggle,
		selectedCol,
		showWidgetList,
		getColEditToggle,
		toggleColEdit
	} from './layoutStore';
	import EditWidget from './EditWidget.svelte';
	import WidgetsListOverlay from './WidgetsListOverlay.svelte';
	import WidgetOptions from './WidgetOptions.svelte';

	export let colNumber: number;

	const ButtonName = `fullCol${colNumber}`;

	let timer: number | undefined;

	function handleClickOutside(event: any) {
		const container = document.getElementById(ButtonName);

		if (container && !container.contains(event.target)) {
			toggleColEdit(colNumber, false);
			if (!($col1EditToggle || $col2EditToggle || $col3EditToggle)) $showWidgetList = false;
		}
	}

	onMount(() => {
		const container = document.getElementById(ButtonName);
		if (!container) return;

		container.addEventListener('mousedown', (event) => {
			event.stopPropagation(); // Stop the event from bubbling up to the document
			if (event.button === 2) return; // Ignore if it's a right-click
			timer = setTimeout(() => {
				toggleColEdit(colNumber, true);
				// $col2EditToggle = true;
				$showWidgetList = true;
			}, 800);
		});

		container.addEventListener('mouseup', () => {
			clearTimeout(timer);
		});

		container.addEventListener('mouseleave', () => {
			clearTimeout(timer);
			// Removed setting $col2EditToggle and $showWidgetList to false here.
		});
		document.addEventListener('mousedown', handleClickOutside);
	});

	let classStyle = `col-span-1 col-start-${colNumber} row-span-2 row-start-1 widget-container `;
	// ! make sure that there is space before hidden
	if (colNumber === 2) {
		classStyle += 'hidden md:block';
	}
	if (colNumber === 3) {
		classStyle += 'hidden lg:block';
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={`${classStyle}
	${
		$getColEditToggle(colNumber)
			? `border-dashed border-2 scale-95 shadow-lg ${
					$selectedCol === `${ButtonName}` ? 'border-emerald-400 border-double border-2' : ''
			  }`
			: 'scale-100'
	} 
	`}
	id={ButtonName}
	on:click={() => {
		$selectedCol = ButtonName;
	}}
	on:keydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			$selectedCol = ButtonName;
		}
	}}
>
	<div class="flex flex-row justify-between">
		<h1 class="text-lg font-bold">
			<slot name="top-heading">{ButtonName}</slot>
		</h1>
		<WidgetOptions {colNumber} />
	</div>
	<slot name="top">Body</slot>
	{#if $getColEditToggle(colNumber)}
		<EditWidget {colNumber} />
	{/if}
</div>

{#if $showWidgetList}
	<WidgetsListOverlay />
{/if}
