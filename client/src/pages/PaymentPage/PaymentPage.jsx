import { Form, Input, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";

import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import {
  addShippingAddresses,
  getListAddresses,
  removeAllOrderProduct,
} from "../../redux/slides/orderSlide";
import { PayPalButton } from "react-paypal-button-v2";
import axios from "axios";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [delivery, setDelivery] = useState("fast");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [districts, setDistricts] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [wards, setWards] = useState();
  const [payment, setPayment] = useState("later_money");
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        fullName: user?.fullName,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSlected?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);
  const result = useSelector((state) => state.order.discount);
  const priceDiscountMemo = useMemo(() => {
    const total = result * priceMemo;

    if (Number(total) && total < 1000000) {
      return total;
    } else if (Number(total) && total >= 1000000) {
      return 1000000;
    }
    return 0;
  }, [order]);

  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo < 5000000) {
      return 20000;
    } else if (priceMemo >= 15000000) {
      return 0;
    } else {
      return 10000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return (
      Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    );
  }, [priceMemo, priceDiscountMemo, diliveryPriceMemo]);
  const access_token = localStorage.getItem("access_token");
  const addresses = useSelector((state) => state.order.address);
  const name = useSelector((state) => state.order.name);
  const phone = useSelector((state) => state.order.phone);
  const email = useSelector((state) => state.order.email);
  const handleAddOrder = () => {
    if (
      access_token &&
      order?.orderItemsSlected &&
      name &&
      addresses &&
      phone &&
      email
    ) {
      // const coupon = PaymentService.useCoupon();
      mutationAddOrder.mutate({
        token: access_token,
        orderItem: order?.orderItemsSlected,

        shippingAddress: {
          fullName: name,
          address: addresses,
          phone: phone,
          email: email,
        },

        paymentMethod: payment,

        totalPrice: totalPriceMemo,
      });
    }
  };
  const mutationUpdate = useMutationHooks((data) => {
    const { id, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests });
    return res;
  });
  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder({ ...rests }, token);
    // PaymentService.useCoupon({}, token);
    return res;
  });

  const { isLoading, data } = mutationUpdate;
  const {
    data: dataAdd,
    isLoading: isLoadingAddOrder,
    isSuccess,
    isError,
  } = mutationAddOrder;
  useEffect(() => {
    if (city) {
      setDistricts(
        listCity.filter((element) => element.code === city)[0]?.districts
      );
    }
  }, [city]);
  useEffect(() => {
    if (district) {
      setWards(
        districts.filter((element) => element.code === district)[0]?.wards
      );
    }
  }, [district]);
  useEffect(() => {
    if (isSuccess && dataAdd?.message === "Order success") {
      const arrayOrdered = [];
      order?.orderItemsSlected?.forEach((element) => {
        arrayOrdered.push(element.product);
      });
      dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
      message.success("Đặt hàng thành công");
      navigate("/orderSuccess", {
        state: {
          delivery,
          payment,
          orders: order?.orderItemsSlected,
          totalPriceMemo: totalPriceMemo,
        },
      });
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleCancleUpdate = () => {
    setStateUserDetails({
      fullName: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };
  const listCity = useSelector((state) => state.order.listCity);
  const onSuccessPaypal = () => {
    mutationAddOrder.mutate({
      token: access_token,
      orderItem: order?.orderItemsSlected,
      fullName: user?.fullName,
      address: user?.address,
      phone: user?.phone,
      paymentMethod: payment,
      itemsPrice: priceMemo,
      shippingPrice: diliveryPriceMemo,
      totalPrice: totalPriceMemo,
      user: user?.id,
      email: user?.email,
    });
  };

  const handleUpdateInforUser = () => {
    const { fullName, address, phone } = stateUserDetails;
    if (fullName && address && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ fullName, address, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
    }
  };
  const handleAddress = () => {
    if (city && district && ward) {
      dispatch(
        addShippingAddresses({
          address: [city, district, ward, address],
          name: user?.fullName,
          email: user?.email,
          phone: user?.phone,
        })
      );

      setIsOpenModalUpdateInfo(false);
    }
  };
  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleDilivery = (e) => {
    setDelivery(e.target.value);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const res = async () => {
    const res = await axios.get("https://provinces.open-api.vn/api/?depth=3");
    if (res) {
      dispatch(getListAddresses({ listCity: res.data }));
    }
  };
  useEffect(() => {
    setSdkReady(true);
    res();
  }, []);

  return (
    <>
      <p className="mx-[150px] text-3xl font-bold mt-5 mb-10">Thanh toán</p>
      <div className="mx-[150px] grid grid-cols-2 gap-x-5">
        <div className=" border-r border-stone-300">
          <p className="mb-5 font-medium text-xl">Chọn phương thức Giao hàng</p>
          <div className="px-10 py-5 bg-blue-100 border border-blue-200 rounded-lg w-5/6">
            <Radio.Group onChange={handleDilivery} value={delivery}>
              <Radio value="fast" className="block mb-5">
                <span className="font-bold text-orange-500 ml-5 mr-2">
                  FAST
                </span>
                - Giao hàng nhanh, tiết kiệm chi phí
              </Radio>
              <Radio value="gojek">
                <span className="font-bold text-orange-500 ml-5 mr-2">
                  GO_JEK
                </span>
                - Giao hàng linh hoạt và đáng tin cậy
              </Radio>
            </Radio.Group>
          </div>
          <p className="my-5 font-medium text-xl">Phương thức Thanh toán</p>
          <div className="px-10 py-5 bg-blue-100 border border-blue-200 rounded-lg w-5/6">
            <Radio.Group onChange={handlePayment} value={payment}>
              <Radio value="later_money">
                <p className="ml-5">Thanh toán tiền mặt khi nhận hàng</p>
              </Radio>
              {/* <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio> */}
            </Radio.Group>
          </div>
        </div>
        <div>
          <p className="font-medium text-xl">Thông tin thanh toán</p>
          <div className="grid grid-cols-2">
            <p className="mt-5 font-bold">Tên người mua :</p>
            <p className="mt-5">{user?.fullName}</p>
            <p className="mt-5 font-bold">Số điện thoại : </p>
            <p className="mt-5">0{user?.phone}</p>
            <p className="mt-5 font-bold">Email : </p>
            <p className="mt-5">{user?.email}</p>
          </div>
          <div className="mt-5 flex gap-x-5">
            <p className="font-bold">Địa chỉ: </p>
            <p
              className="text-red-500 underline cursor-pointer"
              onClick={handleChangeAddress}
            >
              Thay đổi
            </p>
          </div>
          <div className="mt-3">
            {addresses.length > 0 ? (
              <p>
                {`${addresses[3]} - ${
                  listCity
                    ?.filter((item) => item?.code === addresses[0])?.[0]
                    ?.districts.filter(
                      (item) => item?.code === addresses[1]
                    )?.[0]
                    ?.wards.filter((item) => item?.code === addresses[2])?.[0]
                    ?.name
                } - ${
                  listCity
                    ?.filter((item) => item?.code === addresses[0])?.[0]
                    ?.districts.filter(
                      (item) => item?.code === addresses[1]
                    )?.[0]?.name
                } - ${
                  listCity.filter((item) => item?.code === addresses[0])[0]
                    ?.name
                }`}
              </p>
            ) : null}
          </div>
          <hr className="mt-5" />
          <div className="grid grid-cols-2">
            <p className="mt-5 font-bold">Tạm tính :</p>
            <p className="mt-5">
              {Number(priceMemo).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p className="mt-5 font-bold">Giảm giá : </p>
            <p className="mt-5">
              {Number(priceDiscountMemo).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p className="mt-5 font-bold">Phí giao hàng : </p>
            <p className="mt-5">
              {Number(diliveryPriceMemo).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          <hr className="mt-5" />
          <div className="my-5 grid grid-cols-2">
            <p className="text-xl">Tổng tiền : </p>
            <div>
              <p className="text-3xl text-red-500 font-bold">
                {Number(totalPriceMemo).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p className="text-sm mt-2">(Đã bao gồm VAT nếu có)</p>
            </div>
          </div>
          {payment === "paypal" && sdkReady ? (
            <div style={{ width: "320px" }}>
              <PayPalButton
                amount={Math.round(totalPriceMemo / 30000)}
                onSuccess={onSuccessPaypal}
                onError={() => {
                  alert("Erroe");
                }}
              />
            </div>
          ) : (
            <ButtonComponent
              onClick={() => handleAddOrder()}
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "200px",
                border: "none",
                borderRadius: "4px",
              }}
              textbutton={"Đặt hàng"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          )}
        </div>
      </div>
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancleUpdate}
        onOk={handleAddress}
      >
        <Form
          name="basic"
          layout="vertical"
          //   onFinish={onUpdateUser}
          autoComplete="on"
          form={form}
        >
          <Form.Item
            label="Tỉnh/Thành phố"
            name="city"
            rules={[{ required: true, message: "Please input your  city!" }]}
          >
            <Select
              placeholder="Tình/Thành phố"
              options={listCity?.map((city) => ({
                value: city.code,
                label: city.name,
              }))}
              onChange={(value) => {
                setCity(value);
              }}
              value={city}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Quận/Huyện"
            name="district"
            rules={[{ required: true, message: "Please input your  address!" }]}
          >
            <Select
              placeholder="Quận/Huyện"
              options={districts?.map((city) => ({
                value: city.code,
                label: city.name,
              }))}
              onChange={(value) => {
                setDistrict(value);
              }}
              value={district}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Xã/Phường"
            name="ward"
            rules={[{ required: true, message: "Please input your ward!" }]}
          >
            <Select
              placeholder="Xã/Phường"
              options={wards?.map((city) => ({
                value: city.code,
                label: city.name,
              }))}
              onChange={(value) => {
                setWard(value);
              }}
              value={ward}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Số nhà"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input
              placeholder="Số nhà"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </Form.Item>
        </Form>
      </ModalComponent>
    </>
  );
};

export default PaymentPage;
