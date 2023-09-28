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
		toggleColEdit,
		getHeading,
		getColWidgets
	} from './layoutStore';
	import EditWidget from './EditWidget.svelte';
	import WidgetsListOverlay from './WidgetsListOverlay.svelte';
	import WidgetOptions from './WidgetOptions.svelte';
	import { scale, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	let timer: number | undefined;
	export let colNumber: number;

	const ButtonNameTop = `splitCol${colNumber}1`;
	const ButtonNameBottom = `splitCol${colNumber}2`;
	let classStyleTop = `col-span-1 col-start-${colNumber} row-span-1 row-start-1 widget-container`;
	let classStyleBottom = `col-span-1 col-start-${colNumber} row-span-1 row-start-2 widget-container`;

	const linkTop = '/' + getHeading($getColWidgets(colNumber).firstWidget).toLowerCase();
	const linkBottom = '/' + getHeading($getColWidgets(colNumber).secondWidget).toLowerCase();

	// ! make sure that there is space before hidden
	if (colNumber === 2) {
		classStyleTop += ' hidden md:block';
		classStyleBottom += ' hidden md:block';
	}
	if (colNumber === 3) {
		classStyleTop += ' hidden lg:block';
		classStyleBottom += ' hidden lg:block';
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
	in:scale={{
		duration: 250,
		opacity: 0,
		start: 0.95,
		easing: quintOut
	}}
	class={`${classStyleTop} 
${
	$getColEditToggle(colNumber)
		? `border scale-95  hover:border-emerald-400 hover:shadow-2xl cursor-pointer ${
				$selectedCol === `${ButtonNameTop}` ? 'border-emerald-400 border-double shadow-2xl' : ''
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
	<div class="flex flex-row justify-between mb-2">
		<a class="text-lg font-bold duration-500 hover:text-emerald-400" href={linkTop}>
			<slot name="top-heading">{ButtonNameTop}</slot>
		</a>
		<WidgetOptions {colNumber} />
	</div>

	<slot name="top-body">Body</slot>

	{#if $getColEditToggle(colNumber)}
		<EditWidget {colNumber} />
	{/if}
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	in:scale={{
		duration: 500,
		opacity: 0,
		start: 0.95,
		easing: quintOut
	}}
	class={`${classStyleBottom} 
${
	$getColEditToggle(colNumber)
		? `border scale-95 hover:border-emerald-400 hover:shadow-2xl cursor-pointer ${
				$selectedCol === `${ButtonNameBottom}` ? 'border-emerald-400 border-double shadow-2xl' : ''
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
<!-- <div class="absolute w-full h-full scale-90 bg-center -top-10 left-10 blur-2xl -z-50 bg-emerald-300" /> -->

	<div class="flex flex-row justify-between mb-2">
		<a class="text-lg font-bold duration-500 hover:text-emerald-400" href={linkBottom}>
			<slot name="bottom-heading">{ButtonNameBottom}</slot>
		</a>
		<WidgetOptions {colNumber} />
	</div>
	<div class="flex flex-col w-full h-full">
		<slot name="bottom-body">Body</slot>
	</div>
	{#if $getColEditToggle(colNumber)}
		<EditWidget {colNumber} />
	{/if}

</div>

{#if $showWidgetList}
	<WidgetsListOverlay />
{/if}

