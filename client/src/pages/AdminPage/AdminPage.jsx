import React, { useMemo, useState } from "react";
import { Button, Menu, Result } from "antd";
import { useQueries } from "@tanstack/react-query";
import {
  LineChartOutlined,
  TeamOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  AuditOutlined,
  TagOutlined,
} from "@ant-design/icons";

import { getItem } from "../../util/utils";
import { useDispatch, useSelector } from "react-redux";

import CustomizedContent from "../../components/AdminComponent/CustomizedContent";
// import Loading from "../../components/LoadingComponent/LoadingComponent";
import AdminUser from "../../components/AdminComponent/AdminUser";
import AdminProduct from "../../components/AdminComponent/AdminProduct";
import AdminOrder from "../../components/AdminComponent/AdminOrder";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import * as ProductService from "../../services/ProductService";
import { listUser } from "../../redux/slides/userSlide";
import "./style.css";
import { useNavigate } from "react-router-dom";

import AdminCoupon from "../../components/AdminComponent/AdminCoupon";
import logo from "../../assets/images/Logo-DWatch.svg";
import AdminSupplier from "../../components/AdminComponent/AdminSupplier";
import AdminDashboard from "../../components/AdminComponent/AdminDashboard";
const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  // const user = useSelector((state) => state?.user);
  const access_token = localStorage.getItem("access_token");
  const dispatch = useDispatch();
  const items = [
    getItem(
      "Thống kê",
      "dashboard",
      <LineChartOutlined style={{ fontSize: 20 }} />
    ),
    getItem(
      "Đơn hàng",
      "orders",
      <ShoppingCartOutlined style={{ fontSize: 20 }} />
    ),
    getItem(
      "Nhà cung cấp",
      "supplier",
      <AuditOutlined style={{ fontSize: 20 }} />
    ),
    getItem(
      "Sản phẩm",
      "products",
      <AppstoreOutlined style={{ fontSize: 20 }} />
    ),
    getItem("Người dùng", "users", <TeamOutlined style={{ fontSize: 20 }} />),
    getItem("Giảm giá", "coupons", <TagOutlined style={{ fontSize: 20 }} />),
  ];

  const [keySelected, setKeySelected] = useState("dashboard");
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(access_token);
    return { data: res?.data, key: "orders" };
  };

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return { data: res?.data, key: "products" };
  };

  const navigate = useNavigate();
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await UserService.getAllUser(access_token);
      dispatch(listUser(res?.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const queries = useQueries({
    queries: [
      { queryKey: ["products"], queryFn: getAllProducts },
      { queryKey: ["users"], queryFn: getAllUsers },
      { queryKey: ["orders"], queryFn: getAllOrder },
    ],
  });
  const memoCount = useMemo(() => {
    const result = {};
    try {
      if (queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length;
        });
      }
      return result;
    } catch (error) {
      return result;
    }
  }, [queries]);
  const COLORS = {
    users: ["#e66465", "#9198e5"],
    products: ["#a8c0ff", "#3f2b96"],
    orders: ["#11998e", "#38ef7d"],
  };

  const renderPage = (key) => {
    switch (key) {
      case "dashboard":
        return <AdminDashboard />;
      case "users":
        return <AdminUser />;
      case "products":
        return <AdminProduct />;
      case "orders":
        return <AdminOrder />;
      case "coupons":
        return <AdminCoupon />;
      case "supplier":
        return <AdminSupplier />;
      default:
        return <></>;
    }
  };

  const handleOnCLick = ({ key }) => {
    setKeySelected(key);
  };
  const user = useSelector((state) => state?.user);
  const role = user?.role;
  return (
    <>
      {role === "admin" ? (
        <div className="flex">
          <div>
            <div className="w-56 m-5">
              <img alt="logo" onClick={() => navigate("/")} src={logo} />
            </div>
            <Menu
              mode="inline"
              style={{ paddingTop: 32 }}
              className="min-h-[80vh] text-xl custom-menu"
              items={items}
              onClick={handleOnCLick}
            />
          </div>
          <div style={{ flex: 1, padding: "15px 0 15px 15px" }}>
            {/* <Loading isLoading={loading}> */}
            {/* {!keySelected && (
                <CustomizedContent
                  data={memoCount}
                  colors={COLORS}
                  setKeySelected={setKeySelected}
                />
              )} */}
            {/* </Loading> */}
            {renderPage(keySelected)}
          </div>
        </div>
      ) : (
        <Result
          status="403"
          title="403"
          subTitle="Xin lỗi, bạn không được phép truy cập trang này."
          extra={
            <Button className="bg-blue-400" onClick={() => navigate("/")}>
              Back Home
            </Button>
          }
        />
      )}
    </>
  );
};

export default AdminPage;
