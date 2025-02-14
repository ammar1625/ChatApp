// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind scans all your JSX files
      "./public/index.html",
    ],
    theme: {
      extend: {
        fontFamily: {
          roboto: ['Roboto', 'sans-serif'], // Correct way to add Roboto
        },
      
      },
    },
    plugins: [
       
    ],
  }
  