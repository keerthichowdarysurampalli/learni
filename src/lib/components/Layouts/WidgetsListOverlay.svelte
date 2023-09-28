<script>
	// @ts-nocheck

	import { quintOut } from 'svelte/easing';
	import {
		ANNONUCEMENTS,
		CALENDAR,
		CHATS,
		COURSES,
		PROFILE,
		TODO,
		GRADES,
		widgetNames
	} from '$lib/components/Layouts/layoutStore';

	import { slide } from 'svelte/transition';

	let widgets = [ANNONUCEMENTS, CALENDAR, CHATS, COURSES, GRADES, TODO, PROFILE];
</script>

<div
	transition:slide={{ duration: 400, easing: quintOut, axis: 'y' }}
	class="flex items-center justify-center w-full max-w-screen-md gap-4 px-4 py-2 mx-auto overflow-x-auto bg-gray-100 border border-gray-200 cursor-default drop-shadow-xl h-50 rounded-t-2xl overlay"
>
	{#each widgets as widget}
		<button
			class="p-4 duration-300 bg-white border border-white border-dashed shadow-lg cursor-pointer hover:shadow-none hover:border-gray-300 rounded-xl"
			on:click={() => {
				console.log('hi');

				console.log(widget);
			}}
		>
			<div class="flex flex-row items-center justify-between">
				<h1 class="text-xs font-bold">
					{widgetNames[widget]}
				</h1>
			</div>
		</button>
	{/each}
</div>
