<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { page } from '$app/state';
	import '../app.css';
	import Input from '$lib/components/ui/input/input.svelte';
	let { children } = $props();
	import { Search } from 'lucide-svelte';
</script>

<Sidebar.Provider>
	<AppSidebar />
	<div class="flex h-full w-screen flex-col">
		<nav class="flex h-12 justify-between">
			<div class="flex items-center">
				<Sidebar.Trigger class="m-2" />
				<Separator orientation="vertical" />
				<p class="m-3 font-semibold">{(page.url.pathname = 'Forecast')}</p>
			</div>
			<div class="m-1 mr-5 flex items-center">
				<div class="relative w-64">
					<Input
						type="text"
						placeholder="Search for location"
						class="w-full pl-8"
						aria-label="Search"
						aria-describedby="search"
						aria-required="false"
					/>
					<div class="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
						<Search class="h-4 w-4 text-gray-500" />
					</div>
				</div>
			</div>
		</nav>
		<Separator class="" />
		<main class="h-screen bg-gradient-to-b from-[#1e467a] from-20% via-[#14203d] via-40%">
			{@render children?.()}
		</main>
	</div>
</Sidebar.Provider>
