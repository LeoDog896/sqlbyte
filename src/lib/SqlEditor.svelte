<!-- 
    This is the SQL *editor*, not the full runner and display view.
    This editor is a svelte wrapper around the codemirror v6 editor.
-->

<script lang="ts">
    import { EditorView, basicSetup } from "codemirror"
    import { sql } from "@codemirror/lang-sql"
	import { onMount } from "svelte";

    let editor: HTMLDivElement;
    export let value = "";

    onMount(() => {
        const view = new EditorView({
            extensions: [
                basicSetup,
                sql(),
                EditorView.updateListener.of(function(e) {
                    value = e.state.doc.toString();
                })
            ],
            parent: editor,
        })
    })

</script>

<div bind:this={editor}></div>