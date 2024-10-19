<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import EditIcon from '$lib/Icons/EditIcon.svelte';
	import TrashIcon from '$lib/Icons/TrashIcon.svelte';
</script>

<div>
	<Button variant="ghost">
		<EditIcon />
	</Button>
	<Button variant="ghost">
		<TrashIcon />
	</Button>
</div>
