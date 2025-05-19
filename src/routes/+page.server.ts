import { env } from '$env/dynamic/private';
import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from '$lib/schemas/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { getWeatherData } from '$lib/server/weatherService';

export const load: PageServerLoad = async ({ url, locals }) => {
	const cityParam = url.searchParams.get('city');
	const city = cityParam && cityParam.trim() !== '' ? cityParam : 'Calgary';
	const apiKey = env.OPENWEATHER_API_KEY;

	try {
		const weatherData = await getWeatherData(city, apiKey);
		return { weatherData, form: locals.form, city };
	} catch (err) {
		console.error('Load Error:', err);
		return { weatherData: null, city, error: 'Could not load weather data.' };
	}
};
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		const rawCity = form.data.city;
		const city = rawCity && rawCity.trim() !== '' ? rawCity : 'Calgary';
		const apiKey = env.OPENWEATHER_API_KEY;

		if (!form.valid) {
			return { form, city };
		}

		try {
			const weatherData = await getWeatherData(city, apiKey);
			return { weatherData, form, city };
		} catch (err) {
			console.error('Action Error:', err);
			return { weatherData: null, form, city, error: 'Could not fetch weather data.' };
		}
	}
};
