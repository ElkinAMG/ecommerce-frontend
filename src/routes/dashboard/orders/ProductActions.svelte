<script lang="ts">
	import type { Writable } from 'svelte/store';
	import EditProductDialog from './EditProductDialog.svelte';
	import DeleteProductDialog from './DeleteProductDialog.svelte';

	export let product: number, products: Writable<Product[]>;

	$: openEditDialog = false;
	$: openDeleteDialog = false;

	let currentProduct = $products.find((pr: Product) => pr.id === product) as Product;
</script>

<div>
	<EditProductDialog
		open={openEditDialog}
		product={currentProduct}
		on:productUpdated={({ detail }) => {
			$products = $products.map((pr) => (pr.id === product ? detail : pr));
		}}
	/>
	<DeleteProductDialog
		open={openDeleteDialog}
		product={currentProduct}
		on:productDeleted={({ detail }) => {
			$products = $products.filter((pr) => pr.id !== detail);
		}}
	/>
</div>
