import type { Handle } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from '$lib/schemas/schema';
import { zod } from 'sveltekit-superforms/adapters';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		if (event.request.method === 'GET') {
			event.locals.form = await superValidate(zod(formSchema));
		}
		return await resolve(event);
	} catch (err) {
		console.error('Error in hooks.server.ts:', err);
		return new Response('Internal server error', { status: 500 });
	}
};
