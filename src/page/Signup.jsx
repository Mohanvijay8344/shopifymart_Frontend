import React, { useState } from "react";
import loginSignupImage from "../assets/login-animation.gif";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import ImagetoBase64 from "../utility/imagetoBase64";
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setshowPassword] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: "",
  });

  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleprofileImage = async (e) => {
    const datas = await ImagetoBase64(e.target.files[0])
    setData({...data, image: datas});
    console.log(datas);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchData = await fetch(`${import.meta.env.VITE_NODEJS_SERVER}/signup`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const result = await fetchData.json()
    console.log(result);

    console.log("Form submitted with data:", data);
    toast(result.message);

    if(result.alert) {
      navigate("/login");
    }
    
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-md bg-white m-auto flex flex-col p-4">
        <div className="w-20 h- overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img src={data.image ? data.image : loginSignupImage} className="w-full h-full"/>

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 w-full text-center cursor-pointer bg-opacity-50">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input type="file" accept="image/*" id="profileImage" className="hidden" onChange={handleprofileImage}/>
          </label>
        </div>
        <form
          action=""
          className="w-full py-3 flex flex-col"
          onSubmit={handleSubmit}
        >
          <label htmlFor="firstName">first Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="mt-1 mb-2 w-full bg-slate-300 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleChange}
            required
          />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="mt-1 mb-2 w-full bg-slate-300 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleChange}
            required
          />

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
            Sign Up
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Already have an account ?{" "}
          <Link to="/login" className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
