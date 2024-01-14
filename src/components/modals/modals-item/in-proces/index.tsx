import { Modal, Spin } from "antd";
import React from "react";
import { useReduxSelector } from "../../../../hooks/useRedux";

const InProcces = () => {
  const { inProccesVisiblity } = useReduxSelector((state) => state.modalSlice);
  return (
    <Modal
      footer={false}
      closable={false}
      open={inProccesVisiblity}
      title="Authorization"
    >
      <div className="flex w-full flex-col items-center">
        <Spin size="large" />
        <h3 className="mt-3 font-bold">Authorization in proccess...</h3>
      </div>
    </Modal>
  );
};

export default InProcces;
