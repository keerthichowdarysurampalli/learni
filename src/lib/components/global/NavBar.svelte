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
	import { tooltip } from './tooltip';
	import HoverCard from './HoverCard.svelte';
</script>

<div class="flex justify-center px-2">
	<div
		class="z-50 flex flex-row items-center w-full h-16 py-2 mt-4 md:justify-between max-w-screen-2xl"
	>
		<Icon icon={listLight} width="28" class="flex lg:hidden" />

		<div class="flex-row items-center hidden gap-4 lg:flex">
			<a href="/" use:tooltip={'Home'}
				><Icon
					icon={houseLight}
					width="28"
					class="duration-300 cursor-pointer hover:text-emerald-400"
				/>
			</a>
			<a href="/groups" use:tooltip={'Groups'}>
				<Icon
					icon={usersLight}
					width="28"
					class="duration-300 cursor-pointer hover:text-emerald-400"
				/>
			</a>
			<a href="/courses" use:tooltip={'Courses'}>
				<Icon
					icon={bookLight}
					width="28"
					class="duration-300 cursor-paointer hover:text-emerald-400"
				/>
			</a>
			<a href="/chats" use:tooltip={'Chats'}>
				<Icon
					icon={chatCircleDotsLight}
					width="28"
					class="duration-300 cursor-pointer hover:text-emerald-400"
				/>
			</a>
		</div>
		<SearchBar />
		<div class="flex-row items-center hidden gap-4 md:flex lg:hidden">
			<a href="/groups" use:tooltip={'Groups'}>
				<Icon
					icon={usersLight}
					width="28"
					class="duration-300 cursor-pointer hover:text-emerald-400"
				/>
			</a>
			<a href="/courses" use:tooltip={'Courses'}>
				<Icon
					icon={bookLight}
					width="28"
					class="duration-300 cursor-paointer hover:text-emerald-400"
				/>
			</a>
			<a href="/chats" use:tooltip={'Chats'}>
				<Icon
					icon={chatCircleDotsLight}
					width="28"
					class="duration-300 cursor-pointer hover:text-emerald-400"
				/>
			</a>
			<button
				class="hidden px-4 py-2 duration-300 bg-gray-100 rounded-xl hover:bg-emerald-400 hover:text-white lg:flex"
				>logout</button
			>
		</div>
		<div class="flex-row items-center hidden gap-4 lg:flex">
			<a href="/settings" use:tooltip={'Settings'}>
				<Icon
					icon={gearSixLight}
					width="28"
					class="duration-300 cursor-pointer hover:text-emerald-400 "
				/>
			</a>
			<a href="/notifications" use:tooltip={'Notifications'}>
				<Icon
					icon={bellSimpleLight}
					width="28"
					class="duration-300 cursor-pointer hover:text-emerald-400"
				/>
			</a>
			<a href="/calendar" use:tooltip={'Calendar'}>
				<Icon
					icon={calendarBlankLight}
					width="28"
					class="duration-300 cursor-pointer hover:text-emerald-400"
				/>
			</a>
			<!-- <a class="hidden duration-300 lg:flex hover:text-amber-200" href="/settings">settings</a> -->
			<HoverCard>
				<a
					class="items-center justify-center hidden w-10 h-10 duration-300 bg-gray-200 rounded-full select-none lg:flex hover:text-emerald-400"
					href="/user"
				>
					V
				</a>
				<div slot="hovercard" class="w-40 px-2 py-2 text-xl text-black bg-white rounded-lg">
					hi bro how are yoy doing its a costom shit
				</div>
			</HoverCard>
		</div>
	</div>
</div>
