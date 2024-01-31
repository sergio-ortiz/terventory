<script>
	import { enhance } from '$app/forms';

	export let data;
	export let form;

	async function signOut() {
		const response = await fetch('/api', { method: 'DELETE' });
		data = await response.json();
	}
</script>

<div class="container mx-auto flex flex-col items-center">
	{#if data.session}
		<div class="alert alert-success">
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
			<span>Successfully logged in! {data.role} {data.name}</span>
		</div>

		<button on:click={signOut} class="btn mt-6">Sign Out</button>
	{:else}
		{#if form?.error}
			<div class="alert alert-error">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>{form.error}</span>
			</div>
		{/if}
		<div class="pt-6">
			<div class="card w-96 shadow-xl">
				<form method="POST" class="card-body" use:enhance>
					<div class="form-control">
						<label for="name" class="label">
							<span class="label-text">Name:</span>
						</label>
						<input name="name" class="input input-bordered" required autocomplete="off" />
					</div>
					<div class="form-control">
						<label for="password" class="label">
							<span class="label-text">Password:</span>
						</label>
						<input
							type="password"
							name="password"
							class="input input-bordered"
							required
							autocomplete="off"
						/>
					</div>
					<div class="form-control mt-6">
						<button class="btn">Submit</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</div>
