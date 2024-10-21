<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import SpinIcon from '$lib/Icons/SpinIcon.svelte';

	import { deleteProduct } from '$lib/services/products.svelte';

	import { createEventDispatcher } from 'svelte';
	import TrashIcon from '$lib/Icons/TrashIcon.svelte';

	// Props
	export let open = false,
		product: Product;

	// Vars
	const isDesktop = mediaQuery('(min-width: 768px)');

	const dispatch = createEventDispatcher();

	let componentHandler = {
		isLoading: false,
		error: null
	};

	async function handleDeleteProduct() {
		componentHandler.isLoading = true;
		try {
			await deleteProduct(product.id);
			componentHandler.error = null;
			// Dispatch updated product
			dispatch('productDeleted', product.id);
			open = false;
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
			<Button variant="ghost" builders={[builder]}>
				<TrashIcon />
			</Button>
		</Dialog.Trigger>

		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Are you sure you want to delete?</Dialog.Title>
				<Dialog.Description
					>Once you delete this product it wouldn't be retrieved again.</Dialog.Description
				>
			</Dialog.Header>
			<div>
				{#if componentHandler.error}
					<div class="bg-red-400 text-white font-bold p-3 rounded-lg text-center">
						<p>{componentHandler.error}</p>
					</div>
				{/if}

				<div class="flex flex-col gap-4">
					<Button
						variant="destructive"
						type="button"
						class="flex flex-row gap-2"
						disabled={componentHandler.isLoading}
						on:click={handleDeleteProduct}
					>
						{#if componentHandler.isLoading}
							<SpinIcon />
						{/if}
						Delete
					</Button>
					<Button
						variant="outline"
						type="button"
						class="flex flex-row gap-2"
						on:click={() => {
							open = false;
						}}
					>
						Cancel
					</Button>
				</div>
			</div>
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
			<div>
				{#if componentHandler.error}
					<div class="bg-red-400 text-white font-bold p-3 rounded-lg text-center">
						<p>{componentHandler.error}</p>
					</div>
				{/if}

				<Button type="submit" class="flex flex-row gap-2">
					{#if componentHandler.isLoading}
						<SpinIcon />
					{/if}
					Save changes
				</Button>
			</div>
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
