<script lang="ts">
	import { auth } from '$lib/firebase';
	import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
	import { goto } from '$app/navigation';

	async function signInWithGithub() {
		const provider = new GithubAuthProvider();
		const credential = await signInWithPopup(auth, provider)
		const idToken = await credential.user.getIdToken();
		const res = await fetch("/api/login",{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({idToken}),
		});
		if (res.ok) {
			await goto("/home")
		}
	}

</script>

<main>
<div class="login-page">
	<div class="login-container">
			<img class="logo-img" src="/logo.png" alt="Dashboard Logo">
			<button on:click={signInWithGithub}>Sign in with GitHub</button>
	</div>
</div>
</main>
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
        border: 2px solid white;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 8px;
        transition: background-color 0.3s;
        box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.2);
    }

    button:hover {
        background-color: seagreen;
    }
</style>