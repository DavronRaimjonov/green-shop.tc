import React from "react";
import { useQueryHendler } from "../../../../hooks/useQuery";
import { Empty } from "antd";

const Products = () => {
  const { data } = useQueryHendler({
    url: "/user/products",
    pathname: "my-product",
  });

  return (
    <div>
      <p>Products</p>
      {!data?.length && <Empty description={<p>No products....</p>} />}
    </div>
  );
};

export default Products;
