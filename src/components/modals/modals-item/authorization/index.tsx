import { Modal } from "antd";
import type { FC } from "react";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { setAuthorizationModalVisibility } from "../../../../redux/modal-slice";
import Login from "./login";
import { useState } from "react";
import Register from "./register";

const Authorization: FC = () => {
  const { authorizationModalVisibility } = useReduxSelector(
    (state) => state.modalSlice,
  );
  const dispatch = useReduxDispatch();
  const click_item_style =
    "text-[#3D3D3D] text-[19px] cursor-pointer font-medium";
  const active_item_style = "text-[#46A358]";
  const [active, setActive] = useState("login");

  return (
    <Modal
      open={authorizationModalVisibility.open}
      footer={false}
      onCancel={() =>
        dispatch(
          setAuthorizationModalVisibility({ open: false, loading: false }),
        )
      }
    >
      <div className="mt-10">
        <div className="flex items-center justify-center gap-4">
          <div
            onClick={() => setActive("login")}
            className={`${click_item_style} ${
              active === "login" ? active_item_style : ""
            }`}
          >
            Login
          </div>
          <div className="bg-[#3D3D3D] w-[1px] h-5"></div>
          <div
            onClick={() => setActive("register")}
            className={`${click_item_style} ${
              active === "register" ? active_item_style : ""
            }`}
          >
            Register
          </div>
        </div>
        {active === "login" ? <Login /> : <Register />}
      </div>
    </Modal>
  );
};

export default Authorization;
