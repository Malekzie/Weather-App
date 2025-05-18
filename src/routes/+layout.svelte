<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<div class="flex h-full w-screen flex-col">
		<main class="bg-gradient-to-b from-[#1e467a] from-20% via-[#14203d] via-40%">
			<Sidebar.Trigger class="relative " />
			{@render children?.()}
		</main>
	</div>
</Sidebar.Provider>
