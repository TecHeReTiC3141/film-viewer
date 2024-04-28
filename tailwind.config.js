/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{html,js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            screens: {
                "xs": "384px",
            }
        },
    },
    plugins: [],
    darkMode: "selector",
}

