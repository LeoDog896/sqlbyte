<script>
    import "../style.css"
</script>

<main>
    <slot/>
</main>

<style>
    /** main should be centered, so make body a flexbox container */

    :global(body) {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        margin: 0 auto;
        max-width: 800px;
    }
</style>
