import type { FC } from "react";
import type { HeroMockItemType } from "../../../@types";

const HeroItem: FC<HeroMockItemType> = (props) => {
  return (
    <div className="flex p-8 items-center h-[450px]  max-md:h-[400px]">
      <div className="flex-[2]">
        <p className="text-[#3D3D3D] text-base font-medium">{props.subTitle}</p>
        <h2 className="font-black text-[#3D3D3D] text-8xl uppercase leading-[90px] pt-[7px] pb-[5px] max-2xl:text-6xl max-md:text-[40px] max-sm:text-[25px]">
          {props.title} <span className="text-[#46A358]">Planet</span>
        </h2>
        <p className="w-3/5 text-[#727272] text-[14px] leading-6 mb-5 max-md:w-[100%]  max-sm:text-[12px] max-sm:leading-4">
          {props.description}
        </p>
        <button className="w-[135px] h-[40px] rounded-[6px] bg-[#46A358] text-white text-[16px] font-bold uppercase">
          {props.buttonText}
        </button>
      </div>
      <div className="flex-[1] w-[50%] flex items-center justify-center relative max-md:hidden">
        <img
          className="absolute bottom-5 left-0"
          src={props.small_img_url}
          alt="small_img"
        />
        <img src={props.big_img_url} alt="big_img" />
      </div>
    </div>
  );
};

export default HeroItem;
