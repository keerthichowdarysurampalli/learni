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
		getColWidgets,

		getHeading

	} from './layoutStore';
	import EditWidget from './EditWidget.svelte';
	import WidgetsListOverlay from './WidgetsListOverlay.svelte';
	import WidgetOptions from './WidgetOptions.svelte';
	import { quintOut } from 'svelte/easing';
	import { scale, slide } from 'svelte/transition';

	export let colNumber: number;

	const ButtonName = `fullCol${colNumber}`;

	let timer: number | undefined;
	
	const link = '/' + getHeading($getColWidgets(colNumber).firstWidget).toLowerCase();
	console.log(link);

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

<style>
	/* Common styles for all corner divs */
.corner {
  position: absolute;
  width: 16px;
  height: 16px;
  z-index: -50;
}

/* Common styles for the glow effect */
.corner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(52, 211, 153, 1); /* Adjust the color and opacity as needed */
  filter: blur(16px); /* Adjust the blur amount */
  z-index: -1;
}

</style>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	in:scale={{
		duration: 500,
		opacity: 0,
		start: 0.95,
		easing: quintOut
	}}
	class={`${classStyle} 
	${
		$getColEditToggle(colNumber)
			? `border scale-95 hover:border-emerald-400 hover:shadow-2xl cursor-pointer ${
					$selectedCol === `${ButtonName}` ? 'border-emerald-400 shadow-2xl' : ''
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

<!-- <div class="absolute top-0 bg-center corner bg-emerald-300" />
<div class="absolute bottom-0 bg-center corner bg-emerald-300" />
<div class="absolute top-0 right-0 bg-center corner bg-emerald-300" />
<div class="absolute bottom-0 right-0 bg-center corner bg-emerald-300" /> -->



<div class="flex flex-row justify-between mb-2">
		<a class="text-lg font-bold" href={link}>
			<slot name="heading">{ButtonName}</slot>
		</a>
		<WidgetOptions {colNumber} />
	</div>
	<slot name="body">Body</slot>
	{#if $getColEditToggle(colNumber)}
		<EditWidget {colNumber} />
	{/if}
</div>

{#if $showWidgetList}
	<WidgetsListOverlay />
{/if}
