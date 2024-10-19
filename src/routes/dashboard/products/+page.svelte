<script lang="ts">
	import { onMount } from 'svelte';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';

	import Button from '$lib/components/ui/button/button.svelte';
	import CreateUserDialog from './CreateUserDialog.svelte';
	import ProductActions from './ProductActions.svelte';

	// let products: Product[] = [
	// 	{
	// 		id: 1,
	// 		name: 'iPhone 15 Pro Max',
	// 		description:
	// 			'The latest flagship smartphone from Apple, featuring a powerful A17 Bionic chip, triple camera system, and Dynamic Island.',
	// 		sku: 'APPL-IPH-15PM',
	// 		price: 1299.99,
	// 		stock: 100,
	// 		images: [{ url: 'https://example.com/iphone15promax.jpg', alt: 'iPhone 15 Pro Max' }],
	// 		createdAt: '2023-12-25T12:00:00Z',
	// 		updatedAt: '2023-12-25T12:00:00Z'
	// 	},
	// 	{
	// 		id: 2,
	// 		name: 'Samsung Galaxy S24 Ultra',
	// 		description:
	// 			'A high-end Android smartphone with a quad-camera setup, advanced S Pen, and powerful Exynos processor.',
	// 		sku: 'SAMS-GAL-S24U',
	// 		price: 1199.99,
	// 		stock: 80,
	// 		images: [{ url: 'https://example.com/galaxyS24ultra.jpg', alt: 'Samsung Galaxy S24 Ultra' }],
	// 		createdAt: '2023-12-25T12:00:00Z',
	// 		updatedAt: '2023-12-25T12:00:00Z'
	// 	},
	// 	{
	// 		id: 3,
	// 		name: 'Sony PlayStation 5',
	// 		description: 'Next-generation gaming console with powerful hardware and exclusive titles.',
	// 		sku: 'SONY-PS5',
	// 		price: 499.99,
	// 		stock: 50,
	// 		images: [{ url: 'https://example.com/playstation5.jpg', alt: 'Sony PlayStation 5' }],
	// 		createdAt: '2023-12-25T12:00:00Z',
	// 		updatedAt: '2023-12-25T12:00:00Z'
	// 	},
	// 	{
	// 		id: 4,
	// 		name: 'MacBook Pro 16-inch',
	// 		description:
	// 			'High-performance laptop with a large Retina display, M2 Max chip, and powerful graphics.',
	// 		sku: 'APPL-MBP-16',
	// 		price: 2499.99,
	// 		stock: 30,
	// 		images: [{ url: 'https://example.com/macbookpro16.jpg', alt: 'MacBook Pro 16-inch' }],
	// 		createdAt: '2023-12-25T12:00:00Z',
	// 		updatedAt: '2023-12-25T12:00:00Z'
	// 	},
	// 	{
	// 		id: 5,
	// 		name: 'Nike Air Jordan 1 Retro High',
	// 		description: 'Iconic basketball sneaker with a classic design and premium materials.',
	// 		sku: 'NIKE-AJ1-HI',
	// 		price: 170.0,
	// 		stock: 200,
	// 		images: [{ url: 'https://example.com/airjordan1.jpg', alt: 'Nike Air Jordan 1 Retro High' }],
	// 		createdAt: '2023-12-25T12:00:00Z',
	// 		updatedAt: '2023-12-25T12:00:00Z'
	// 	},
	// 	{
	// 		id: 6,
	// 		name: "Levi's 501 Jeans",
	// 		description: 'Classic denim jeans with a timeless design and comfortable fit.',
	// 		sku: 'LEVI-501',
	// 		price: 79.99,
	// 		stock: 300,
	// 		images: [{ url: 'https://example.com/levis501.jpg', alt: "Levi's 501 Jeans" }],
	// 		createdAt: '2023-12-25T12:00:00Z',
	// 		updatedAt: '2023-12-25T12:00:00Z'
	// 	},
	// 	{
	// 		id: 7,
	// 		name: 'Gucci Belt Bag',
	// 		description: 'Luxury belt bag with a stylish design and high-quality materials.',
	// 		sku: 'GUCC-BEL-BAG',
	// 		price: 895.0,
	// 		stock: 10,
	// 		images: [{ url: 'https://example.com/guccibelbag.jpg', alt: 'Gucci Belt Bag' }],
	// 		createdAt: '2023-12-25T12:00:00Z',
	// 		updatedAt: '2023-12-25T12:00:00Z'
	// 	},
	// 	{
	// 		id: 8,
	// 		name: 'IKEA Billy Bookshelf',
	// 		description: 'Versatile bookshelf with adjustable shelves and multiple color options.',
	// 		sku: 'IKEA-BILLY',
	// 		price: 69.99,
	// 		stock: 500,
	// 		images: [{ url: 'https://example.com/ikeabilly.jpg', alt: 'IKEA Billy Bookshelf' }],
	// 		createdAt: '2023-12-25T12:00:00Z',
	// 		updatedAt: '2023-12-25T12:00:00Z'
	// 	},
	// 	{
	// 		id: 9,
	// 		name: 'Dyson V15 Detect Cordless Vacuum',
	// 		description: 'Powerful cordless vacuum cleaner with laser detection and advanced filtration.',
	// 		sku: 'DYSO-V15',
	// 		price: 699.99,
	// 		stock: 150,
	// 		images: [
	// 			{ url: 'https://example.com/dysonv15.jpg', alt: 'Dyson V15 Detect Cordless Vacuum' }
	// 		],
	// 		createdAt: '2023-12-25T12:00:00Z',
	// 		updatedAt: '2023-12-25T12:00:00Z'
	// 	},
	// 	{
	// 		id: 10,
	// 		name: 'KitchenAid Mixer',
	// 		description: 'Professional-grade mixer with multiple attachments and customizable colors.',
	// 		sku: 'KITC-MIXER',
	// 		price: 399.99,
	// 		stock: 80,
	// 		images: [{ url: 'https://example.com/kitchenaidmixer.jpg', alt: 'KitchenAid Mixer' }],
	// 		createdAt: '2023-12-25T12:00:00Z',
	// 		updatedAt: '2023-12-25T12:00:00Z'
	// 	}
	// ];

	let products: Product[] = [];

	const table = createTable(readable(products), {
		page: addPagination({
			initialPageSize: 5
			// serverSide: true,
			// serverItemCount: 10
		})
	});
	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: 'ID'
		}),
		table.column({
			accessor: 'name',
			header: 'Product'
		}),
		table.column({
			accessor: 'description',
			header: 'Description'
			// cell: (cell) => {
			// 	return createRender();
			// }
		}),
		table.column({
			accessor: 'price',
			header: 'Price'
		}),
		table.column({
			accessor: 'stock',
			header: 'Amount'
		}),
		table.column({
			accessor: 'createdAt',
			header: 'Actions',
			cell: () => {
				return createRender(ProductActions);
			}
		})
	]);

	$: openCreateDialog = false;

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex, pageSize } = pluginStates.page;

	onMount(async () => {
		const response = await fetch('http://localhost:3000/products');
		products = await response.json();
	});
