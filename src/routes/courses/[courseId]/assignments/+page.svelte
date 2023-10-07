<script>
	import { page } from '$app/stores';
	import { tooltip } from '$lib/components/global/tooltip.js';
	import uploadSimpleLight from '@iconify/icons-ph/upload-simple-light';
	import Icon from '@iconify/svelte';
	import plusThin from '@iconify/icons-ph/plus-thin';

	export let data;

	function addAssignment() {
		const id = data.assignments.length + 1;
		data.assignments = [
			...data.assignments,
			{
				id,
				name: `Assignment ${id}`,
				maxPoints: 100,
				deadline: '2023-11-01',
				submissions: '0/10',
				description: `This is assignment ${id}`
			}
		];
	}

	// @ts-ignore
	function viewAssignment(id) {
		alert(`Viewing assignment details for ID: ${id}`);
		// Implement your logic here to navigate to the assignment details page
	}
</script>

<div class="flex flex-col w-full h-full gap-2 px-4 py-4 glass-effect">
	<div class="flex flex-row justify-between">
		<h1 class="text-2xl">Assignments</h1>
		<button
			class="p-2 duration-300 glass-effect hover:bg-emerald-400 rounded-xl hover:text-white"
			on:click={addAssignment}><Icon icon={plusThin} height="26" /></button
		>
	</div>
	<div class="grid w-full grid-cols-3 gap-2 overflow-y-scroll auto-rows-auto">
		{#each data.assignments as assignment}
			<a
				href={`/courses/${$page.params.courseId}/assignments/${assignment.id}`}
				class="p-4 rounded-lg cursor-pointer h-fit glass-effect"
			>
				<h2 class="text-xl font-bold">{assignment.name}</h2>
				<p class="text-sm text-gray-600">{assignment.description}</p>
				<div class="flex justify-between w-full gap-2 mt-2">
					<span
						use:tooltip={{ title: 'Max Points' }}
						class="flex items-center justify-center w-1/2 px-2 py-1 text-xs rounded-lg bg-emerald-100 text-emerald-600"
					>
						{assignment.maxPoints}
					</span>
					<span
						use:tooltip={{ title: 'Due Date' }}
						class="flex items-center justify-center w-1/2 px-2 py-1 text-xs text-red-600 bg-red-100 rounded-lg"
					>
						{assignment.deadline}
					</span>
					<span
						use:tooltip={{ title: 'Submissions' }}
						class="flex items-center justify-center w-1/2 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-lg"
					>
						{assignment.submissions}
					</span>
				</div>
			</a>
		{/each}
	</div>
</div>
