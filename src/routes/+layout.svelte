<script lang="ts">
	import WidgetListOverlay from '$lib/components/Layouts/WidgetListOverlay.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';
</script>

<WidgetListOverlay />

<div class="flex flex-col w-full max-h-[53rem] h-screen px-4 font-body">
	<NavBar />
	<div class="flex justify-center w-full h-full mb-4">
		<div
			class="w-full h-full px-4 py-4 bg-gray-100
		
		
		rounded-xl max-w-screen-2xl max-h-[52rem]"
		>
			<slot />
		</div>
	</div>
</div>
