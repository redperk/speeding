// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-to-r-pink-purple-blue":
          "linear-gradient(to right, #ff007a, #6a00ff, #007aff)",
      },
    },
  },
  plugins: [],
};
