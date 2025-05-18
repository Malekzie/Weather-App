<script lang="ts">
	import { formatTime } from './utils';
	import { Sunrise, Sunset } from 'lucide-svelte';

	export let sunrise: number; // UNIX timestamp (seconds)
	export let sunset: number; // UNIX timestamp (seconds)

	export let containerClass: string = 'flex w-full items-center justify-between px-6';
	export let timeClass: string = 'text-gray-800 dark:text-gray-200';
	export let labelClass: string = 'text-xs text-gray-500 dark:text-gray-400';
</script>

<div class={containerClass}>
	<div class="flex items-center">
		<Sunrise class="mr-2 h-5 w-5 text-orange-400" />
		<div>
			<span class={labelClass}>Sunrise</span>
			<p class={timeClass}>{formatTime(sunrise)}</p>
		</div>
	</div>

	<div class="flex items-center">
		<Sunset class="mr-2 h-5 w-5 text-orange-500" />
		<div>
			<span class={labelClass}>Sunset</span>
			<p class={timeClass}>{formatTime(sunset)}</p>
		</div>
	</div>
</div>
