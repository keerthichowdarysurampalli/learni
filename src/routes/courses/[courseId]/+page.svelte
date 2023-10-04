<script>
	import { currentPath, currentPathModified } from '$lib/stores/pathStore';
	import { onMount } from 'svelte';

	/** @type {import('./$types').PageData} */
	export let data;
	console.log(data);
	onMount(() => {
		$currentPathModified = `/courses/${data.course?.name}`;
		$currentPath = window.location.pathname;
	});
</script>

{#if data.course}
	{#if data.course?.name}
		<h1>
			{data.course?.name}
		</h1>
	{/if}
{:else}
	<div>Not found</div>
{/if}

<h1>
	{data.course?.name}
</h1>
