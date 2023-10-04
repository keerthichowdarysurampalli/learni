<script>
	// @ts-nocheck

	import arrowRightLight from '@iconify/icons-ph/arrow-right-light.js';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { currentPath, currentPathModified } from '$lib/stores/pathStore';

	export let data;

	onMount(() => {
		$currentPathModified = window.location.pathname;
		$currentPath = window.location.pathname;
	});
</script>

<h1 class="mb-4">Courses</h1>
<div
	class="grid w-full h-full grid-flow-col grid-rows-2 gap-2 overflow-x-scroll select-none auto-cols-max"
>
	{#each data.courses as course}
		<a
			href="/courses/{course.code}"
			class="flex-none w-full px-4 py-4 duration-500 bg-white bg-opacity-50 cursor-pointer h-fit rounded-xl group backdrop-filter backdrop-blur-xl bg-clip-padding"
		>
			<div class="flex flex-row items-center justify-between">
				<h3>{course.name}</h3>
				<Icon
					icon={arrowRightLight}
					class="mr-4 text-2xl text-gray-400 duration-500 group-hover:text-emerald-400 group-hover:mr-0"
				/>
			</div>
			<p class="mt-1 text-xs text-gray-400">
				<span>{course.instructor} - </span>{course.code} - <span>{course.semester}</span>
			</p>
			<p class="px-4 py-2 mt-1 text-xs text-gray-400 bg-gray-100 rounded-md">
				Next Class: <span class="text-emerald-400">{course.nextClass}</span>
			</p>
			<div class="w-full h-px my-2 bg-gray-200" />
			<div class="grid w-full grid-cols-2 grid-rows-2 gap-2">
				<a
					href={`/courses/${course.code}/coursecontent`}
					class="w-full h-32 px-4 py-4 duration-300 bg-white bg-opacity-75 rounded-xl group/course-content hover:bg-opacity-100"
				>
					<div class="flex flex-col justify-between h-full">
						<div
							class="w-4 h-4 duration-300 bg-gray-300 rounded-full group-hover/course-content:bg-emerald-400"
						/>
						<p>Course Content</p>
					</div>
				</a>
				<a
					href={`/courses/${course.code}/assignments`}
					class="w-full h-32 px-4 py-4 duration-300 bg-white bg-opacity-75 rounded-xl group/course-content hover:bg-opacity-100"
				>
					<div class="flex flex-col justify-between h-full">
						<div
							class="w-4 h-4 duration-300 bg-gray-300 rounded-full group-hover/course-content:bg-emerald-400"
						/>
						<p>Assignments</p>
					</div>
				</a>
				<a
					href={`/courses/${course.code}/grades`}
					class="w-full h-32 px-4 py-4 duration-300 bg-white bg-opacity-75 rounded-xl group/course-content hover:bg-opacity-100"
				>
					<div class="flex flex-col justify-between h-full">
						<div
							class="w-4 h-4 duration-300 bg-gray-300 rounded-full group-hover/course-content:bg-emerald-400"
						/>
						<p>Grades</p>
					</div>
				</a>
				<a
					href={`/courses/${course.code}/attendance`}
					class="w-full h-32 px-4 py-4 duration-300 bg-white bg-opacity-75 rounded-xl group/course-content hover:bg-opacity-100"
				>
					<div class="flex flex-col justify-between h-full">
						<div
							class="w-4 h-4 duration-300 bg-gray-300 rounded-full group-hover/course-content:bg-emerald-400"
						/>
						<p>Attendance</p>
					</div>
				</a>
			</div>
			<!-- <div class="w-full h-px my-2 bg-gray-200" /> -->
		</a>
		<!-- {/if} -->
		<!-- </div> -->
	{:else}
		<div class="text-center">No courses found</div>
	{/each}
</div>
