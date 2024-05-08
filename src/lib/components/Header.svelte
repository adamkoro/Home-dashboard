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

<header>
    <div class="welcome">Welcome, <span class="emailAddress">{userEmail}</span></div>
    <nav>
        <a href="/">Home</a>
        <button on:click={signOutSSR}>Sign out</button>
    </nav>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center; 
        background-color: #45a049;
        padding: 1rem;
        border: 2px solid orange;
        border-radius: 8px;
        box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
    }

    .welcome {
        flex-grow: 1;
        font-size: 20px;
    }

    .emailAddress {
        color: midnightblue;
    }

    nav a, nav button {
        background-color: #4CAF50;
        color: black;
        text-decoration: none;
        margin-left: 10px;
        border-color: black;
        padding: 5px 10px;
        font-size: 16px;
        cursor: pointer;
        border: 2px solid orange;
        border-radius: 8px;
        transition: background-color 0.3s;
    }

    nav a:hover, nav button:hover {
        background-color: #45a049;
    }
</style>