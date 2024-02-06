import React from "react";
import { useQueryHendler } from "../../../../hooks/useQuery";
import { useParams } from "react-router-dom";
import BlogCard from "../../../blog/blog-card";
import useLoader from "../../../../generic/loader";
import type { BlogTypeItem } from "../../../../@types";

const Posts = () => {
  const { user_id } = useParams();
  const { blog_card_loader } = useLoader();
  const { data, isLoading, isError } = useQueryHendler({
    url: `/user/blog/created-by/${user_id}`,
    pathname: `blog-${user_id}`,
    params: {
      access_token: user_id,
    },
  });
  return (
    <div className="grid grid-cols-3 gap-3 my-[50px]">
      {isError || isLoading
        ? blog_card_loader()
        : data?.map((value: BlogTypeItem) => (
            <div key={value._id}>
              <BlogCard {...value} />
            </div>
          ))}
    </div>
  );
};

export default Posts;
