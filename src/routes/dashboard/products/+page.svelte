<script lang="ts">
	import { onMount } from 'svelte';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { readable, writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';

	import Button from '$lib/components/ui/button/button.svelte';
	import CreateUserDialog from './CreateUserDialog.svelte';
	import ProductActions from './ProductActions.svelte';

	// Load Props
	$: openCreateDialog = false;
	$: searchInput = '';

	const products = writable([] as Product[]);
	const total = writable(0);

	const table = createTable(products, {
		page: addPagination({
			initialPageSize: 5,
			serverSide: true,
			serverItemCount: total
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
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(ProductActions, {
					product: value,
					products: products
				});
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex, pageSize } = pluginStates.page;

	async function handlePageChange(page: number) {
		const response = await fetch(
			`http://localhost:3000/products?page=${page === 0 ? 1 : page}&pageSize=${$pageSize} ${searchInput.length > 0 ? `&filter=${searchInput}` : ''} `
		);
		if (response.ok) {
			const data = (await response.json()) as {
				data: Product[];
				total: number;
			};

			$products = data.data;
			$total = data.total;
		}
	}

	function addNewProduct(product: Product) {
		$products = [product, ...$products];
	}

	onMount(async () => {
		const response = await fetch(`http://localhost:3000/products?page=1&pageSize=${$pageSize}`);
		if (response.ok) {
			const data = (await response.json()) as {
				data: Product[];
				total: number;
			};

			$products = data.data;
			$total = data.total;
		}
	});
</script>

<div class="mt-12 p-6">
	<h1 class="font-bold text-3xl">Products</h1>
</div>

<div class="flex px-10 justify-between">
	<input
		placeholder="Search product by name..."
		class="border-2 rounded-xl border-gray-400 focus:outline-none focus:border-blue-500 transition-[border] delay-50 ease-in px-2"
		bind:value={searchInput}
		on:keyup={() => handlePageChange($pageIndex)}
	/>
	<CreateUserDialog open={openCreateDialog} on:productCreated={(ev) => addNewProduct(ev.detail)} />
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

			{#if $products.length > 0}
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
			on:click={async () => {
				const page = ($pageIndex = $pageIndex - 1);
				await handlePageChange(page);
			}}
			disabled={!$hasPreviousPage}
		>
			Previous
		</Button>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={async () => {
				const page = ($pageIndex = $pageIndex + 1);
				await handlePageChange(page);
			}}
		>
			Next
		</Button>
	</div>
</div>
