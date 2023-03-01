<script lang="ts">
	import type { PageData } from "./$types"
	export let data: PageData;
</script>

<ul>
	{#each Object.keys(data.modules) as module}
		{@const splitArr = module.split("/")}
		{@const value = splitArr[splitArr.length - 1].split(".")[0]}
		<li><a href="/data/{value}">{value}</a></li>
	{/each}
</ul>