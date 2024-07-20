import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

export default function Login() {
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit the form here
    const fetchData = await fetch(`${import.meta.env.VITE_NODEJS_SERVER}/login`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await fetchData.json()

    console.log("Form submitted with data:", data);
    toast(result.message);

    if(result.alert) {
      dispatch(loginRedux({ ...result.data }))
      console.log("Login successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };


  
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-md bg-white m-auto flex flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginSignupImage} alt="" />
        </div>
        <form action="" className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-300 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleChange}
          required
          />

          <label htmlFor="password">Password</label>
          <div className="flex mt-1 mb-2  bg-slate-300 px-2 py-1 rounded outline-none focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-300 outline-none"
              value={data.password}
              onChange={handleChange}
              required
            />
            <span
              className="flex text-xl items-center"
              onClick={() => handleShowPassword()}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button className="max-w-[150px] w-full m-auto bg-red-500 hover:bg-red-700 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have account ? {" "}
           <Link to="/signup" className="text-red-500 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
