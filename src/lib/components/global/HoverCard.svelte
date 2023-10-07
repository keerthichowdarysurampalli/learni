<script>
	// TODO: Fix the tooltip position
	//  @vamshinenu 2023 learni.app

	$: isHovered = false;
	$: isTooltipHovered = false;

	/**
	 * @type {number}
	 */
	$: x = 0;
	/**
	 * @type {number}
	 */
	$: y = 0;
	/**
	 * @type {number | undefined}
	 */
	let tooltipTimeout;

	/**
	 * @type {number | undefined}
	 */
	let toolTipDelayTimeout;

	/**
	 * @type {HTMLDivElement}
	 */
	let hoverElement;
	/**
	 * @type {HTMLDivElement}
	 */
	let parentElement;

	function mouseOver() {
		if (tooltipTimeout) clearTimeout(tooltipTimeout);
		if (toolTipDelayTimeout) clearTimeout(toolTipDelayTimeout);

		tooltipTimeout = setTimeout(() => {
			if (isHovered) return;
			isHovered = true;
			if (parentElement && hoverElement) {
				const rect = parentElement.getBoundingClientRect();
				x = rect.right;
				y = rect.top;
			}
		}, 300);
	}

	function mouseLeave() {
		if (tooltipTimeout) clearTimeout(tooltipTimeout);
		if (toolTipDelayTimeout) clearTimeout(toolTipDelayTimeout);

		toolTipDelayTimeout = setTimeout(() => {
			if (!isTooltipHovered) {
				isHovered = false;
			}
		}, 500);
	}
</script>

<div class="relative w-full">
	<div
		role="tooltip"
		on:focus
		bind:this={parentElement}
		on:mouseover={mouseOver}
		on:mouseleave={mouseLeave}
	>
		<slot />
	</div>
	<div
		role="tooltip"
		bind:this={hoverElement}
		on:mouseenter={() => (isTooltipHovered = true)}
		on:mouseleave={() => {
			isTooltipHovered = false;
			isHovered = false;
		}}
		class={`${
			isHovered ? 'flex ' : 'hidden'
		} animate-fade-in-scale-up mt-2 w-full absolute inset-x-0 `}
	>
		<slot name="hovercard" />
	</div>
</div>
