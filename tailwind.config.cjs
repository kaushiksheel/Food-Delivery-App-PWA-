/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth:{
        container:"1150px"
      },
      backgroundColor:{
        customRed:"#EF4F5F",
        dark:"#171A29"
      },
      textColor:{
        lighGray:"#696969",
        veryLightGray:"#9C9C9C"
      },
      borderColor:{
        customRed:"#EF4F5F",
        lighGray:"#696969",
        veryLightGray:"#9C9C9C"
      }
    },
  },
  plugins: [],
}
