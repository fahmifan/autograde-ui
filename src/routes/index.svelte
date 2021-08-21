<script context="module">
	import { store } from '../service';

	export const ssr = false;
	let user = null;
	store.subscribe((val) => {
		user = val;
	});
	if (user) {
		window.location.replace('/dashboard');
	} else {
		window.location.replace('/login');
	}
</script>

<svelte:head>
	<title>Autograde</title>
</svelte:head>
