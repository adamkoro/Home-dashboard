<!-- src/lib/Header.svelte -->
<script lang="ts">
    import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { goto } from '$app/navigation';

    export let userEmail;

    async function signOutSSR() {
		const res = await fetch("/api/login", {
			method: "DELETE"
		});
		await signOut(auth);
		if (res.ok) {
			await goto("/login");
		}
	}
</script>

<main>
    <header>
        <div class="welcome">Welcome, <span class="emailAddress">{userEmail}</span></div>
        <button on:click={signOutSSR}>Sign out</button>
    </header>
</main>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center; 
        background-color: seagreen;
        padding: 1rem;
        border: 2px solid white;
        border-radius: 8px;
        box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
        max-width: 65%;
        margin: 0 auto;
    }

    .welcome {
        font-size: 20px;
        color: white;
    }

    .emailAddress {
        color: black;
    }

    button {
        background-color: mediumseagreen;
        color: white;
        text-decoration: none;
        margin-left: auto;
        border-color: black;
        padding: 5px 10px;
        font-size: 16px;
        cursor: pointer;
        border: 2px solid white;
        border-radius: 8px;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: seagreen;
    }
</style>