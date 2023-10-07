<script>
	import './Layout.css';
	import { selectedCol, getHeading, getColWidgets, editToggledWidget } from './layoutStore';
	import EditWidget from './EditWidget.svelte';
	import WidgetOptions from './WidgetOptions.svelte';
	import { scale } from 'svelte/transition';
	import { longPressAction } from '$lib/actions/longpress';
	import { quintOut } from 'svelte/easing';

	/**
	 * @type {number}
	 */
	export let colNumber;

	const ButtonNameTop = `splitCol${colNumber}1`;
	const ButtonNameBottom = `splitCol${colNumber}2`;
	let classStyleTop = `col-span-1 col-start-${colNumber} row-span-1 row-start-1 widget-container`;
	let classStyleBottom = `col-span-1 col-start-${colNumber} row-span-1 row-start-2 widget-container`;

	const linkTop = '/' + getHeading($getColWidgets(colNumber).firstWidget).toLowerCase();
	const linkBottom = '/' + getHeading($getColWidgets(colNumber).secondWidget).toLowerCase();

	// ! make sure that there is space before hidden
	if (colNumber === 2) {
		classStyleTop += ' hidden md:block';
		classStyleBottom += ' hidden md:block';
	}
	if (colNumber === 3) {
		classStyleTop += ' hidden lg:block';
		classStyleBottom += ' hidden lg:block';
	}

	$: isToggledTop = $editToggledWidget === colNumber * 10 + 1 || $editToggledWidget === 0;
	$: isToggledBottom = $editToggledWidget === colNumber * 10 + 2 || $editToggledWidget === 0;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	in:scale={{
		duration: 250,
		opacity: 0,
		start: 0.95,
		easing: quintOut
	}}
	class={`${classStyleTop} 
${
	isToggledTop
		? `border scale-95  hover:border-emerald-400 hover:shadow-xl cursor-pointer ${
				$selectedCol === `${ButtonNameTop}` ? 'border-emerald-400 border-double shadow-xl' : ''
		  }`
		: 'scale-100'
}`}
	use:longPressAction={{ colNumber, widgetPos: 1 }}
	id="widget"
	on:click={() => {
		$selectedCol = ButtonNameTop;
	}}
	on:keydown={(/** @type {{ key: string; }} */ event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			$selectedCol = ButtonNameTop;
		}
	}}
>
	<div class="flex flex-row justify-between mb-2">
		<a class="text-lg font-bold duration-500 hover:text-emerald-400" href={linkTop}>
			<slot name="top-heading">{ButtonNameTop}</slot>
		</a>
		<WidgetOptions widgetPos={1} {colNumber} />
	</div>

	<slot name="top-body">Body</slot>

	{#if isToggledTop}
		<EditWidget {colNumber} />
	{/if}
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	in:scale={{
		duration: 500,
		opacity: 0,
		start: 0.95,
		easing: quintOut
	}}
	class={`${classStyleBottom} 
${
	isToggledBottom
		? `border scale-95 hover:border-emerald-400 hover:shadow-xl cursor-pointer ${
				$selectedCol === `${ButtonNameBottom}` ? 'border-emerald-400 border-double shadow-xl' : ''
		  }`
		: 'scale-100'
}
`}
	use:longPressAction={{ colNumber, widgetPos: 2 }}
	id="widget"
	on:click={() => {
		$selectedCol = ButtonNameBottom;
	}}
	on:keydown={(/** @type {{ key: string; }} */ event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			$selectedCol = ButtonNameBottom;
		}
	}}
>
	<!-- <div class="absolute w-full h-full scale-90 bg-center -top-10 left-10 blur-2xl -z-50 bg-emerald-300" /> -->

	<div class="flex flex-row justify-between mb-2">
		<a class="text-lg font-bold duration-500 hover:text-emerald-400" href={linkBottom}>
			<slot name="bottom-heading">{ButtonNameBottom}</slot>
		</a>
		<WidgetOptions {colNumber} widgetPos={2} />
	</div>
	<div class="flex flex-col w-full h-full">
		<slot name="bottom-body">Body</slot>
	</div>
	{#if isToggledBottom}
		<EditWidget {colNumber} />
	{/if}
</div>
