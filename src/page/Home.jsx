import React, { useEffect, useRef, useState } from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import FilteredProduct from "../component/FilteredProduct";
import AllProducts from "../component/AllProducts";

export default function Home() {
  const productData = useSelector((state) => state.product.productList);
  console.log(productData);

  const homeProductList = productData.slice(1, 5);

  const filterVegetables = productData.filter(
    (item) => item.category === "vegetables"
  );

  const loginArray = new Array(4).fill(null);
  const loginArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };


const [dataFilter, setDataFilter] = useState(productData)

useEffect(() => {
  setDataFilter(productData)
},[productData])

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4 py-2">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-400 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900 ">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-8"
            />
          </div>
          <h2 className="text-4xl font-bold py-3 md:text-7xl">
            The Fasted Delivery in{" "}
            <span className="text-red-600">Your Home</span>
          </h2>
          <p className="py-3 text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt,
            sapiente nulla, aperiam labore pariatur, reiciendis voluptatem neque
            ea hic suscipit fugit qui officiis sit. In molestias exercitationem
            explicabo blanditiis enim?
          </p>
          <button className="font-bold bg-red-600 text-slate-200 py-2 px-4 rounded-md mt-3">
            Order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 items-center justify-center">
          {homeProductList[0]
            ? homeProductList.map((e) => {
                return (
                  <HomeCard
                    key={e._id}
                    id={e._id}
                    image={e.image}
                    name={e.name}
                    category={e.category}
                    price={e.price}
                    description={e.description}
                  />
                );
              })
            : loginArray.map((e, index) => {
                return <HomeCard key={index} loading={"Loading..."} />;
              })}
        </div>
      </div>
      <div>
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4 mb-4">
            <button
              onClick={prevProduct}
              className="bg-slate-400 hover:bg-slate-500 text-lg rounded p-1"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-400 hover:bg-slate-500 text-lg rounded p-1"
            >
              <GrNext />
            </button>
          </div>
        </div>

        <div
          className="flex gap-5 overflow-scroll scrollbar-none md:scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {filterVegetables[0]
            ? filterVegetables.map((e) => {
                return (
                  <CardFeature
                    key={e._id}
                    id={e._id}
                    image={e.image}
                    name={e.name}
                    category={e.category}
                    price={e.price}
                    description={e.description}
                  />
                );
              })
            : loginArrayFeature.map((e, index) => {
                return <CardFeature key={index} loading={"Loading..."} />;
              })}
        </div>
      </div>
      <AllProducts heading={"Your Products"} />
    </div>
  );
}
