<script>
    export let status
    export let error

    const dev = process.env.NODE_ENV === 'development'
</script>

<svelte:head>
    <title>{status}</title>
</svelte:head>

<section>
    <h1>{status}</h1>
    <p>{error.message}</p>

    {#if dev && error.stack}
        <pre>{error.stack}</pre>
    {/if}
</section>

<style lang="postcss">
    section {
        @apply text-center sm:px-8;
    }

    h1 {
        @apply font-bold text-9xl;
        color: #159794;
    }

    p {
        @apply mx-auto my-4 text-2xl leading-5 dark:text-white;
    }

    pre {
        @apply max-w-screen-sm px-4 py-4 mx-auto font-light text-white whitespace-pre-wrap bg-gray-600 rounded;
    }
</style>
