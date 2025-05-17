<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { Search } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from '$lib/schemas/schema';

	let { form }: { form: SuperValidated<Infer<FormSchema>> } = $props();

	const formController = superForm(form, {
		validators: zodClient(formSchema)
	});

	// ✅ Destructure with new names
	const { form: formState, enhance } = formController;
</script>

<form method="POST" use:enhance>
	<Form.Field form={formController} name="city">
		<div class="relative w-64">
			<Form.Control>
				{#snippet children({ props })}
					<Input
						{...props}
						bind:value={$formState.city}
						type="text"
						placeholder="Search for location"
						class="w-full pl-8"
						aria-label="Search"
						aria-describedby="search"
						aria-required="false"
					/>
				{/snippet}
			</Form.Control>
			<div class="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
				<Search class="h-4 w-4 text-gray-500" />
			</div>
		</div>
	</Form.Field>
</form>
