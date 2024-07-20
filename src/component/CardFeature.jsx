import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/productSlice";

export default function CardFeature({
  name,
  image,
  category,
  price,
  description,
  loading,
  id,
}) {


  const dispatch = useDispatch();

  const addCartProduct = (e) => {
    e.stopPropagation()
    dispatch(addToCart({
      _id : id,
      name : name,
      price : price,
      quantity : 1,
      image : image,
      description : description,
      category : category,
    }))
  }
  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg pt-5 px-4 pb-5 cursor-pointer flex flex-col">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
          >
            <div className="h-28 flex flex-col justify-center items-center">
              <img src={image} className="h-full" />
            </div>
            <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4">
              {name}
            </h3>
            <p className=" text-slate-500 font-medium">{category}</p>
            <p className="font-bold">
              <span className="text-red-600">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full" onClick={addCartProduct}>
            Add Cart
          </button>
        </>
      ) : (
        <div className="min-h-[150px] flex justify-center items-center">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
}
