<script lang="ts">
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import type { link } from '$lib/types.js';
	import Header from '$lib/components/Header.svelte';
    import { goto } from '$app/navigation';

	export let data;
	let userLinks: Array<link> = [];
	let error: string | null | any = null;

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
                error = e.message;
            });
    }

    function navigateToCreate() {
        goto('/create');
    }

	function openLink(url: string) {
        window.open(url, '_blank');
    }

    onAuthStateChanged(auth, user => {
		if (user && user.email) {
			fetchLinks(user.email);
		}
    });
</script>

<main>
	<Header userEmail={data.props.userEmail} />
	{#if error}
	<!--TODO ezt folytattni az error-t-->
			<div class="error">
				<p class="error-code">Error Code: <span class="error-code-value">{error.errorCode}</span></p>
				<p class="error-message">Message: <span class="error-message-value">{error.message}</span></p>
			</div>
		{:else}
			<div class="link-container">
				{#each userLinks as link (link.id)}
						<div class="link-card">
							<button on:click={() => openLink(link.url)}>{link.name}</button>
						</div>
				{/each}
                <div class="add-link-card">
                    <button on:click={navigateToCreate}>
                        <img src="/icons/plus.png" alt="Create new link" />
                    </button>
                </div>
			</div>
		{/if}
</main>

<style>
	.link-card button {
        border: 1px solid #ccc;
        border-radius: 40px;
        background-color: white;
        text-decoration: none;
        width: 25vh;
        margin-left: 10px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        font-size: 25px;
        transition: background-color 0.3s;
    }

    .add-link-card button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .add-link-card img {
        height: auto;
    }

	.link-container {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		padding: 10px;
        margin-top: 30px;
		justify-content: center;
    }
</style>