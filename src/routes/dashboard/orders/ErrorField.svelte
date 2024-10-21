<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { onMount } from 'svelte';

	export let formSchema: any,
		errors: any,
		formData: any,
		fieldName: string,
		placeholder: string,
		type: 'number' | 'text' = 'text';

	function handleKeyPress(_event: any) {
		const parsed = formSchema.safeParse({
			...formData,
			price: Number(formData.price),
			stock: Number(formData.stock)
		});

		if (parsed.success && Object.keys(formData).every((item) => item.length > 0)) {
			$errors = [];
		} else {
			$errors = parsed.error;
		}
	}

	onMount(() => {
		handleKeyPress(null);
	});
</script>

<Label for={fieldName.toLowerCase()}>{fieldName}</Label>
<Input
	id={fieldName.toLowerCase()}
	name={fieldName.toLowerCase()}
	on:keyup={handleKeyPress}
	bind:value={formData[fieldName.toLowerCase()]}
	{placeholder}
	{type}
/>
<p class="text-[9px] mt-1 text-gray-500">This field is required</p>
