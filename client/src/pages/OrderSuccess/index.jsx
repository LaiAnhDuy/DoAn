import React from "react";
import {
  Lable,
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperItemOrder,
  WrapperItemOrderInfo,
} from "./style";

import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";

import { UPLOAD_BASE_URL } from "../../config";

const OrderSucess = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <div className="px-[150px]">
      <p className="mt-5 text-3xl font-bold">Đơn hàng đặt thành công</p>
      <div className="grid grid-cols-2 gap-x-10">
        <div>
          <p className="my-5 font-medium text-xl">Phương thức Giao hàng</p>
          <div className="px-10 py-5 bg-blue-100 border border-blue-200 rounded-lg">
            <span className="font-bold text-orange-500 mr-5">
              {orderContant.delivery[state?.delivery]}
            </span>
            {orderContant.delivery[state?.delivery] === "FAST"
              ? "Giao hàng nhanh, tiết kiệm chi phí"
              : "Giao hàng linh hoạt và đáng tin cậy"}
          </div>
        </div>
        <div>
          <p className="my-5 font-medium text-xl">Phương thức Thanh toán</p>
          <div className="px-10 py-5 bg-blue-100 border border-blue-200 rounded-lg">
            {orderContant.payment[state?.payment]}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 mt-10 text-2xl border-b-2 pb-5 border-red-500">
        <p className="col-span-2">Tên đồng hồ</p>
        <p>Giá tiền</p>
        <p>Số lượng</p>
      </div>
      <div>
        {state.orders?.map((order, i) => (
          <div key={order.product}>
            <div className="grid grid-cols-4 my-5">
              <div className="flex items-center gap-x-10 col-span-2">
                <img
                  alt="#"
                  src={UPLOAD_BASE_URL + "/" + order?.images[0]}
                  className="object-cover w-20 h-24"
                />
                <p className="text-xl">{order?.name}</p>
              </div>
              <p className="my-auto text-xl">
                {Number(order?.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p className="my-auto text-xl">{order?.amount}</p>
            </div>
            <hr className="h-[2px] bg-stone-300" />
          </div>
        ))}

        <p className="text-2xl text-red-500 font-bold mt-10 grid grid-cols-4">
          <div className="col-span-2">Tổng tiền : </div>
          {Number(state?.totalPriceMemo).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      </div>
      
    </div>
  );
};

export default OrderSucess;