</script>

<div class="mt-12 p-6">
	<h1 class="font-bold text-3xl">Products</h1>
</div>

<div class="flex px-10 justify-between">
	<input
		placeholder="Search product by name..."
		class="border-2 rounded-xl border-gray-400 focus:outline-none focus:border-blue-500 transition-[border] delay-50 ease-in px-2"
	/>
	<CreateUserDialog open={openCreateDialog} />
</div>

<div>
	<div class="px-10 py-5">
		<Table.Root {...$tableAttrs} class="rounded-md border">
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
									<Table.Head {...attrs}>
										<Render of={cell.render()} />
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>

			{#if products.length > 0}
				<Table.Body {...$tableBodyAttrs}>
					{#each $pageRows as row (row.id)}
						<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
							<Table.Row {...rowAttrs}>
								{#each row.cells as cell (cell.id)}
									<Subscribe attrs={cell.attrs()} let:attrs>
										<Table.Cell {...attrs}>
											<Render of={cell.render()} />
										</Table.Cell>
									</Subscribe>
								{/each}
							</Table.Row>
						</Subscribe>
					{/each}
				</Table.Body>
			{/if}
		</Table.Root>
	</div>

	<div class="flex items-center justify-end space-x-4 p-10 -my-14">
		<label for="page_size" class="text-gray-500 text-sm font-semibold">Page size:</label>
		<input
			class="border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 transition-[border] delay-50 ease-in"
			placeholder="Page Size"
			id="page_size"
			type="number"
			max="20"
			bind:value={$pageSize}
		/>

		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}
		>
			Previous
		</Button>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}
		>
			Next
		</Button>
	</div>
</div>
