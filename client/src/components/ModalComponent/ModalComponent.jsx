import { Modal } from "antd";
import React from "react";

const ModalComponent = ({
  title = "",
  footer,
  isOpen = false,
  children,
  ...rests
}) => {
  return (
    <Modal
      title={title}
      destroyOnClose={true}
      footer={footer}
      open={isOpen}
      {...rests}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
