import React, { useEffect, useState } from "react";
import FilteredProduct from "./FilteredProduct";
import CardFeature from "./CardFeature";
import { useSelector } from "react-redux";

export default function AllProducts({ heading, loading }) {

  const [filterBy, setFilterBy] = useState();

  const productData = useSelector((state) => state.product.productList);

  const categoryList = [...new Set(productData.map((e) => e.category))];

  const [dataFilter, setDataFilter] = useState(productData);

  const loadingArray = new Array(30).fill(null);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFIlterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  return (
    <div>
      <div className="my-5">
        <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>
        {dataFilter ? (
          <div>
            <div className="flex gap-4 justify-center scrollbar-none md:scrollbar-none scroll-smooth transition-all align-center">
          {categoryList ? (
            categoryList.map((e, index) => {
              return (
                <FilteredProduct
                  category={e}
                  key={index}
                  isActive={e === filterBy}
                  onClick={() => handleFIlterProduct(e)}
                />
              );
            })
          ) : (
            <div className="min-h-[150px] flex justify-center items-center">
              <p>{loading}</p>
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-4 my-4">
          {dataFilter[0]
            ? dataFilter.map((e) => {
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
            : loadingArray.map((e, index) => {
                return <CardFeature key={index} loading={"Loading..."} />;
              })}
        </div>
          </div>
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
