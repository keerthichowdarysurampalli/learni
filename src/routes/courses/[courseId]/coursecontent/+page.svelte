<script>
	// @ts-nocheck

	/** @type {import('./$types').PageData} */
	// @ts-ignore
	export let data;
	import { currentPath, currentPathModified } from '$lib/stores/pathStore';
	import arrowLeft from '@iconify/icons-fa6-solid/arrow-left';
	import folderPlus from '@iconify/icons-fa6-solid/folder-plus';

	import { FileIcons, getIconByType } from '$lib/constants/courseContent/fileTypes';
	import { onMount } from 'svelte';
	import downloadSimpleFill from '@iconify/icons-ph/download-simple-fill';
	import shareFill from '@iconify/icons-ph/share-fill';
	import notePencilFill from '@iconify/icons-ph/note-pencil-fill';
	import trashFill from '@iconify/icons-ph/trash-fill';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import FileComponent from '$lib/components/courseContent/FileComponent.svelte';
	import { writable } from 'svelte/store';
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { goto } from '$app/navigation';

	console.log(data);

	$: searchParams = $page.url.searchParams.get('path');

	console.log($page.url.searchParams.get('path'));

	const folderPath = writable([]);

	// @ts-ignore
	const currentPathFiles = writable([]);

	const selectedFile = writable();

	// @ts-ignore
	function handleSingleClick(file) {
		file.name = file.name.split('/').pop();
		$selectedFile = file;
	}
	// @ts-ignore
	function goBack() {
		if (searchParams === null) return;
		searchParams.split('/').pop();
		searchParams = searchParams;
		console.log(searchParams);
		goto(`?path=${searchParams.join('/')}`);
	}

	$: console.log(searchParams);
	/**
	 * @param {string} fileName
	 * @param {any[]} files
	 */
	function handleDoubleClick(fileName, files) {
		let isFile = fileName.includes('.');
		console.log(fileName);
		console.log(files);
		console.log(isFile);
		if (isFile) return;
		console.log(fileName);
		goto(`?path=${fileName}`);
	}

	onMount(() => {
		$currentPath = window.location.pathname;
		$currentPathModified = window.location.pathname;
	});
</script>

