<script lang="ts">
	import './Layout.css';
	import Icon from '@iconify/svelte';
	import dotsThreeOutlineVerticalFill from '@iconify/icons-ph/dots-three-outline-vertical-fill';
	import {
		col2EditToggle,
		col3EditToggle,
		col1EditToggle,
		changeCol,
		isColFull,
		showWidgetList
	} from './layoutStore';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import squareFill from '@iconify/icons-ph/square-fill';
	import squareSplitVerticalFill from '@iconify/icons-ph/square-split-vertical-fill';

	let timer: number | undefined;
	function handleClickOutside(event: any) {
		const longPressButtonCol2SmallTop = document.getElementById('longPressButtonCol2SmallTop');
		const longPressButtonCol2SmallBottom = document.getElementById(
			'longPressButtonCol2SmallBottom'
		);
		const draggableDiv = document.querySelector('.draggable-div'); // Add a class to the specific div

		if (
			(longPressButtonCol2SmallTop && !longPressButtonCol2SmallTop.contains(event.target)) ||
			(longPressButtonCol2SmallBottom && !longPressButtonCol2SmallBottom.contains(event.target))
		) {
			if (draggableDiv && draggableDiv.contains(event.target)) return;
			$col2EditToggle = false;
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
					$col2EditToggle = true;
					$showWidgetList = true;
				}, 800);
			});
			element.addEventListener('mouseup', () => {
				clearTimeout(timer);
			});
			element.addEventListener('mouseleave', () => {
				clearTimeout(timer);
				// Removed setting $col2EditToggle and $showWidgetsList to false here
			});
			element.addEventListener('contextmenu', (event) => {
				event.preventDefault(); // Prevent the default context menu if you want
				clearTimeout(timer); // Clear the long-press timer
			});
		}

		setupLongPress('longPressButtonCol2SmallTop');
		setupLongPress('longPressButtonCol2SmallBottom');
		// setupLongPress('longPressButtonCol2Big');
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	const glass = 'bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0';
</script>

<div
	class={`h-full col-span-1 col-start-2 row-span-1 row-start-1 bg-opacity-80 backdrop-filter backdrop-blur-2xl

	px-4 py-4 bg-white rounded-2xl relative hidden md:block
duration-200
${$col2EditToggle ? 'border border-dashed border-gray-300 scale-95 shadow-lg' : 'scale-100'}`}
	id="longPressButtonCol2SmallTop"
>
	<div class="flex flex-row justify-between">
		<h1 class="text-lg font-bold">
			<slot name="top-heading">Col-1 Row-1</slot>
		</h1>
		<Icon icon={dotsThreeOutlineVerticalFill} class="w-4 h-4 text-gray-300 cursor-pointer" />
	</div>
	<slot name="top">Body</slot>
	{#if $col2EditToggle}
		<div in:fade={{ duration: 100 }} class="rounded-lg overlay-blur">
			<div
				class="flex flex-row border border-gray-200 rounded-md"
				role="group"
				aria-label="View Mode"
			>
				<button
					class={`flex items-center justify-center text-xl  bg-white   h-10 w-10  rounded-l-md ${
						$isColFull(2) ? 'bg-black text-white' : 'bg-white'
					}`}
					on:click={() => changeCol(2, true)}
				>
					<Icon icon={squareFill} />
				</button>
				<button
					class={`flex items-center justify-center text-xl h-10 w-10 rounded-r-md ${
						!$isColFull(2) ? 'bg-black text-white' : 'bg-white'
					}`}
					on:click={() => changeCol(2, false)}
				>
					<Icon icon={squareSplitVerticalFill} />
				</button>
			</div>
		</div>
	{/if}
</div>

<div
	class={`col-span-1 col-start-2 row-span-1 row-start-2 px-4 py-4 bg-white rounded-2xl duration-200 relative  hidden md:block
${$col2EditToggle ? 'border border-dashed border-gray-300 scale-95 shadow-lg' : 'scale-100'}
`}
	id="longPressButtonCol2SmallBottom"
>
	<div class="flex flex-row justify-between">
		<h1 class="text-lg font-bold">
			<slot name="bottom-heading">Col-1 Row-2</slot>
		</h1>
		<Icon icon={dotsThreeOutlineVerticalFill} class="w-4 h-4 text-gray-300 cursor-pointer" />
	</div>
	<slot name="bottom">Body</slot>
	{#if $col2EditToggle}
		<div in:fade={{ duration: 100 }} class="overlay-blur">
			<div
				class="flex flex-row border border-gray-200 rounded-md"
				role="group"
				aria-label="View Mode"
			>
				<button
					class={`flex items-center justify-center text-xl  bg-white   h-10 w-10  rounded-l-md ${
						$isColFull(2) ? 'bg-black text-white' : 'bg-white'
					}`}
					on:click={() => changeCol(2, true)}
				>
					<Icon icon={squareFill} />
				</button>
				<button
					class={`flex items-center justify-center text-xl h-10 w-10 rounded-r-md ${
						!$isColFull(2) ? 'bg-black text-white' : 'bg-white'
					}`}
					on:click={() => changeCol(2, false)}
				>
					<Icon icon={squareSplitVerticalFill} />
				</button>
			</div>
		</div>
	{/if}
</div>
