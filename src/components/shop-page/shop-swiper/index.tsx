import { Image, Skeleton } from "antd";
import type { FC } from "react";
import { useState } from "react";
import type { ShopProductType } from "../../../@types";
import useLoader from "../../../generic/loader";

const ShopSwiper: FC<ShopProductType> = ({ data, isError, isLoading }) => {
  const [main_image, setMainImage] = useState<{
    selected: boolean;
    src: string;
  }>({ selected: false, src: "" });

  const { swiper_img_loader } = useLoader();
  return (
    <div className="flex items-center gap-4 max-lg:flex-col">
      <div className="flex flex-col justify-between max-lg:order-2 max-lg:flex-row max-lg:gap-3 h-full max-lg:overflow-x-auto">
        {isError || isLoading
          ? swiper_img_loader()
          : data?.detailed_images?.map((item, idx) => (
              <div
                onClick={() => setMainImage({ selected: true, src: item })}
                key={idx}
                className="w-[100px] h-[100px] bg-[#e5e5e5] cursor-pointer border-2 hover:border-[#46A358] transition-colors"
              >
                <img className="w-full h-full" src={item} />
              </div>
            ))}
      </div>
      <div className="cursor-pointer flex justify-center items-center w-full order-1">
        {isError || isLoading ? (
          <Skeleton.Image active={true} />
        ) : (
          <Image
            src={main_image.selected ? main_image.src : data?.main_image}
            alt="main_image"
          />
        )}
      </div>
    </div>
  );
};

export default ShopSwiper;
