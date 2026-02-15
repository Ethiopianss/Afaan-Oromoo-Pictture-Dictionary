/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],
    theme: {
        extend: {
            colors: {
                'app-red': '#dc143c',
                'app-green': '#228b22',
                'app-black': '#1a1a1a',
                'app-white': '#ffffff',
            },
        },
    },
    plugins: [],
};