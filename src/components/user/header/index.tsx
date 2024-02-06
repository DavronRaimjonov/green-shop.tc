import type { FC } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import type { AuthUser, UserType } from "../../../@types";
import {
  MessageOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  useFollowUser,
  useSendInvitation,
  useUnFollowUser,
} from "../../../hooks/useQuery/useQueryActions";
import { useAuthUser } from "react-auth-kit";
import { Modal, Skeleton } from "antd";
import useLoader from "../../../generic/loader";

interface HeaderProps {
  isLoad: boolean;
}
const Header: FC<HeaderProps> = ({ isLoad }) => {
  const queryClient = useQueryClient();
  const { user_id } = useParams();
  const data: UserType = queryClient.getQueryData(`User${user_id}`) ?? {};
  const authUser = useAuthUser()() as AuthUser;
  const { mutate } = useSendInvitation();
  const send_invitation = () => mutate({ _id: String(user_id) });
  const { mutate: follow_user } = useFollowUser();
  const { mutate: un_follow_user } = useUnFollowUser();
  const { user_button_loader } = useLoader();
  const btn_style =
    "bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white py-[10px] px-[15px] max-sm:py-[5px] max-sm:px-[5px] max-sm:text-[14px]";

  return (
    <div>
      <div className="w-full h-[570px] relative">
        <img
          className="w-full h-[450px] rounded-b-[12px] max-lg:h-[350px]"
          src="https://i0.wp.com/linkedinheaders.com/wp-content/uploads/2018/02/mountain-lake-header.jpg?fit=1584%2C396&ssl=1"
          alt=""
        />
        <div className="w-full flex items-end justify-between absolute bottom-[20px] max-[1151px]:flex-col max-[1151px]:items-center gap-5">
          <div className="flex items-end gap-4 max-[1151px]:flex-col max-[1151px]:items-center ">
            <div className="w-[150px] h-[150px] border-[5px] border-[#46A358] rounded-full flex justify-center">
              {isLoad ? (
                <Skeleton.Avatar
                  style={{ width: 140, height: 140 }}
                  active={true}
                />
              ) : (
                <img className="rounded-full" src={data.profile_photo} alt="" />
              )}
            </div>

            <div>
              <h2 className="text-[28px] font-bold">
                {isLoad ? (
                  <Skeleton.Input active={true} />
                ) : (
                  `${data.name} ${data.surname}`
                )}
              </h2>
              <p>
                {isLoad ? (
                  <Skeleton.Input active={true} />
                ) : (
                  ` Followers: ${data.followers?.length}`
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-4 max-sm:flex-wrap">
            {isLoad ? (
              user_button_loader()
            ) : (
              <>
                <button
                  onClick={() =>
                    Modal.info({
                      title: "Messaging comming soon...",
                      okButtonProps: {
                        type: "dashed",
                      },
                    })
                  }
                  className={`${btn_style} `}
                >
                  <MessageOutlined />
                  Start chat
                </button>
                {user_id !== authUser._id && (
                  <button onClick={send_invitation} className={`${btn_style}`}>
                    <SendOutlined />
                    Send Invitation
                  </button>
                )}

                {user_id === authUser._id ? (
                  <button className={`${btn_style}`}>
                    <UserOutlined />
                    You
                  </button>
                ) : authUser.followers?.includes(String(user_id)) ? (
                  <button
                    onClick={() => un_follow_user({ _id: String(user_id) })}
                    className={`${btn_style}`}
                  >
                    <MinusCircleOutlined />
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => follow_user({ _id: String(user_id) })}
                    className={`${btn_style}`}
                  >
                    <PlusCircleOutlined />
                    Follow
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
