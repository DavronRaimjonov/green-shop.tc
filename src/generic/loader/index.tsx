import { Skeleton } from "antd";

const useLoader = () => {
  const category_loader = () => {
    return (
      <div className="w-full flex flex-col gap-4 mt-[12px]">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Skeleton.Input key={idx} active={true} block />
        ))}
      </div>
    );
  };
  const flower_loader = () => {
    return Array.from({ length: 10 }).map((_, idx) => (
      <div key={idx}>
        <Skeleton.Image active={true} className="!w-full !h-[250px]" />
        <Skeleton.Input active={true} className="!w-[150px] !block my-1" />
        <Skeleton.Input active={true} className="!w-[150px]" />
      </div>
    ));
  };
  const swiper_img_loader = () => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <div key={idx}>
        <Skeleton.Image active={true} className="!w-[100px] !h-[100px]" />
      </div>
    ));
  };
  const shop_description_loader = () => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <div key={idx} className="mt-[10px]">
        <Skeleton.Input active={true} className="!w-[full] !h-[15px]" block />
        <br />
        <br />
      </div>
    ));
  };
  return {
    category_loader,
    flower_loader,
    swiper_img_loader,
    shop_description_loader,
  };
};

export default useLoader;
