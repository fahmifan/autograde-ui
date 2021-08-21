<script context="module">
	import { login, store } from '../service';
	import { browser } from '$app/env';

	let email = '';
	let password = '';

	export const ssr = false;

	let user = null;
	store.subscribe((val) => {
		user = val;
	});
	if (browser) {
		if (user) {
			window.location.replace('/dashboard')
		}
	}
</script>

<svelte:head>
	<title>Autograde | Login</title>
</svelte:head>

<div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
	<div class="px-6 py-4">
		<h2 class="text-3xl font-bold text-center text-gray-700 dark:text-white">Autograde</h2>

		<h3 class="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
			Welcome Back
		</h3>

		<p class="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

		<form>
			<div class="w-full mt-4">
				<input
					class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
					type="email"
					placeholder="Email Address"
					aria-label="Email Address"
					bind:value={email}
				/>
			</div>

			<div class="w-full mt-4">
				<input
					class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
					type="password"
					placeholder="Password"
					aria-label="Password"
					bind:value={password}
				/>
			</div>

			<div class="flex items-center justify-between mt-4">
				<button
					on:click={login(email, password)}
					class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
					type="button"
				>
					Login
				</button>
			</div>
		</form>
	</div>

	<div class="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700">
		<span class="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

		<a href="#" class="mx-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500"
			>Register</a
		>
	</div>
</div>
