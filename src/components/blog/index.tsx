import { Form, Tooltip } from "antd";
import Search from "antd/es/input/Search";
import type { FC } from "react";
import BlogCard from "./blog-card";
import { useQueryHendler } from "../../hooks/useQuery";
import type { AuthUser, BlogTypeItem } from "../../@types";
import searchParam from "../../generic/searchParam";
import useLoader from "../../generic/loader";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useNotificationAPi } from "../../generic/notition";
import UnAuthedBar from "./unAuthedBar";

interface BlogType {
  isLoading: boolean;
  isError: boolean;
  data?: BlogTypeItem[];
}
const BlogPage: FC = () => {
  const { paramValue, setParam } = searchParam();
  const search: string = paramValue("search") ?? "";
  const { data, isError, isLoading }: BlogType = useQueryHendler({
    url: "/user/blog",
    pathname: `/blog?search=${paramValue("search") ?? ""}`,
    params: {
      search,
    },
  });
  const submit = (e: any) => setParam({ search: e });
  const notify = useNotificationAPi();
  const { blog_card_loader } = useLoader();
  const navigate = useNavigate();
  const userAuth = useAuthUser()() as AuthUser;
  const isAuthed = useIsAuthenticated()();
  const new_article = () =>
    userAuth.permission?.create
      ? navigate("/blog/create-blog")
      : notify("token_created_blog");

  return (
    <div>
      {isAuthed ? (
        <>
          {" "}
          <h1 className="text-center text-[30px] font-[700] my-[30px]">
            My Feed
          </h1>
          <Form onFinish={submit} className="flex items-center w-[70%] m-auto">
            <Search
              placeholder="Search..."
              className="h-[40px]"
              onSearch={submit}
            />
          </Form>
          <div onClick={new_article} className="cursor-pointer">
            <Tooltip title={"New Artical"}>
              <PlusCircleOutlined className="text-[30px]" />
            </Tooltip>
          </div>
        </>
      ) : (
        <UnAuthedBar />
      )}

      <div className="grid grid-cols-3 gap-3 my-[50px] max-[1130px]:grid-cols-2 max-[585px]:grid-cols-1">
        {isError || isLoading
          ? blog_card_loader()
          : data?.map((value) => (
              <div key={value._id}>
                <BlogCard {...value} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default BlogPage;
