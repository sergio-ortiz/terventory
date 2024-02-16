<div class="navbar shadow-xl">
	<div class="container w-full mx-auto flex">
		<a href="/home" class="btn btn-ghost">Home</a>
		<form method="POST" action="/?/signout" class="flex-1 text-end">
			<button class="btn">Sign Out</button>
		</form>
	</div>
</div>

<div class="container mx-auto flex flex-col items-center">
	<slot />
</div>
