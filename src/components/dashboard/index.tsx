import type { FC } from "react";
import Categories from "./category/categories";
import Product from "./product/product";

const Dashboard: FC = () => {
  return (
    <div className="grid grid-cols-[0.7fr_3fr] gap-[50px] max-[1027px]:grid-cols-1">
      <div className="max-[1027px]:hidden">
        <Categories />
      </div>
      <Product />
    </div>
  );
};

export default Dashboard;
