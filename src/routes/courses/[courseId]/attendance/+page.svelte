<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import { currentPath, currentPathModified } from '$lib/stores/pathStore';
	import { onMount } from 'svelte';

	onMount(() => {
		$currentPath = window.location.pathname;
		$currentPathModified = window.location.pathname;
	});
</script>
