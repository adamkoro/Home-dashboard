<script>
    let name = '';
    let url = '';

    async function submitForm() {
        const response = await fetch('/api/links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, url })
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Link created with ID: ${result.id}`);
        } else {
            alert('Failed to create link.');
        }
    }
</script>

<form on:submit|preventDefault={submitForm}>
    <label for="name">Name:</label>
    <input id="name" type="text" bind:value={name} />

    <label for="url">URL:</label>
    <input id="url" type="text" bind:value={url} />

    <button type="submit">Create Link</button>
</form>
