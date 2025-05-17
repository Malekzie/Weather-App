<script lang="ts">
	import DailyWeather from '$lib/components/svelte/dailyWeather.svelte';
	import WeatherCard from '$lib/components/svelte/weatherCard.svelte';
	let { data } = $props();

	let { weatherData } = data;
</script>

{#if weatherData}
	<main>
		<div class="m-24">
			<WeatherCard {weatherData} />
		</div>
		<div>
			<DailyWeather />
		</div>
	</main>
{:else}
	<p>Loading weather data...</p>
{/if}
