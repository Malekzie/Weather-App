<script lang="ts">
	import { Sun, Moon, Cloud, CloudRain, CloudSnow, CloudFog, CloudLightning } from 'lucide-svelte';

	import { getIconType } from '../utils';

	export let iconCode: string;
	export let size: number = 64;
	export let iconClass: string = 'text-blue-500 dark:text-blue-400';

	// Derived from iconCode
	const iconType = getIconType(iconCode);
</script>

<!-- Icon Rendering Based on Weather Type -->
<div class={iconClass}>
	{#if iconType === 'clear-night'}
		<Moon {size} />
	{:else if iconType === 'clear'}
		<Sun {size} />
	{:else if iconType === 'partly-cloudy'}
		<Cloud {size} />
	{:else if iconType === 'rain' || iconType === 'drizzle'}
		<CloudRain {size} />
	{:else if iconType === 'snow'}
		<CloudSnow {size} />
	{:else if iconType === 'fog'}
		<CloudFog {size} />
	{:else if iconType === 'thunderstorm'}
		<CloudLightning {size} />
	{:else}
		<Cloud {size} />
	{/if}
</div>
