# Weather app

A simple application showing the rendering of the fetched data from an api in multiple ways

## Features

- Caching weather by redis to reduce api calls and serving current weather until the server is removed

## Stack used

- **[Sveltekit](https://svelte.dev/docs/svelte)** - Framework of choice
- **[Shadcn/Sveltekit](https://next.shadcn-svelte.com/)** - UI Component library with **TailwindCSS**
- **[OpenWeather](https://openweathermap.org/)** - API Used for calling Weather Data
- **[Lucide/Svelte](https://lucide.dev/icons/?search=happy)** - Framework friendly Icons
- **[Upstash/Redis](https://upstash.com/docs/redis/sdks/ts/getstarted)** - Redis wrapper to reduce api calls

## TO BE IMPLEMENTED

- [x] - Search implementation to view a city
- [ ] - A map to show current weather forecasts ( **Probably not going to be implemented due to api cost restrictions** )
- [ ] - Saving favorite cities

# Disclaimer

I am making this application to the best of the restrictions posed on the scope of the app like api costs, etc.
