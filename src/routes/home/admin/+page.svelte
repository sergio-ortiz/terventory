<article class="prose">
	<h1 class="mt-6">Create User</h1>
</article>

<div class="pt-6">
	<div class="card w-96 shadow-xl">
		<form method="POST" class="card-body">
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
			<div class="form-control">
				<label for="role" class="label">
					<span class="label-text">Role:</span>
				</label>
				<select name="role" class="select select-bordered">
					<option value="">Please select a role</option>
					<option value="employee">Employee</option>
					<option value="admin">Admin</option>
				</select>
			</div>
			<div class="form-control mt-6">
				<button class="btn">Submit</button>
			</div>
		</form>
	</div>
</div>
