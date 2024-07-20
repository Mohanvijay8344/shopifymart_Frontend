import { useEffect, useState } from "react";
import "./App.css";
import Header from "./component/Header";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Menu from "./page/Menu";
import Contact from "./page/Contact";
import Login from "./page/Login";
import NewProduct from "./page/NewProduct";
import Signup from "./page/Signup";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { setDataProduct } from "./redux/productSlice";
import Cart from "./page/Cart";

function App() {
  const dispatch = useDispatch()

  const productData = useSelector((state) => state.product)
  console.log(productData);

  useEffect(() => {
    (async() => {
      const res = await fetch(`${import.meta.env.VITE_NODEJS_SERVER}/products`)
      const resData = await res.json()
      dispatch(setDataProduct(resData.data))
      console.log(resData.data);
    })()
  },[])

  

  return (
    <div>
      <Header />
      <Toaster />
      <main className="pt-16 bg-slate-300 min-h-[calc(100vh)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new-product" element={<NewProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
