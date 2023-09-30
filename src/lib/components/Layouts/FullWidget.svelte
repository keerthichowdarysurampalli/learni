<script lang="ts">
	import './Layout.css';
	import { selectedCol, getColWidgets, getHeading, editToggledWidget } from './layoutStore';
	import EditWidget from './EditWidget.svelte';
	import WidgetOptions from './WidgetOptions.svelte';
	import { bounceInOut, expoIn, expoInOut, expoOut, quintOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';
	import { longPressAction } from '$lib/actions/longpress';

	export let colNumber: number;

	const ButtonName = `fullCol${colNumber}`;

	let timer: number;

	const link = '/' + getHeading($getColWidgets(colNumber).firstWidget).toLowerCase();

	$: isToggled = $editToggledWidget === colNumber * 10 || $editToggledWidget === 0;

	let classStyle = `col-span-1 col-start-${colNumber} row-span-2 row-start-1 widget-container `;
	// ! make sure that there is space before hidden
	if (colNumber === 2) {
		classStyle += 'hidden md:block';
	}
	if (colNumber === 3) {
		classStyle += 'hidden lg:block';
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	in:scale={{
		duration: 500,
		opacity: 0,
		start: 0.95,
		easing: quintOut
	}}
	class={`${classStyle} 
	${
		// $getColEditToggle(colNumber)
		isToggled
			? `border scale-95 hover:border-emerald-400 hover:shadow-xl cursor-pointer ${
					$selectedCol === `${ButtonName}` ? 'border-emerald-400 shadow-xl' : ''
			  }`
			: 'scale-100'
	} 
	`}
	use:longPressAction={{ colNumber }}
	id="widget"
	on:click={() => {
		$selectedCol = ButtonName;
	}}
	on:keydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			$selectedCol = ButtonName;
		}
	}}
>
	<div class="flex flex-row justify-between mb-2">
		<a class="text-lg font-bold duration-500 hover:text-emerald-400" href={link}>
			<slot name="heading">{ButtonName}</slot>
		</a>
		<WidgetOptions {colNumber} widgetPos={0} />
	</div>
	<slot name="body">Body</slot>
	{#if isToggled}
		<EditWidget {colNumber} />
	{/if}
</div>

<style>
	/* Common styles for all corner divs */
	.corner {
		position: absolute;
		width: 16px;
		height: 16px;
		z-index: -50;
	}

	/* Common styles for the glow effect */
	.corner::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(52, 211, 153, 1); /* Adjust the color and opacity as needed */
		filter: blur(16px); /* Adjust the blur amount */
		z-index: -1;
	}
</style>
