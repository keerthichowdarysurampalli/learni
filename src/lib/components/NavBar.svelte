<script lang="ts">
	import SearchBar from './SearchBar.svelte';
	import Icon from '@iconify/svelte';

	import gearSixLight from '@iconify/icons-ph/gear-six-light';
	import chatCircleDotsLight from '@iconify/icons-ph/chat-circle-dots-light';
	import calendarBlankLight from '@iconify/icons-ph/calendar-blank-light';
	import bellSimpleLight from '@iconify/icons-ph/bell-simple-light';
	import bookLight from '@iconify/icons-ph/book-light';
	import listLight from '@iconify/icons-ph/list-light';
	import usersLight from '@iconify/icons-ph/users-light';
	import houseLight from '@iconify/icons-ph/house-light';
	import { onMount } from 'svelte';
</script>

<div class="flex justify-center px-2">
	<div
		class="z-50 flex flex-row items-center w-full h-16 py-2 mt-4 md:justify-between max-w-screen-2xl"
	>
		<Icon icon={listLight} width="28" class="flex lg:hidden" />

		<div class="flex-row items-center hidden gap-4 lg:flex">
			<Icon icon={houseLight} width="28" class="duration-300 cursor-pointer hover:text-red-500" />
			<Icon icon={usersLight} width="28" class="duration-300 cursor-pointer hover:text-red-500" />
			<Icon icon={bookLight} width="28" class="duration-300 cursor-paointer hover:text-red-500" />
			<Icon
				icon={chatCircleDotsLight}
				width="28"
				class="duration-300 cursor-pointer hover:text-red-500"
			/>
		</div>
		<SearchBar />
		<div class="flex-row items-center hidden gap-4 md:flex lg:hidden">
			<Icon icon={usersLight} width="28" class="duration-300 cursor-pointer hover:text-red-500" />
			<Icon icon={bookLight} width="28" class="duration-300 cursor-pointer hover:text-red-500" />
			<Icon
				icon={chatCircleDotsLight}
				width="28"
				class="duration-300 cursor-pointer hover:text-red-500"
			/>
			<button
				class="hidden px-4 py-2 duration-300 bg-gray-100 rounded-xl hover:bg-red-200 hover:text-white lg:flex"
				>logout</button
			>
		</div>
		<div class="flex-row items-center hidden gap-4 lg:flex">
			<Icon
				icon={gearSixLight}
				width="28"
				class="duration-300 cursor-pointer hover:text-red-500 "
			/>
			<Icon
				icon={bellSimpleLight}
				width="28"
				class="duration-300 cursor-pointer hover:text-red-500"
			/>
			<Icon
				icon={calendarBlankLight}
				width="28"
				class="duration-300 cursor-pointer hover:text-red-500"
			/>
			<!-- <a class="hidden duration-300 lg:flex hover:text-amber-200" href="/settings">settings</a> -->
			<a
				class="items-center justify-center hidden w-10 h-10 duration-300 bg-gray-200 rounded-full lg:flex hover:text-amber-200"
				href="/user"
			>
				V
			</a>
		</div>
	</div>
</div>
