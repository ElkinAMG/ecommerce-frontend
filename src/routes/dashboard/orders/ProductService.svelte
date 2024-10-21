<!-- <script lang="ts">
	type Error = {
		error: string;
	};

	async function getProducts() {
		try {
			const response = await fetch('http://localhost:3000/products/');
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			const products = await response.json();
			return { products };
		} catch (error) {
			console.error(error);
			return { error: 'Unable to fetch products' };
		}
	}

	async function updateProducts(
		productId: string,
		productData: Partial<Product>
	): Promise<Product | Error> {
		try {
			const response = await fetch(`http://localhost:3000/products/${productId}`, {
				method: 'PATCH',
				body: JSON.stringify(productData),
				headers: { 'Content-Type': 'application/json' }
			});

			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}

			const product = await response.json();

			return product;
		} catch (error) {
			console.error(error);
			return { error: 'Unable to fetch products' };
		}
	}
</script> -->
<script lang="ts" context="module">
	async function fetchProducts() {
		const response = await fetch('/api/products');
		const data = await response.json();
		return data;
	}

	async function updateProduct(productId: string, updatedData: Partial<Product>) {
		const response = await fetch(`/api/products/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(updatedData)
		});
		const data = await response.json();
		return data;
	}

	export { fetchProducts, updateProduct };
</script>
