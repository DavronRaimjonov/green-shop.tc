import type { FC } from "react";
import useLoader from "../../../generic/loader";
import { useQueryHendler } from "../../../hooks/useQuery";
import PriceRange from "./price/price";
import Discount from "./discount/discount";
import type { CategoryType } from "../../../@types";
import searchParam from "../../../generic/searchParam";

const Categories: FC = () => {
  const { data, isError, isLoading } = useQueryHendler({
    url: "/flower/category",
    pathname: "category",
  });
  const { paramValue, setParam } = searchParam();

  const getCategoryRoutePath: string = paramValue("category") || "house-plants";
  const sort: string = paramValue("sort") || "default-sorting";
  const type: string = paramValue("type") || "all-plants";
  const range_min = String(paramValue("range_min") || 0);
  const range_max = String(paramValue("range_max") || 1000);
  const { category_loader } = useLoader();
  const category_style =
    "flex justify-between font-medium cursor-pointer mb-[15px] text-[#3D3D3D] text-base hover:text-[#46A358] transition-colors";
  const active_category_style = "text-[#46A358] font-bold";
  const getCategoryParams = (searchParam: string) => {
    setParam({
      category: searchParam,
      sort,
      type,
      range_min,
      range_max,
    });
  };

  return (
    <section className="sticky top-[80px]">
      <div className="bg-[rgb(251,251,251)] mt-[46px] p-[10px]">
        <h1 className="text-[#3D3D3D] font-bold text-[18px]">Categories</h1>
        <div className="p-[10px]">
          {isError || isLoading
            ? category_loader()
            : data?.map((value: CategoryType) => (
                <div
                  onClick={() => getCategoryParams(value.route_path)}
                  key={value._id}
                  className={`${category_style} ${
                    value.route_path === getCategoryRoutePath &&
                    active_category_style
                  }`}
                >
                  <div>{value.title}</div>
                  <div>({value.count})</div>
                </div>
              ))}
        </div>
        <PriceRange />
      </div>
      <Discount />
    </section>
  );
};

export default Categories;
