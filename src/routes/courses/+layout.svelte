<script>
	import Icon from '@iconify/svelte';

	import caretRightLight from '@iconify/icons-ph/caret-right-light';
	import { currentPath, currentPathModified, truncatePath } from '$lib/stores/pathStore.js';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<div class="flex flex-col items-center justify-between w-full h-full">
	<div class="w-full h-full">
		<slot />
	</div>
	<!-- The below will be page specific tools that can be used by the user -->
	<div class="fixed flex flex-row justify-center w-full h-12 bottom-5">
		<div
			class="flex flex-row items-center h-12 max-w-full px-2 overflow-x-scroll bg-white shadow-lg w-fit rounded-xl"
		>
			{#each $currentPathModified
				.split('/')
				.filter((/** @type {string} */ item) => item !== '') as item, index}
				<div
					in:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
					class="flex flex-row items-center"
					style="white-space: nowrap; min-width: max-content;"
				>
					<a
						href={`${truncatePath($currentPath, index)}`}
						class={`text-sm duration-200   ${
							$currentPathModified.split('/').filter((/** @type {string} */ item) => item !== '')
								.length ===
							index + 1
								? 'text-gray-400 cursor-default'
								: 'text-black hover:text-emerald-400 cursor-pointer'
						} `}>{item}</a
					>

					{#if $currentPathModified
						.split('/')
						.filter((/** @type {string} */ item) => item !== '').length !== index + 1}
						<Icon icon={caretRightLight} />
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
