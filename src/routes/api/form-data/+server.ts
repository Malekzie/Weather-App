import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from '$lib/schemas/schema';

export const GET = async () => {
	const form = await superValidate(zod(formSchema));
	return new Response(JSON.stringify(form));
};
