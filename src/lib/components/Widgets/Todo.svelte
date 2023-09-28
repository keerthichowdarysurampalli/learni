<script>
	import { quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let isFull = false;

	let todos = [
		{
			title: 'This is the title',
			done: false,
			description:
				'A description on what this todo is about, can also tag files, assignment links and other stuff',
			date: 'Sep 20, 2023 11:59 PM, Sunday'
		},
		{
			title: 'Work on assignment 1',
			done: true,
			description:
				'A description on what this todo is about, can also tag files, assignment links and other stuff',
			date: 'Sep 20, 2023 11:59 PM, Sunday'
		},
		{
			title: 'Need to create course Mangement System',
			done: false,
			description:
				'A description on what this todo is about, can also tag files, assignment links and other stuff',
			date: 'Sep 20, 2023 11:59 PM, Sunday'
		},
		{
			title: 'This is the title',
			done: false,
			description:
				'A description on what this todo is about, can also tag files, assignment links and other stuff',
			date: 'Sep 20, 2023 11:59 PM, Sunday'
		}
	];
</script>

<div class="flex flex-col items-center justify-between w-full h-full pb-8">
	<div class="flex flex-col w-full gap-4 overflow-y-scroll overflow-x-clip">
		<div class="flex flex-col justify-start gap-4">
			{#each todos as todo, i}
				<div>
					<div class="flex flex-row items-center gap-4">
						<button
							on:click={() => {
								todos[i].done = !todos[i].done;
							}}
							class="w-5 h-5 border-[1.5px] border-black p-0.5 rounded-sm"
						>
							{#if todos[i].done}
								<div
									in:scale={{ duration: 200, start: 0.8, easing: quintOut }}
									class="w-full h-full rounded-sm bg-emerald-400"
								/>
							{/if}
						</button>
						<p
							contenteditable="true"
							class={`${
								todo.done === true ? `line-through` : ``
							} duration-200 border-none outline-none`}
						>
							{todos[i].title}
						</p>
					</div>
					{#if isFull}
						<p
							class={`${
								todos[i].done === true ? `line-through` : ``
							} duration-200 border-none outline-none pl-[38px] text-gray-400 text-xs font-mono`}
						>
							Last Modified: {todo.date}
						</p>
						<div class="w-full h-px my-2 bg-gray-200 ml-[38px]" />
						<p
							contenteditable="true"
							class={`${
								todos[i].done === true ? `line-through` : ``
							} duration-200 border-none outline-none pl-[38px] text-gray-500 text-sm`}
						>
							{todos[i].description}
						</p>
					{/if}
				</div>
			{/each}
		</div>

		<div class="flex flex-row items-center gap-4">
			<div class="w-5 h-5 border-[1.5px] border-gray-400 p-0.5 rounded-sm">
				<div
					in:scale={{ duration: 200, start: 0.8, easing: quintOut }}
					class="w-full h-full rounded-sm"
				/>
			</div>
			<p
				contenteditable="true"
				on:submit={() => {
					console.log('hi');
				}}
				class="text-gray-400 border-none outline-none"
			>
				+ Add Todo
			</p>
		</div>
	</div>
</div>
