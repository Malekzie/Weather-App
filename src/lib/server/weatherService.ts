import { cacheWeather, getCachedWeather } from './upstash.config';

/***
 * Gets weather data, using cache if available.
 */

/**
 * Fetches weather data for a given city, using cache if available.
 * @param city - The name of the city to fetch weather data for.
 * @param apiKey - OpenWeatherMap API key.
 * @returns Weather data object for the specified city.
 */
export async function getWeatherData(city: string, apiKey: string): Promise<any> {
	const cached = await getCachedWeather(city);
	if (cached) {
		console.log('Serving from cache...');
		return cached;
	}

	const endpoint = new URL('https://api.openweathermap.org/data/2.5/weather');
	endpoint.searchParams.append('q', city);
	endpoint.searchParams.append('exclude', 'alerts');
	endpoint.searchParams.append('appid', apiKey);
	endpoint.searchParams.append('units', 'metric');

	const response = await fetch(endpoint.toString());
	if (!response.ok) {
		throw new Error(`Failed to fetch weather data: ${response.status} ${response.statusText}`);
	}

	const weatherData = await response.json();

	// Cache the data
	await cacheWeather(city, weatherData);

	return weatherData;
}
