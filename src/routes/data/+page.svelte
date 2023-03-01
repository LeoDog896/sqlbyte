<script lang="ts">
	import type { PageData } from "./$types"
	export let data: PageData;
</script>

<ul>
	{#each data.moduleNames as name}
		<li><a href="/data/{name}">{name}</a></li>
	{/each}
</ul>