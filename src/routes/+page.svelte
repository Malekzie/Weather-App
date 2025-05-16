<script lang="ts">
	import WeatherCard from '$lib/components/svelte/weatherCard.svelte';
	let { data } = $props();

	let { weatherData } = data;
</script>

{#if weatherData}
	<div class="m-24">
		<WeatherCard {weatherData} />
	</div>
{:else}
	<p>Loading weather data...</p>
{/if}
