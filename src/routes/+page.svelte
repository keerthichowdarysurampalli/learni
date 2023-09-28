<!-- !This is the dashboard of the application -->
<!-- This will have all the logic for -->
<!-- 6 widgets MAX -->

<!-- 1.Courses -->
<!-- 2.Grades -->
<!-- 3.Calendar -->
<!-- 4.Announcements -->
<!-- 5.Chats -->
<!-- 6. WHAT IS THIS-->
<!-- 6.TODO -->

<script>
	import Widgets from '$lib/components/Layouts/Widgets.svelte';
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta charset="UTF-8" />
	<meta name="Learni Dashboard" content="Dashboard" />
	<!-- head content -->
</svelte:head>

<div class="grid w-full h-full grid-rows-2 gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
	<Widgets />
</div>
