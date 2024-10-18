/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
        './resources/**/*.vue',
        './resources/**/*.ts',
        './resources/**/*.tsx',
    ],
    theme: {
        extend: {
            colors: {
                freefor: {
                    DEFAULT: '#4267B2',
                    dark: '#365E9E',
                    light: '#8B9DC3',
                },
            },
        },
    },
    plugins: [],
};
