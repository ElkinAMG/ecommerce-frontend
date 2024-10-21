<script lang="ts">
	import noImage from '$lib/assets/no_image.jpg';
	import { createOrder } from '$lib/services/orders.svelte';
	import { getContext } from 'svelte';
	import { toast } from 'svelte-sonner';
	import type { Writable } from 'svelte/store';

	export let product: Product;

	const user = getContext('user') as Writable<User>;

	async function addToOrder() {
		try {
			const [order] = await createOrder($user.id, [
				{
					productId: product.id,
					quantity: 1
				}
			]);

			toast(`Order N° ${order.id} has been created`);
		} catch (err) {
			toast("Couldn't create order");
		}
	}
</script>

<div class="card w-[250px] rounded-lg shadow-md pl-4 pr-4 pb-1 mt-4 hover:shadow-xl transition-all">
	<button on:click={addToOrder}>
		<img src={noImage} alt="product" class="w-full" />
		<div class="mt-2">
			<p class="font-bold text-lg w-full text-ellipsis overflow-hidden">{product.name}</p>
			<p class="font-light text-sm w-full h-[200px] text-ellipsis overflow-hidden">
				{product.description}
			</p>
		</div>

		<p class="font-bold text-md text-end mt-2">${product.price}</p>
	</button>
</div>
