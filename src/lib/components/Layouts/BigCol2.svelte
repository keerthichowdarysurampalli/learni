<script lang="ts">
	import Icon from '@iconify/svelte';
	import dotsThreeOutlineVerticalFill from '@iconify/icons-ph/dots-three-outline-vertical-fill';
	import { onMount } from 'svelte';

	import { fade } from 'svelte/transition';

	import './Layout.css';

	import squareFill from '@iconify/icons-ph/square-fill';
	import squareSplitVerticalFill from '@iconify/icons-ph/square-split-vertical-fill';
	import {
		changeCol,
		col1EditToggle,
		col2EditToggle,
		col3EditToggle,
		isColFull,
		showWidgetList
	} from './layoutStore';
	import { quadInOut } from 'svelte/easing';

	let timer: number | undefined;

	function handleClickOutside(event: any) {
		const longPressButtonCol2Big = document.getElementById('longPressButtonCol2Big');
		const draggableDiv = document.querySelector('.draggable-div'); // Add a class to the specific div

		if (longPressButtonCol2Big && !longPressButtonCol2Big.contains(event.target)) {
			if (draggableDiv && draggableDiv.contains(event.target)) return;
			$col2EditToggle = false;
			if (!($col1EditToggle || $col2EditToggle || $col3EditToggle)) $showWidgetList = false;
		}
	}

	onMount(() => {
		const longPressButtonCol2Big = document.getElementById('longPressButtonCol2Big');
		if (!longPressButtonCol2Big) return;

		longPressButtonCol2Big.addEventListener('mousedown', (event) => {
			event.stopPropagation(); // Stop the event from bubbling up to the document
			if (event.button === 2) return; // Ignore if it's a right-click
			timer = setTimeout(() => {
				$col2EditToggle = true;
				$showWidgetList = true;
			}, 800);
		});

		longPressButtonCol2Big.addEventListener('mouseup', () => {
			clearTimeout(timer);
		});

		longPressButtonCol2Big.addEventListener('mouseleave', () => {
			clearTimeout(timer);
			// Removed setting $col2EditToggle and $showWidgetList to false here.
		});

		longPressButtonCol2Big.addEventListener('contextmenu', (event) => {
			event.preventDefault(); // Prevent the default context menu if you want
			clearTimeout(timer); // Clear the long-press timer
		});

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
</script>

<div
	class={`h-full col-span-1 col-start-2 row-span-2 row-start-1 px-4 py-4 bg-white rounded-2xl md:col-span-1 duration-200 relative hidden md:block
	${$col2EditToggle ? 'border border-dashed border-gray-300 scale-95 shadow-lg' : 'scale-100'}
	`}
	id="longPressButtonCol2Big"
>
	<div class="flex flex-row justify-between">
		<h1 class="text-lg font-bold">
			<slot name="top-heading">Col-2 Row-Full</slot>
		</h1>
		<Icon icon={dotsThreeOutlineVerticalFill} class="w-4 h-4 text-gray-300 cursor-pointer" />
	</div>
	<slot name="top">Body</slot>
	{#if $col2EditToggle}
		<div in:fade={{ duration: 150, easing: quadInOut }} class="overlay-blur">
			<div
				class="flex flex-row border border-gray-200 rounded-md"
				role="group"
				aria-label="View Mode"
			>
				<button
					class={`flex items-center justify-center text-xl h-10 w-10  rounded-l-md ${
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
