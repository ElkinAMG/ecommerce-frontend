<script>
	import { goto } from '$app/navigation';
	import HomeIcon from './Icons/HomeIcon.svelte';
	import OrdersIcon from './Icons/OrdersIcon.svelte';
	import ProductsIcon from './Icons/ProductsIcon.svelte';
	import SignOutIcon from './Icons/SignOutIcon.svelte';
	import SpinIcon from './Icons/SpinIcon.svelte';
	import { supabase } from './supabaseClient';

	$: isLoading = false;

	async function handleSignOut() {
		try {
			isLoading = true;
			await supabase.auth.signOut({
				scope: 'global'
			});
			goto('/');
		} catch (err) {
			console.error(err);
		} finally {
			isLoading = false;
		}
	}
</script>

<main class="flex flex-row">
	<nav class="flex flex-col shadow-md h-screen w-[10%]">
		<div class="my-[30px] text-center font-bold text-2xl">E-commerce</div>
		<ul class="flex flex-col h-full justify-between">
			<div class="flex flex-col gap-2 hover:*:opacity-65 hover:*:bg-purple-700 hover:*:text-white">
				<a
					href="/dashboard/products"
					class="flex justify-start items-center gap-2 transition-all delay-80 ease-in-out p-3"
				>
					<li class="flex justify-start items-center gap-2">
						<ProductsIcon />
						<span class="text-sm"> Products </span>
					</li>
				</a>

				<a
					href="/dashboard/orders"
					class="flex justify-start items-center gap-2 transition-all delay-80 ease-in-out p-3"
				>
					<li class="flex justify-start items-center gap-2">
						<OrdersIcon />
						<span class="text-sm"> Orders </span>
					</li>
				</a>

				<a
					href="/"
					class="flex justify-start items-center gap-2 transition-all delay-80 ease-in-out p-3"
				>
					<li class="flex justify-start items-center gap-2">
						<HomeIcon />
						<span class="text-sm"> Home </span>
					</li>
				</a>
			</div>

			<div class="space-y-5">
				<button on:click={handleSignOut}>
					<li
						class="transition-all delay-80 ease-in-out pl-10 pb-4 flex justify-start items-center gap-2 cursor-pointer select-none"
					>
						<span class="text-sm"> Sign Out </span>
						{#if isLoading}
							<SpinIcon />
						{:else}
							<SignOutIcon />
						{/if}
					</li>
				</button>
			</div>
		</ul>
	</nav>
	<section class="w-full">
		<slot />
	</section>
</main>
