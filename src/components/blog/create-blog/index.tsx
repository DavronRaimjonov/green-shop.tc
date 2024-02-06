import { Form, Input } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createBlogMutation } from "../../../hooks/useQuery/useQueryActions";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useNotificationAPi } from "../../../generic/notition";
const CreateBlog = () => {
  const { mutateAsync } = createBlogMutation();
  const notify = useNotificationAPi();
  const [load, setLoad] = useState<boolean>(false);
  const onFinsh = async (data: {
    title: string;
    short_description: string;
    content: string;
  }) => {
    if (!data.content.replace(/(<([^>]+)>)/gi, ""))
      return notify("missing_value");

    if (!data.short_description.replace(/\s/g, ""))
      return notify("missing_value");

    setLoad(true);
    await mutateAsync({ data });
    setLoad(false);
  };
  return (
    <Form onFinish={onFinsh} layout="vertical" className="my-[40px]">
      <Form.Item
        name={"title"}
        rules={[{ required: true, message: "Plase Enter Title" }]}
        label="Title"
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        name={"short_description"}
        rules={[{ required: true, message: "Plase Enter Short Description" }]}
        label="Short Description"
      >
        <Input.TextArea
          size="large"
          placeholder="Short desription of the post"
          className="resize-none"
          autoSize
          showCount
          maxLength={250}
        />
      </Form.Item>
      <Form.Item
        name="content"
        label="Content:"
        rules={[{ required: true, message: "Plase enter Content" }]}
      >
        <ReactQuill className="h-[60vh] mb-[40px]" theme="snow" />
      </Form.Item>
      <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-full px-[15px] py-[10px]">
        {load ? <LoadingOutlined /> : "Send"}
      </button>
    </Form>
  );
};

export default CreateBlog;
