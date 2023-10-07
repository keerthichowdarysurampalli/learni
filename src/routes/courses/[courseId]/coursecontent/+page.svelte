<script>
	// @ts-nocheck

	/** @type {import('./$types').PageData} */
	// @ts-ignore
	export let data;
	import {
		currentPath,
		currentPathModified,
		omitDomainFromUrl,
		reformatURL
	} from '$lib/stores/pathStore';
	import { changeFileColor } from '$lib/api/coursecontent/changeFileColor';
	import arrowLeft from '@iconify/icons-fa6-solid/arrow-left';
	import folderPlus from '@iconify/icons-fa6-solid/folder-plus';

	import { getIconByType } from '$lib/constants/courseContent/fileTypes';
	import downloadSimpleFill from '@iconify/icons-ph/download-simple-fill';
	import shareFill from '@iconify/icons-ph/share-fill';
	import notePencilFill from '@iconify/icons-ph/note-pencil-fill';
	import trashFill from '@iconify/icons-ph/trash-fill';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import FileComponent from '$lib/components/courseContent/FileComponent.svelte';

	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

	$: $currentPath = omitDomainFromUrl($page.url.href);
	$: $currentPathModified = reformatURL($page.url.href);

	$: selectedFileColor = '';
	$: if ($selectedFile) {
		selectedFileColor = `bg-${
			$selectedFile && $selectedFile.iconColor.split('-').splice(1).join('-')
		}`;
	}
	// get actions on file from the server.
	// READ - DOWNLOAD and SHARE
	// CREATE - UPLOAD
	// UDPATE - EDIT
	// DELETE - DELETE
	const actions = ['Download', 'Share', 'Edit', 'Delete'];

	const getIconForAction = (action) => {
		switch (action) {
			case 'Download':
				return downloadSimpleFill;
			case 'Share':
				return shareFill;
			case 'Edit':
				return notePencilFill;
			case 'Delete':
				return trashFill;
			default:
				return downloadSimpleFill;
		}
	};

	const selectedFile = writable();

	$: files = data.files;

	function goBack() {
		// goto(`?path=${searchParams.join('/')}`);
	}

	const fileColors = [
		'gray-400',
		'emerald-400',
		'blue-400',
		'yellow-400',
		'orange-400',
		'violet-400',
		'red-400',
		'purple-400',
		'indigo-400'
	];

	let divElement;

	// Whenever selectedFile changes, update the class
	$: if (divElement) {
		if (selectedFile) {
			const newClass = `hover:bg-${$selectedFile.iconColor.split('-').splice(1).join('-')}`;
			console.log(newClass); //  'hover:bg-emerald-400'
			divElement.classList.add(newClass);
		}
	}
	/**
	 * @param {string} fileName
	 * @param {any[]} files
	 * description: this function is used to handle double click on a file or folder it will open the folder
	 * if its a folder and does nothing if its a file
	 */
	function handleDoubleClick(fileName) {
		let isFile = fileName.includes('.');
		if (isFile) return;
		goto(`?path=${fileName}`);

		$currentPath = $page.url.pathname;
		$currentPathModified = reformatURL($page.url.href);
	}
	const possibleColors = [
		'text-gray-400',
		'text-emerald-400',
		'text-red-400',
		'text-blue-400',
		'text-yellow-400',
		'text-orange-400',
		'text-violet-400',
		'text-purple-400',
		'text-indigo-400',
		'bg-gray-400',
		'bg-emerald-400',
		'bg-red-400',
		'bg-blue-400',
		'bg-yellow-400',
		'bg-orange-400',
		'bg-violet-400',
		'bg-purple-400',
		'bg-indigo-400',
		'hover:bg-red-400',
		'hover:bg-gray-400',
		'hover:bg-emerald-400',
		'hover:bg-blue-400',
		'hover:bg-yellow-400',
		'hover:bg-orange-400',
		'hover:bg-violet-400',
		'hover:bg-purple-400',
		'hover:bg-indigo-400'
	];
</script>

<!-- <h1 class="mb-2">Course Content</h1> -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->

<div
	on:click={() => {
		console.log('clicked');
	}}
	class="grid w-full h-full grid-flow-col grid-cols-2 grid-rows-1 gap-2 md:grid-cols-3"
