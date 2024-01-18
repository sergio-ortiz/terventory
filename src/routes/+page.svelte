<script>
	let admin;

	async function getAdmin() {
		const response = await fetch('/api');
		admin = await response.json();
	}
</script>

<article class="prose m-5">
	<h1 class="text-orange-500">Welcome to SvelteKit</h1>
	<p class="">
		Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
	</p>
	<button class="btn btn-primary" on:click={getAdmin}>get Admin</button>

	{#if admin !== undefined}
		<p>{admin}</p>
	{/if}
</article>
