import { getProducts } from "$lib/services/products.svelte";

export async function load() {
    const products = await getProducts(1, 1000);
    return {
        props: {
            products: products?.data
        }
    }
}