<script lang="ts">
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

	let timer: number | undefined;
	export let colNumber: number;

	const ButtonNameTop = `splitCol${colNumber}1`;
	const ButtonNameBottom = `splitCol${colNumber}2`;
	let classStyleTop = `col-span-1 col-start-${colNumber} row-span-1 row-start-1 widget-container`;
	let classStyleBottom = `col-span-1 col-start-${colNumber} row-span-1 row-start-2 widget-container`;

	// ! make sure that there is space before hidden
	if (colNumber === 2) {
		classStyleTop += ' hidden md:block';
		classStyleBottom += ' hidden md:block';
	}
	if (colNumber === 3) {
		classStyleTop += ' hidden md:block';
		classStyleBottom += ' hidden md:block';
	}

	function handleClickOutside(event: any) {
		const containerTop = document.getElementById(ButtonNameTop);
		const containerBottom = document.getElementById(ButtonNameBottom);
		if (
			(containerTop && !containerTop.contains(event.target)) ||
			(containerBottom && !containerBottom.contains(event.target))
		) {
			toggleColEdit(colNumber, false);
			if (!($col1EditToggle || $col2EditToggle || $col3EditToggle)) $showWidgetList = false;
		}
	}

	onMount(() => {
		function setupLongPress(elementId: string) {
			const element = document.getElementById(elementId);
			if (!element) return;
			element.addEventListener('mousedown', (event) => {
				event.stopPropagation(); // Stop the event from bubbling up
				if (event.button === 2) return; // Ignore if it's a right-click
				timer = setTimeout(() => {
					toggleColEdit(colNumber, true);
					$showWidgetList = true;
				}, 1000);
			});
			element.addEventListener('mouseup', () => {
				clearTimeout(timer);
			});
			element.addEventListener('mouseleave', () => {
				clearTimeout(timer);
				// Removed setting $col1EditToggle and $showWidgetsList to false here
			});
			element.addEventListener('contextmenu', (event) => {
				event.preventDefault(); // Prevent the default context menu if you want
				clearTimeout(timer); // Clear the long-press timer
			});
		}

		setupLongPress(ButtonNameTop);
		setupLongPress(ButtonNameBottom);
		// setupLongPress('longPressButtonCol1Big');
		document.addEventListener('mousedown', handleClickOutside);
	});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={`${classStyleTop}
${
	$getColEditToggle(colNumber)
		? `border-dashed border-2 scale-95 shadow-lg ${
				$selectedCol === `${ButtonNameTop}` ? 'border-emerald-400 border-double border-2' : ''
		  }`
		: 'scale-100'
}`}
	id={ButtonNameTop}
	on:click={() => {
		$selectedCol = ButtonNameTop;
	}}
	on:keydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			$selectedCol = ButtonNameTop;
		}
	}}
>
	<div class="flex flex-row justify-between">
		<h1 class="text-lg font-bold">
			<slot name="top-heading">{ButtonNameTop}</slot>
		</h1>
		<WidgetOptions {colNumber} />
	</div>
	<slot name="top">Body</slot>
	{#if $getColEditToggle(colNumber)}
		<EditWidget {colNumber} />
	{/if}
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class={`${classStyleBottom}
${
	$getColEditToggle(colNumber)
		? `border-dashed border-2 scale-95 shadow-lg ${
				$selectedCol === `${ButtonNameBottom}` ? 'border-emerald-400 border-double border-2' : ''
		  }`
		: 'scale-100'
}
`}
	id={ButtonNameBottom}
	on:click={() => {
		$selectedCol = ButtonNameBottom;
	}}
	on:keydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			$selectedCol = ButtonNameBottom;
		}
	}}
>
	<div class="flex flex-row justify-between">
		<h1 class="text-lg font-bold">
			<slot name="top-heading">{ButtonNameBottom}</slot>
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
