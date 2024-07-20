import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import empty from '../assets/empty.gif'

export default function Cart() {
  const productCartItems = useSelector((state) => state.product.cartItem);
  console.log(productCartItems);

  const totalPrice = productCartItems.reduce((acc, item) => acc + parseInt(item.total), 0);
  const totalQty = productCartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="p-2 md:p-4">
      <h2 className="text-lg md:text-2xl font-bold text-slate-800">
        Your Cart Items
      </h2>
      {
        productCartItems[0] ?
        (      <div className="flex flex-col md:flex-row gap-3">
          <div className="my-4 ">
            <div className="w-full max-w-3xl">
              {productCartItems.map((e, index) => {
                return (
                  <CartProduct
                    key={index}
                    id={e._id}
                    name={e.name}
                    image={e.image}
                    category={e.category}
                    price={e.price}
                    qty={e.qty}
                    total={e.total}
                    description={e.description}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-full max-w-md ml-auto mt-5 mx-5">
            <h2 className="bg-blue-500 text-white p-1 text-lg font-bold rounded-md">
              Summary
            </h2>
            <div className="flex w-full py-2 text-lg">
              <p>Total Quantity</p>
              <p className="ml-auto w-32 font-bold">{totalQty}</p>
            </div>
            <div className="flex w-full py-2 text-lg">
              <p>Total Price</p>
             <p className="ml-auto w-32 font-bold"> <span className="text-red-600">₹</span>{totalPrice}</p>
            </div>
            <button className="bg-red-500 font-bold text-white py-2 w-full rounded-md text-lg">Payment</button>
          </div>
        </div>) : 
        <div className="flex flex-col justify-center items-center h-screen">
           <img src={empty} className="w-full max-w-sm mx-auto" alt="empty" />
           <p className="text-slate-500 text-3xl font-bold">Cart is Empty</p>
        </div>
       
      }

    </div>
  );
}
