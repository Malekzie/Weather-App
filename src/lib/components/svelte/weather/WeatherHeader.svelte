<script lang="ts">
	import { formatDate } from './utils';
	import { Badge } from '$lib/components/ui/badge';

	export let city: string = '';
	export let country: string = '';
	export let updatedAt: number; // UNIX timestamp (seconds)
	export let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night' = 'morning';

	export let containerClass: string = 'flex items-start justify-between';
	export let titleClass: string = 'text-2xl font-bold text-gray-800 dark:text-gray-100';
	export let subtitleClass: string = 'text-sm text-gray-500 dark:text-gray-400';
</script>

<div class={containerClass}>
	<div>
		<h2 class={titleClass}>{city}{country ? `, ${country}` : ''}</h2>
		<p class={subtitleClass}>Updated {formatDate(updatedAt)}</p>
	</div>
	<Badge variant="outline" class="capitalize">{timeOfDay}</Badge>
</div>
