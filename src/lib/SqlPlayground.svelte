<script lang="ts">
    import { gluesql } from 'gluesql/gluesql.rollup';
    import { onMount } from 'svelte';
    import { findColumnsHeaders } from './tableUtils';
	import SqlEditor from '../lib/SqlEditor.svelte';

    let db: any;
    let result: any;

    export let title = "";
    export let input = "";

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

<fieldset class="container">
    {#if title}
        <legend>{title}</legend>
    {/if}
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
</fieldset>

<style>
    table {
        border-collapse: collapse;
    }

    table, th, td {
        border: 1px solid black;
    }

    th, td {
        padding: 5px;
    }

    .container {
        border: 1px solid black;
        padding: 10px;
    }
    
</style>