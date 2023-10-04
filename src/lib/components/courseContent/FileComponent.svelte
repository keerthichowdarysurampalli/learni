<script>
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
	export let selected = false;
</script>

<div class="flex flex-col items-center w-10 group">
	<Icon {icon} class={`mb-2 text-5xl ${iconColor}`} />
	<p
		class={`text-xs text-center duration-500 group-hover:text-emerald-400 ${
			selected ? 'text-emerald-400' : ''
		}`}
	>
		{name}
	</p>
</div>
