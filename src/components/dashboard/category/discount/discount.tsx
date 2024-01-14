import type { FC } from "react";
import { useQueryHendler } from "../../../../hooks/useQuery";

// interface DiscountType {
//   id: number;
//   title: string;
//   discoount_up_to: string;
//   poster_image_url: string;
// }
const Discount: FC = () => {
  const { data } = useQueryHendler({
    url: "/features/discount",
    pathname: "discount",
  });

  return (
    <div className="w-full bg-[#eef7f1] text-center px-[10px] py-[20px]">
      <h2 className="text-[#46A358] text-[30px] font-normal leading-[40px]">
        {data?.title}
      </h2>
      <h3 className="text-[#3D3D3D] font-bold text-[20px] pt-[17px]">
        UP TO {data?.discoount_up_to}% OFF
      </h3>
      <img src={data?.poster_image_url} alt="" />
    </div>
  );
};

export default Discount;
// bg-[linear-gradient(180deg,_#fff,_#00bfd8_42%,_#0083f5)]
// background: linear-gradient(180deg, rgba(70, 163, 88, 0.10) 0%, rgba(70, 163, 88, 0.03) 100%);
