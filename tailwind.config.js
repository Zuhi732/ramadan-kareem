import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        royalBlack: "#000000", // একদম কুচকুচে কালো
        islamicGold: "#D4AF37", // প্রিমিয়াম সোনালী
        darkCard: "#121212", // কার্ডের জন্য হালকা কালো
        textGray: "#A1A1AA", // সাধারণ লেখার জন্য ছাই রং
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["black"], // লাইট থিম বাদ দিয়ে ব্ল্যাক থিম দিলাম
  },
};
