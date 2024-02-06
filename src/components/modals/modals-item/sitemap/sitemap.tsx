import type { FC } from "react";
import { Modal } from "antd";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import {
  setAuthorizationModalVisibility,
  setSiteModalVisiblity,
} from "../../../../redux/modal-slice";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";
import type { AuthUser } from "../../../../@types";
import { path_profile } from "../../../../utils";

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
  const navigate = useNavigate();
  const isAuthed = useIsAuthenticated()();
  const dashboard_title_active_style: string =
    "bg-white border-l-[5px] border-[#46A358] text-[#46A358] text-bold";
  const dashboard_title_style: string =
    "transition flex items-center gap-3 cursor-pointer pl-[5px] w-full h-[40px] hover:bg-white hover:border-l-[5px] hover:border-[#46A358] hover:text-[#46A358] hover:text-bold";
  const auth = useAuthUser()() as AuthUser;
  const { pathname } = useLocation();
  const close_and_navigate = (path: string) => {
    navigate(path);
    dispatch(setSiteModalVisiblity());
  };
  const signOut = useSignOut();
  const open_authorisation = () => {
    dispatch(
      setAuthorizationModalVisibility({
        open: true,
        loading: false,
      }),
    );
    dispatch(setSiteModalVisiblity());
  };
  const { confirm } = Modal;
  const logOut = () => {
    navigate("/");
    dispatch(setSiteModalVisiblity());
    return confirm({
      title: "Do you want to logout?",
      content: "Please make sure, bacause this action cannot be undone!",
      okButtonProps: {
        danger: true,
      },
      okText: "I'm sure",
      onOk: () => {
        signOut();
        navigate("/");
      },
    });
  };
  return (
    <Modal
      open={modalSliceVisibility}
      title={"Site map"}
      footer={false}
      onCancel={() => dispatch(setSiteModalVisiblity())}
    >
      <div className="flex gap-3 flex-col mt-5">
        <h3
          onClick={() => close_and_navigate("/")}
          className={`${customStyleLink} ${hoverLinkStyle} ${
            pathname === "/" && activeLinksStyle
          }`}
        >
          Home
        </h3>
        <h3
          onClick={() => close_and_navigate("/blog")}
          className={`${customStyleLink} ${hoverLinkStyle} ${hoverLinkStyle} ${
            pathname === "/blog" && activeLinksStyle
          }`}
        >
          Blog
        </h3>
        {isAuthed && (
          <div>
            <h1 className="text-[#46A358] font-bold text-xl">Profile</h1>
            <div className="flex flex-col gap-3 mt-[10px] border-b border-[#46A35880] pb-[35px]">
              {path_profile.map(({ Icon, id, title, path }) => (
                <div
                  onClick={() => close_and_navigate(`/profile/${path}`)}
                  key={id}
                  className={`${dashboard_title_style} ${
                    path === String(pathname.slice(9)) &&
                    dashboard_title_active_style
                  }`}
                >
                  <Icon />
                  <h3 className="font-normal text-base">{title}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => {
            isAuthed ? close_and_navigate("/profile") : open_authorisation();
          }}
          className="w-[80%] m-auto flex items-center justify-center gap-3 bg-[#46A358] h-[49px] text-white rounded-[5px] text-[16px]"
        >
          {isAuthed ? (
            auth.name
          ) : (
            <>
              <LoginOutlined /> Login
            </>
          )}
        </button>
        {isAuthed && (
          <button
            onClick={logOut}
            className="flex items-center justify-center gap-3 cursor-pointer pl-[5px] w-full h-[40px] mt-[20px] text-base text-red-600"
          >
            <LogoutOutlined />
            <h3 className="font-medium">Log out</h3>
          </button>
        )}
      </div>
    </Modal>
  );
};

export default SiteMap;
