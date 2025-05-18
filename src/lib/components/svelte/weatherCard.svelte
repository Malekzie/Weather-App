<script lang="ts">
	// ... (imports remain unchanged)
	import * as Card from '$lib/components/ui/card/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import { Badge } from '$lib/components/ui/badge';
	import { Progress } from '$lib/components/ui/progress';
	import {
		Sun,
		Moon,
		Cloud,
		CloudRain,
		CloudSnow,
		CloudFog,
		CloudLightning,
		Droplets,
		Wind,
		Eye,
		Thermometer,
		Gauge,
		Sunrise,
		Sunset,
		Compass,
		Loader2
	} from 'lucide-svelte';
	type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

	let {
		weatherData = null,
		isFahrenheit = false,
		class: userClass = '',
		iconClass = 'text-blue-500 dark:text-blue-400',
		temperatureClass = 'text-gray-800 dark:text-white'
	} = $props();

	const opt = $state<{
		timeOfDay: TimeOfDay;
		iconType: string;
		iconCode: string;
		backgroundClass: string;
		humidityProgress: number;
		visibilityProgress: number;
		isLoading: boolean;
		error: string | null;
	}>({
		timeOfDay: getTimeOfDay(),
		iconType: 'unknown',
		iconCode: '',
		backgroundClass: '',
		humidityProgress: 0,
		visibilityProgress: 0,
		isLoading: true,
		error: null
	});

	function getTimeOfDay(): TimeOfDay {
		const now = new Date();
		const hours = now.getHours();
		if (hours >= 5 && hours < 12) return 'morning';
		if (hours >= 12 && hours < 17) return 'afternoon';
		if (hours >= 17 && hours < 21) return 'evening';
		return 'night';
	}

	function getBackgroundClass() {
		const timeClass = {
			morning: 'from-amber-100 to-sky-200 dark:from-amber-800 dark:to-blue-900',
			afternoon: 'from-sky-200 to-blue-200 dark:from-sky-800 dark:to-blue-800',
			evening: 'from-amber-200 to-purple-200 dark:from-orange-900 dark:to-indigo-900',
			night: 'from-indigo-900 to-slate-900 dark:from-slate-900 dark:to-gray-950'
		}[opt.timeOfDay];

		return `bg-gradient-to-br ${timeClass}`;
	}
	// @ts-expect-error
	function getIconType(iconCode) {
		if (!iconCode) return 'unknown';
		const code = iconCode.substring(0, 2);
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
	// @ts-expect-error
	function getWindDirection(degrees) {
		if (degrees === undefined) return 'N/A';
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
	// @ts-expect-error
	function formatTime(timestamp) {
		if (!timestamp) return '--:--';
		const date = new Date(timestamp * 1000);
		return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
	}
	// @ts-expect-error
	function formatDate(timestamp) {
		if (!timestamp) return 'Unknown';
		const date = new Date(timestamp * 1000);
		return date.toLocaleString([], {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		});
	}

	$effect(() => {
		if (!weatherData || typeof weatherData !== 'object') {
			opt.isLoading = false;
			opt.error = 'No weather data available. Please try another city.';
			return;
		}
		if (weatherData.cod && weatherData.cod !== 200) {
			opt.isLoading = false;
			opt.error = weatherData.message || 'Weather data error. Please try again.';
			return;
		}
		if (weatherData && weatherData.weather && weatherData.main) {
			opt.isLoading = false;
			opt.error = null;
			if (weatherData.weather.length > 0) {
				opt.iconCode = weatherData.weather[0].icon;
				opt.iconType = getIconType(opt.iconCode);
			}
			opt.humidityProgress = Number(weatherData.main.humidity) || 0;
			opt.visibilityProgress = weatherData.visibility
				? (Number(weatherData.visibility) / 10000) * 100
				: 0;
			opt.backgroundClass = getBackgroundClass();
		} else {
			opt.isLoading = false;
			opt.error = 'Malformed weather data received.';
		}
	});
</script>

<Card.Root class="w-full max-w-3xl overflow-hidden shadow-lg {opt.backgroundClass} {userClass}">
	<Card.Content class="p-6">
		{#if opt.isLoading && !weatherData}
			<div class="flex flex-col items-center justify-center py-12">
				<Loader2 class="h-12 w-12 animate-spin text-gray-400 dark:text-gray-600" />
				<p class="mt-4 text-gray-500 dark:text-gray-400">Loading weather data...</p>
			</div>
		{:else}
			<!-- Header section with location and last updated -->
			<div class="flex items-start justify-between">
				<div>
					<h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
						{weatherData?.name}, {weatherData?.sys?.country || ''}
					</h2>
					<p class="text-sm text-gray-500 dark:text-gray-400">
						Updated {weatherData ? formatDate(weatherData.dt) : 'Just now'}
					</p>
				</div>
				<Badge variant="outline" class="capitalize">{opt.timeOfDay}</Badge>
			</div>
			<!-- Main temperature and condition display -->
			<div class="mt-6 flex items-center justify-between">
				<div class="flex items-center">
					<!-- Weather icons using conditionals -->
					<div class="mr-4 h-16 w-16 {iconClass}">
						{#if opt.iconType === 'clear-night'}
							<Moon size={64} />
						{:else if opt.iconType === 'clear'}
							<Sun size={64} />
						{:else if opt.iconType === 'partly-cloudy'}
							<Cloud size={64} />
						{:else if opt.iconType === 'rain' || opt.iconType === 'drizzle'}
							<CloudRain size={64} />
						{:else if opt.iconType === 'snow'}
							<CloudSnow size={64} />
						{:else if opt.iconType === 'fog' || opt.iconType === 'mist'}
							<CloudFog size={64} />
						{:else if opt.iconType === 'thunderstorm'}
							<CloudLightning size={64} />
						{:else}
							<Cloud size={64} />
						{/if}
					</div>
					<div>
						<div class="flex items-end">
							<span class="text-5xl font-bold {temperatureClass}">
								{weatherData?.main
									? isFahrenheit
										? Math.round((weatherData.main.temp * 9) / 5 + 32)
										: Math.round(weatherData.main.temp)
									: '--'}
							</span>
							<span class="ml-1 text-2xl text-gray-700 dark:text-gray-300"
								>{isFahrenheit ? '°F' : '°C'}</span
							>
						</div>
						<p class="capitalize text-gray-600 dark:text-gray-300">
							{weatherData?.weather?.[0]?.main || 'Unknown'}
						</p>
					</div>
				</div>
				<div class="text-right">
					<div class="flex items-center justify-end">
						<Thermometer class="mr-1 h-4 w-4 text-orange-500" />
						<span class="text-gray-700 dark:text-gray-300">
							Feels like {weatherData?.main
								? isFahrenheit
									? Math.round((weatherData.main.feels_like * 9) / 5 + 32)
									: Math.round(weatherData.main.feels_like)
								: '--'}{isFahrenheit ? '°F' : '°C'}
						</span>
					</div>
					<p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
						{weatherData?.weather?.[0]?.description || 'Unknown conditions'}
					</p>
				</div>
			</div>
			<Separator class="my-6 bg-transparent" />
			<!-- Weather details grid -->
			<div class="grid grid-cols-2 gap-4">
				<!-- Wind info -->
				<div class="flex flex-col">
					<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						<Wind class="mr-1 h-4 w-4" /> Wind
					</span>
					<div class="mt-1 flex items-center">
						<span class="text-gray-800 dark:text-gray-200">
							{weatherData?.wind ? Math.round(weatherData.wind.speed * 3.6) : 0} km/h
						</span>
						<Compass class="ml-2 h-4 w-4 text-blue-500" />
						<span class="ml-1 text-gray-700 dark:text-gray-300">
							{weatherData?.wind ? getWindDirection(weatherData.wind.deg) : 'N/A'}
						</span>
					</div>
				</div>
				<!-- Humidity -->
				<div class="flex flex-col">
					<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						<Droplets class="mr-1 h-4 w-4" /> Humidity
					</span>
					<span class="mt-1 text-gray-800 dark:text-gray-200">
						{weatherData?.main?.humidity || 0}%
					</span>
					<Progress value={opt.humidityProgress} class="mt-1 h-1" />
				</div>
				<!-- UV Index (estimated or not available) -->
				<div class="flex flex-col">
					<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						<Sun class="mr-1 h-4 w-4" /> UV Index
					</span>
					<div class="mt-1 flex items-center justify-between">
						<span class="text-gray-800 dark:text-gray-200">N/A</span>
						<span class="text-xs text-gray-600 dark:text-gray-400">Low</span>
					</div>
					<Progress value={20} class="mt-1 h-1" />
				</div>
				<!-- Visibility -->
				<div class="flex flex-col">
					<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						<Eye class="mr-1 h-4 w-4" /> Visibility
					</span>
					<span class="mt-1 text-gray-800 dark:text-gray-200">
						{weatherData?.visibility ? (weatherData.visibility / 1000).toFixed(1) : 0} km
					</span>
					<Progress value={opt.visibilityProgress / 10} class="mt-1 h-1" />
				</div>
			</div>
			<div class="mt-4 grid grid-cols-3 gap-4">
				<!-- Pressure -->
				<div class="flex flex-col">
					<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						<Gauge class="mr-1 h-4 w-4" /> Pressure
					</span>
					<span class="mt-1 text-gray-800 dark:text-gray-200">
						{weatherData?.main?.pressure || 0} hPa
					</span>
				</div>
				<!-- Min Temp -->
				<div class="flex flex-col">
					<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						<Thermometer class="mr-1 h-4 w-4" /> Min
					</span>
					<span class="mt-1 text-gray-800 dark:text-gray-200">
						{weatherData?.main
							? isFahrenheit
								? Math.round((weatherData.main.temp_min * 9) / 5 + 32)
								: Math.round(weatherData.main.temp_min)
							: '--'}{isFahrenheit ? '°F' : '°C'}
					</span>
				</div>
				<!-- Max Temp -->
				<div class="flex flex-col">
					<span class="flex items-center text-sm text-gray-500 dark:text-gray-400">
						<Thermometer class="mr-1 h-4 w-4" /> Max
					</span>
					<span class="mt-1 text-gray-800 dark:text-gray-200">
						{weatherData?.main
							? isFahrenheit
								? Math.round((weatherData.main.temp_max * 9) / 5 + 32)
								: Math.round(weatherData.main.temp_max)
							: '--'}{isFahrenheit ? '°F' : '°C'}
					</span>
				</div>
			</div>

			<Separator class="my-6 w-full bg-white" orientation="vertical" />
			<!-- Sun times -->
			<div class="flex w-full items-center justify-between px-6">
				<div class="flex items-center">
					<Sunrise class="mr-2 h-5 w-5 text-orange-400" />
					<div>
						<span class="text-xs text-gray-500 dark:text-gray-400">Sunrise</span>
						<p class="text-gray-800 dark:text-gray-200">
							{weatherData?.sys ? formatTime(weatherData.sys.sunrise) : '--:--'}
						</p>
					</div>
				</div>

				<div class="flex items-center">
					<Sunset class="mr-2 h-5 w-5 text-orange-500" />
					<div>
						<span class="text-xs text-gray-500 dark:text-gray-400">Sunset</span>
						<p class="text-gray-800 dark:text-gray-200">
							{weatherData?.sys ? formatTime(weatherData.sys.sunset) : '--:--'}
						</p>
					</div>
				</div>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
