import { env } from '$env/dynamic/private';
import { Redis } from '@upstash/redis';

export const redis = new Redis({
	url: env.UPSTASH_REDIS_REST_URL,
	token: env.UPSTASH_REDIS_REST_TOKEN
});

export async function cacheWeather(location: string, data: unknown) {
	await redis.set(`weather:${location}`, data, { ex: 3600 }); // 1-hour TTL
}

export async function getCachedWeather(location: string) {
	try {
		return await redis.get(`weather:${location}`);
	} catch (error) {
		console.error('Upstash error (falling back to API):', error);
		return null;
	}
}
