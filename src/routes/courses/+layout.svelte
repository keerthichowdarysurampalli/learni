<script>
	import Icon from '@iconify/svelte';

	import caretRightLight from '@iconify/icons-ph/caret-right-light';

	let path = ['Courses', 'Directed Research', 'Assignments', 'Assignment 1'];
</script>

<div class="flex flex-col justify-between w-full h-full gap-4">
	<div class="flex flex-col w-full h-full">
		<slot />
	</div>

	<!-- The below will be page specific tools that can be used by the user -->
	<div class="flex flex-row items-center justify-between">
		<!-- TODO: This is a special place that holds all the special options / actions for the course, will contain a navigation panel, some quick tools like adding a todo, and these options / actions will change based on which sub directory the user is in.
		-->
		<p>Holder</p>
		<!-- this is a navigation panel that will contain the path the users are in and on a click they can simply move back to a previous page
		for example if a user is under courses > course > assignment > assignment 1
		they can simply click on the course and move back to the course page
		-->
		<div
			class="absolute flex flex-row items-center h-10 max-w-full px-2 overflow-x-scroll transform -translate-x-1/2 bg-white w-fit rounded-xl left-1/2"
		>
			{#each path as item}
				<div
					class="flex flex-row items-center"
					style="white-space: nowrap; min-width: max-content;"
				>
					<a href="/" class="text-sm duration-200 cursor-pointer hover:text-emerald-400">{item}</a>
					<Icon icon={caretRightLight} />
				</div>
				<!-- content here -->
			{/each}
		</div>
	</div>
</div>
