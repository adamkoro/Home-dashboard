<script lang="ts">
	import { signOut, onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import type { link } from '$lib/types.js';

	async function signOutSSR() {
		const res = await fetch("/api/login", {
			method: "DELETE"
		});
		await signOut(auth);
		if (res.ok) {
			await goto("/login");
		}
	}

	let userLinks: Array<link> = [];
	let error: string | null | unknown = null;

	async function fetchLinks(email: string) {
        fetch(`/api/links?email=${email}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.type === "success") {
                    userLinks = data.data;
                } else {
                    error = data.message;
                }
            })
            .catch(e => {
                error = e.message || "An error occurred while fetching links";
            });
    }

    onAuthStateChanged(auth, user => {
		if (user && user.email) {
			fetchLinks(user.email);
		} else {
			error = "User email is not available";
		}
    });
</script>

<main>
	<h1>Home page</h1>
	<h3>Welcome</h3>
		{#if error}
			<p>{error}</p>
		{:else}
			<ul>
				{#each userLinks as link}
					<li>{link.name} - {link.url}</li>
				{/each}
			</ul>
		{/if}
	<button on:click={signOutSSR}>Sign out</button>
</main>
