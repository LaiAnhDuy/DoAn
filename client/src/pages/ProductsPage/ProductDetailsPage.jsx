import React, { useEffect, useState } from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useLocation, useParams } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { Carousel } from "antd";
import CardComponent from "../../components/CardComponent/CardComponent";
import Comment from "../../components/CommentComponent";
import { glass, size, waterResistant } from "../../constant/constant";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState();
  const [products, setProducts] = useState();
  const [brandShow, setBrandShow] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const location = useLocation();
  const pathname = location.pathname;
  const parts = pathname.split("/");
  const { id } = useParams();

  const getDetailsProduct = async () => {
    const res = await ProductService.getDetailsProduct(id);
    if (res?.data) {
      setProduct(res?.data);
      console.log(res.data);
    }
  };
  const getAllBrands = async () => {
    const res = await ProductService.getAllBrands();
    setBrandShow(res);
  };
  const getAllProducts = async () => {
    const data = {
      brand: product?.brand,
    };
    const res = await ProductService.getAllProduct(data);
    if (res?.data) {
      setProducts(res?.data);
    }
  };
  useEffect(() => {
    getDetailsProduct();
    getAllBrands();
  }, [id]);
  useEffect(() => {
    getAllProducts();
  }, [product?.brand]);
  return (
    <div>
      <div>
        <ProductDetailsComponent
          description={product?.description}
          rate={product?.rating}
          idProduct={product?._id}
          brand={
            brandShow.filter((item) => item._id === product?.brand)[0]?.name
          }
          name={product?.name}
          images={product?.images}
          price={product?.price}
          quantity={product?.quantity}
          type={product?.type}
          category={product?.category}
          caliber={product?.caliber}
          waterResistant={waterResistant[product?.waterResistant]}
          size={size[product?.size]}
          glass={glass[product?.glass]}
          supplier={
            suppliers?.filter((item) => item._id === product?.supplier)[0]?.name
          }
        />
        {/* comment */}
          <div className="mt-10 px-[150px]">
            <h1 className="font-bold text-3xl">
              Bình luận
            </h1>
            <Comment productId={product?._id} />
          </div>
          {/* Related Products */}
          <div className="px-[150px]">
            <h1 className="font-bold text-3xl my-10">
              Sản phẩm liên quan
            </h1>
            {products?.length > 4 ? (
              <Carousel
                slidesToShow={4}
                autoplaySpeed={2000}
                style={{ marginLeft: "20px" }}
                autoplay
              >
                {products?.map((value, index) => (
                  <CardComponent
                    key={index}
                    type={value?.type}
                    brand={
                      brandShow.filter((item) => item._id === value.brand)[0]
                        ?.name
                    }
                    src={value?.images[0]}
                    name={value?.name}
                    price={value?.price}
                    rate={value?.rating}
                    id={value?._id}
                  />
                ))}
              </Carousel>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {products?.map((value, index) => (
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
            )}
          </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
