import { LogoutOutlined } from "@ant-design/icons";
import { path_profile } from "../../../utils";
import { useSignOut } from "react-auth-kit";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "antd";

const ProfileDashboard = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { confirm } = Modal;
  const logOut = () => {
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
  const dashboard_title_active_style: string =
    "bg-white border-l-[5px] border-[#46A358] text-[#46A358] text-bold";
  const dashboard_title_style: string =
    "transition flex items-center gap-3 cursor-pointer pl-[5px] w-full h-[40px] hover:bg-white hover:border-l-[5px] hover:border-[#46A358] hover:text-[#46A358] hover:text-bold";
  return (
    <div className="bg-[#FBFBFB] h-fit text-xl p-[15px] w-[310px] max-md:hidden">
      <h1 className="font-bold">My Account</h1>
      <div className="flex flex-col gap-3 mt-[10px] border-b border-[#46A35880] pb-[35px]">
        {path_profile.map(({ Icon, id, title, path }) => (
          <div
            onClick={() => navigate(`/profile/${path}`)}
            key={id}
            className={`${dashboard_title_style} ${
              path === String(pathname.slice(9)) && dashboard_title_active_style
            }`}
          >
            <Icon />
            <h3 className="font-normal text-base">{title}</h3>
          </div>
        ))}
      </div>
      <button
        onClick={logOut}
        className="flex items-center gap-3 cursor-pointer pl-[5px] w-full h-[40px] mt-[20px] text-base text-red-600"
      >
        <LogoutOutlined />
        <h3 className="font-medium">Log out</h3>
      </button>
    </div>
  );
};

export default ProfileDashboard;
