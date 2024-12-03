import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import { updateUser } from "../../services/UserService";

import * as UserService from "../../services/UserService";
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
} from "./style";
import InputFormComponent from "../InputFormComponent/InputFormComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as message from "../../components/Message/Message";
import ChangePasswordComponent from "../ChangePasswordComponent/ChangePasswordComponent";
import ModalComponent from "../ModalComponent/ModalComponent";

const ProfileComponent = ({ handleCancelProfile }) => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isModalOpenChangePassword, setIsModalOpenChangePassword] =
    useState(false);
  const access_token = localStorage.getItem("access_token");
  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const dispatch = useDispatch();
  const { isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setFullName(user?.fullName);
    setPhone(user?.phone);
    setAddress(user?.address);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Cập nhật thành công");
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    updateUser({ ...res?.data, access_token: token });
    console.log(res);
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setFullName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };
  const handleCancelChangePassword = () => {
    setIsModalOpenChangePassword(false);
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      fullName,
      phone,
      address,
      access_token: access_token,
    });
  };
  return (
    <div>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <WrapperContentProfile>
        <WrapperInput>
          <WrapperLabel htmlFor="name">Họ tên</WrapperLabel>
          <InputFormComponent
            style={{ width: "250px" }}
            value={fullName}
            onChange={handleOnchangeName}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textbutton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="email">Email</WrapperLabel>
          <InputFormComponent
          disabled={true}
            style={{ width: "250px" }}
            id="email"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textbutton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
          <InputFormComponent
            style={{ width: "250px" }}
            id="email"
            value={phone}
            onChange={handleOnchangePhone}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textbutton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput>
          <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
          <InputFormComponent
            style={{ width: "250px" }}
            id="address"
            value={address}
            onChange={handleOnchangeAddress}
          />
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textbutton={"Cập nhật"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
        <WrapperInput style={{ display: "flex", justifyContent: "center" }}>
          <ButtonComponent
            onClick={() => {
              setIsModalOpenChangePassword(true);
              handleCancelProfile();
            }}
            size={40}
            styleButton={{
              height: "30px",
              width: "fit-content",
              borderRadius: "4px",
              padding: "2px 6px 6px",
            }}
            textbutton={"Đổi mật khẩu"}
            styleTextButton={{
              color: "rgb(26, 148, 255)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          ></ButtonComponent>
        </WrapperInput>
      </WrapperContentProfile>
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
