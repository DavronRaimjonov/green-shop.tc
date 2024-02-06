import React from "react";
import Header from "./header";
import Body from "./body";
import { useQueryHendler } from "../../hooks/useQuery";
import { useParams } from "react-router-dom";

const User = () => {
  const { user_id } = useParams();
  const { isLoading, isError } = useQueryHendler({
    url: `/user/by_id/${user_id}`,
    pathname: `User${user_id}`,
  });
  const isLoad = isError || isLoading;
  return (
    <div>
      <Header isLoad={isLoad} />
      <Body />
    </div>
  );
};

export default User;
