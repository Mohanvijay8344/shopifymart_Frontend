import React from "react";
import { TbMinus } from "react-icons/tb";
import { TbPlus } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { decreaseQty, deleteCart, increaseQty } from "../redux/productSlice";

export default function CartProduct({
  name,
  image,
  price,
  id,
  total,
  qty,
  category,
  description,
}) {
  const dispatch = useDispatch();

  return (
    <div className="p-2 bg-slate-300 flex gap-4 rounded border-2 border-slate-500 mb-2">
      <div className="p-3 overflow-hidden bg-white rounded shadow-lg">
        <img src={image} className="h-28 w-36 object-cover" />
      </div>
      <div className="flex flex-col gap-1 p-2 md:p-4 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-xl">
            {name}
          </h3>
          <MdDelete
            className="text-2xl hover:bg-red-500 rounded-full p-1 cursor-pointer text-slate-700"
            onClick={() => dispatch(deleteCart(id))}
          />
        </div>
        <p className=" text-slate-500 font-medium">{category}</p>
        <p className=" font-bold text-base mb-2">
          <span className="text-red-600">₹</span>
          <span>{price}</span>
        </p>

        <div className="flex justify-between ">
          <div className="flex gap-3 items-center">
            <button className="bg-slate-400 py-1 rounded hover:bg-slate-500 p-1" onClick={() => dispatch(increaseQty(id))}>
              <TbPlus />
            </button>
            <p className="font-bold">{qty}</p>
            <button className="bg-slate-400 py-1 rounded hover:bg-slate-500 p-1" onClick={() => dispatch(decreaseQty(id))}>
              <TbMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <p>Total: </p>
            <p><span className="text-red-600">₹</span>{price * qty}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
