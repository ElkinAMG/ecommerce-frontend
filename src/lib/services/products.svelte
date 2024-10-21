<script lang="ts" context="module">
	import { supabase } from '$lib/supabaseClient';

	import { env } from '$env/dynamic/public';

	type Error = {
		error: string;
	};

	async function getProducts(page: number, pageSize: number, searchInput?: string) {
		const response = await fetch(
			`${env.PUBLIC_API_URL}/products?page=${page === 0 ? 1 : page}&pageSize=${pageSize} ${searchInput ? `&filter=${searchInput}` : ''} `
		);
		if (response.ok) {
			const data = (await response.json()) as {
				data: Product[];
				total: number;
			};
			return data;
		}
	}

	async function createProduct(product: Partial<Product>) {
		try {
			const { error, data } = await supabase.auth.getSession();

			const headers: any = {
				'Content-Type': 'application/json'
			};

			if (error) throw new Error('Not authorized');

			headers['authorization'] = data.session?.access_token;

			const res = await fetch(`${env.PUBLIC_API_URL}/products`, {
				method: 'POST',
				body: JSON.stringify({
					...product,
					price: Number(product.price),
					stock: Number(product.stock)
				}),
				headers
			});
			if (!res.ok) throw new Error('Unable to create product');
			return res.json() as Promise<Product>;
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async function updateProducts(
		productId: number,
		productData: Partial<Product>
	): Promise<Product | Error> {
		try {
			const { error, data } = await supabase.auth.getSession();

			const headers: any = {
				'Content-Type': 'application/json'
			};

			if (error) throw new Error('Not authorized');

			headers['authorization'] = data.session?.access_token;

			const response = await fetch(`${env.PUBLIC_API_URL}/products/${productId}`, {
				method: 'PATCH',
				body: JSON.stringify(productData),
				headers
			});

			if (!response.ok) throw new Error(`Unable  to update product ${productId}`);

			const product = (await response.json()) as Product;

			return product;
		} catch (error) {
			console.error(error);
			return { error: 'Unable to fetch products' };
		}
	}

	async function deleteProduct(productId: number): Promise<Product | Error> {
		try {
			const { error, data } = await supabase.auth.getSession();

			const headers: any = {
				'Content-Type': 'application/json'
			};

			if (error) throw new Error('Not authorized');

			headers['authorization'] = data.session?.access_token;

			const response = await fetch(`${env.PUBLIC_API_URL}/products/${productId}`, {
				method: 'DELETE',
				headers
			});

			if (!response.ok) throw new Error(`Unable  to update product ${productId}`);

			const product = (await response.json()) as Product;

			return product;
		} catch (error) {
			return { error: 'Unable to fetch products' };
		}
	}

	export { getProducts, createProduct, updateProducts, deleteProduct };
</script>
