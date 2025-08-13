/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // This includes all JS/JSX files in src
  ],
  theme: {
    extend: {
      colors: {
        // GitHub-inspired color palette
        github: {
          dark: '#0d1117',
          light: '#f6f8fa',
          border: '#30363d',
          primary: '#238636',
          hover: '#2ea043',
          text: {
            primary: '#c9d1d9',
            secondary: '#8b949e'
          },
          accent: '#1f6feb'
        }
      },
      boxShadow: {
        'github': '0 8px 24px rgba(140, 149, 159, 0.2)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),  // For better form styling
    require('@tailwindcss/typography')  // For better text formatting
  ],
}
