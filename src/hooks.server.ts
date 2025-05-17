import type { Handle } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from '$lib/schemas/schema';
import { zod } from 'sveltekit-superforms/adapters';

let cachedForm: any = null;
let lastFetched = 0;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

export const handle: Handle = async ({ event, resolve }) => {
	const now = Date.now();

	if (!cachedForm || now - lastFetched > CACHE_DURATION) {
		console.log('[Hooks] Refreshing form data...');
		cachedForm = await superValidate(zod(formSchema));
		lastFetched = now;
	}

	event.locals.form = cachedForm;
	return resolve(event);
};
