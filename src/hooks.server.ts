import type { Handle } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from '$lib/schemas/schema';
import { zod } from 'sveltekit-superforms/adapters';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		// Only provide an empty validated form for GET requests
		if (event.request.method === 'GET') {
			event.locals.form = await superValidate(zod(formSchema));
		}
		// For POST, actions should handle validation themselves
		return await resolve(event);
	} catch (err) {
		console.error('Error in hooks.server.ts:', err);
		return new Response('Internal server error', { status: 500 });
	}
};
