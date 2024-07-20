import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AllProducts from "../component/AllProducts";
import { addToCart } from "../redux/productSlice";
import toast from "react-hot-toast";

export default function Menu() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.product.productList);
  console.log(productData);

  const productDisplay = productData.filter((e) => e._id === id);
  console.log(productDisplay);

  const addCartProduct = (e) => {
    toast.success("Product added to cart successfully!");
    e.stopPropagation();
    dispatch(addToCart(productDisplay));
  };

  return (
    <div className="p-2 md:p-4">
      {productDisplay[0] ? (
        <div>
          <div className="w-full max-w-4xl m-auto md:flex bg-white">
            <div className="max-w-sm overflow-hidden transition-all max-h-[300px]">
              <img
                src={productDisplay[0].image}
                className="hover:scale-105 transition-all h-full p-5"
              />
            </div>
            <div className="flex flex-col gap-1 p-2 md:p-4">
              <h3 className="font-semibold text-slate-600 capitalize text-2xl md:text-4xl">
                {productDisplay[0].name}
              </h3>
              <p className=" text-slate-500 font-medium md:text-2xl">
                {productDisplay[0].category}
              </p>
              <p className=" font-bold md:text-2xl">
                <span className="text-red-600">₹</span>
                <span>{productDisplay[0].price}</span>
              </p>
              <div className="flex gap-3">
                <button className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]">
                  Buy
                </button>
                <button
                  className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
                  onClick={addCartProduct}
                >
                  Add Cart
                </button>
              </div>
              <div>
                <p className="text-slate-400">Description :</p>
                <p>{productDisplay[0].description}</p>
              </div>
            </div>
          </div>
          <AllProducts heading={"Related Products"} />
        </div>
      ) : (
        <AllProducts heading={"All Products"} />
      )}
    </div>
  );
}
