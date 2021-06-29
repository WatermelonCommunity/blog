<section>
    <h1>Sapper with TailwindCSS Template</h1>
    <p>
        Visit the
        <a href="https://sapper.svelte.dev">sapper.svelte.dev</a>
        to learn more about Sapper.
    </p>
</section>

<style lang="postcss">
    section {
        @apply text-center sm:px-8;
    }

    h1 {
        @apply text-4xl font-thin uppercase lg:text-6xl;
        color: #159794;
    }

    p {
        @apply mx-auto my-4 leading-5 dark:text-white;
    }

    a {
        @apply underline;
        color: #159794;
    }
</style>
