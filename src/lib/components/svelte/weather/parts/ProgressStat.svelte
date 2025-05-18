<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';

	export let label: string;
	export let value: number;
	export let unit: string = '';
	export let percent: number = value;
	export let icon: any = null;
	export let iconClass: string = 'mr-1 h-4 w-4';
	export let containerClass: string = '';
</script>

<div class={`flex flex-col ${containerClass}`}>
	<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
		{#if icon}
			<svelte:component this={icon} class={iconClass} />
		{/if}
		{label}
	</span>
	<span class="mt-1 text-gray-800 dark:text-gray-200">
		{value}{unit}
	</span>
	<Progress value={percent} class="mt-1 h-1" />
</div>
