<!-- 
	Future IMPL
	TODO: based on the current page, automatically set the option to the current page. Ex: if on the course page, set the option to course
	//TODO: add a search icon
-->
<!-- for now 45 is the max lenght of character for the search term. including the tags.-->

<script>
	import commandIcon from '@iconify/icons-ph/command';
	import magnifyingGlass from '@iconify/icons-ph/magnifying-glass';
	import Icon from '@iconify/svelte';

	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { currentPath } from '$lib/stores/pathStore';
	import { currentPathModified } from '$lib/stores/pathStore';

	const searchClicked = writable(false);
	const showPlaceholder = writable(true);

	/**
	 * @type {HTMLDivElement}
	 */
	let inputElement;

	const showOptions = writable(false);

	let options = ['course', 'files', 'assignments', 'announcements', 'chat', 'groups', 'users'];
	const optionColorsMap = {
		course: 'bg-pink-200',
		files: 'bg-blue-200',
		assignments: 'bg-green-200',
		announcements: 'bg-yellow-200',
		chat: 'bg-purple-200',
		groups: 'bg-red-200',
		users: 'bg-indigo-200'
	};

	let sortedOptions = options;
	let chips = [];
	/**
	 * @type {boolean}
	 */
	let isMac;
	onMount(() => {
		isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
	});

	onMount(() => {
		/**
		 * @param {KeyboardEvent} event
		 */
		function handleKeyDown(event) {
			if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
				$searchClicked = true;
				if (searchClicked && inputElement) {
					inputElement.focus();
				}
			}
			if ($searchClicked && event.key === 'Escape') {
				$searchClicked = false;
				inputElement.blur();
			}
		}

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	console.log($currentPath);

	onMount(() => {
		/**
		 * @param {any} event
		 */
		function handleClickOutside(event) {
			if (!event.target.closest('.search-container')) {
				$searchClicked = false;
			}
		}

		// Add the event listener
		document.addEventListener('click', handleClickOutside);

		// Cleanup
		// onDestroy(() => {
		// 	document.removeEventListener('click', handleClickOutside);
		// });
	});

	$: path = [''];

	onMount(() => {
		path = window.location.pathname.split('/').filter((item) => item !== '');
		console.log(path);
	});

	// Attach this function to the 'keydown' event of your contenteditable div
	/**
	 * @param {any} event
	 */
	function handleKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault(); // Prevent the default tab behavior

			if (sortedOptions.length > 0) {
				const firstOption = sortedOptions[0];
				// Your logic to replace the current word with firstOption
				// This will depend on how you're managing the content of your div
				// For example, you might find the '@' symbol and replace the word following it
				let value = event.target.innerText;
				const atIndex = value.lastIndexOf('@');
				if (atIndex !== -1) {
					const prefix = value.substring(0, atIndex);
					const newContent = `${prefix}@${firstOption}\u00A0`;
					// (event.target as HTMLElement).innerText = newContent;
					// const newContent = `${prefix}@${firstOption}\u00A0`;
					const divElement = event.target;
					divElement.innerText = newContent;

					// Trigger an input event
					const inputEvent = new Event('input', {
						bubbles: true,
						cancelable: true
					});
					divElement.dispatchEvent(inputEvent);

					// Move the cursor to the end (or wherever appropriate)
					// Move the cursor to the end (or wherever appropriate)
					setCursorToEnd(event.target);
				}
			}
		}
	}

	/**
	 * @param {string} option
	 */
	function addChip(option) {
		// Your existing logic to add the chip
		chips.push(option);
		$showOptions = false;

		// Get the current value from the div
		let value = inputElement.innerText;
		const atIndex = value.lastIndexOf('@');
		if (atIndex !== -1) {
			const prefix = value.substring(0, atIndex);
			const newContent = `${prefix}@${option}\u00A0`; // Add a space at the end
			inputElement.innerText = newContent;

			// Trigger an input event
			const inputEvent = new Event('input', {
				bubbles: true,
				cancelable: true
			});
			inputElement.dispatchEvent(inputEvent);

			// Move the cursor to the end (or wherever appropriate)
			setCursorToEnd(inputElement);
		}
	}

	/**
	 * @param {Node} el
	 */
	function setCursorToEnd(el) {
		const range = document.createRange();
		const sel = window.getSelection();
		range.setStart(el, el.childNodes.length);
		range.collapse(true);
		// @ts-ignore
		sel.removeAllRanges();
		// @ts-ignore
		sel.addRange(range);
	}

	/**
	 * @param {any} event
	 */
	function handleInput(event) {
		const target = event.target;
		const value = target.innerText
			.replace(/[^\x20\xA0\x200E\x0A-\x7E]/g, '') // Remove special characters
			.replace(/\n/g, ' '); // Split by space but keep the spaces

		const words = value.split(/(\s+)/);

		// Remove trailing space or non-breaking space
		if (value.endsWith(' ') || value.endsWith('\u00A0')) {
			words.pop();
		}
		// Add invisible character at the beginning
		words.unshift('‎');

		let bgColor = 'bg-gray-300'; // Default background color
		let inputHtml = '';
		$showOptions = false; // Reset showOptions

		for (let i = 0, len = words.length; i < len; i++) {
			const word = words[i];
			if (!word) continue;

			const isLastWord = i === len - 1;
			const isSpecialWord = word.startsWith('@');

			if (isSpecialWord) {
				if (isLastWord) $showOptions = true;

				sortedOptions = options
					.filter((option) => option.toLowerCase().includes(word.slice(1).toLowerCase()))
					.sort((a, b) => a.length - b.length);

				const firstSortedOption = sortedOptions[0];
				// @ts-ignore
				if (firstSortedOption && optionColorsMap[firstSortedOption]) {
					// @ts-ignore
					bgColor = optionColorsMap[firstSortedOption];
				}

				inputHtml += `<span class="px-1 rounded-md py-1/2 w-min ${bgColor}">${word}</span>`;
			} else {
				inputHtml += word;
			}
		}

		inputHtml = '<span>' + inputHtml + '</span>';
		target.innerHTML = inputHtml; // Directly set the innerHTML

		setCursorToEnd(target);

		// Remove placeholder if the div is not empty
		value.trim() !== '' ? ($showPlaceholder = false) : ($showPlaceholder = true);
	}
