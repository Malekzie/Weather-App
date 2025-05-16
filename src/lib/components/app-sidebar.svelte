<script lang="ts" module>
	import { AudioWaveform, Smile, Bot, Command, Cloud, Clock, Calendar } from 'lucide-svelte';

	// This is sample data.
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: ''
		},
		location: [
			{
				name: 'Calgary',
				logo: Cloud,
				province: 'AB'
			},
			{
				name: 'Saskatoon',
				logo: AudioWaveform,
				province: 'SK'
			},
			{
				name: 'Ottawa',
				logo: Command,
				province: 'ONT'
			}
		],
		navMain: [
			{
				title: 'Forecast',
				url: '#',
				icon: Cloud,
				isActive: true
			},
			{
				title: 'Hourly Forecast',
				url: '#',
				icon: Clock
			},
			{
				title: 'Monthly Forecast',
				url: '#',
				icon: Calendar
			},
			{
				title: 'Feedback',
				url: '#',
				icon: Smile
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from '$lib/components/nav-main.svelte';
	import NavUser from '$lib/components/nav-user.svelte';
	import TeamSwitcher from '$lib/components/team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher locations={data.location} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
