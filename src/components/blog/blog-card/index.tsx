import { EyeOutlined, HeartOutlined, MessageOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import type { FC } from "react";
import type { BlogTypeItem } from "../../../@types";
import { useNavigate } from "react-router-dom";

const BlogCard: FC<BlogTypeItem> = (props) => {
  const navigete = useNavigate();
  return (
    <Card
      actions={[
        <div className="flex justify-center gap-1" key="setting">
          <EyeOutlined />
          <p>{props.views}</p>
        </div>,
        <div className="flex justify-center gap-1" key="edit">
          <MessageOutlined />
          <p>0</p>
        </div>,
        <div className="flex justify-center gap-1" key="like">
          <HeartOutlined />
          <p>0</p>
        </div>,
      ]}
    >
      <Meta
        title={
          <h2
            className="cursor-pointer hover:underline"
            onClick={() => navigete(`/blog/${props.created_by}/${props._id}`)}
          >
            {props.title}
          </h2>
        }
        description={props.short_description}
      />
    </Card>
  );
};

export default BlogCard;
