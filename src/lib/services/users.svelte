<script lang="ts" context="module">
	import { supabase } from '$lib/supabaseClient';

	async function getUser(userId: string) {
		try {
			const { error, data } = await supabase.auth.getSession();

			const headers: any = {
				'Content-Type': 'application/json'
			};

			if (error) throw new Error('Not authorized');

			headers['authorization'] = data.session?.access_token;

			const res = await fetch(`http://localhost:3000/users/${userId}`, {
				headers
			});
			if (!res.ok) throw new Error('Unable to get user');
			return res.json() as Promise<User>;
		} catch (err: any) {
			throw new Error(err);
		}
	}

	export { getUser };
</script>
