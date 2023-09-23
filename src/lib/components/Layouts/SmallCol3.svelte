<script lang="ts">
	import './Layout.css';
	import Icon from '@iconify/svelte';
	import dotsThreeOutlineVerticalFill from '@iconify/icons-ph/dots-three-outline-vertical-fill';
	import {
		changeCol,
		col1EditToggle,
		col2EditToggle,
		col3EditToggle,
		isColFull,
		showWidgetList
	} from './layoutStore';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import squareFill from '@iconify/icons-ph/square-fill';
	import squareSplitVerticalFill from '@iconify/icons-ph/square-split-vertical-fill';

	let timer: number | undefined;
	function handleClickOutside(event: any) {
		const longPressBtnCol3SmallTop = document.getElementById('longPressBtnCol3SmallTop');
		const longPressBtnCol3SmallBtm = document.getElementById('longPressBtnCol3SmallBtm');
		const draggableDiv = document.querySelector('.draggable-div'); // Add a class to the specific div

		if (
			(longPressBtnCol3SmallTop && !longPressBtnCol3SmallTop.contains(event.target)) ||
			(longPressBtnCol3SmallBtm && !longPressBtnCol3SmallBtm.contains(event.target))
		) {
			if (draggableDiv && draggableDiv.contains(event.target)) return;
			$col3EditToggle = false;
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
					$col3EditToggle = true;
					$showWidgetList = true;
				}, 800);
			});
			element.addEventListener('mouseup', () => {
				clearTimeout(timer);
			});
			element.addEventListener('mouseleave', () => {
				clearTimeout(timer);
				// Removed setting $col3EditToggle and $showWidgetsList to false here
			});
			element.addEventListener('contextmenu', (event) => {
				event.preventDefault(); // Prevent the default context menu if you want
				clearTimeout(timer); // Clear the long-press timer
			});
		}

		setupLongPress('longPressBtnCol3SmallTop');
		setupLongPress('longPressBtnCol3SmallBtm');
		// setupLongPress('longPressButtonCol2Big');
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	const glass = 'bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0';
</script>

<div
	class={`h-full col-span-1 col-start-3 row-span-1 row-start-1 bg-opacity-80 backdrop-filter backdrop-blur-2xl hidden lg:block

	px-4 py-4 bg-white rounded-2xl relative
duration-200
${$col3EditToggle ? 'border border-dashed border-gray-300 scale-95 shadow-lg' : 'scale-100'}`}
	id="longPressBtnCol3SmallTop"
>
	<div class="flex flex-row justify-between">
		<h1 class="text-lg font-bold">
			<slot name="top-heading">Col-1 Row-1</slot>
		</h1>
		<Icon icon={dotsThreeOutlineVerticalFill} class="w-4 h-4 text-gray-300 cursor-pointer" />
	</div>
	<slot name="top">Body</slot>
	{#if $col3EditToggle}
		<div in:fade={{ duration: 100 }} class="rounded-lg overlay-blur">
			<div
				class="flex flex-row border border-gray-200 rounded-md"
				role="group"
				aria-label="View Mode"
			>
				<button
					class={`flex items-center justify-center text-xl  bg-white   h-10 w-10  rounded-l-md ${
						$isColFull(3) ? 'bg-black text-white' : 'bg-white'
					}`}
					on:click={() => changeCol(3, true)}
				>
					<Icon icon={squareFill} />
				</button>
				<button
					class={`flex items-center justify-center text-xl h-10 w-10 rounded-r-md ${
						!$isColFull(3) ? 'bg-black text-white' : 'bg-white'
					}`}
					on:click={() => changeCol(3, false)}
				>
					<Icon icon={squareSplitVerticalFill} />
				</button>
			</div>
		</div>
	{/if}
</div>

<div
	class={`col-span-1 col-start-3 row-span-1 row-start-2 px-4 py-4 bg-white rounded-2xl duration-200 relative hidden lg:block
${$col3EditToggle ? 'border border-dashed border-gray-300 scale-95 shadow-lg' : 'scale-100'}
`}
	id="longPressBtnCol3SmallBtm"
>
	<div class="flex flex-row justify-between">
		<h1 class="text-lg font-bold">
			<slot name="bottom-heading">Col-1 Row-2</slot>
		</h1>
		<Icon icon={dotsThreeOutlineVerticalFill} class="w-4 h-4 text-gray-300 cursor-pointer" />
	</div>
	<slot name="bottom">Body</slot>
	{#if $col3EditToggle}
		<div in:fade={{ duration: 100 }} class="overlay-blur">
			<div
				class="flex flex-row border border-gray-200 rounded-md"
				role="group"
				aria-label="View Mode"
			>
				<button
					class={`flex items-center justify-center text-xl  bg-white   h-10 w-10  rounded-l-md ${
						$isColFull(3) ? 'bg-black text-white' : 'bg-white'
					}`}
					on:click={() => changeCol(3, true)}
				>
					<Icon icon={squareFill} />
				</button>
				<button
					class={`flex items-center justify-center text-xl h-10 w-10 rounded-r-md ${
						!$isColFull(3) ? 'bg-black text-white' : 'bg-white'
					}`}
					on:click={() => changeCol(3, false)}
				>
					<Icon icon={squareSplitVerticalFill} />
				</button>
			</div>
		</div>
	{/if}
</div>
