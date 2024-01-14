import type { FC } from "react";
import ProductCardItem from "../../components/product-card-item";
import CartTotal from "../../components/product-card-item/card-total";
import { BreadcrumbItem } from "../../generic/bredcrumb";

const ProductCart: FC = () => {
  return (
    <section>
      <BreadcrumbItem pathTitle={"Shopping Card"} />
      <div className="grid grid-cols-[2fr_1fr] gap-10 my-[50px] max-lg:grid-cols-1">
        <ProductCardItem />
        <CartTotal />
      </div>
    </section>
  );
};

export default ProductCart;
