import { Empty } from "antd";
import type { ProductType } from "../../../../@types";
import useLoader from "../../../../generic/loader";
import { useQueryHendler } from "../../../../hooks/useQuery";
import Card from "./Card";

const Wishlist = () => {
  const { data, isLoading, isError } = useQueryHendler({
    url: "/user/wishlist",
    pathname: "wishlist-item",
  });
  const { flower_loader } = useLoader();
  return isLoading || isError ? (
    <div className="mt-[30px] w-full grid grid-cols-3 gap-4 max-sm:grid-cols-2 ">
      {flower_loader()}
    </div>
  ) : !data?.length ? (
    <div className="flex justify-center w-full">
      <Empty
        className="mt-[10px] "
        description={
          <div>
            <h3 className="text-[18px] text-bold">No wishproducts yet...</h3>
          </div>
        }
      />
    </div>
  ) : (
    <div className="mt-[30px] w-full grid grid-cols-3 gap-4 max-sm:grid-cols-2 max-[450px]:grid-cols-1 ">
      {data.map((value: ProductType) => (
        <Card {...value} key={value._id} />
      ))}
    </div>
  );
};

export default Wishlist;
