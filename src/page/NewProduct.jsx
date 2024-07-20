import React, { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import ImagetoBase64 from "../utility/imagetoBase64";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function NewProduct() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const uploadImage = async (e) => {
    const datas = await ImagetoBase64(e.target.files[0]);
    setData({ ...data, image: datas });
    console.log(datas);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const fetchData = await fetch(`${import.meta.env.VITE_NODEJS_SERVER}/add-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await fetchData.json();
      console.log(result);

      if(result.alert){
        setData({
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        });
        toast(result.message);
        navigate("/")
      }
    
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md p-4 shadow flex flex-col bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center">Add New Product</h1>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          className="bg-slate-400 p-1 my-1"
          onChange={handleChange}
          required
          value={data.name}
        />

        <label htmlFor="category">Category</label>
        <select
          className="bg-slate-400 p-1 my-1 cursor-pointer"
          id="category"
          name="category"
          onChange={handleChange}
          required
          value={data.category}
        >
          <option value="">Select Category</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Ice Creams">Ice Creams</option>
          <option value="Veg Items">Veg Items</option>
          <option value="Non-veg Items">Non-veg Items</option>
          <option value="Others">Others</option>
        </select>

        <label htmlFor="image">Image
        <div className="h-40 w-full bg-slate-400 my-3 rounded flex items-center justify-center cursor-pointer">
          {data.image ? (
            <img src={data.image} className="h-40 w-auto" alt="Product" />
          ) : (
            <span className="text-5xl">
              <IoCloudUploadOutline />
            </span>
          )}
          <input
            type="file"
            className="hidden"
            id="image"
            accept="image/*"
            onChange={uploadImage}
            required
          />
        </div>
        </label>

        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          className="bg-slate-400 p-1 my-1"
          onChange={handleChange}
          required
          value={data.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          rows={2}
          className="bg-slate-300 p-1 my-1 resize-none"
          onChange={handleChange}
          required
          value={data.description}
        />
        <button className="bg-slate-500 hover:bg-red-600 text-white font-bold text-lg my-2 drop-shadow-md">
          Save
        </button>
      </form>
    </div>
  );
}
