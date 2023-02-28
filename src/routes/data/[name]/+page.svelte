<script lang="ts">
	import { fakeSchema } from "$lib/fakeSchema";
	import type { PageData } from "./$types"
	export let data: PageData;
</script>

<h1>Data Explorer</h1>

{#if Array.isArray(data)}
	<p></p>
{:else}
	<p>Weird, data isn't an array.</p>
{/if}