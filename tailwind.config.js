module.exports = {
    purge: ['./**/*.html', './**/*.svelte'],
    darkMode: 'media',
    corePlugins: {
        container: false,
    },
    theme: {
        screens: {
            sm: '576px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
        },
    },
    variants: {},
    plugins: [],
}
