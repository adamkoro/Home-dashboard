<script lang="ts">
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase';
	import { goto } from '$app/navigation';

	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				goto("/home");
			} else {
				goto("/login");
			}
		});

		return () => {
			unsubscribe();
		};
	});
</script>



