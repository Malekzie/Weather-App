// lib/components/svelte/weather/utils.ts

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

/**
 * Get the current time of day segment.
 */
export function getTimeOfDay(): TimeOfDay {
	const hour = new Date().getHours();
	if (hour >= 5 && hour < 12) return 'morning';
	if (hour >= 12 && hour < 17) return 'afternoon';
	if (hour >= 17 && hour < 21) return 'evening';
	return 'night';
}

/**
 * Return a background gradient class based on time of day.
 */
export function getBackgroundClass(timeOfDay: TimeOfDay): string {
	const gradients: Record<TimeOfDay, string> = {
		morning: 'from-amber-100 to-sky-200 dark:from-amber-800 dark:to-blue-900',
		afternoon: 'from-sky-200 to-blue-200 dark:from-sky-800 dark:to-blue-800',
		evening: 'from-amber-200 to-purple-200 dark:from-orange-900 dark:to-indigo-900',
		night: 'from-indigo-900 to-slate-900 dark:from-slate-900 dark:to-gray-950'
	};

	return `bg-gradient-to-br ${gradients[timeOfDay]}`;
}

/**
 * Map OpenWeather icon code to a semantic weather type.
 */
export function getIconType(iconCode: string): string {
	if (!iconCode) return 'unknown';
	const code = iconCode.slice(0, 2);
	const isNight = iconCode.endsWith('n');

	switch (code) {
		case '01':
			return isNight ? 'clear-night' : 'clear';
		case '02':
		case '03':
		case '04':
			return 'partly-cloudy';
		case '09':
			return 'drizzle';
		case '10':
			return 'rain';
		case '11':
			return 'thunderstorm';
		case '13':
			return 'snow';
		case '50':
			return 'fog';
		default:
			return 'unknown';
	}
}

/**
 * Convert temperature to Celsius or Fahrenheit.
 */
export function convertTemp(temp: number, isFahrenheit: boolean): number {
	return isFahrenheit ? Math.round((temp * 9) / 5 + 32) : Math.round(temp);
}

/**
 * Get wind direction label from degree.
 */
export function getWindDirection(degrees: number): string {
	if (degrees === undefined || degrees === null) return 'N/A';

	const directions = [
		'N',
		'NNE',
		'NE',
		'ENE',
		'E',
		'ESE',
		'SE',
		'SSE',
		'S',
		'SSW',
		'SW',
		'WSW',
		'W',
		'WNW',
		'NW',
		'NNW'
	];
	const index = Math.round(degrees / 22.5) % 16;
	return directions[index];
}

/**
 * Format a timestamp into a readable time.
 */
export function formatTime(timestamp: number): string {
	if (!timestamp) return '--:--';
	return new Date(timestamp * 1000).toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit'
	});
}

/**
 * Format a timestamp into a readable date string.
 */
export function formatDate(timestamp: number): string {
	if (!timestamp) return 'Unknown';
	return new Date(timestamp * 1000).toLocaleString([], {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit'
	});
}
