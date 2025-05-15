<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';

	import '../app.css';
	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="to-[#14203d w-full bg-gradient-to-b from-[#1e467a]">
		<Sidebar.Trigger />
		{@render children?.()}
	</main>
</Sidebar.Provider>
