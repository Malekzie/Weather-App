import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';

const GEO_DB_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const MAX_RESULTS = 5;

async function fetchCitySuggestions(query: string, apiKey: string): Promise<string[]> {
	const response = await fetch(
		`${GEO_DB_API_URL}?namePrefix=${query}&limit=${MAX_RESULTS}&sort=-population`,
		{
			headers: {
				'X-RapidAPI-Key': apiKey,
				'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
			}
		}
	);

	if (!response.ok) {
		throw new Error(`GeoDB API Error: ${response.status} ${response.statusText}`);
	}

	const result = await response.json();
	return result.data.map((city) => city.name);
}

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q');
	const apiKey = env.RAPIDAPI_KEY;

	if (!apiKey) {
		console.error('RAPIDAPI_KEY is missing in environment variables');
		return json({ error: 'API key missing' }, { status: 500 });
	}

	if (!query || query.length < 2) {
		return json({ data: [] });
	}

	try {
		const cityNames = await fetchCitySuggestions(query, apiKey);
		return json({ data: cityNames });
	} catch (err) {
		console.error('City Suggest Error:', err);
		return json({ error: 'Failed to fetch city suggestions' }, { status: 502 });
	}
};
