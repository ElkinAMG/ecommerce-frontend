<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import SpinIcon from '$lib/Icons/SpinIcon.svelte';

	import { z } from 'zod';
	import ErrorField from './ErrorField.svelte';
	import { createProduct } from '$lib/services/products.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();

	// Props
	export let open = false;

	const user: any = getContext('user');

	// Vars
	const isDesktop = mediaQuery('(min-width: 768px)');
	const formSchema = z.object({
		name: z.string().min(2).max(255),
		description: z.string().min(2).max(255),
		price: z.number().min(1),
		stock: z.number().min(1)
	});

	let productForm = {
		name: '',
		description: '',
		price: '',
		stock: ''
	};

	const errors = writable([]);
	$: defaultDisabled =
		productForm.name.length > 0 &&
		productForm.description.length > 0 &&
		productForm.price.length > 0 &&
		productForm.stock.length > 0;

	let componentHandler = {
		isLoading: false,
		error: null
	};

	async function handleCreateProduct() {
		componentHandler.isLoading = true;
		try {
			const createdProduct = await createProduct({
				...productForm,
				price: Number(productForm.price),
				stock: Number(productForm.stock),
				userId: user.id
			});
			componentHandler.error = null;

			// Dispatch created product
			dispatch('productCreated', createdProduct);

			open = false;
			productForm = {
				name: '',
				description: '',
				price: '',
				stock: ''
			};
		} catch (err: any) {
			componentHandler.error = err.message;
		} finally {
			componentHandler.isLoading = false;
		}
	}
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Trigger asChild let:builder>
			<Button variant="default" builders={[builder]}>Add</Button>
		</Dialog.Trigger>

		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Create product</Dialog.Title>
				<Dialog.Description>Create a new product. Click save when you're done.</Dialog.Description>
			</Dialog.Header>
			<form class="grid items-start gap-4" on:submit|preventDefault={handleCreateProduct}>
				<div class="grid gap-2">
					<ErrorField
						{formSchema}
						{errors}
						fieldName="Name"
						placeholder="Enter your product name"
						formData={productForm}
					/>
				</div>
				<div class="grid gap-2">
					<ErrorField
						{formSchema}
						{errors}
						fieldName="Description"
						placeholder="Enter your product description"
						formData={productForm}
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="col-span-1">
						<ErrorField
							{formSchema}
							{errors}
							fieldName="Price"
							placeholder="Enter price"
							formData={productForm}
							type="number"
						/>
					</div>
					<div class="col-span-1">
						<ErrorField
							{formSchema}
							{errors}
							fieldName="Stock"
							placeholder="Enter stock"
							formData={productForm}
							type="number"
						/>
					</div>
				</div>

				{#if componentHandler.error}
					<div class="bg-red-400 text-white font-bold p-3 rounded-lg text-center">
						<p>{componentHandler.error}</p>
					</div>
				{/if}

				<Button
					type="submit"
					class="flex flex-row gap-2"
					disabled={!($errors.length === 0) && !componentHandler.isLoading}
				>
					{#if componentHandler.isLoading}
						<SpinIcon />
					{/if}
					Save changes
				</Button>
			</form>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger asChild let:builder>
			<Button variant="default" builders={[builder]}>Add</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Dialog.Header>
				<Dialog.Title>Create product</Dialog.Title>
				<Dialog.Description>Create a new product. Click save when you're done.</Dialog.Description>
			</Dialog.Header>
			<form class="grid items-start gap-4 p-5" on:submit|preventDefault={handleCreateProduct}>
				<div class="grid gap-2">
					<ErrorField
						{formSchema}
						{errors}
						fieldName="Name"
						placeholder="Enter your product name"
						formData={productForm}
					/>
				</div>
				<div class="grid gap-2">
					<ErrorField
						{formSchema}
						{errors}
						fieldName="Description"
						placeholder="Enter your product description"
						formData={productForm}
					/>
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="col-span-1">
						<ErrorField
							{formSchema}
							{errors}
							fieldName="Price"
							placeholder="Enter price"
							formData={productForm}
							type="number"
						/>
					</div>
					<div class="col-span-1">
						<ErrorField
							{formSchema}
							{errors}
							fieldName="Stock"
							placeholder="Enter stock"
							formData={productForm}
							type="number"
						/>
					</div>
				</div>

				{#if componentHandler.error}
					<div class="bg-red-400 text-white font-bold p-3 rounded-lg text-center">
						<p>{componentHandler.error}</p>
					</div>
				{/if}

				<Button
					type="submit"
					class="flex flex-row gap-2"
					disabled={!($errors.length === 0) && !componentHandler.isLoading}
				>
					{#if componentHandler.isLoading}
						<SpinIcon />
					{/if}
					Save changes
				</Button>
			</form>
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
