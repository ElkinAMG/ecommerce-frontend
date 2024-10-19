<script>
	import LeftArrowIcon from './Icons/LeftArrowIcon.svelte';
	import OrdersIcon from './Icons/OrdersIcon.svelte';
	import ProductsIcon from './Icons/ProductsIcon.svelte';
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
			</div>

			<li class="transition-all delay-80 ease-in-out pl-2">
				<a href="/" class="flex justify-start items-center gap-2">
					<LeftArrowIcon />
					<span class="text-sm"> Back to Home </span>
				</a>
			</li>
		</ul>
	</nav>
	<section class="w-full">
		<slot />
	</section>
</main>