<!-- <h1 class="mb-2">Course Content</h1> -->
<div class="grid w-full h-full grid-flow-col grid-cols-2 grid-rows-1 gap-2 md:grid-cols-3">
	<!-- File and Folders Section -->
	<div class="col-span-2 grid-element glass-effect">
		<div class="flex flex-row justify-between w-full h-10 gap-2">
			<button on:click={goBack}>
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
		<div class=" files-container">
			{#if data.files.length > 0}
				<!-- content here -->
				{#each data.files as file, index}
					<button
						class=" w-fit h-fit"
						on:click={() => handleSingleClick(file)}
						on:dblclick={() => handleDoubleClick(data.files[index].name)}
					>
						<FileComponent
							link={file.link}
							name={file.name.split('/').pop()}
							icon={getIconByType(file.type)}
							iconColor={file.iconColor}
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
		class="flex-col items-center justify-center hidden col-span-1 gap-4 grid-element md:flex glass-effect"
	>
		{#if $selectedFile !== undefined}
			<div
				in:scale={{ duration: 300, start: 0.95, easing: quintOut }}
				class="flex flex-col items-center justify-center w-full px-4 py-4 bg-black glass-effect rounded-2xl h-1/3"
			>
				<h2>Preview</h2>
			</div>
			<div class="flex flex-col gap-2">
				<h2>{$selectedFile.name}</h2>
				<p class="text-xs">
					This file contains some notes that, I made as part of your assignment 1 as a reference.
				</p>
				<div class="flex flex-row justify-between w-full">
					<p class="text-xs text-gray-800">File Size:</p>
					<p class="text-xs text-gray-800">{$selectedFile.size} MB</p>
				</div>
				<div class="flex flex-row justify-between w-full">
					<p class="text-xs text-gray-800">File Type:</p>
					<p class="text-xs text-gray-800">PDF</p>
				</div>
				<div class="flex flex-row justify-between w-full">
					<p class="text-xs text-gray-800">Uplaoded:</p>
					<p class="text-xs text-gray-800">{$selectedFile.date}</p>
				</div>
				<div class="flex flex-row justify-between w-full">
					<p class="text-xs text-gray-800">Last Modified:</p>
					<p class="text-xs text-gray-800">{$selectedFile.date}</p>
				</div>
				<div class="flex flex-row w-full gap-2 justify-evenly">
					<div
						class="flex flex-col items-center justify-center w-1/2 h-16 gap-1 px-4 py-2 duration-500 bg-gray-200 cursor-pointer rounded-xl hover:bg-emerald-400 group hover:rounded-2xl"
					>
						<Icon
							icon={downloadSimpleFill}
							width="24"
							class="duration-500 group-hover:text-white"
						/>
						<p class="text-xs duration-500 group-hover:text-white">Download</p>
					</div>
					<!-- share modify delete options too -->
					<div
						class="flex flex-col items-center justify-center w-1/2 h-16 gap-1 px-4 py-2 duration-500 bg-gray-200 cursor-pointer rounded-xl hover:bg-emerald-400 group hover:rounded-2xl"
					>
						<Icon icon={shareFill} width="24" class="duration-500 group-hover:text-white" />
						<p class="text-xs duration-500 group-hover:text-white">Share</p>
					</div>

					<div
						class="flex flex-col items-center justify-center w-1/2 h-16 gap-1 px-4 py-2 duration-500 bg-gray-200 cursor-pointer rounded-xl hover:bg-emerald-400 group hover:rounded-2xl"
					>
						<Icon icon={notePencilFill} width="24" class="duration-500 group-hover:text-white" />
						<p class="text-xs duration-500 group-hover:text-white">Modify</p>
					</div>

					<div
						class="flex flex-col items-center justify-center w-1/2 h-16 gap-1 px-4 py-2 duration-500 bg-gray-200 cursor-pointer rounded-xl hover:bg-emerald-400 group hover:rounded-2xl"
					>
						<Icon icon={trashFill} width="24" class="duration-500 group-hover:text-white" />
						<p class="text-xs duration-500 group-hover:text-white">Delete</p>
					</div>
				</div>
			</div>
			<div class="" />
			<h3>Comments</h3>
			<div class="flex flex-col justify-between w-full h-1/3">
				<div class="flex flex-col w-full h-full gap-2 overflow-x-scroll">
					<div class="flex flex-col justify-start px-2 py-2 bg-white rounded-xl">
						<p>Vamshi</p>
						<p>Thanks Professor</p>
					</div>
					<div class="flex flex-col justify-start px-2 py-2 bg-white rounded-xl">
						<p>Vamshi</p>
						<p>Thanks Professor</p>
					</div>
					<div class="flex flex-col justify-start px-2 py-2 bg-white rounded-xl">
						<p>Vamshi</p>
						<p>Thanks Professor</p>
					</div>
					<div class="flex flex-col justify-start px-2 py-2 bg-white rounded-xl">
						<p>Vamshi</p>
						<p>Thanks Professor</p>
					</div>
					<div class="flex flex-col justify-start px-2 py-2 bg-white rounded-xl">
						<p>Vamshi</p>
						<p>Thanks Professor</p>
					</div>
					<div class="flex flex-col justify-start px-2 py-2 bg-white rounded-xl">
						<p>Vamshi</p>
						<p>Thanks Professor</p>
					</div>
				</div>

				<input class="h-16 px-2 mt-4 bg-gray-200 rounded-xl" placeholder="Add Comments" />
			</div>

			<!-- content here -->
		{:else}
			<div>select a file to preview</div>
		{/if}
	</div>
</div>

<style>
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
