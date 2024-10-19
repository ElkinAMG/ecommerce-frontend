<script>
	import '../app.css';
	import { page } from '$app/stores';
	import DashboardNavigator from '$lib/DashboardNavigator.svelte';
	import Navigator from '$lib/Navigator.svelte';
	$: pathname = $page.url.pathname;
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
