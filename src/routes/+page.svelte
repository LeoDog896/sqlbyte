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
        result = await db.query(input)
    }

</script>

<input bind:value={input}>
<button on:click={() => {
    query(input);
    input = '';
}}>Submit</button>

<p>{JSON.stringify(result)}</p>