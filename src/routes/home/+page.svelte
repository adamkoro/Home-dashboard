<script lang="ts">
	import { onAuthStateChanged } from 'firebase/auth';
	import { auth } from '$lib/firebase';
	import { type User, type link } from '$lib/types.js';
	import Header from '$lib/components/Header.svelte';
    import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	export let data;
	let userLinks: Array<link> = [];
    let error: any;

	async function fetchLinks(email: string) {
        await fetch(`/api/links?email=${email}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.type === "success") {
                    userLinks = data.data;
                }
            })
            .catch(e => {
                console.log(e)
            });
    }

    function navigateToCreate() {
        goto('/create');
    }

	function openLink(url: string) {
        window.open(url, '_blank');
    }

    async function deleteLink(id: number) {
        await fetch(`/api/links?id=${id}`,{
            method: 'DELETE',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.type === "success") {
                    if ($user?.email)
                        fetchLinks($user.email)
                }
            })
            .catch(e => {
                console.log(e)
            });
    }

    async function updateLinkAvailability() {
        userLinks.forEach(async (link, index) => {
            let isAvailable = false
            const response = await fetch(`/api/checklink?url=${link.url}`,{
                method: 'GET',
            })
            if (response.ok) {
                isAvailable = true
            }
            console.log(`Link ${link.name} availability updated: ${isAvailable}`);
            userLinks[index] = { ...link, isAvailable };
        });
    }

    setInterval(updateLinkAvailability, 10000);

    let user = writable<User | null>(null);

    onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser && firebaseUser.email) {
            user.set({ email: firebaseUser.email });
            fetchLinks(firebaseUser.email);
        } else {
            user.set(null);
        }
    });
</script>

<main>
	<Header userEmail={data.props.userEmail} />
	<div>
        {#if error}
            <div class="error-container">
                <div class="error-dialog">
                    <h4 class="error-title">Oops! Something went wrong.</h4>
                    <p class="error-code">Error Code: <span class="error-code-value">{error.statusCode}</span></p>
                    <p class="error-message">Message: <span class="error-message-value">{error.message}</span></p>
                    <button class="error-close-btn" on:click={() => error = null}>Close</button>
                </div>
            </div>
        {/if}
        <div class="link-container">
            {#each userLinks as link (link.id)}
                    <div class="link-card">
                        <button on:click={() => openLink(link.url)} style="background-color: {link.isAvailable === false ? 'red' : 'mediumseagreen'}">{link.name}</button>
                        <span class="delete-icon" on:click={() => deleteLink(link.id)}>
                            <img src="/icons/delete.png" alt="Delete button"/>
                        </span>
                    </div>
            {/each}
            <div class="add-link-card">
                <button on:click={navigateToCreate}>
                    <img src="/icons/plus.png" alt="Create new link" />
                </button>
            </div>
        </div>
    </div>
</main>

<style>
    .link-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
    }
	.link-card button {
        border: 2px solid white;
        border-radius: 40px;
        background-color: mediumseagreen;
        text-decoration: none;
        margin-left: 10px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        font-size: 25px;
        color: white;
        transition: background-color 0.3s;
    }

	.link-card button:hover {
        background-color: seagreen;
    }

    .delete-icon {
        display: none;
        cursor: pointer;
        color: red;
    }

    .delete-icon img {
        width: 30px;
        height: auto;
    }

    .link-card:hover .delete-icon {
        display: block;
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

    .error-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
        z-index: 999;
    }

    .error-dialog {
        padding: 20px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 90%;
        max-width: 400px;
        text-align: center;
    }

    .error-title {
        color: #D32F2F;
        margin-bottom: 10px;
    }

    .error-code, .error-message {
        color: #333;
        background-color: #f8f8f8;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 5px 0;
    }

    .error-close-btn {
        background-color: #D32F2F;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 15px;
        transition: background-color 0.3s;
    }

    .error-close-btn:hover {
        background-color: #B71C1C;
    }
</style>