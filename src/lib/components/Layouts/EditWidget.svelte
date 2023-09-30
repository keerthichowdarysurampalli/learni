<!-- when the user long press to enter edit wiget mode this will be the component that will be shown -->

<script>
	import { changeCol, isColFull } from './layoutStore';
	import squareFill from '@iconify/icons-ph/square-fill';
	import squareSplitVerticalFill from '@iconify/icons-ph/square-split-vertical-fill';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let colNumber = 0;

</script>

<div in:fade={{ duration: 100 }} class="rounded-lg overlay-blur" id="widget-options">
	<div class="flex flex-row bg-opacity-100 border border-gray-200 rounded-md">
		<button
			class={`flex items-center justify-center text-xl h-10 w-10  rounded-l-md  ${
				$isColFull(colNumber) ? 'bg-emerald-400 text-white' : 'bg-white'
			}`}
			on:mousedown|stopPropagation={() => {
				changeCol(colNumber, true);
			}}
		>
			<Icon icon={squareFill} />
		</button>
		<button
			class={`flex items-center justify-center text-xl h-10 w-10 rounded-r-md ${
				!$isColFull(colNumber) ? 'bg-emerald-400 text-white' : 'bg-white'
			}`}
			on:mousedown|stopPropagation={() => {
				changeCol(colNumber, false);
			}}
		>
			<Icon icon={squareSplitVerticalFill} />
		</button>
	</div>
</div>
