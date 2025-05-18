<script lang="ts">
	import { convertTemp, getWindDirection } from './utils';
	import { Progress } from '$lib/components/ui/progress';
	import { Wind, Droplets, Eye, Gauge, Sun, Thermometer } from 'lucide-svelte';
	import LabelValue from './parts/LabelValue.svelte';

	export let windSpeed: number = 0; // in m/s
	export let windDeg: number = 0;
	export let humidity: number = 0; // %
	export let visibility: number = 0; // meters
	export let pressure: number = 0; // hPa
	export let tempMin: number | null = null; // in Kelvin
	export let tempMax: number | null = null; // in Kelvin
	export let isFahrenheit: boolean = false;

	export let containerClass: string = 'grid grid-cols-2 gap-4';
</script>

<div class={containerClass}>
	<!-- Wind -->
	<div class="flex flex-col">
		<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
			<Wind class="mr-1 h-4 w-4" /> Wind
		</span>
		<div class="mt-1 flex items-center">
			<span class="text-gray-800 dark:text-gray-200">{Math.round(windSpeed * 3.6)} km/h</span>
			<span class="ml-2 text-gray-700 dark:text-gray-300">{getWindDirection(windDeg)}</span>
		</div>
	</div>

	<!-- Humidity -->
	<div class="flex flex-col">
		<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
			<Droplets class="mr-1 h-4 w-4" /> Humidity
		</span>
		<span class="mt-1 text-gray-800 dark:text-gray-200">{humidity}%</span>
		<Progress value={humidity} class="mt-1 h-1" />
	</div>

	<!-- Visibility -->
	<div class="flex flex-col">
		<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
			<Eye class="mr-1 h-4 w-4" /> Visibility
		</span>
		<span class="mt-1 text-gray-800 dark:text-gray-200">{(visibility / 1000).toFixed(1)} km</span>
		<Progress value={(visibility / 10000) * 100} class="mt-1 h-1" />
	</div>

	<!-- Pressure -->
	<div class="flex flex-col">
		<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
			<Gauge class="mr-1 h-4 w-4" /> Pressure
		</span>
		<span class="mt-1 text-gray-800 dark:text-gray-200">{pressure} hPa</span>
	</div>

	<!-- UV Index (placeholder) -->
	<div class="flex flex-col">
		<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
			<Sun class="mr-1 h-4 w-4" /> UV Index
		</span>
		<div class="mt-1 flex items-center justify-between">
			<span class="text-gray-800 dark:text-gray-200">N/A</span>
			<span class="text-xs text-gray-600 dark:text-gray-400">Low</span>
		</div>
		<Progress value={20} class="mt-1 h-1" />
	</div>

	<div class="flex flex-col">
		<div class="mt-4 grid grid-cols-2 gap-4">
			<LabelValue
				label="Min Temp"
				value={tempMin !== null
					? `${convertTemp(tempMin, isFahrenheit)}${isFahrenheit ? '°F' : '°C'}`
					: '--'}
				icon={Thermometer}
			/>

			<LabelValue
				label="Max Temp"
				value={tempMax !== null
					? `${convertTemp(tempMax, isFahrenheit)}${isFahrenheit ? '°F' : '°C'}`
					: '--'}
				icon={Thermometer}
			/>
		</div>
	</div>
</div>
