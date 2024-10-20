<script>
	import '../app.css';
	import { page } from '$app/stores';
	import DashboardNavigator from '$lib/DashboardNavigator.svelte';
	import Navigator from '$lib/Navigator.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	$: pathname = $page.url.pathname;

	// User Context
	/** @type {import('./$types').LayoutData} */
	export let data;
	const user = writable();
	$: user.set(data.props?.user);
	setContext('user', user);
</script>

{#if pathname.includes('/dashboard')}
	<DashboardNavigator>
		<slot />
	</DashboardNavigator>
{:else}
	<Navigator>
		<slot />
	</Navigator>
{/if}
