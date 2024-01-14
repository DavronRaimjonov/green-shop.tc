import type { FC } from "react";
import { useParams } from "react-router-dom";
import { useQueryHendler } from "../../hooks/useQuery";
import type { ShopProductType } from "../../@types";
import ShopSwiper from "../../components/shop-page/shop-swiper";
import Shopinfo from "../../components/shop-page/shop-info/shop-info";
import ShopDescription from "../../components/shop-page/shop-description";
import { BreadcrumbItem } from "../../generic/bredcrumb";

const Shop: FC = () => {
  const { category, flower_id } = useParams();
  const { data, isError, isLoading }: ShopProductType = useQueryHendler({
    url: `/flower/category/${category}/${flower_id}`,
    pathname: "flower",
  });
  return (
    <section>
      <BreadcrumbItem pathTitle="Shop" />
      <div className="grid grid-cols-2 gap-2 mt-[30px] mb-[40px] max-lg:grid-cols-1">
        <ShopSwiper data={data} isError={isError} isLoading={isLoading} />
        <Shopinfo data={data} isError={isError} isLoading={isLoading} />
      </div>
      <ShopDescription data={data} isError={isError} isLoading={isLoading} />
    </section>
  );
};

export default Shop;
