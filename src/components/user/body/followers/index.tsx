import React from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import type { UserType } from "../../../../@types";
import Carditem from "./card";
import { Empty } from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";

const Followers = () => {
  const { user_id } = useParams();
  const queryClient = useQueryClient();

  const data: UserType = queryClient.getQueryData(`User${user_id}`) ?? {};
  console.log(data);
  return (
    <div>
      {data?.followers?.length ? (
        <div className="mt-[30px] w-full grid grid-cols-4 gap-8 max-lg:grid-cols-3 max-sm:grid-cols-2">
          {data.followers.map((_id: string) => (
            <Carditem key={_id} _id={_id} />
          ))}
        </div>
      ) : (
        <div className="h-[400px] flex flex-col items-center justify-center">
          <Empty
            description={
              <div>
                <h3 className="text-[18px] text-bold">
                  <UserSwitchOutlined /> No followers yet...
                </h3>
                <p></p>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
};

export default Followers;
