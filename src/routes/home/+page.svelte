<script>
	export let data;

	import Admin from './admin.svelte';
	import Employee from './employee.svelte';
</script>

{#if data?.success}
	<div class="alert alert-success mt-0">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<span>Successfully Logged In!</span>
	</div>
{/if}

<div class="mt-5">
	{#if data.role === 'employee'}
		<Employee name={data.name} />
	{:else if data.role === 'admin'}
		<Admin />
	{/if}
</div>
