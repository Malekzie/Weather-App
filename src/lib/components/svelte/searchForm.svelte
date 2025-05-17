<script>
	import Input from '$lib/components/ui/input/input.svelte';
	import { Search } from 'lucide-svelte';
</script>

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
