<script>
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { goto } from '$app/navigation';

	async function singOutSSR() {
		const res = await fetch("/api/login",{
			method: "DELETE"
		});
		await signOut(auth)
		if (res.ok) {
			await goto("/login")
		}
	}
</script>

	<h1>Home page</h1>
	<h3>Welcome</h3>
	<button on:click={singOutSSR}> Sign out</button>
