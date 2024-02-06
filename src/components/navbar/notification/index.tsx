import { SendOutlined, UserOutlined } from "@ant-design/icons";
import { useQueryHendler } from "../../../hooks/useQuery";
import { useNavigate } from "react-router-dom";
import { Empty, Spin } from "antd";

interface NotificationStackType {
  type: "follow_stack" | "invitation_stack";
  message: string;
  user_id: string;
  time_stamp: number;
}
interface NotificationType {
  _id: string;
  belongs_to: string;
  notification_stack: NotificationStackType[];
  created_at: string;
  _v: number;
}
interface NotificationTypeItem {
  data?: NotificationType;
  isLoading: boolean;
  isError: boolean;
}
const Notification = () => {
  const { data, isLoading, isError }: NotificationTypeItem = useQueryHendler({
    url: "/user/notification",
    pathname: "notification",
  });
  const isLoaded = isLoading || isError;
  console.log(isLoaded);
  const navigate = useNavigate();
  return (
    <div>
      {isLoaded ? (
        <div>
          <Spin size="large" /> <p>Loading</p>
        </div>
      ) : !data?.notification_stack.length ? (
        <Empty description="No notifications" />
      ) : (
        data?.notification_stack.map((value) => (
          <div
            className="flex gap-2 items-center border-b py-1"
            key={value.user_id}
          >
            <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#45A358] text-white">
              {value.type === "follow_stack" ? (
                <UserOutlined />
              ) : (
                <SendOutlined />
              )}
            </div>
            <div>
              <h3 className="text-bold">{value.message}</h3>
              <div className="flex justify-between gap-5">
                <p
                  onClick={() => navigate(`user/${value.user_id}`)}
                  className="text-[12px] cursor-pointer text-[#45A358]"
                >
                  Go to profile
                </p>
                <p className="text-[12px] cursor-pointer">
                  {new Date(value.time_stamp).toLocaleDateString("en-us", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
