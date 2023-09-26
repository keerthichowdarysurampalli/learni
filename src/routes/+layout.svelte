<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';
</script>

<div class="flex flex-col w-full h-screen px-4 font-body">
	<NavBar />

	<div class="flex justify-center w-full h-full mb-4">
		<div
			class="w-full h-full px-4 py-4 bg-gradient-to-bl from-gray-100 via-slate-200 to-zinc-200 rounded-xl max-w-screen-2xl max-h-[54rem]"
		>
			<div
				class="absolute w-56 h-56 max-w-screen-xl max-h-[40rem] -translate-x-1/4 bg-center rounded-full z-1 left-1/2 blur-3xl bg-emerald-300"
			/>
			<slot />
		</div>
	</div>
</div>

<!-- Overlays or popups or Alerts or Notifications go here. -->

<!-- <div
	class="px-4 py-2 bg-gray-100 border border-gray-200 drop-shadow-2xl w-60 overlay h-50 max-w-screen-2xl"
>
	hello
</div> -->
