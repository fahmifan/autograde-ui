<script context="module">
	import '../styles/tailwind-output.css';
	import { store } from '../service';

	export const ssr = false;
	let user = null;
	store.subscribe((val) => {
		user = val;
	});
</script>

<nav>
	{#if !user }
		<a class="underline" href="/">Home</a>
		<a class="underline" href="/login">Login</a>
	{:else}
		<a class="underline" href="/">Home</a>
		<a class="underline" href="/dashboard">Dashboard</a>
		<a class="underline" href="/logout">Logout</a>
	{/if}
</nav>

<slot></slot>
