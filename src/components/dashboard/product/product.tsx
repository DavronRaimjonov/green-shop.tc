import type { FC } from "react";
import FilterProduct from "./filter-product";
import { useQueryHendler } from "../../../hooks/useQuery";
import Card from "./card";
import type { ProductType } from "../../../@types";
import useLoader from "../../../generic/loader";
import searchParam from "../../../generic/searchParam";
interface FlowerCategoryType {
  data?: ProductType[];
  isLoading: boolean;
  isError: boolean;
}
const Product: FC = () => {
  const { paramValue } = searchParam();
  const getCategoryRoutePath: string = paramValue("category") || "house-plants";
  const range_min: number | string = Number(paramValue("range_min")) || 0;
  const range_max: number | string = Number(paramValue("range_max")) || "1000";
  const sort: string = paramValue("sort") || "default-sorting";
  const type: string = paramValue("type") || "all-plants";
  const { flower_loader } = useLoader();
  const { data, isError, isLoading }: FlowerCategoryType = useQueryHendler({
    pathname: `${getCategoryRoutePath}?range_min=${range_min}&range_max=${range_max}&sort=${sort}&type=${type}`,
    url: `/flower/category/${getCategoryRoutePath}`,
    params: {
      range_min,
      range_max,
      sort,
    },
  });
  return (
    <section className="mt-[46px]">
      <FilterProduct />
      <div className="grid grid-cols-3 gap-8 mt-[38px] max-[1131px]:grid-cols-2 max-[1027px]:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {isLoading || isError
          ? flower_loader()
          : data?.map((product: ProductType) => (
              <Card key={product._id} {...product} />
            ))}
      </div>
    </section>
  );
};

export default Product;
