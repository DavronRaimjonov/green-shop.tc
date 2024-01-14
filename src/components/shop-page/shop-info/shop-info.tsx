import type { FC } from "react";
import type { ShopProductType } from "../../../@types";
import { Rate, Skeleton } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import AvatarItem from "./avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getData } from "../../../redux/product-slice";
import { useNotificationAPi } from "../../../generic/notition";

const Shopinfo: FC<ShopProductType> = ({ data, isError, isLoading }) => {
  const props_data = data;
  const loader = isError || isLoading;
  const notify = useNotificationAPi();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buyNow = () => {
    dispatch(getData(data));
    notify("add");
    navigate("/product-cart");
  };
  const addCard = () => {
    dispatch(getData(data));
    notify("add");
  };
  const size_style =
    "w-[28px] h-[28px] border border-[#EAEAEA] rounded-full hover:border-[#46A358] hover:text-[#46A358] transition-colors font-mediu";

  return (
    <>
      <div>
        <div className="border-b-2 border-[#46A35880] mt-[12px] flex items-end justify-between pb-[14px] max-sm:flex-col max-sm:items-start">
          <div>
            <div className="flex items-center gap-3">
              {loader ? (
                <Skeleton.Avatar active={true} />
              ) : (
                <AvatarItem by_id={props_data?.created_by} />
              )}
              <div>
                {loader ? (
                  <>
                    <Skeleton.Input active={true} block />
                    <Skeleton.Input active={true} />
                  </>
                ) : (
                  <>
                    <h2 className="text-[#3D3D3D] text-[28px] font-bold">
                      {props_data?.title}
                    </h2>
                    <h2 className="font-bold text-[#46A358] text-[22px]">
                      ${props_data?.price}
                    </h2>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 max-sm:flex-col">
            <Rate />
            <p className="text-[#3D3D3D] text-[15px]">
              {props_data?.rate} Customer Review
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-[#3D3D3D] text-[22px] py-5 font-[500]">
            Short Description:
          </h2>
          <p className="font-light">{props_data?.short_description}</p>
          <h2 className="text-[#3D3D3D] text-[22px]  pt-3 pb-2 font-[500]">
            Size:
          </h2>
          <div className="flex gap-2">
            <button className={`${size_style}`}>S</button>
            <button className={`${size_style}`}>M</button>
            <button className={`${size_style}`}>L</button>
            <button className={`${size_style}`}>XL</button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <button className="w-[35px] h-[35px] bg-[#46A358] rounded-full text-white">
            -
          </button>
          <div>0</div>
          <button className="w-[35px] h-[35px] bg-[#46A358] rounded-full text-white">
            +
          </button>
        </div>
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={buyNow}
            className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-[130px] h-[40px]"
          >
            BUY NOW
          </button>
          <button
            onClick={addCard}
            className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-[#46A358] w-[130px] h-[40px] border border-[#46A358] bg-transparent"
          >
            ADD TO CARD
          </button>
          <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base w-[40px] h-[40px] bg-transparent border border-[#46A358] text-[20px] ">
            <HeartOutlined />
          </button>
        </div>
        <div className="text-[#727272;] text-[15px] font-normal my-3">
          <span className="text-[#A5A5A5] pr-2">SKU:</span>
          {loader ? <Skeleton.Input active={true} /> : props_data?._id}
        </div>
        <div className="text-[#727272;] text-[15px] font-normal my-3">
          <span className="text-[#A5A5A5] pr-2">Categories:</span>
          {loader ? (
            <Skeleton.Input active={true} />
          ) : (
            props_data?.category.toUpperCase()
          )}
        </div>
        <div className="text-[#727272;] text-[15px] font-normal my-3">
          <span className="text-[#A5A5A5] pr-2">Tags:</span>
          {loader ? <Skeleton.Input active={true} /> : "Home, Garden, Plants "}
        </div>
        <div className="mt-[40px]">
          <div>
            <h3>Product Description</h3>
            <h3>
              Reviews{" "}
              {loader ? <Skeleton.Input active={true} /> : props_data?.rate}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shopinfo;
