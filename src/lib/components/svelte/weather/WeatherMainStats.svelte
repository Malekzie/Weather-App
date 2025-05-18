<script lang="ts">
	import WeatherIcon from './parts/WeatherIcon.svelte';
	import TemperatureDisplay from './parts/TemperatureDisplay.svelte';

	export let iconCode: string;
	export let temperature: number | null = null;
	export let feelsLike: number | null = null;
	export let condition: string = 'Unknown';
	export let isFahrenheit: boolean = false;

	export let iconClass: string = 'text-blue-500 dark:text-blue-400';
	export let containerClass: string = 'mt-6 flex items-center justify-between';
	export let textClass: string = 'capitalize text-gray-600 dark:text-gray-300';
</script>

<div class={containerClass}>
	<div class="flex items-center">
		<div class={`mr-4 h-16 w-16 ${iconClass}`}>
			<WeatherIcon {iconCode} size={64} />
		</div>
		<TemperatureDisplay {temperature} {feelsLike} {isFahrenheit} />
	</div>
	<p class={textClass}>{condition}</p>
</div>
