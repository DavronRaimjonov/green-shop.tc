import type { FC } from "react";
import { Modal } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { setSiteModalVisiblity } from "../../../../redux/modal-slice";
const SiteMap: FC = () => {
  const { modalSliceVisibility } = useReduxSelector(
    (state) => state.modalSlice,
  );
  const dispatch = useReduxDispatch();
  const customStyleLink: string =
    "text-[1rem] font-normal cursor-pointer leading-6";
  const hoverLinkStyle: string =
    "hover:border-l-[5px] hover:border-[#46A358] hover:pl-[5px] transition-colors duration-500 hover:text-[#46A358]";

  const activeLinksStyle: string =
    "border-l-[5px] border-[#46A358] pl-[5px] text-[#46A358]";
  return (
    <Modal
      open={modalSliceVisibility}
      title={"Site map"}
      footer={false}
      onCancel={() => dispatch(setSiteModalVisiblity())}
    >
      <div className="flex gap-3 flex-col mt-5">
        <h3
          className={`${customStyleLink} ${hoverLinkStyle} ${activeLinksStyle}`}
        >
          Home
        </h3>
        <h3 className={`${customStyleLink} ${hoverLinkStyle}`}>Blog</h3>
        <button className="w-[80%] m-auto flex items-center justify-center gap-3 bg-[#46A358] h-[49px] text-white rounded-[5px] text-[16px]">
          <LoginOutlined /> Login
        </button>
      </div>
    </Modal>
  );
};

export default SiteMap;
