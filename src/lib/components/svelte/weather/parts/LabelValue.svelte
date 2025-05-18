<script lang="ts">
	export let label: string;
	export let value: string | number;
	export let unit: string = '';
	export let icon: any = null;
	export let iconClass: string = 'mr-1 h-4 w-4';
	export let labelClass: string = 'text-sm text-gray-500 dark:text-gray-400';
	export let valueClass: string = 'mt-1 text-gray-800 dark:text-gray-200';
</script>

<div class="flex flex-col">
	<span class="flex items-center {labelClass}">
		{#if icon}
			<svelte:component this={icon} class={iconClass} />
		{/if}
		{label}
	</span>
	<span class={valueClass}>{value}{unit}</span>
</div>