>
	<!-- File and Folders Section -->
	<div class="col-span-2 grid-element glass-effect">
		<div class="flex flex-row justify-between w-full h-10 gap-2">
			<button
				on:click={() => {
					goBack();
					console.log('going back');
				}}
			>
				<Icon icon={arrowLeft} width="20" class="text-gray-400" />
			</button>
			<div class="flex flex-row gap-2">
				<button>
					<Icon icon={folderPlus} width="24" class="text-gray-400" />
				</button>
				<button>
					<Icon icon={shareFill} width="24" class="text-gray-400" />
				</button>
			</div>
		</div>
		<div class="files-container">
			{#if files.length > 0}
				{#each files as file}
					<button
						class=" w-fit h-fit"
						on:click={() => {
							$selectedFile = file;
						}}
						on:dblclick={() => handleDoubleClick(file.name)}
					>
						<FileComponent
							link={file.link}
							name={file.name.split('/')[file.name.split('/').length - 1]}
							icon={getIconByType(file.type)}
							iconColor={file.iconColor}
							selected={$selectedFile && $selectedFile._id === file._id}
						/>
					</button>
				{/each}
			{:else}
				<div>no files</div>
			{/if}
		</div>
	</div>

	<!-- File Folder Information -->
	<div
		class="flex-col items-start justify-start hidden w-full h-full col-span-1 gap-4 grid-element md:flex glass-effect"
	>
		{#if $selectedFile !== undefined}
			<div class="flex flex-row w-full gap-4 h-1/4">
				<div
					in:fade={{ duration: 500, easing: quintOut }}
					class="flex flex-col items-center justify-center w-full h-full px-4 py-4 shadow-md glass-effect rounded-2xl"
				>
					<!-- {#if $selectedFile.type === 'FOLDER'} -->
					<Icon
						icon={getIconByType($selectedFile.type)}
						width="64"
						class={`${$selectedFile.iconColor}`}
					/>
				</div>
				<div class="flex flex-col items-center w-8 h-full gap-2 justify-evenly">
					{#each fileColors as color}
						<button
							on:click={async () => {
								if (!$selectedFile) return;
								if ($selectedFile.iconColor === `text-${color}`) return;
								const res = await changeFileColor($selectedFile._id, `text-${color}`);
								if (!res) {
									// show toast telling user that there was an error
									console.log('error');
									return;
								}
								files.find((file) => file._id === $selectedFile._id).iconColor = `text-${color}`;
								files = files;
								$selectedFile.iconColor = `text-${color}`;
							}}
							class={`w-4 h-4 bg-${color} duration-300 rounded-full ${
								$selectedFile.iconColor === `text-${color}` ? 'w-6 h-6 shadow-xl' : ''
							}`}
						/>
					{/each}
				</div>
			</div>
			<div class="w-full h-px my-2 bg-gray-200" />

			<!--! FILE INFORMATION -->
			<div class={`${$selectedFile.iconColor} flex flex-col w-full gap-2 `}>
				<h2 class="font-bold">{$selectedFile.name.split('/').pop()}</h2>
				<div class="flex flex-row text-xs text-gray-700">
					<p>{$selectedFile.size} MB</p>
				</div>
				<p class="text-xs">
					{$selectedFile.description}
				</p>

				<div class="flex flex-row justify-between w-full text-xs text-gray-800">
					<p>Uplaoded:</p>
					<p>{$selectedFile.date}</p>
				</div>
				<div class="flex flex-row justify-between w-full text-xs text-gray-800">
					<p>Last Modified:</p>
					<p>{$selectedFile.date}</p>
				</div>

				<div class="flex flex-row w-full gap-2 justify-evenly">
					{#each actions as action}
						<div
							class={`action-button group hover:rounded-3xl duration-1000 hover:${selectedFileColor}`}
						>
							<Icon
								icon={getIconForAction(action)}
								width="24"
								class="duration-100 group-hover:text-white"
							/>
							<p class="hidden text-xs duration-100 lg:flex group-hover:text-white">{action}</p>
						</div>
					{/each}
				</div>
			</div>
			<div class="w-full h-px my-1 bg-gray-200" />

			<h4 class="text-start">Comments</h4>
			<div class="flex flex-col justify-between w-full h-full">
				<div class="flex flex-col w-full h-full gap-2 overflow-x-scroll">
					{#each $selectedFile.comments as comment}
						<div class="flex flex-col justify-start px-2 py-2 bg-white rounded-xl">
							<p class="text-xs">{comment.userName}</p>
							<p class="text-sm">{comment.comment}</p>
						</div>
					{/each}
				</div>
				<input class="h-16 px-2 mt-4 bg-gray-200 rounded-xl" placeholder="Add Comments" />
			</div>

			<!-- content here -->
		{:else}
			<p class="text-gray-400">select a file to preview</p>
		{/if}
	</div>
</div>

<style>
	.action-button {
		@apply flex flex-col items-center justify-center w-1/2 h-16 gap-1 px-4 py-2 duration-500 bg-white cursor-pointer rounded-lg;
	}

	.glass-effect {
		@apply bg-white bg-opacity-50 rounded-2xl backdrop-filter backdrop-blur-xl bg-clip-padding;
	}

	.grid-element {
		@apply w-full h-full px-4 py-4 duration-300 rounded-2xl;
	}
	/* .files-container {
		@apply grid gap-2 overflow-x-scroll grid-cols-4 w-full h-fit justify-start;
		
	} */
	.files-container {
		padding-left: 20px;
		display: grid;
		gap: 16px; /* or whatever fixed gap you want */
		grid-template-columns: repeat(auto-fit, minmax(80px, 80px)); /* specify fixed width */
		overflow-x: scroll;
		width: 100%;
		height: fit-content;
	}
</style>
