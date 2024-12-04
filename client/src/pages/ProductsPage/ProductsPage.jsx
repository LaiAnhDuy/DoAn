import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Breadcrumb, Col, Pagination, Row } from "antd";
import { WrapperProducts } from "./style";
import * as ProductService from "../../services/ProductService";
import * as BrandService from "../../services/BrandService";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { searchBrand } from "../../redux/slides/productSlide";

const ProductsPage = () => {
  const [product, setProduct] = useState([]);
  const [brand, setBrand] = useState([]);
  const [currentPage, setCurrentPage] = useState("1");
  const search = useSelector((state) => state.product.search);
  const startIndex = (currentPage - 1) * 8;
  const onChange = (e) => {
    setCurrentPage(e);
  };
  const dispatch = useDispatch();
  const onClick = (brand) => {
    dispatch(searchBrand({ brand: brand }));
  };

  const getAllBrands = async () => {
    try {
      const res = await BrandService.getAllBrands();
      if (res) {
        setBrand(res);
      }
    } catch (error) {
    } finally {
    }
  };
  const getAllProducts = async () => {
    const data = {
      category: search?.category,
      caliber: search?.caliber,
      type: search?.type,
      glass: search?.glass,
      minRating: search?.minRating,
      minPrice: search?.minPrice,
      maxPrice: search?.maxPrice,
      brand: search?.brand,
    };
    try {
      const res = await ProductService.getAllProduct(data);
      if (res?.data) {
        setProduct(res?.data);
      }
    } catch (error) {
    } finally {
    }
  };
  useEffect(() => {
    getAllBrands();
    getAllProducts();
  }, [search]);
  const { page: category } = useParams();
  const breadcrumbItems =
    category === undefined
      ? [
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: <Link to="/products">Sản phẩm</Link>,
          },
        ]
      : [
          {
            title: <Link to="/">Trang chủ</Link>,
          },
          {
            title: <Link to="/products">Sản phẩm</Link>,
          },
          {
            title: (
              <Link to={`/products/${category}`}>
                {category === "donghonam"
                  ? "Đồng hồ nam"
                  : category === "donghonu"
                  ? "Đồng hồ nữ"
                  : null}
              </Link>
            ),
          },
        ];
  return (
    <div className="px-[150px] my-10">
      <Breadcrumb items={breadcrumbItems} />
      <div className="h-[1px] w-full my-5 bg-stone-500"></div>

      {/* brand */}
      <div
        className="mb-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 1fr)",
          justifyContent: "space-between",
          gap: "30px",
        }}
      >
        {brand?.map((value, index) => (
          <div style={{ textAlign: "center" }} key={index}>
            <img
              onClick={() => onClick(value._id)}
              style={{
                cursor: "pointer",
                backgroundColor: "white",
                border: "1px solid #000000 ",
                borderRadius: "5px",
                width: "100%",
                height: "70px",
              }}
              src={`http://localhost:3001/static/${value.image}`}
              alt="slide"
            />
          </div>
        ))}
      </div>
      
      <Row
        style={{
          flexWrap: "nowrap",
          paddingTop: "10px",
        }}
      >
        <div span={6} className="flex gap-x-5 mr-5">
          <NavBarComponent />
          <div className="w-[1px] bg-stone-400"></div>
        </div>
        <Col span={18}  className="">
          {product.length > 0 ? (
            <div>
              <WrapperProducts>
                {product.slice(startIndex, startIndex + 8).map((value) => (
                  <CardComponent
                    type={value?.type}
                    brand={value?.brand.name}
                    category={value?.category}
                    size={value?.size}
                    src={value?.images[0]}
                    name={value?.name}
                    price={value?.price}
                    rate={value?.rating}
                    glass={value?.glass}
                    id={value?._id}
                  />
                ))}
              </WrapperProducts>
              <Pagination
                defaultCurrent={1}
                total={product.length}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "10px" }}
              />
            </div>
          ) : (
            <p className="text-2xl">Không có sản phẩm nào.</p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductsPage;
