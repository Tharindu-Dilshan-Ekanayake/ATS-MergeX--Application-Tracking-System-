/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['General Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],

  theme: {
    screens: {
      'esm':'200px',
      'sm': '640px',     // Small screens
      'md': '768px',     // Medium screens
      'lg': '1300px',    // Large screens
      'xl': '1450px',    // Extra-large screens
      'start1450':'1450px',
      '1140px': '1140px',
      '1300px': '1300px',
      '1010px': '1010px',
      '900px': '900px',
      '320px': '320px',
      '350px': '350px',
      '450px': '450px',
      '500px': '500px',
      '2xl': '1756px',   // 2x extra-large screens
      'custom': '1450px' // Custom breakpoint named 'custom'
      
    }
  }
}