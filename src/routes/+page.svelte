<script lang="ts">
    import SqlPlayground from "$lib/SqlPlayground.svelte";
    import { grabTablePairs, schemaQueryCreate } from "$lib/grabTable";
    let query = "";
</script>

<h1>SQLByte</h1>

<h2>Create & use interactive SQL lessons in your browser</h2>

<a href="/data">View all datasets</a>

<h2>Lessons:</h2>
<ul>
    
</ul>

<SqlPlayground ready={async (db) => {
    const pairs = await grabTablePairs();
    for (const pair of pairs) {
            query = await schemaQueryCreate(pair.name, pair.schema);
        try {
            await db.query(query)
        } catch (e) { alert(e)}
    }
}} title={"SQL Playground with all demo data preloaded in."}/>