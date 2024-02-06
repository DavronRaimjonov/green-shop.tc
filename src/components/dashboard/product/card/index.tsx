import type { FC } from "react";
import type { AuthUser, ProductType } from "../../../../@types";
import { useNavigate } from "react-router-dom";
import {
  HeartFilled,
  // HeartFilled,
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useAuthUser } from "react-auth-kit";
import useHandler from "../../../../generic/hendler";
import { useReduxDispatch } from "../../../../hooks/useRedux";
import { getData } from "../../../../redux/product-slice";
import { useNotificationAPi } from "../../../../generic/notition";

const Card: FC<ProductType> = (props) => {
  const notify = useNotificationAPi();
  const navigete = useNavigate();
  const dispatch = useReduxDispatch();
  const navigetSHop = (category: string, _id: string) => {
    navigete(`/shop/${category}/${_id}`);
  };
  const authedUsser = useAuthUser()() as AuthUser;
  const { likeHandler } = useHandler();
  const flowerInfo = authedUsser?.wishlist?.filter(
    (value) => value.flower_id === props._id,
  )?.[0];
  const isLiked: boolean = Boolean(flowerInfo);
  const icon_style =
    "bg-[#FFFFFF] w-[35px] h-[35px] flex rounded-lg justify-center items-center  cursor-pointer text-[20px]";
  const addToCard = () => {
    dispatch(getData(props));
    notify("add");
  };
  return (
    <>
      <div className="relative">
        <div className="group h-[300px] bg-[#f5f5f5] flex justify-center items-center relative">
          <img
            src={props.main_image}
            alt="flower"
            className="w-4/5 max-sm:h-[100%]"
          />
          <div className="hidden gap-3 justify-center inset-x-auto absolute bottom-[20px] items-center group-hover:flex max-md:flex">
            <div className={`${icon_style} `}>
              <ShoppingCartOutlined onClick={addToCard} />
            </div>
            <div
              className={`${icon_style}`}
              onClick={() =>
                likeHandler({
                  isLiked,
                  data: flowerInfo ?? {
                    flower_id: props._id,
                    route_path: props.category,
                  },
                })
              }
            >
              {isLiked ? (
                <HeartFilled className="text-red-500" />
              ) : (
                <HeartOutlined />
              )}
            </div>
            <div
              className={`${icon_style}`}
              onClick={() => navigetSHop(props.category, props._id)}
            >
              <SearchOutlined />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-[3D3D3D] text-[16px] font-[500] pt-[10px] pb-[2px]">
            {props.title}
          </h3>
          <div className="flex items-center gap-3">
            <h1 className="text-[#46A358] text-[18px] font-bold">
              {props.price}$
            </h1>
            {props.discount ? (
              <h1 className="font-[300] text-[#A5A5A5] line-through">
                {props.discount_price}
              </h1>
            ) : (
              ""
            )}
          </div>
        </div>
        {props.discount ? (
          <div className="bg-[#46A358] text-white absolute top-4 left-0 px-[5px] py-[3px]">
            13% OFF
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Card;
