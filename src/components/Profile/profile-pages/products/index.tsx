import React from "react";
import { useQueryHendler } from "../../../../hooks/useQuery";
import { Empty } from "antd";

const Products = () => {
  const { data, isLoading, isError } = useQueryHendler({
    url: "/user/products",
    pathname: "my-product",
  });

  console.log(data, isError, isLoading);
  return (
    <div>
      <p>Products</p>
      {!data?.length && <Empty description={<p>No products....</p>} />}
    </div>
  );
};

export default Products;
