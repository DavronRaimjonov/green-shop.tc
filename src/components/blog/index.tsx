import { Form } from "antd";
import Search from "antd/es/input/Search";
import type { FC } from "react";

const BlogPage: FC = () => {
  const submit = (e: any) => {
    console.log(e);
  };
  return (
    <div>
      <h1 className="text-center text-[30px] font-[700] my-[30px]">My Feed</h1>
      <Form onFinish={submit} className="flex items-center w-[70%] m-auto">
        <Search
          placeholder="Search..."
          className="h-[40px]"
          onSearch={submit}
        />
      </Form>
    </div>
  );
};

export default BlogPage;
