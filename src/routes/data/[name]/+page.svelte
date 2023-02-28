<script lang="ts">
	import { fakeSchema } from "$lib/fakeSchema";
	import type { PageData } from "./$types"
	export let data: PageData;
</script>

<h1>Data Explorer</h1>

{JSON.stringify(fakeSchema(data.json))}