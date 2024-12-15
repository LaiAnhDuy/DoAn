import React, { useEffect, useState } from "react";
import { Rate, message } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { addOrderProduct } from "../../redux/slides/orderSlide";

import { modalState } from "../../redux/slides/userSlide";

const ProductDetailsComponent = (props) => {
  const [index, setIndex] = React.useState(0);
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === props?.idProduct
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.quantity ||
      (!orderRedux && props?.quantity > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (props?.quantity === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  const handleChangeCount = (type, limited) => {
    if (type === "increase") {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      dispatch(modalState({ modalSignIn: true }));
      navigate("", { state: location?.pathname });
    } else {
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === props?.idProduct
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.quantity ||
        (!orderRedux && props?.quantity > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: props?.name,
              amount: numProduct,
              images: props?.images,
              price: props?.price,
              product: props?.idProduct,
              quantity: props?.quantity,
            },
          }),
          message.success("Đã thêm vào giỏ hàng")
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  const handleOrderProduct = () => {
    if (!user?.id) {
      dispatch(modalState({ modalSignIn: true }));
      navigate("", { state: location?.pathname });
    } else {
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === props?.idProduct
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.quantity ||
        (!orderRedux && props?.quantity > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: props?.name,
              amount: numProduct,
              images: props?.images,
              price: props?.price,
              product: props?.idProduct,
              quantity: props?.quantity,
            },
          })
        );
        navigate("/order");
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  return (
    <div>
      <div className="px-[150px] grid grid-cols-7 gap-x-5 mt-10">
        <div className="col-span-2">
          <img
            src={`http://localhost:3001/static/${props.images?.[index]}`}
            className="w-full h-[400px] object-cover"
            alt=""
          />
          <div className="flex gap-x-2 mt-5 item-center">
            {props.images?.map((image, index) => (
              <div
                key={index}
                onClick={() => setIndex(index)}
                className="w-[100px] h-[100px]"
              >
                <img
                  src={`http://localhost:3001/static/${image}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 border-x px-4">
          <p className="font-bold mt-2">
            <span className="text-blue-500 bg-blue-50 rounded-full px-1 pb-1 mr-5">
              {/* <CheckCircleIcon /> */}
              <span className="ml-2">Chính hãng</span>
            </span>
            <span className="font-medium">Thương hiệu: {props.brand}</span>
          </p>
          <p className="font-medium text-2xl mt-3">ĐỒNG HỒ {props.name}</p>
          <div className="flex items-center">
            <p className="mr-2 font-medium text-xl">{props.rate}</p>
            <Rate
              disabled
              value={props.rate}
              style={{ fontSize: "15px", paddingLeft: "10px" }}
            />
          </div>
          <p className="mt-5 ml-5 text-3xl font-medium flex">
            {Number(props.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <hr className="mt-5" />
          <p className="mt-5 font-bold text-xl">Mô tả</p>
          <p className="mt-5 font-medium">{props.description}</p>
          <hr className="my-5" />
          <p>Số lượng (còn {props.quantity})</p>
          <div className="flex mt-5 border rounded-xl w-max items-center">
            <button
              className="text-3xl text-white px-10 active:bg-red-400 bg-red-500 rounded-l"
              onClick={() => handleChangeCount("decrease", numProduct === 1)}
            >
              -
            </button>
            <input
              className="w-24 text-center text-xl border-x border-gray-300 focus:outline-none"
              value={numProduct || ""}
              onChange={(e) => {
                const value = e.target.value;

                if (value === "") {
                  setNumProduct("");
                  return;
                }

                const parsedValue = parseInt(value, 10);
                if (parsedValue >= 1 && parsedValue <= props?.quantity) {
                  setNumProduct(parsedValue);
                }
              }}
              onBlur={() => {
                if (!numProduct || numProduct < 1) {
                  setNumProduct(1);
                }
              }}
            />

            <button
              className="text-3xl text-white px-10 active:bg-red-400 bg-red-500 rounded-r"
              onClick={() =>
                handleChangeCount("increase", numProduct === props?.quantity)
              }
            >
              +
            </button>
          </div>
          <hr className="mt-5" />

          <button
            className="bg-red-500 text-white text-xl px-8 py-2 active:bg-red-400 mt-5 mr-5 rounded"
            onClick={handleAddOrderProduct}
          >
            Thêm vào giỏ hàng
          </button>
          <button
            className="bg-red-500 text-white text-xl px-8 py-2 active:bg-red-400 mt-5 rounded"
            onClick={handleOrderProduct}
          >
            Mua ngay
          </button>
        </div>
        <div className="col-span-2">
          <p className="bg-red-500 flex items-center text-white font-medium text-2xl p-2 mt-2">
            <UnorderedListOutlined className="mx-2" style={{ fontSize: 32 }} />
            Chi tiết sản phẩm
          </p>
          <p className="font-bold mt-8 text-xl">
            Danh mục:{" "}
            <span className="font-normal ml-2">Đồng hồ {props.category}</span>
          </p>
          <p className="font-bold mt-8 text-xl">
            Kiểu máy: <span className="font-normal ml-2">{props.caliber}</span>
          </p>
          <p className="font-bold mt-8 text-xl">
            Kiểu dây: <span className="font-normal ml-2">{props.type}</span>
          </p>
          <p className="font-bold mt-8 text-xl">
            Size: <span className="font-normal ml-2">{props.size}</span>
          </p>
          <p className="font-bold mt-8 text-xl">
            Loại kính: <span className="font-normal ml-2">{props.glass}</span>
          </p>
          <p className="font-bold mt-8 text-xl">
            Chống nước:{" "}
            <span className="font-normal ml-2">{props.waterResistant}</span>
          </p>
        </div>
        {errorLimitOrder && (
          <div style={{ color: "red" }}>Sản phẩm hết hàng</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
