<script>
	import { enhance } from '$app/forms';

	export let data;
	async function signOut() {
		const response = await fetch('/api', { method: 'DELETE' });
		data = await response.json();
	}
</script>

<div class="container mx-auto flex flex-col items-center">
	<div class="pt-6">
		{#if data.signedIn}
			<button on:click={signOut} class="btn">Sign Out</button>
		{:else}
			<div class="card w-96 shadow-xl">
				<form method="POST" class="card-body" use:enhance>
					<div class="form-control">
						<label for="name" class="label">
							<span class="label-text">Name:</span>
						</label>
						<input name="name" class="input input-bordered" />
					</div>
					<div class="form-control">
						<label for="password" class="label">
							<span class="label-text">Password:</span>
						</label>
						<input type="password" name="password" class="input input-bordered" />
					</div>
					<div class="form-control mt-6">
						<button class="btn">Submit</button>
					</div>
				</form>
			</div>
		{/if}
	</div>
</div>
