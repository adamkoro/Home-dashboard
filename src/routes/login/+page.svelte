<script lang="ts">
	import { auth, user } from '$lib/firebase';
	import {GithubAuthProvider, signInWithPopup} from "firebase/auth";
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	async function  signInWithGithub() {
		const provider = new GithubAuthProvider();
		await signInWithPopup(auth, provider)
	}

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				goto("/home");
			}
		});

		return () => {
			unsubscribe();
		};
	});
</script>

<div class="login-page">
	<div class="login-container">
		{#if $user}
			<p>Redirecting to home page</p>
		{:else}
			<img class="logo-img" src="/logo.png" alt="Dashboard Logo">
			<button on:click={signInWithGithub}>Sign in with GitHub</button>
		{/if}
	</div>
</div>

<style>
    .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90vh;
        margin: 0;
    }

    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 360px;
        padding: 20px;
    }

		.logo-img {
				margin-bottom: 10px;
		}

    button {
        background-color: mediumseagreen;
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: seagreen;
    }

    p {
        color: white;
        font-size: 16px;
    }
</style>