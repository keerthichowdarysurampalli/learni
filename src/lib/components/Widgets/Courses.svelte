<script lang="ts">
	import Icon from '@iconify/svelte';
	import arrowRightLight from '@iconify/icons-ph/arrow-right-light';
	import downloadSimpleLight from '@iconify/icons-ph/download-simple-light';
	import uploadSimpleLight from '@iconify/icons-ph/upload-simple-light';
	import arrowSquareOutLight from '@iconify/icons-ph/arrow-square-out-light';
	import eyeLight from '@iconify/icons-ph/eye-light';

	import { scale, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const items = [1, 2, 3, 4];
	const itemz = [1, 2];

	const courses = [
		{
			name: 'Directed Research',
			code: '82FAGCIS4440A',
			semester: 'Fall 1982',
			nextClass: 'Sep 20, 2023 11:59 PM, Sunday',
            instructor: 'Clinton Kane',
			assignments: [
				{
					name: 'Assignment 1',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				},
				{
					name: 'Assignment 2',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				}
			],
			announcements: [
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				},
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				}
			]
		},
		{
			name: 'Directed Research',
			code: '82FAGCIS4440A',
			semester: 'Fall 1982',
			nextClass: 'Sep 20, 2023 11:59 PM, Sunday',
            instructor: 'Clinton Kane',
			assignments: [
				{
					name: 'Assignment 1',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				},
				{
					name: 'Assignment 2',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				}
			],
			announcements: [
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				},
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				}
			]
		},
		{
			name: 'Directed Research',
			code: '82FAGCIS4440A',
			semester: 'Fall 1982',
			nextClass: 'Sep 20, 2023 11:59 PM, Sunday',
            instructor: 'Clinton Kane',
			assignments: [
				{
					name: 'Assignment 1',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				},
				{
					name: 'Assignment 2',
					dueDate: 'Sep 20, 2023 11:59 PM, Sunday',
					description: 'This is the description of the assignment',
					files: [
						{
							name: 'File 1',
							link: 'https://www.google.com'
						},
						{
							name: 'File 2',
							link: 'https://www.google.com'
						}
					]
				}
			],
			announcements: [
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				},
				{
					title: 'Added New Assignment',
					description:
						'Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline Hi students please be sure to check out the new assignment that was posted and make sure you finish it before the deadline',
					date: 'Sep 20, 2023 11:59 PM, Sunday'
				}
			]
		}
	];

	export let isFull: boolean;
</script>

<div class="flex flex-col items-end justify-between w-full h-full pb-8">
	<div class="flex flex-col w-full gap-2 overflow-y-scroll">
		{#each courses as course}
			<div
				class="w-full px-4 py-4 duration-500 bg-white border border-white shadow-sm cursor-pointer rounded-xl group hover:border-emerald-400"
			>
				<div class="flex flex-row items-center justify-between overflow-auto">
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
				{#if isFull}
					<div
						class="mt-2"
						in:scale={{
							duration: 500,
							opacity: 0,
							start: 0.95,
							easing: quintOut
						}}
					>
						<!-- <div class="w-full h-px my-2 bg-gray-200" /> -->
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
						<div>
							<div class="mt-2 bg-gray-100 divide-y rounded-md">
								{#each itemz as item}
									<div class="flex flex-col w-full px-4 py-4">
										<!-- <p class="text-xs text-emerald-400">Latest Announcement</p> -->
										<p class="text-gray-600 text-md">Added New Assignment</p>
										<p class="w-full h-8 overflow-hidden text-xs text-gray-400 text-ellipsis">
											Hi students please be sure to check out the new assignment that was posted and
											make sure you finish it before the deadline Hi students please be sure to
											check out the new assignment that was posted and make sure you finish it
											before the deadline Hi students please be sure to check out the new assignment
											that was posted and make sure you finish it before the deadline
										</p>
									</div>
								{:else}
									<div>No Announcement for this course</div>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<div class="text-center">No courses found</div>
		{/each}
	</div>
</div>
