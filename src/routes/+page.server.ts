import type { PageLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageLoad = async () => {
	try {
		const city = 'Calgary';
		const apiKey = env.OPENWEATHER_API_KEY;
		const response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&exclude=alerts&appid=${apiKey}&units=metric`
		);
		if (response.ok) {
			const weatherData = await response.json();
			return { weatherData };
		}
		return { weatherData: null };
	} catch (err) {
		console.error('Error:', err);
		return { weatherData: null };
	}
};
