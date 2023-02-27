<script lang="ts">
    import { gluesql } from 'gluesql/gluesql.rollup';
    import { onMount } from 'svelte';

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

<textarea cols=80 rows=20 bind:value={input}></textarea>
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
            {JSON.stringify(formatted)}
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