<script lang="ts">
    import { gluesql } from 'gluesql/gluesql.rollup';
    import { onMount } from 'svelte';
	import SqlEditor from '../lib/SqlEditor.svelte';

    let db: any;
    let result: any;

    let input: string;

    onMount(async () => {
        db = await gluesql()
    })

    async function query(input: string) {
        try {
            result = await db.query(input)
        } catch (e) {
            result = e;
        }
    }

    // find the column headers of a table
    // e.g. [{ id: 1, name: "foo" }, { id: 2, name: "bar", cat: true }] -> ["id", "name", "cat"]
    function findColumnsHeaders(data: any[]) {
        const headers = new Set<string>();
        for (const row of data) {
            for (const key in row) {
                headers.add(key);
            }
        }
        return Array.from(headers);
    }

    function formatResult(type: string, data: any): string | any[] | { type: "error", data: any } {
        switch (type) {
            case "CREATE TABLE":
                return "Table created";
            case "INSERT":
                return `${data.affected} rows inserted`;
            case "SELECT":
                return data.rows;
            default:
                return { type: "error", data }
        }
    }

</script>

<SqlEditor bind:value={input}></SqlEditor>

<button on:click={() => {
    query(input);
}}>Submit</button>
<br/>
{#if typeof result == "string"}
    <p>Errr: {result}</p>
{:else if Array.isArray(result)}
    {#each result as part}
        {@const formatted = formatResult(part.type, part)}
        {#if typeof formatted == "string"}
            <p>{formatted}</p>
        {:else if typeof formatted == "object" && formatted.type == "error"}
            <p>Error: {JSON.stringify(formatted)}</p>
        {:else if Array.isArray(formatted)}
            <table>
                <tr>
                    {#each findColumnsHeaders(formatted) as header}
                        <th>{header}</th>
                    {/each}
                </tr>
                {#each formatted as row}
                    <tr>
                        {#each findColumnsHeaders(formatted) as header}
                            <td>{row[header]}</td>
                        {/each}
                    </tr>
                {/each}
            </table>
        {:else}
            <p>Unexpected type, please report this:</p>
            {JSON.stringify(formatted)}
        {/if}
    {/each}
{:else if result == undefined}
    <p><i>No result yet. Run a query!</i></p>
{:else}
    <p>Unknown result:</p>
    <p>{JSON.stringify(result)}</p>
{/if}

<style>
    /** style the table */

    table {
        border-collapse: collapse;
    }

    table, th, td {
        border: 1px solid black;
    }

    th, td {
        padding: 5px;
    }
    
</style>