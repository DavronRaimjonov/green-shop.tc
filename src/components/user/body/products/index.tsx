import type { FC } from "react";
import { useQueryHendler } from "../../../../hooks/useQuery";
import { useParams } from "react-router-dom";
import type { ProductType } from "../../../../@types";
import Card from "../../../dashboard/product/card";
import useLoader from "../../../../generic/loader";
import { Empty } from "antd";

const Products: FC = () => {
  const { user_id } = useParams();

  const { data, isLoading, isError } = useQueryHendler({
    url: "/user/products",
    pathname: `/user-${user_id}/products`,
    params: {
      access_token: user_id,
    },
  });
  const { flower_loader } = useLoader();
  return (
    <>
      {!data?.length ? (
        <Empty
          className="mt-[10px]"
          description={
            <div>
              <h3 className="text-[18px] text-bold">No wishproducts yet...</h3>
            </div>
          }
        />
      ) : (
        <div className="grid grid-cols-4 gap-8 mt-[38px] max-[1131px]:grid-cols-3 max-[1027px]:grid-cols-2 max-md:grid-cols-1">
          {isLoading || isError
            ? flower_loader()
            : data?.map((product: ProductType) => (
                <Card key={product._id} {...product} />
              ))}
        </div>
      )}
    </>
  );
};

export default Products;
