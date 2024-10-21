<script lang="ts">
	import Product from '$lib/components/product/product.svelte';

	export let data;
	$: products = data.props.products || [];
</script>

<section class="p-10">
	<h1 class="font-bold text-4xl">HOT SALE 🔥</h1>

	<div class="flex flex-row gap-10 p-10 flex-wrap justify-start">
		{#each products as product}
			<Product {product} />
		{:else}
			<p>No products at the moment</p>
		{/each}
	</div>
</section>
