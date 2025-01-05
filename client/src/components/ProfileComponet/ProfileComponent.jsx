import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { updateUser } from "../../services/UserService";

import * as UserService from "../../services/UserService";
import InputFormComponent from "../InputFormComponent/InputFormComponent";
import * as message from "../../components/Message/Message";
import ChangePasswordComponent from "../ChangePasswordComponent/ChangePasswordComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import { Form } from "antd";

const ProfileComponent = ({ handleCancelProfile }) => {
  const user = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [isModalOpenChangePassword, setIsModalOpenChangePassword] =
    useState(false);
  const access_token = localStorage.getItem("access_token");
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(user.id, rests, access_token);
  });

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        fullName: user?.fullName,
        email: user?.email,
        phone: user?.phone,
        address: user?.address,
      });
    }
  }, [user, form]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    updateUser({ ...res?.data, access_token: token });
  };

  const handleCancelChangePassword = () => {
    setIsModalOpenChangePassword(false);
  };

  const handleUpdate = (values) => {
    mutation.mutate(
      {
        id: user?.id,
        ...values,
        access_token: access_token,
      },
      {
        onSuccess: () => {
          message.success("Cập nhật thành công");
          handleGetDetailsUser(user?.id, user?.access_token);
          handleCancelProfile();
        },
      }
    );
  };

  return (
    <div>
      <div className="mb-5 text-xl text-center font-medium">
        Thông tin người dùng
      </div>

      <div className="p-5 border border-stone-400 rounded-xl ">
        <Form
          form={form}
          onFinish={handleUpdate}
          labelCol={{ span: 8 }}
          labelAlign="left"
        >
          <Form.Item
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Họ tên không được để trống" }]}
          >
            <InputFormComponent />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <InputFormComponent disabled={true} />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Số điện thoại không được để trống" },
              {
                pattern: /^[0-9]+$/,
                message: "Số điện thoại chỉ được chứa số",
              },
            ]}
          >
            <InputFormComponent />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Địa chỉ không được để trống" }]}
          >
            <InputFormComponent />
          </Form.Item>

          <div className="flex justify-end mb-5">
            <div
              className="underline text-blue-500 cursor-pointer"
              onClick={() => {
                setIsModalOpenChangePassword(true);
                handleCancelProfile();
              }}
            >
              Đổi mật khẩu
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-red-500 text-white px-8 py-2 active:bg-red-400 rounded"
              type="submit"
            >
              Cập nhật thông tin
            </button>
          </div>
        </Form>
      </div>

      <ModalComponent
        open={isModalOpenChangePassword}
        onCancel={handleCancelChangePassword}
        footer={null}
      >
        <ChangePasswordComponent
          handleCancelChangePassword={handleCancelChangePassword}
        />
      </ModalComponent>
    </div>
  );
};

export default ProfileComponent;
