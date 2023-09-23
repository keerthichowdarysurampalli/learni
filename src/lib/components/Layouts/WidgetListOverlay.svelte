<script>
	// @ts-nocheck

	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Icon from '@iconify/svelte';
	import dotsThreeOutlineVerticalFill from '@iconify/icons-ph/dots-three-outline-vertical-fill';
	import {
		showWidgetList,
		ANNONUCEMENTS,
		CALENDAR,
		CHATS,
		COURSES,
		PROFILE,
		TODO,
		GRADES,
		widgetNames
	} from '$lib/components/Layouts/layoutStore';
	import { onMount } from 'svelte';

	let widgets = [ANNONUCEMENTS, CALENDAR, CHATS, COURSES, GRADES, TODO, PROFILE];

	let draggedItemValue = null;

	// Function to handle the dragstart event
	/**
	 * @param {{ target: { dataset: { value: null; }; }; }} e
	 */
	// function handleDragStart(e) {
	// 	// Store the data (item value) being dragged
	// 	draggedItemValue = e.target.dataset.value;
	// }

	// Function to handle the dragover event (preventing default behavior)
	/**
	 * @param {{ preventDefault: () => void; }} e
	 */
	function handleDragOver(e) {
		e.preventDefault();
	}

	// Function to handle the drop event
	/**
	 * @param {{ preventDefault: () => void; }} e
	 */
	function handleDrop(e) {
		e.preventDefault();
		// Check if the item is over the target div
		if (isItemOverTarget) {
			// Update and print the value (for now, it logs to the console)
			console.log('Value dropped in overlay:', draggedItemValue);
		}
	}

	// Function to handle the dragenter event for the target div
	function handleDragEnterTarget() {
		isItemOverTarget = true;
	}

	// Function to handle the dragleave event for the target div
	function handleDragLeaveTarget() {
		isItemOverTarget = false;
	}

	// Function to hide the overlay when clicking outside of it
	function hideOverlayOnClickOutside(e) {
		const overlay = document.querySelector('.overlay');
		if (overlay && !overlay.contains(e.target)) {
			// Clicked outside of the overlay, hide it
			overlay.style.display = 'none';
		}
	}
	onMount(() => {
		document.body.addEventListener('click', hideOverlayOnClickOutside);
	});

	let dragWidget = null; // Store the dragged widget
	let isDragging = false;
	let offsetX = 0;
	let offsetY = 0;
	let initialX = 0;
	let initialY = 0;

	function handleDragStart(event, widget) {
		isDragging = true;
		const boundingBox = event.target.getBoundingClientRect();
		offsetX = event.clientX - boundingBox.left;
		offsetY = event.clientY - boundingBox.top;
		initialX = boundingBox.left; // Store the initial X position
		initialY = boundingBox.top; // Store the initial Y position
		dragWidget = widget;
		console.log('dragstart');
	}

	function handleDrag(event) {
		if (isDragging) {
			const x = event.clientX - offsetX;
			const y = event.clientY - offsetY;
			event.target.style.transform = `translate(${x}px, ${y}px)`;
		}
	}

	function handleDragEnd() {
		isDragging = false;

		if (widgetDropped) {
			// The element was dropped on a valid target
			dragWidget = null;
		} else {
			// The element was not dropped on a valid target, reset its position
			const element = event.target;
			element.style.left = initialX + 'px'; // Reset to initial X position
			element.style.top = initialY + 'px'; // Reset to initial Y position
			dragWidget = null;
		}

		offsetX = 0;
		offsetY = 0;
		initialX = 0; // Reset the initial X position
		initialY = 0; // Reset the initial Y position
		widgetDropped = false;
		console.log('dragend');
	}
</script>

{#if $showWidgetList}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		transition:slide={{ duration: 400, easing: quintOut, axis: 'y' }}
		class="fixed bottom-0 z-50 flex items-center justify-center w-full gap-4 px-4 py-2 overflow-x-auto bg-gray-100 h-50 max-w-screen-2xl shadow-elevated rounded-t-2xl draggable-div"
		on:dragover={handleDragOver}
		on:drop={handleDrop}
	>
		{#each widgets as widget}
			<div
				class="p-4 duration-300 bg-white border border-white border-dashed shadow-xl hover:shadow-none hover:border-gray-300 w-36 h-36 draggable-item rounded-xl"
				draggable="true"
				on:dragstart={(event) => handleDragStart(event, widget)}
				on:drag={handleDrag}
				on:dragend={handleDragEnd}
			>
				<div class="flex flex-row items-center justify-between">
					<h1 class="text-xs font-bold">
						{widgetNames[widget]}
					</h1>
					<Icon icon={dotsThreeOutlineVerticalFill} class="w-2 h-2 text-gray-300 cursor-pointer" />
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.shadow-elevated {
		box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.12);
	}
</style>
