# 🛒 My shop (Dark Mode)

My shop-themed e-commerce frontend inspired by [Temu](https://temu.com), built with **React + TypeScript, Redux Toolkit, React Router, Material-UI (MUI), and Sass**.  
The app integrates with the [Platzi Fake Store API](https://fakeapi.platzi.com/) for real product data.

---

## ✨ Features

- 🔑 **Authentication** with login & register using Platzi API (`/auth/login`, `/users`)
- 🛍️ **Product catalog** with server-side search (`?title=`), category filtering, and infinite scroll/load more
- 📄 **Product detail pages** with add-to-cart support
- 🛒 **Shopping cart** with quantity updates and remove option
- ❤️ **Wishlist (Save for later)** with heart toggle
- 🕓 **Recently viewed** products
- 🔐 **Protected routes** (e.g. checkout) require login
- 🎨 **Dark mode theme** using MUI + Sass for customization
- 📦 **State persistence** in `localStorage` (cart, user, wishlist)

---

## 🛠️ Tech Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/) (slices for cart, user, products, wishlist)
- [React Router v6](https://reactrouter.com/en/main)
- [Material-UI (MUI)](https://mui.com/) components
- [Sass](https://sass-lang.com/) styling
- [Axios](https://axios-http.com/) for API requests

---

## 📂 Project Structure

src/
├── components/ # Reusable UI (Header, Banner, ProductCard, CategoryBar, etc.)
├── pages/ # Route pages (Home, ProductDetail, Cart, Wishlist, Login, Register, Checkout)
├── redux/
│ ├── slices/ # cartSlice, productSlice, userSlice, wishlistSlice
│ └── store.ts # Redux store with persistence
├── services/
│ └── api.ts # Axios client + setAuthToken helper
├── App.tsx # Routes + layout
└── index.tsx # Entry point