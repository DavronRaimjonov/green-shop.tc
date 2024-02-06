import { useState, type FC } from "react";
import {
  LoginOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  BellOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import {
  setAuthorizationModalVisibility,
  setSiteModalVisiblity,
} from "../../redux/modal-slice";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import type { AuthUser } from "../../@types";
import { Link, useNavigate } from "react-router-dom";
import { Badge, Popover } from "antd";
import Notification from "./notification";
const Navbar: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const auth: AuthUser = useAuthUser()() ?? {};
  const isAuthed = useIsAuthenticated()();
  const dispatch = useReduxDispatch();
  const { data } = useReduxSelector((state) => state.productSlice);
  const navigate = useNavigate();
  const iconStyle: string = "cursor-pointer text-[23px] max-sm:text-[20px]";
  const btn_visiblity = () => {
    if (isAuthed) {
      navigate("/profile");
    } else {
      dispatch(
        setAuthorizationModalVisibility({
          loading: false,
          open: true,
        }),
      );
    }
  };
  return (
    <header className="w-[80%] m-auto gap-3 flex justify-between items-center h-[90px] border-b border-[rgba(70, 163, 88, 0.50)] sticky top-0 z-50 bg-white max-sm:w-[95%]">
      <Link to={"/"}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Ficons%2Flogo.svg?alt=media&token=fc9659d6-f435-43b9-a624-8b0d3a574baa"
          alt="logo logo png logo davro fraimjnov asdcjodov,o.dvodv;dlmf;dm javlon raimjonovdflkdnlkldnvkldvlknvldnvlk"
        />
      </Link>
      <nav className="flex gap-4 max-md:hidden">
        <Link className="cursor-pointer" to={"/"}>
          Home
        </Link>
        <Link to={"/blog"} className="cursor-pointer">
          Blog
        </Link>
      </nav>
      <nav className="flex items-center gap-[30px] max-md:gap-[20px] max-sm:gap-[10px]">
        <SearchOutlined className={`${iconStyle}`} />
        <Popover
          onOpenChange={(visable) => setOpen(visable)}
          open={open}
          title={"Notifications"}
          content={<Notification />}
          trigger={"click"}
        >
          <Badge dot={isAuthed}>
            <BellOutlined className={`${iconStyle}`} />
          </Badge>
        </Popover>
        <Link to={"/product-cart"}>
          <Badge count={data?.length}>
            <ShoppingCartOutlined className={`${iconStyle}`} />
          </Badge>
        </Link>
        <button
          onClick={() => btn_visiblity()}
          className="text-white w-[100px] h-[35px]  bg-[#46A358] flex items-center gap-1 justify-center rounded-md max-md:hidden"
        >
          {isAuthed ? (
            auth.name
          ) : (
            <>
              <LoginOutlined /> Login
            </>
          )}
        </button>
        <MenuOutlined
          onClick={() => dispatch(setSiteModalVisiblity())}
          className={`${iconStyle} hidden max-md:block`}
        />
      </nav>
    </header>
  );
};

export default Navbar;
