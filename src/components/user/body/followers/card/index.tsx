import { Avatar, Card, Skeleton } from "antd";
import { ShareAltOutlined, WechatOutlined } from "@ant-design/icons";
import type { FC } from "react";
import Meta from "antd/es/card/Meta";
import { useQueryHendler } from "../../../../../hooks/useQuery";
import { useNavigate } from "react-router-dom";

const Carditem: FC<{ _id: string }> = ({ _id }) => {
  const { data, isLoading, isError } = useQueryHendler({
    url: `/user/by_id/${_id}`,
    pathname: `/user-${_id}`,
  });
  const navigate = useNavigate();
  const isLoaded = isLoading || isError;
  console.log(data);
  return (
    <Card
      actions={[
        <div className="flex justify-center gap-1" key="edit">
          {isLoaded ? (
            <Skeleton.Avatar />
          ) : (
            <>
              <WechatOutlined />
              <p>Chat</p>
            </>
          )}
        </div>,
        <div
          onClick={() => navigate(`/user/${data._id}`)}
          className="flex justify-center gap-1"
          key="like"
        >
          {isLoaded ? (
            <Skeleton.Avatar />
          ) : (
            <>
              <ShareAltOutlined />
              <p>Observe</p>
            </>
          )}
        </div>,
      ]}
    >
      <Meta
        avatar={<Avatar src={data?.profile_photo} />}
        title={
          <div>
            {isLoaded ? <Skeleton.Input /> : `${data?.name} ${data?.surname}`}
          </div>
        }
      />
    </Card>
  );
};

export default Carditem;
