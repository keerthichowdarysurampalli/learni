<!-- !This is the dashboard of the application -->
<!-- 6 widgets MAX -->

<!-- 1.Courses -->
<!-- 2.Grades -->
<!-- 3.Calendar -->
<!-- 4.Announcements -->
<!-- 5.Chats -->
<!-- 6. WHAT IS THIS-->
<!-- 6.TODO -->

<script>
	import BigCol1 from '$lib/components/Layouts/BigCol1.svelte';
	import BigCol2 from '$lib/components/Layouts/BigCol2.svelte';
	import BigCol3 from '$lib/components/Layouts/BigCol3.svelte';
	import SmallCol1 from '$lib/components/Layouts/SmallCol1.svelte';
	import SmallCol2 from '$lib/components/Layouts/SmallCol2.svelte';
	import SmallCol3 from '$lib/components/Layouts/SmallCol3.svelte';
	import { isColFull } from '$lib/components/Layouts/layoutStore';
	import Courses from '$lib/components/Widgets/Courses.svelte';

	const Col1 = [];
	const Col2 = [];
	const Col3 = [];

	$: console.log('$');
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta charset="UTF-8" />
	<meta name="Learni Dashboard" content="Dashboard" />
	<!-- head content -->
</svelte:head>

<div class="grid w-full h-full grid-rows-2 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
	{#if $isColFull(1)}
		<BigCol1>
			<Courses />
		</BigCol1>
	{:else}
		<SmallCol1>
			<div slot="top-heading">Profile</div>
			<div slot="top">hi</div>
			<div slot="bottom-heading">Grades</div>
			<div slot="bottom">yo</div>
		</SmallCol1>
	{/if}

	{#if $isColFull(2)}
		<BigCol2 />
	{:else}
		<SmallCol2>
			<div slot="top-heading">Calendar</div>
			<div slot="top">hi</div>
			<!-- <div slot="bottom-heading">Grades</div> -->
			<div slot="bottom">yo</div>
		</SmallCol2>
	{/if}

	{#if $isColFull(3)}
		<BigCol3 />
	{:else}
		<SmallCol3 />
	{/if}
</div>
