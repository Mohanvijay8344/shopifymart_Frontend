## install Frontend 

1. npm create vite@latest shopifymart_frontend -- --template react
2. cd shopifymart_Frontend
3. npm install 
4. npm run dev

## install tailwind css
1. npm install -D tailwindcss postcss autoprefixer
2. npx tailwindcss init -p

3. tailwind.config.js

```jsx
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. indes.css

```jsx
@tailwind base;
@tailwind components;
@tailwind utilities;
```

1. Header
2. Page (Home, About, Menu, Contact, Login, NewProduct, Signup)
3. Utility (imagetoBase64)

__

## install Backend

1. npm init -y
2. npm i express cors mongoose nodemon
3. create index.js file & update dependencies