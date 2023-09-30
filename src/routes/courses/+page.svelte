<script>
	import arrowRightLight from '@iconify/icons-ph/arrow-right-light.js';
	import arrowSquareOutLight from '@iconify/icons-ph/arrow-square-out-light.js';
	import uploadSimpleLight from '@iconify/icons-ph/upload-simple-light.js';
	import Icon from '@iconify/svelte';

	export let data;
	const courses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
	const itemz = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
</script>

<div class="flex flex-row w-full h-full gap-2 overflow-x-scroll select-none">
	{#each data.courses as course}
		<a
			href="/courses/{course.code}"
			class="flex-none px-4 py-4 duration-500 bg-white bg-opacity-50 cursor-pointer rounded-xl group backdrop-filter backdrop-blur-xl bg-clip-padding"
		>
			<div class="flex flex-row items-center justify-between">
				<p class="text-xl">{course.name}</p>
				<Icon
					icon={arrowRightLight}
					class="mr-4 text-3xl text-gray-400 duration-500 group-hover:text-emerald-400 group-hover:mr-0"
				/>
			</div>
			<p class="mt-1 text-xs text-gray-400">
				<span>{course.instructor} - </span>{course.code} - <span>{course.semester}</span>
			</p>
			<p class="px-4 py-2 mt-1 text-xs text-gray-400 bg-gray-100 rounded-md">
				Next Class: <span class="text-emerald-400">{course.nextClass}</span>
			</p>
			<div class="w-full h-px my-2 bg-gray-200" />
			<div class="flex flex-col w-full px-4 py-4 bg-emerald-100 rounded-xl">
				<div class="flex flex-row justify-between w-full h-10 gap-2">
					<div>
						<p class="text-gray-600 text-md">Assignment 1</p>
						<p class="text-xs text-red-400">Sep 20, 2023 11:59 PM, Sunday</p>
					</div>
					<div class="flex flex-row gap-2">
						<button
							class="flex flex-row items-center justify-center h-full px-4 py-2 duration-500 bg-white rounded-full bg-opacity-80 hover:bg-emerald-300"
							on:click={() => {
								console.log('hi button 2');
							}}
						>
							<Icon icon={uploadSimpleLight} class="text-xl " />
							<!-- upload -->
						</button>
						<button
							class="flex flex-row items-center justify-center h-full px-4 py-2 duration-500 bg-white rounded-full bg-opacity-80 hover:bg-emerald-300"
							on:click={() => {
								console.log('hi button 2');
							}}
						>
							<!-- preview -->
							<Icon class="text-xl" icon={arrowSquareOutLight} />
						</button>
					</div>
				</div>
			</div>
		</a>
		<!-- {/if} -->
		<!-- </div> -->
	{:else}
		<div class="text-center">No courses found</div>
	{/each}
</div>
