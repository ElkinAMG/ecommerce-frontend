<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import DashboardNavigator from '$lib/DashboardNavigator.svelte';
	import Navigator from '$lib/Navigator.svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Toaster } from '$lib/components/ui/sonner';
	import type { LayoutData } from './$types';

	$: pathname = $page.url.pathname;

	// User Context
	export let data: LayoutData;
	const user = writable<User | undefined>();

	$: user.set(data.props?.user);

	setContext('user', user);
</script>

<Toaster />

{#if pathname.includes('/dashboard')}
	<DashboardNavigator>
		<slot />
	</DashboardNavigator>
{:else}
	<Navigator>
		<slot />
	</Navigator>
{/if}
