import { DeleteOutlined } from "@ant-design/icons";
import type { FC } from "react";
import { type ProductType } from "../../../@types";
import { useReduxDispatch } from "../../../hooks/useRedux";
import {
  decrementCount,
  deleteData,
  incrementCount,
} from "../../../redux/product-slice";
import { useNotificationAPi } from "../../../generic/notition";

const ProductCard: FC<ProductType> = (props) => {
  const btn_style = "w-[25px] h-[25px] bg-[#46A358] rounded-full text-white";
  const dispatch = useReduxDispatch();
  const isDisabled = props.count === 1 ? true : false;
  const notify = useNotificationAPi();
  const removeData = () => {
    dispatch(deleteData(props._id));
    notify("remove");
  };
  return (
    <div className="flex items-center bg-[#FBFBFB] p-1 mt-[11px] max-sm:flex-col max-sm:items-start">
      <div className="flex items-center gap-1 w-[40%]">
        <img className="w-[70px] h-[70px]" src={props.main_image} alt="" />
        <div>
          <h2 className="text-[16px] font-medium">{props.title}</h2>
          <h2 className="text-[14px] font-normal pt-[10px] max-sm:text-[12px] ">
            <span className="text-[#A5A5A5]">SKU:</span>
            {props._id}
          </h2>
        </div>
      </div>
      <h2 className="w-[20%] text-[#727272] text-[16px] font-medium ">
        ${props.price}
      </h2>
      <div className="w-[32%] flex items-center justify-between max-sm:w-full">
        <div className="flex items-center gap-2 w-[80%]">
          <button
            disabled={isDisabled}
            onClick={() => dispatch(decrementCount(props._id))}
            className={`${btn_style}`}
          >
            -
          </button>
          <h2 className="text-[17px]">{props.count}</h2>
          <button
            onClick={() => dispatch(incrementCount(props._id))}
            className={`${btn_style}`}
          >
            +
          </button>
        </div>
        <div className="flex w-[50%] justify-between gap-3">
          <h2 className=" text-[#727272] text-[16px] font-medium pl-3">
            ${Number(Number(props.count) * props.price).toFixed(2)}
          </h2>
          <DeleteOutlined onClick={removeData} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
