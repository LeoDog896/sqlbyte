<script lang="ts">
	import { fakeSchema } from "$lib/fakeSchema";
	import type { PageData } from "./$types"
	export let data: PageData;
	import { findColumnsHeaders } from "$lib/tableUtils";

	let fakedData = fakeSchema(data.json)
</script>

<h1>Data Explorer</h1>

<h2>{data.name}</h2>

{#if Array.isArray(fakedData)}
	<table>
		<thead>
			<tr>
				{#each findColumnsHeaders(fakedData) as header}
					<th>{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each fakedData as row}
				<tr>
					{#each findColumnsHeaders(fakedData) as header}
						<td>{row[header] === undefined ? "null" : row[header]}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{:else}
	<p>Weird, data isn't an array.</p>
{/if}