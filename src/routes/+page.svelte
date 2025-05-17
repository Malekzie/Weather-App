<script lang="ts">
	import WeatherCard from '$lib/components/svelte/weatherCard.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import SearchForm from '$lib/components/svelte/searchForm.svelte';
	import { page } from '$app/state';

	let { data } = $props();
</script>

{#if data.weatherData}
	<nav class="flex h-12 justify-between">
		<div class="flex items-center">
			<Separator orientation="vertical" />
			<p class="m-3 font-semibold">{(page.url.pathname = 'Forecast')}</p>
		</div>
		<div class="m-1 mr-5 flex items-center">
			<SearchForm form={data.form} />
		</div>
	</nav>
	<main
		class="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#1e467a] from-20% via-[#14203d] via-40%"
	>
		<div class="m-24 w-full max-w-2xl">
			<WeatherCard weatherData={data.weatherData} />
		</div>
	</main>
{:else}
	<p>Loading weather data...</p>
{/if}
