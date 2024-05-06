<script lang="ts">
	import { user } from '$lib/firebase';
</script>

{#if $user}
	<slot/>
{:else}
	<p>Please log in</p>
	<a href="/login">Sign In</a>
{/if}