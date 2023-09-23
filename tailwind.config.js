/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                display: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            base: '#121212',
            highlight: '#1a1a1a',
            primary: '#1ed760',
            black: '#000',
            white: '#fff',
            subdued: '#a7a7a7',
        },
    },
    plugins: [],
};
