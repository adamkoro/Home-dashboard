<script lang="ts">
	import { goto } from '$app/navigation';

    let name = '';
    let url = '';
    export let data;
    let email = data.props.userEmail

    async function submitForm(event: Event) {
        event.preventDefault();
        const response = await fetch('/api/links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, url, email })
        });

        if (response.ok) {
            goto("/home");
        }
    }

    async function returnToHome(event: Event){
        event.preventDefault();
        goto("/home");
    }
</script>
<main>
    <form>
        <label for="name">Name:</label>
        <input id="name" type="text" bind:value={name} />

        <label for="url">URL:</label>
        <p> Do not forget to add http:// or https:// </p>
        <input id="url" type="text" bind:value={url} />

        <button type="submit" on:click={submitForm}>Create Link</button>
        <button class="cancel-button" on:click={returnToHome}> Cancel</button>
    </form>
</main>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        border: 2px solid white;
        border-radius: 8px;
        background-color: seagreen;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        margin: 100px auto;
        color: white;
    }

    p {
        color: white;
        font-size: smaller;
    }
    input, button {
        width: 90%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
        border: 2px solid white;
    }

    button {
        background-color: mediumseagreen;
        color: white;
        font-size: 16px;
        cursor: pointer;
    }

    button:hover {
        background-color: seagreen;
    }
    .cancel-button {
        background-color: rgb(216, 0, 0);
    }

    .cancel-button:hover {
        background-color: rgb(167, 0, 0);
    }

    label {
        align-self: flex-start;
        margin-left: 5%;
    }
</style>