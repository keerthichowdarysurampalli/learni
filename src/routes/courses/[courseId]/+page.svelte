<script>
	/** @type {import('./$types').PageData} */
	export let data;
	console.log(data);
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
