/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, Image, Input } from "antd";
import { Button } from "antd";

import * as UserService from "../../services/UserService";
import * as message from "../Message/Message";
import imageLogoLogin from "../../assets/images/logo-login.png";
import { useMutationHooks } from "../../hooks/useMutationHook";

const ChangePasswordComponent = ({ handleCancelChangePassword }) => {
  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
  const hasNumber = /\d/;
  const hasCapitalLetter = /[A-Z]/;
  const hasSmallLetter = /[a-z]/;
  const hasSpecialLetter = /[!@#$%^&*(),.?":{}|<>]/;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const mutation = useMutationHooks((data) => UserService.changePassword(data));
  console.log(mutation, "a");
  const { data, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        message.success("Đổi mật khẩu thành công");
        handleCancelChangePassword && handleCancelChangePassword();
      }
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleOnchangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };
  const handleOnchangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleOnchangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePassword = () => {
    try {
      if (newPassword !== confirmPassword) {
        message.error("Xác nhận mật khẩu không đúng");
      } else {
        mutation.mutate({
          currentPassword,
          newPassword,
          confirmPassword,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex gap-x-10 m-2">
        <div>
          <p className="text-3xl font-bold text-orange-600 mb-5">Xin chào</p>
          <p>Xin mời bạn đổi mật khẩu</p>
          <div className="mt-5">
            <Form>
              <Form.Item
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu cũ của bạn!",
                  },
                  {
                    pattern: hasCapitalLetter,
                    message: "Ít nhất 1 ký tự chữ hoa.",
                  },
                  {
                    pattern: hasSmallLetter,
                    message: "Ít nhất 1 ký tự chữ thường",
                  },
                  {
                    pattern: hasSpecialLetter,
                    message: "Ít nhất 1 kí tự đặc biệt.",
                  },
                  {
                    pattern: hasNumber,
                    message: "Ít nhất 1 ký tự số.",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Mật khẩu"
                  value={currentPassword}
                  onChange={handleOnchangeCurrentPassword}
                />
              </Form.Item>
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu mới của bạn!",
                  },
                  {
                    pattern: hasCapitalLetter,
                    message: "Ít nhất 1 ký tự chữ hoa.",
                  },
                  {
                    pattern: hasSmallLetter,
                    message: "Ít nhất 1 ký tự chữ thường",
                  },
                  {
                    pattern: hasSpecialLetter,
                    message: "Ít nhất 1 kí tự đặc biệt.",
                  },
                  {
                    pattern: hasNumber,
                    message: "Ít nhất 1 ký tự số.",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Mật khẩu"
                  // value={newPassword}
                  onChange={handleOnchangeNewPassword}
                />
              </Form.Item>
              <Form.Item
                name="comfirm password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu mới!",
                  },
                  {
                    pattern: hasCapitalLetter,
                    message: "Ít nhất 1 ký tự chữ hoa.",
                  },
                  {
                    pattern: hasSmallLetter,
                    message: "Ít nhất 1 ký tự chữ thường",
                  },
                  {
                    pattern: hasSpecialLetter,
                    message: "Ít nhất 1 kí tự đặc biệt.",
                  },
                  {
                    pattern: hasNumber,
                    message: "Ít nhất 1 ký tự số.",
                  },
                ]}
              >
                <Input.Password
                  type="password"
                  placeholder="Xác nhận mật khẩu"
                  // value={confirmPassword}
                  onChange={handleOnchangeConfirmPassword}
                />
              </Form.Item>

              <Form.Item className="text-center">
                <Button
                  htmlType="submit"
                  className="text-black"
                  onClick={handleChangePassword}
                >
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div>
          <Image
            src={imageLogoLogin}
            preview={false}
            alt="image-logo"
            height="203px"
            width="203px"
          />
          <p className="text-xl font-bold mt-10 text-center">
            Mua sắm tại Dwatch
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordComponent;
