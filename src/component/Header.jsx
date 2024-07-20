import React, { useState } from "react";
import logo from "../assets/shopify_mart.png";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import toast from "react-hot-toast";

export default function Header() {
  const [showMenu, setshowMenu] = useState(false);
  const [image, setImage] = useState();

  const dispatch = useDispatch();

  const handleMenuToggle = () => {
    setshowMenu(!showMenu);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logout Successfull");
  };

  const userData = useSelector((state) => state.user);
  console.log(userData);

  const cartItemNumber = useSelector((state) => state.product.cartItem)

  return (
    <header className="fixed z-50 w-full h-16 md:px-3 bg-white shadow-lg">
      <div className="flex items-center h-full justify-between">
        <Link to="/">
          <div className="h-12">
            <img src={logo} className="h-full rounded-full " />
          </div>
        </Link>

        <div className="flex justify-end items-center gap-4 md:gap-7">
          <nav className="gap-3 md:gap-7 text-base md:text-lg hidden md:flex">
            <Link to="">Home</Link>
            <Link to="menu">Menu</Link>
            <Link to="about">About</Link>
            <Link to="contact">Contact</Link>
          </nav>
          <div className="text-2xl text-slate-700 relative">
            <Link to={"cart"}>
            <FaCartShopping />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-center text-sm ">
              {cartItemNumber.length}
            </div>
            </Link>
          </div>
          <div className=" text-slate-700" onClick={() => handleMenuToggle()}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
              {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <HiOutlineUserCircle />
              )}
            </div>
            {showMenu ? (
              <div className="absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
                {userData.email ? (
                  <Link
                    to="new-product"
                    className="whitespace-nowrap cursor-pointer hover:text-blue-400 px-2"
                  >
                    New Product
                  </Link>
                ) : null}
                {userData.image ? (
                  <p
                    className="cursor-pointer text-white bg-red-500 px-2 hover:bg-red-700 "
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName})
                  </p>
                ) : (
                  <Link
                    to="login"
                    className="whitespace-nowrap cursor-pointer px-2"
                  >
                    Login
                  </Link>
                )}
                <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to="" className="px-2 py-1">Home</Link>
                  <Link to="menu" className="px-2 py-1">Menu</Link>
                  <Link to="about" className="px-2 py-1">About</Link>
                  <Link to="contact" className="px-2 py-1">Contact</Link>
                </nav>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
