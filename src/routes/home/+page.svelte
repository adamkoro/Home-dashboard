<script>
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase';
</script>

<AuthCheck>
	<h1>Home page</h1>
	<h3>Welcome</h3>
	<button on:click={() => signOut(auth)}> Sign out</button>
</AuthCheck>
