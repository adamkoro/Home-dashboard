<script lang="ts">
	import { auth, user } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (!user) {
				goto("/login");
			}
		});

		return () => {
			unsubscribe();
		};
	});
</script>

{#if $user}
	<slot/>
{/if}