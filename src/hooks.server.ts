import type { Handle } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { formSchema } from '$lib/schemas/schema';
import { zod } from 'sveltekit-superforms/adapters';

let cachedForm: any = null;

export const handle: Handle = async ({ event, resolve }) => {
	cachedForm = await superValidate(zod(formSchema));

	event.locals.form = cachedForm;
	return resolve(event);
};
