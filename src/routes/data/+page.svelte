<script lang="ts">
	import type { PageData } from "./$types"
	export let data: PageData;
</script>

{#each Object.keys(data.modules) as module}
    {module}
{/each}