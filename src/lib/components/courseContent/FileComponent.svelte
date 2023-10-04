<script>
	import folderSimpleFill from '@iconify/icons-ph/folder-simple-fill';
	import Icon from '@iconify/svelte';
	/**
	 * @type {string}
	 */
	export let name;

	/**
	 * @type {import('@iconify/svelte').IconifyIcon}
	 */
	export let icon;
	export let iconColor = 'text-gray-400';
</script>

<div class="flex flex-col items-center w-10">
	<Icon {icon} class={`mb-2 text-5xl ${iconColor}`} />
	<p class="text-xs text-center">{name}</p>
</div>
