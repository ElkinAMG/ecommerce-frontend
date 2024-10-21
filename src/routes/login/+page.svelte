<script>
	import { goto } from '$app/navigation';
	4;
	import { supabase } from '$lib/supabaseClient';

	$: userData = {
		email: '',
		password: ''
	};

	async function handleLogin() {
		const { error } = await supabase.auth.signInWithPassword({
			email: userData.email,
			password: userData.password
		});

		if (error) {
			console.error(error);
		} else {
			goto('/dashboard/products');
		}
	}
</script>

<div class="flex">
	<form class="my-[250px] p-10 w-[500px]" on:submit={handleLogin}>
		<!-- Email input -->
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-password"
				>
					Email
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-password"
					placeholder="john@doe.com"
					type="email"
					bind:value={userData.email}
				/>
			</div>
		</div>

		<!-- Password input -->
		<div class="flex flex-wrap -mx-3 mb-6">
			<div class="w-full px-3">
				<label
					class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
					for="grid-password"
				>
					Password
				</label>
				<input
					class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
					id="grid-password"
					type="password"
					placeholder="******************"
					bind:value={userData.password}
				/>
			</div>
		</div>

		<!-- Submit button -->
		<div class="flex flex-wrap -mx-3 mb-1">
			<div class="w-full px-3">
				<button
					type="submit"
					class="shadow w-full block bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
				>
					Sign In
				</button>
			</div>
		</div>

		<div class="flex justify-center gap-1">
			<p class="text-slate-600">Don't have an account yet?</p>
			<a class="text-cyan-600 hover:text-cyan-500" href="/register">Sign Up</a>
		</div>
	</form>
</div>
