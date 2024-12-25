import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useEffect, useState } from "react";
import { UPLOAD_BASE_URL } from "../../config";
import { Form, Input, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import { createReview } from "../../services/ProductService";
import { useSelector } from "react-redux";

const Review = () => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState("");
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(access_token);
    return res?.data;
  };
  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: fetchMyOrder });
  const { orderId, index } = JSON.parse(localStorage.getItem("review"));
  const { data } = queryOrder;
  useEffect(() => {
    if (data) {
      const orderItem = data.filter((orderItem) => orderItem._id === orderId);
      setProduct(orderItem[0].orderItem[index]);
    }
  }, [data, index, orderId]);

  useEffect(() => {
    console.log(product);
    if (product.images) setImage(product?.images[0]);
  }, [product]);
  const handleSubmit = async (values) => {
    await createReview(
      {
        reviewData: {
          fullName: user.fullName,
          comment: values.comment,
          star: values.star,
        },
        orderId,
      },
      product.product,
      access_token
    );
    navigate(`/product-details/${product.product}`);
  };

  return (
    <div className="mx-[150px]">
      <div>
        <p className="my-10 text-3xl font-bold">Đánh giá sản phẩm</p>
        <div className="grid grid-cols-12 text-xl font-medium">
          <div className="col-span-4">Tên đồng hồ</div>
          <div className="col-span-3">Giá</div>
          <div className="col-span-2">Số lượng</div>
          <div className="col-span-3">Tổng tiền</div>
        </div>
        <hr className="my-5" />
        <div className="grid grid-cols-12 text-xl items-center">
          <div className="col-span-4 flex  items-center">
            <img
              alt="#"
              src={UPLOAD_BASE_URL + "/" + image}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                border: "1px solid rgb(238, 238, 238)",
                padding: "2px",
              }}
            />
            <div className="ml-5">{product?.name}</div>
          </div>
          <div className="col-span-3">
            {Number(product?.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
          <div className="col-span-2">{product?.amount}</div>
          <div className="col-span-3">
            {Number(product?.price * product?.amount).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item
            name="star"
            rules={[{ required: true, message: "Vui lòng đánh giá số sao!" }]}
          >
            <div className="flex gap-x-10">
              <p className="text-xl">Đánh giá sản phẩm</p>
              <Rate
                style={{ fontSize: 30 }}
                onChange={(value) => form.setFieldsValue({ star: value })}
              />
            </div>
          </Form.Item>
          <Form.Item
            label={<span className="text-xl">Nhập vào đánh giá của bạn</span>}
            name="comment"
            className="!mt-5"
          >
            <Input.TextArea className="w-96" rows={4} />
          </Form.Item>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Gửi đánh giá
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Review;
