import type { FC } from "react";
import type { ProductType } from "../../../../../@types";
import { useNavigate } from "react-router-dom";
import {
  HeartFilled,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const Card: FC<ProductType> = (props) => {
  const navigete = useNavigate();
  const navigetSHop = (category: string, _id: string) => {
    navigete(`/shop/${category}/${_id}`);
  };
  const icon_style =
    "bg-[#FFFFFF] w-[35px] h-[35px] flex rounded-lg justify-center items-center  cursor-pointer text-[20px]";

  return (
    <>
      <div className="relative">
        <div className="group h-[300px] bg-[#f5f5f5] flex justify-center items-center relative">
          <img src={props.main_image} alt="flower" className="w-4/5 h-[100%]" />
          <div className="hidden gap-3 justify-center inset-x-auto absolute bottom-[20px] items-center group-hover:flex ">
            <div className={`${icon_style} `}>
              <ShoppingCartOutlined />
            </div>
            <div className={`${icon_style}`}>
              <HeartFilled className="text-red-500" />
            </div>
            <div
              className={`${icon_style}`}
              onClick={() => navigetSHop(props?.category, props?._id)}
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
