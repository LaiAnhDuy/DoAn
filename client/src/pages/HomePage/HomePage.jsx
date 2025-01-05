import React, { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";

import CardComponent from "../../components/CardComponent/CardComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import { useNavigate } from "react-router-dom";

import Expertise from "../../components/Expertise";
import News from "../../components/News";

const HomePage = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      const res = await ProductService.getAllProduct();
      if (res?.data) {
        setProduct(res?.data.reverse());
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div className="px-[150px] bg-black">
        <SliderComponent />
      </div>
      <div className="px-[150px] text-4xl items-center justify-between font-medium my-10 flex">
        <hr className="w-full" />
        <div className="w-full text-center">Sản phẩm mới</div>
        <hr className="w-full" />
      </div>
      <div className="px-[150px] grid grid-cols-4 gap-5">
        {product.slice(0, 8).map((value, index) => (
          <CardComponent
            key={index}
            type={value?.type}
            brand={value?.brand.name}
            category={value?.category}
            size={value?.size}
            src={value?.images[0]}
            name={value?.name}
            price={value?.price}
            rate={value?.rating}
            // glass={value?.glass}
            id={value?._id}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          className="mt-10 px-14 py-2 text-white rounded bg-red-500 hover:bg-red-600"
          onClick={() => {
            navigate("/products");
          }}
        >
          Xem thêm
        </button>
      </div>
      <Expertise />
      <News />
    </>
  );
};

export default HomePage;
