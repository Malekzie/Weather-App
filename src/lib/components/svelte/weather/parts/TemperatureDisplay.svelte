<script lang="ts">
	import { convertTemp } from '../utils';

	export let temperature: number | null = null;
	export let feelsLike: number | null = null;
	export let isFahrenheit: boolean = false;

	// Class names
	export let containerClass: string = '';
	export let tempClass: string = 'text-gray-800 dark:text-white';
	export let feelsClass: string = 'text-sm text-gray-600 dark:text-gray-400';
</script>

<div class={`flex flex-col ${containerClass}`}>
	<div class="flex items-end">
		<span class={`text-5xl font-bold ${tempClass}`}>
			{temperature !== null ? convertTemp(temperature, isFahrenheit) : '--'}
		</span>
		<span class="ml-1 text-2xl text-gray-700 dark:text-gray-300">
			{isFahrenheit ? '°F' : '°C'}
		</span>
	</div>
	<p class={feelsClass}>
		Feels like
		{feelsLike !== null
			? ` ${convertTemp(feelsLike, isFahrenheit)}${isFahrenheit ? '°F' : '°C'}`
			: ' --'}
	</p>
</div>
