import { env } from '$env/dynamic/private';
import { cacheWeather, getCachedWeather } from '$lib/server/upstash.config';
import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from '$lib/schemas/schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ url, locals }) => {
	const city = url.searchParams.get('city') ?? 'Calgary';
	console.log('City from URL:', city);
	const apiKey = env.OPENWEATHER_API_KEY;

	try {
		// 1. Check if the weather data is cached
		const cached = await getCachedWeather(city);
		if (cached) {
			console.log('Serving from cache...');
			return { weatherData: cached, form: locals.form, city };
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

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		const city = form.data.city;
		const apiKey = env.OPENWEATHER_API_KEY;
		if (!form.valid) {
			return { form, city };
		}

		try {
			// 1. Check if the weather data is cached
			const cached = await getCachedWeather(city);
			if (cached) {
				console.log('Serving from cache...');
				return { weatherData: cached, form, city };
			}

			// 2. Fetch fresh data if not cached
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=alerts&appid=${apiKey}&units=metric`
			);

			if (!response.ok) throw new Error('Failed to fetch weather data');

			const weatherData = await response.json();

			// 3. Cache the fresh data
			await cacheWeather(city, weatherData);

			return { weatherData, form, city };
		} catch (err) {
			console.error('Error:', err);
			return { weatherData: null, form, city };
		}
	}
};
