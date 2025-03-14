/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader } from "./style";
import moment from "moment";
import * as CoupontService from "../../services/CoupontService";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import ModalComponent from "../ModalComponent/ModalComponent";
import dayjs from "dayjs"

export default function AdminCoupon() {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  const [rowSelected, setRowSelected] = useState();
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const searchInput = useRef(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const onCancel = () => {
    setIsOpen(false);
  };
  const { RangePicker } = DatePicker;
  const access_token = localStorage.getItem("access_token");
  const onFinish = async (values) => {
    const data = {
      code: values.code,
      startDate: values.date?.[0],
      expiredDate: values.date?.[1],
      discountPercent: values.discountPercent,
      minimumPurchaseAmount: values.minimumPurchaseAmount,
      maximumDiscountAmount: values.maximumDiscountAmount,
    };
    const res = await CoupontService.createCoupon(data, access_token);
    if (res) {
      form.resetFields();
      getAllCoupons();
    }
    setIsOpen(false);
  };
  const getAllCoupons = async () => {
    const res = await CoupontService.getAllCouponAdmin(access_token);
    setCoupons(res?.coupons);
  };
  useEffect(() => {
    getAllCoupons();
  }, []);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const onUpdateCoupon = async (values) => {
    const data = {
      code: values.code,
      startDate: values.date?.[0],
      expiredDate: values.date?.[1],
      discountPercent: values.discountPercent,
      minimumPurchaseAmount: values.minimumPurchaseAmount,
      maximumDiscountAmount: values.maximumDiscountAmount,
      id: rowSelected,
    };
    const res = await CoupontService.updateCoupon(data, access_token);
    if (res) {
      form.resetFields();
      getAllCoupons();
    }
    setIsOpenDrawer(false);
  };

  const handleOpenDrawer = (id) => {
    setIsOpenDrawer(true);
    const coupon = coupons.find((coupon) => coupon._id === id);
    console.log(coupon);
    form1.setFieldsValue({
      code: coupon.code,
      date: [dayjs(coupon.startDate), dayjs(coupon.expiredDate)],
      discountPercent: coupon.discountPercent,
      minimumPurchaseAmount: coupon.minimumPurchaseAmount,
      maximumDiscountAmount: coupon.maximumDiscountAmount,
    });
  };
  const handleDeleteCoupon = async () => {
    try {
      const res = await CoupontService.deleteCoupon(rowSelected, access_token);
      if (res) {
        message.success("Xoá mã giảm giá thành công!");
        setIsModalOpenDelete(false);
        getAllCoupons();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
            color="white"
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Làm mới
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });
  const renderAction = (_, record) => {
    return (
      <div className="flex justify-around gap-x-2">
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={() => handleOpenDrawer(record._id)}
        />
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
      </div>
    );
  };
  const columns = [
    {
      title: "Tên giảm giá",
      dataIndex: "code",
      sorter: (a, b) => a.code.length - b.code.length,
      ...getColumnSearchProps("code"),
    },

    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      sorter: (a, b) => moment(a.startDate).unix() - moment(b.startDate).unix(),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiredDate",
      render: (text) => moment(text).format("DD/MM/YYYY"),
      sorter: (a, b) =>
        moment(a.expiredDate).unix() - moment(b.expiredDate).unix(),
    },
    {
      title: "Phần trăm giảm giá(%)",
      dataIndex: "discountPercent",
      sorter: (a, b) => a.discountPercent - b.discountPercent,
    },
    {
      title: "Số tiền giảm giá tối Đa (VND)",
      dataIndex: "maximumDiscountAmount",
      sorter: (a, b) => a.maximumDiscountAmount - b.maximumDiscountAmount,
    },
    {
      title: "Số tiền mua tối thiểu (VND)",
      dataIndex: "minimumPurchaseAmount",
      sorter: (a, b) => a.minimumPurchaseAmount - b.minimumPurchaseAmount,
    },
    {
      title: "",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    coupons?.length &&
    coupons?.map((coupon) => {
      return {
        ...coupon,
        key: coupon._id,
      };
    });

  return (
    <div className="px-5">
      <WrapperHeader>Quản lý mã giảm giá</WrapperHeader>
      <div className="mt-6">
        <TableComponent
          keyselected="coupon"
          createCoupon={() => setIsOpen(true)}
          columns={columns}
          data={dataTable}
          pagination={{ pageSize: 5 }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>

      {/* Tạo mã giảm giá */}
      <Modal
        open={isOpen}
        width={400}
        onCancel={onCancel}
        title="Thêm mã giảm giá"
        footer={null}
      >
        <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            label="Mã giảm giá"
            name="code"
            rules={[
              { required: true, message: "Vui lòng nhập mã của bạn!" },
              {
                min: 8,
                message: "Vui lòng nhập 8 ký tự trở lên",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thời hạn giảm giá"
            name="date"
            rules={[
              { required: true, message: "Vui lòng chọn thời hạn giảm giá !" },
            ]}
          >
            <RangePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item
            label="Phần trăm giảm giá"
            name="discountPercent"
            rules={[
              { required: true, message: "Vui lòng nhập phần trăm giảm giá !" },
            ]}
          >
            <Radio.Group>
              <Radio value={5}>5%</Radio>
              <Radio value={10}>10%</Radio>
              <Radio value={15}>15%</Radio>
              <Radio value={20}>20%</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Giá trị đơn hàng tối thiểu (VND)"
            name="minimumPurchaseAmount"
            rules={[
              { pattern: /^[0-9]*$/, message: "Vui lòng nhập số tiền !" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giảm giá tối đa (VND)"
            name="maximumDiscountAmount"
            rules={[
              { pattern: /^[0-9]*$/, message: "Vui lòng nhập số tiền !" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button htmlType="submit">Tạo mã giảm giá</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Sửa mã giảm giá */}
      <DrawerComponent
        title="Sửa mã giảm giá"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="50%"
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          labelAlign="left"
          wrapperCol={{ span: 16 }}
          onFinish={onUpdateCoupon}
          autoComplete="on"
          form={form1}
        >
          <Form.Item
            label="Mã giảm giá"
            name="code"
            rules={[
              { required: true, message: "Vui lòng nhập mã của bạn!" },
              {
                min: 8,
                message: "Vui lòng nhập 8 ký tự trở lên",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Thời hạn giảm giá"
            name="date"
            rules={[
              { required: true, message: "Vui lòng chọn thời hạn giảm giá !" },
            ]}
          >
            <RangePicker format={"DD/MM/YYYY"} />
          </Form.Item>
          <Form.Item
            label="Phần trăm giảm giá"
            name="discountPercent"
            rules={[
              { required: true, message: "Vui lòng nhập phần trăm giảm giá !" },
            ]}
          >
            <Radio.Group>
              <Radio value={5}>5%</Radio>
              <Radio value={10}>10%</Radio>
              <Radio value={15}>15%</Radio>
              <Radio value={20}>20%</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Giá trị đơn hàng tối thiểu (VND)"
            name="minimumPurchaseAmount"
            rules={[
              { pattern: /^[0-9]*$/, message: "Vui lòng nhập số tiền !" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giảm giá tối đa (VND)"
            name="maximumDiscountAmount"
            rules={[
              { pattern: /^[0-9]*$/, message: "Vui lòng nhập số tiền !" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 19, span: 16 }}>
            <Button htmlType="submit">Sửa mã giảm giá</Button>
          </Form.Item>
        </Form>
      </DrawerComponent>

      {/* Xóa mã giảm giá */}
      <ModalComponent
        title="Xóa mã giảm giá"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        footer={null}
      >
        <div>Bạn có chắc muốn xóa mã giảm giá này không?</div>
        <div className="flex justify-center gap-x-2 mt-4">
          <Button onClick={handleDeleteCoupon}>Xóa</Button>
        </div>
      </ModalComponent>
    </div>
  );
}
