<script lang="ts">
	//  @vamshinenu 2023 learni.app
	// LETS ROCK!
	import NavBar from '$lib/components/global/NavBar.svelte';
	import '../app.css';
</script>

<div
	class="flex flex-col w-full h-screen max-h-screen px-4 font-body bg bg-gradient-to-b from-black-200 via-black-100 to-black-50"
>
	<NavBar />
	<div class="flex justify-center w-full h-full mb-4 overflow-hidden">
		<div class="w-full h-full px-2 py-2 rounded-xl max-w-screen-2xl max-h-[60rem]">
			<slot />
		</div>
	</div>
</div>

<!-- 
<div
	class="px-4 py-2 bg-gray-100 border border-gray-200 drop-shadow-2xl w-60 h-50 max-w-screen-2xl overlay"
>
	<div class="h-full bg-emerald-100 w-60 max-w-screen-2xl" />
</div> -->
<!-- Overlays or popups or Alerts or Notifications go here. -->

<!-- <div
	class="px-4 py-2 bg-gray-100 border border-gray-200 drop-shadow-2xl w-60 overlay h-50 max-w-screen-2xl"
>
	hello
</div> -->

<!-- <svelte:body on:mousemove={handleMouseMove} />
 -->

<style>
	.bg {
		background-color: rgb(235, 238, 240);
	}
</style>