</script>

<!-- * Main Outer DIV START-->
<div class="relative flex flex-row items-center justify-center w-full h-full gap-2">
	<div
		role="button"
		tabindex="0"
		on:click={() => ($searchClicked = true)}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				$searchClicked = true;
			}
		}}
		class={`
		${
			$currentPathModified.startsWith('/courses') &&
			$currentPathModified.split('/').filter((item) => item !== '').length > 1
				? 'w-full'
				: 'w-full'
		}
		h-full md:max-w-lg  search-container duration-300 backdrop-blur-lg  bg-white ml-2 px-4 ${
			$searchClicked ? 'rounded-t-xl bg-opacity-100 w-full' : 'rounded-lg bg-opacity-50'
		}`}
	>
		<!-- * Placeholders START -->
		<!-- {#if $showPlaceholder} -->
		<div
			class={`absolute inset-0 flex items-center justify-between  duration-300 px-3 bg-transparent  text-gray-400 pointer-events-none`}
		>
			<!-- <i class="ml-1 fas fa-search" /> -->
			<Icon icon={magnifyingGlass} class="text-gray-600" />
			<div
				class={`flex items-center justify-center py-3 text-gray-600  
			}`}
			>
				{#if $searchClicked}
					<div
						class="flex flex-row items-center px-2 mx-1 text-sm text-center bg-gray-300 rounded-md"
					>
						Esc
					</div>
				{:else if isMac}
					<div
						class="flex flex-row items-center px-2 mx-1 text-sm text-center bg-gray-300 rounded-md"
					>
						<Icon icon={commandIcon} />
						<div>K</div>
					</div>
				{:else}
					<div
						class="flex flex-row items-center px-2 mx-1 text-sm text-center bg-gray-300 rounded-md"
					>
						<span>Ctrl K</span>
					</div>
				{/if}
			</div>
		</div>
		<!-- {/if} -->
		<!-- * Placeholders END -->
		<!-- ! Search Bar START -->
		<div
			role="textbox"
			tabindex="0"
			bind:this={inputElement}
			contenteditable="true"
			class={`flex items-center w-full h-12 px-4 rounded-lg outline-none  md:max-w-lg cursor-text focus:outline-none padded-text editable duration-300 ${
				$searchClicked ? 'outline-none  bg-white' : 'outline-none  bg-transparent'
			}`}
			data-placeholder="Search"
			on:keydown={handleKeyDown}
			on:input={handleInput}
		>
			‎
		</div>
		<!-- ! Search Bar END -->

		<!-- ? Search Results and Tags Div START -->
		{#if $searchClicked}
			<div
				on:keydown={() => {}}
				tabindex="0"
				transition:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
				role="textbox"
				on:click|stopPropagation
				class="absolute z-50 flex flex-col justify-center w-full px-2 py-2 overflow-y-scroll transform -translate-x-1/2 bg-white rounded-b-lg cursor-default backdrop-blur-lg md:max-w-lg left-1/2"
			>
				{#if $showOptions}
					<div class="flex flex-row flex-wrap w-full overflow-visible md:max-w-lg">
						<p />
						{#each sortedOptions as option}
							<button
								on:click={() => {
									addChip(option);
								}}
								class={`px-2 py-1 text-xs mr-2 mb-2 duration-300 ${
									// @ts-ignore
									optionColorsMap[option]
								} rounded-md hover:bg-pink-200`}
							>
								@{option}
							</button>
						{/each}
					</div>
				{/if}
				<div class="text-black">Search Results</div>
			</div>
		{/if}
		<!-- ? Search Results and Tags Div END -->
	</div>
</div>

<!-- 
{#if $currentPathModified.startsWith('/courses')}
		{#if $currentPathModified.split('/').filter((item) => item !== '').length > 1}
			<div
				class="flex flex-row items-center h-12 max-w-full px-2 overflow-x-scroll bg-white w-fit rounded-xl"
			>
				{#each $currentPathModified.split('/').filter((item) => item !== '') as item, index}
					<div
						in:slide={{ duration: 300, easing: quintOut, axis: 'y' }}
						class="flex flex-row items-center"
						style="white-space: nowrap; min-width: max-content;"
					>
						<a
							href={`${truncatePath($currentPath, index)}`}
							class={`text-sm duration-200   ${
								$currentPathModified.split('/').filter((item) => item !== '').length === index + 1
									? 'text-gray-400 cursor-default'
									: 'text-black hover:text-emerald-400 cursor-pointer'
							} `}>{item}</a
						>
						{#if $currentPathModified.split('/').filter((item) => item !== '').length !== index + 1}
							<Icon icon={caretRightLight} />
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	{/if} -->

<!-- * Main Outer DIV END-->

<style>
	.padded-text {
		padding-left: 10px;
		padding-right: 10px;
	}
</style>
