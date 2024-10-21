<script lang="ts" context="module">
	import { supabase } from '$lib/supabaseClient';

	import { env } from '$env/dynamic/public';

	type Error = {
		error: string;
	};

	async function getOrders(userId: number, page: number, pageSize: number, searchInput?: string) {
		const { error, data } = await supabase.auth.getSession();

		const headers: any = {
			'Content-Type': 'application/json'
		};

		if (error) throw new Error('Not authorized');

		headers['authorization'] = data.session?.access_token;

		const response = await fetch(
			`${env.PUBLIC_API_URL}/orders/${userId}?page=${page === 0 ? 1 : page}&pageSize=${pageSize} ${searchInput ? `&filter=${searchInput}` : ''}`,
			{
				headers
			}
		);
		if (response.ok) {
			const data = (await response.json()) as {
				data: Orders[];
				total: number;
			};
			return data;
		}
	}

	async function createOrder(userId: number, order: Partial<Orders[]>) {
		try {
			const { error, data } = await supabase.auth.getSession();

			const headers: any = {
				'Content-Type': 'application/json'
			};

			if (error) throw new Error('Not authorized');

			headers['authorization'] = data.session?.access_token;

			const res = await fetch(`${env.PUBLIC_API_URL}/orders`, {
				method: 'POST',
				body: JSON.stringify({
					userId,
					products: order
				}),
				headers
			});
			if (!res.ok) throw new Error('Unable to create order');
			return res.json() as Promise<Orders[]>;
		} catch (err: any) {
			throw new Error(err);
		}
	}

	async function deleteOrder(orderId: number): Promise<Orders | Error> {
		try {
			const { error, data } = await supabase.auth.getSession();

			const headers: any = {
				'Content-Type': 'application/json'
			};

			if (error) throw new Error('Not authorized');

			headers['authorization'] = data.session?.access_token;

			const response = await fetch(`${env.PUBLIC_API_URL}/orders/${orderId}`, {
				method: 'DELETE',
				headers
			});

			if (!response.ok) throw new Error(`Unable  to update product ${orderId}`);

			const product = (await response.json()) as Orders;

			return product;
		} catch (error) {
			return { error: 'Unable to fetch products' };
		}
	}

	export { getOrders, createOrder, deleteOrder };
</script>
