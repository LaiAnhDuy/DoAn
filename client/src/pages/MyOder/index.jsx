import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";

import {
  WrapperItemOrder,
  WrapperListOrder,
  WrapperHeaderItem,
  WrapperFooterItem,
  WrapperContainer,
  WrapperStatus,
} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from "../../components/Message/Message";
import { UPLOAD_BASE_URL } from "../../config";
import { Tabs } from "antd";

const MyOrderPage = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(access_token);
    return res?.data;
  };

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: fetchMyOrder });

  const { data } = queryOrder;
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token,
      },
    });
  };

  const mutation = useMutationHooks((data) => {
    const { id, token } = data;
    const res = OrderService.cancelOrder(id, token);
    return res;
  });

  const handleCanceOrder = (order) => {
    mutation.mutate(
      {
        id: order._id,
        token: access_token,
      },
      {
        onSuccess: () => {
          queryOrder.refetch();
        },
      }
    );
  };
  const handleReview = async (productId, orderId, index) => {
    localStorage.setItem(
      "review",
      JSON.stringify({
        orderId,
        index,
      })
    );
    navigate(`/review/${productId}`);
  };

  const {
    isSuccess: isSuccessCancel,
    isError: isErrorCancle,
    data: dataCancel,
  } = mutation;

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === "OK") {
      message.success();
    } else if (isSuccessCancel && dataCancel?.status === "ERR") {
      message.error(dataCancel?.message);
    } else if (isErrorCancle) {
      message.error();
    }
  }, [isErrorCancle, isSuccessCancel, dataCancel]);
  const renderProduct = (data, orderId, status) => {
    return data?.map((product, index) => {
      return (
        <WrapperHeaderItem key={product?._id}>
          <img
            alt="#"
            src={UPLOAD_BASE_URL + "/" + product?.images[0]}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              border: "1px solid rgb(238, 238, 238)",
              padding: "2px",
            }}
          />
          <div
            style={{
              width: 260,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            {product?.name}
          </div>
          <span
            style={{ fontSize: "13px", color: "#242424", marginLeft: "auto" }}
          >
            <div className="mb-5">
              {Number(product?.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
            {product.isReview && status === "done" ? (
              <p>Đã đánh giá</p>
            ) : (
              status === "done" && (
                <ButtonComponent
                  onClick={() => {
                    handleReview(product?.product, orderId, index);
                  }}
                  size={40}
                  styleButton={{
                    height: "36px",
                    border: "1px solid #9255FD",
                    borderRadius: "4px",
                  }}
                  textbutton={"Đánh giá"}
                  styleTextButton={{
                    color: "#9255FD",
                    fontSize: "14px",
                  }}
                ></ButtonComponent>
              )
            )}
          </span>
        </WrapperHeaderItem>
      );
    });
  };
  const items = [
    {
      key: "pending",
      label: "Đang chờ xử lý",
    },
    {
      label: "Đang giao hàng",
      key: "shipping",
    },
    {
      label: "Đã giao hàng",
      key: "done",
    },
    {
      label: "Đã hủy ",
      key: "cancel",
    },
  ];

  return (
    <WrapperContainer>
      <div className="px-[150px] min-h-[400px]">
        <h4 className="text-3xl py-5 font-bold">Đơn hàng của tôi</h4>
        <Tabs
          defaultActiveKey="1"
          items={items.map((item) => {
            return {
              label:
                item.label +
                " " +
                `( ${
                  data?.filter((order) => order.status === item.key).length
                } )`,
              key: item.key,
              children: (
                <WrapperListOrder>
                  {data
                    ?.filter((order) => order.status === item.key)
                    .map((order) => {
                      return (
                        <WrapperItemOrder key={order?._id}>
                          <WrapperStatus>
                            <span
                              style={{ fontSize: "14px", fontWeight: "bold" }}
                            >
                              Trạng thái
                            </span>
                            <div>
                              <span
                                style={{
                                  color: "rgb(90, 32, 193)",
                                  fontWeight: "bold",
                                }}
                              >{`${
                                order.status === "cancel"
                                  ? "Đã hủy"
                                  : order.status === "shipping"
                                  ? "Đang giao"
                                  : order.status === "done"
                                  ? "Giao hàng thành công"
                                  : "Đang chờ xử lý"
                              }`}</span>
                            </div>
                          </WrapperStatus>
                          {renderProduct(
                            order?.orderItem,
                            order._id,
                            order.status
                          )}
                          <WrapperFooterItem>
                            <div>
                              <span style={{ color: "rgb(255, 66, 78)" }}>
                                Tổng tiền:{" "}
                              </span>
                              <span
                                style={{
                                  fontSize: "13px",
                                  color: "rgb(56, 56, 61)",
                                  fontWeight: 700,
                                }}
                              >
                                {Number(order?.totalPrice).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                              }}
                            >
                              {order.status === "cancel" ? (
                                <p className="text-red-500">Đơn hàng đã hủy</p>
                              ) : order.status === "shipping" ? (
                                "Đơn hàng đang giao"
                              ) : order.status === "done" ? (
                                "Đơn hàng đã giao"
                              ) : (
                                <ButtonComponent
                                  onClick={() => handleCanceOrder(order)}
                                  size={40}
                                  styleButton={{
                                    height: "36px",
                                    border: "1px solid #9255FD",
                                    borderRadius: "4px",
                                  }}
                                  textbutton={"Hủy đơn hàng"}
                                  styleTextButton={{
                                    color: "#9255FD",
                                    fontSize: "14px",
                                  }}
                                ></ButtonComponent>
                              )}
                              <ButtonComponent
                                onClick={() => handleDetailsOrder(order?._id)}
                                size={40}
                                styleButton={{
                                  height: "36px",
                                  border: "1px solid #9255FD",
                                  borderRadius: "4px",
                                }}
                                textbutton={"Xem chi tiết"}
                                styleTextButton={{
                                  color: "#9255FD",
                                  fontSize: "14px",
                                }}
                              ></ButtonComponent>
                            </div>
                          </WrapperFooterItem>
                        </WrapperItemOrder>
                      );
                    })}
                </WrapperListOrder>
              ),
            };
          })}
        />
      </div>
    </WrapperContainer>
  );
};

export default MyOrderPage;
