<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';

	import WeatherHeader from './WeatherHeader.svelte';
	import WeatherMainStats from './WeatherMainStats.svelte';
	import WeatherDetailsGrid from './WeatherDetailsGrid.svelte';
	import SunTimes from './SunTimes.svelte';

	import { getTimeOfDay, getBackgroundClass } from './utils';

	export let weatherData: any = null;
	export let isFahrenheit: boolean = false;
	export let loading: boolean = false;
	export let error: string | null = null;

	const timeOfDay = getTimeOfDay();
	const backgroundClass = getBackgroundClass(timeOfDay);
</script>

<Card.Root class={`w-full max-w-3xl overflow-hidden shadow-lg ${backgroundClass}`}>
	<Card.Content class="p-6">
		{#if loading}
			<div class="flex flex-col items-center justify-center py-12">
				<span
					class="h-8 w-8 animate-spin rounded-full border-4 border-blue-400 border-t-transparent"
				></span>
				<p class="mt-4 text-gray-500 dark:text-gray-400">Loading weather data...</p>
			</div>
		{:else if error}
			<div class="py-6 text-center text-red-600 dark:text-red-400">
				<p>{error}</p>
			</div>
		{:else if weatherData}
			<WeatherHeader
				city={weatherData.name}
				country={weatherData.sys?.country}
				updatedAt={weatherData.dt}
				{timeOfDay}
			/>

			<WeatherMainStats
				iconCode={weatherData.weather?.[0]?.icon ?? ''}
				temperature={weatherData.main?.temp}
				feelsLike={weatherData.main?.feels_like}
				condition={weatherData.weather?.[0]?.main ?? 'Unknown'}
				{isFahrenheit}
			/>

			<hr class="my-6 border-t border-white/20" />

			<WeatherDetailsGrid
				windSpeed={weatherData.wind?.speed}
				windDeg={weatherData.wind?.deg}
				humidity={weatherData.main?.humidity}
				visibility={weatherData.visibility}
				pressure={weatherData.main?.pressure}
				tempMin={weatherData.main?.temp_min}
				tempMax={weatherData.main?.temp_max}
				{isFahrenheit}
			/>

			<hr class="my-6 border-t border-white/20" />

			<SunTimes sunrise={weatherData.sys?.sunrise} sunset={weatherData.sys?.sunset} />
		{/if}
	</Card.Content>
</Card.Root>
