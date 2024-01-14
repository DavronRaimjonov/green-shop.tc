import type { FC } from "react";
import { BreadcrumbItem } from "../../generic/bredcrumb";
import CheckoutForm from "../../components/checkout/chekout-form";
import CheckoutData from "../../components/checkout/checkout-data";

const ProductCheckout: FC = () => {
  return (
    <section>
      <BreadcrumbItem pathTitle="Checkout" />
      <div className="grid grid-cols-[1.8fr_1.2fr] gap-10 max-[862px]:grid-cols-1">
        <CheckoutForm />
        <CheckoutData />
      </div>
    </section>
  );
};

export default ProductCheckout;
