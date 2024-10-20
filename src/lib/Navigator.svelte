<script>
	import { getContext } from 'svelte';
	import HomeIcon from './Icons/HomeIcon.svelte';
	import UserIcon from './Icons/UserIcon.svelte';
	import DashboardIcon from './Icons/DashboardIcon.svelte';
	const usr = getContext('user');
</script>

<main>
	<nav class="flex flex-row shadow-md justify-between mb-4">
		<div class="my-auto mx-5 font-bold text-2xl">E-commerce</div>
		<ul class="flex flex-row p-2 gap-10 hover:*:opacity-65">
			<li class="transition-all delay-80 ease-in-out">
				<a href="/" class="flex flex-col justify-center items-center">
					<HomeIcon />
					<span class="text-xs"> Home </span>
				</a>
			</li>
			<li class="transition-all delay-80 ease-in-out">
				{#if !usr}
					<a href="/login" class="flex flex-col justify-center items-center">
						<UserIcon />
						<span class="text-xs"> Sign In </span>
					</a>
				{:else}
					<a href="/dashboard/products" class="flex flex-col justify-center items-center">
						<DashboardIcon />
						<span class="text-xs"> Dashboard </span>
					</a>
				{/if}
			</li>
		</ul>
	</nav>
	<section>
		<slot />
	</section>
</main>
