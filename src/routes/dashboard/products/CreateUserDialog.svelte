<script lang="ts">
	import { mediaQuery } from 'svelte-legos';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	export let open = false;
	const isDesktop = mediaQuery('(min-width: 768px)');
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Trigger asChild let:builder>
			<Button variant="default" builders={[builder]}>Add</Button>
		</Dialog.Trigger>

		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Create product</Dialog.Title>
				<Dialog.Description>Create a new product. Click save when you're done.</Dialog.Description>
			</Dialog.Header>
			<form class="grid items-start gap-4">
				<div class="grid gap-2">
					<Label for="name">Name</Label>
					<Input type="email" id="name" placeholder="Enter your product name" />
				</div>
				<div class="grid gap-2">
					<Label for="description">Description</Label>
					<Input id="description" placeholder="Enter your product description" />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="col-span-1">
						<Label for="price">Price</Label>
						<Input id="price" placeholder="Enter price" />
					</div>
					<div class="col-span-1">
						<Label for="sku">SKU</Label>
						<Input id="sku" placeholder="Enter your product SKU" />
					</div>
				</div>
				<Button type="submit">Save changes</Button>
			</form>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger asChild let:builder>
			<Button variant="default" builders={[builder]}>Add</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Edit profile</Drawer.Title>
				<Drawer.Description>
					Make changes to your profile here. Click save when you're done.
				</Drawer.Description>
			</Drawer.Header>
			<form class="grid items-start gap-4 px-3">
				<div class="grid gap-2">
					<Label for="name">Name</Label>
					<Input type="email" id="name" placeholder="Enter your product name" />
				</div>
				<div class="grid gap-2">
					<Label for="description">Description</Label>
					<Input id="description" placeholder="Enter your product description" />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div class="col-span-1">
						<Label for="price">Price</Label>
						<Input id="price" placeholder="Enter price" />
					</div>
					<div class="col-span-1">
						<Label for="sku">SKU</Label>
						<Input id="sku" placeholder="Enter your product SKU" />
					</div>
				</div>
				<Button type="submit">Save changes</Button>
			</form>
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
