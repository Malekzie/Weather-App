import type { PageLoad } from './$types';
import { env } from '$env/dynamic/private';
import { cacheWeather, getCachedWeather } from '$lib/server/upstash.config';

export const load: PageLoad = async () => {
	const city = 'Calgary';
	const apiKey = env.OPENWEATHER_API_KEY;

	try {
		// 1. Check if the weather data is cached
		const cached = await getCachedWeather(city);
		if (cached) {
			console.log('Serving from cache...');
			return { weatherData: cached };
		}

		// 2. Fetch fresh data if not cached
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=alerts&appid=${apiKey}&units=metric`
		);

		if (!response.ok) throw new Error('Failed to fetch weather data');

		const weatherData = await response.json();

		// 3. Cache the fresh data
		await cacheWeather(city, weatherData);

		return { weatherData };
	} catch (err) {
		console.error('Error:', err);
		return { weatherData: null };
	}
};
