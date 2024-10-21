<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination } from 'svelte-headless-table/plugins';
	import { writable } from 'svelte/store';
	import type { Writable } from 'svelte/store';
	import * as Table from '$lib/components/ui/table';

	import Button from '$lib/components/ui/button/button.svelte';
	import { getOrders } from '$lib/services/orders.svelte';

	// Load Props
	$: searchInput = '';

	const orders = writable([] as Orders[]);
	const total = writable(0);

	const user = getContext('user') as Writable<User>;

	const table = createTable(orders, {
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
			accessor: 'productId',
			header: 'Product'
		}),
		table.column({
			accessor: 'quantity',
			header: 'Quantity'
		}),
		table.column({
			accessor: 'userId',
			header: 'User'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex, pageSize } = pluginStates.page;

	async function handlePageChange(page: number) {
		try {
			const _orders = await getOrders($user.id, page, $pageSize, searchInput);
			if (_orders) {
				$orders = _orders?.data;
				$total = _orders?.total;
			}
		} catch (err) {
			console.error(err);
		}
	}

	onMount(async () => {
		try {
			const _orders = await getOrders($user.id, 1, $pageSize, searchInput);
			if (_orders) {
				$orders = _orders?.data;
				$total = _orders?.total;
			}
		} catch (err) {
			console.error(err);
		}
	});
</script>

<div class="mt-12 p-6">
	<h1 class="font-bold text-3xl">Orders</h1>
</div>

<div class="flex px-10 justify-between">
	<input
		placeholder="Search by order id..."
		class="border-2 rounded-xl border-gray-400 focus:outline-none focus:border-blue-500 transition-[border] delay-50 ease-in px-2 h-[40px] w-3/12"
		bind:value={searchInput}
		on:keyup={() => handlePageChange($pageIndex)}
	/>
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

			{#if $orders.length > 0}
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
