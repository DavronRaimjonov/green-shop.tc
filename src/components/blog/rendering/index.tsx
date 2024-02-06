import { useNavigate, useParams } from "react-router-dom";
import { useQueryHendler } from "../../../hooks/useQuery";
import { Skeleton, Tooltip } from "antd";
import type { AuthUser, BlogTypeItem } from "../../../@types";
import Meta from "antd/es/card/Meta";
import {
  EyeOutlined,
  HeartOutlined,
  MessageOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import {
  useFollowUser,
  useUnFollowUser,
  useViewBlog,
} from "../../../hooks/useQuery/useQueryActions";
import { useEffect } from "react";
import { useAuthUser } from "react-auth-kit";
interface BlogItemType {
  isLoading: boolean;
  isError: boolean;
  data?: BlogTypeItem;
}
const Rendering = () => {
  const navigate = useNavigate();
  const { user_id, blog_id } = useParams();
  const authUser = useAuthUser()() as AuthUser;
  const { mutate: viewMutate } = useViewBlog();
  const { mutate: follow_user } = useFollowUser();
  const { mutate: un_follow_user } = useUnFollowUser();
  console.log(authUser);
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQueryHendler({
    url: `/user/by_id/${user_id}`,
    pathname: "user",
  });
  const { data, isLoading, isError }: BlogItemType = useQueryHendler({
    url: `/user/blog/${blog_id}`,
    pathname: `BlogItem-${blog_id}`,
  });
  const isuserLoaded = isUserError || isUserLoading;
  const isBlogLoaded = isError || isLoading;
  useEffect(() => {
    viewMutate({ _id: String(blog_id) });
  }, []);

  return (
    <div className="w-[60%] m-auto max-lg:w-[100%] py-[50px]">
      {isuserLoaded || isBlogLoaded ? (
        <>
          <div className="mt-[30px]">
            <Meta
              avatar={<Skeleton.Avatar active={true} />}
              title={<Skeleton.Input active={true} />}
              className="mb-[30px]"
            />
            <Skeleton paragraph={{ rows: 30 }} active={true} />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-4">
              <Tooltip
                className="cursor_pointer"
                title={`${String(userData.name)} ${userData.surname ?? ""}`}
              >
                <img
                  onClick={() => navigate(`/user/${data?.created_by}`)}
                  className="w-[50px] h-[50px] rounded-full cursor-pointer"
                  src={userData.profile_photo}
                />
              </Tooltip>
              <div>
                <h2 className="font-bold text-[18px]">
                  {userData.name} {userData.surname ?? ""}
                </h2>
                <p className="text-[12px]">
                  Followers {userData.followers.length}
                </p>
              </div>
            </div>
            {authUser.followers?.includes(String(user_id)) ? (
              <button
                onClick={() => un_follow_user({ _id: String(user_id) })}
                className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white px-[20px] py-[8px]"
              >
                Unfollow
              </button>
            ) : authUser._id === String(user_id) ? (
              <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white px-[20px] py-[8px]">
                You
              </button>
            ) : (
              <button
                onClick={() => follow_user({ _id: String(user_id) })}
                className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white px-[20px] py-[8px]"
              >
                Follow
              </button>
            )}
          </div>
          <div>
            <h2 className="py-[20px] font-bold text-[24px]">{data?.title}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: data?.content || "" }}
            ></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <EyeOutlined /> <p>{data?.views}</p>
            </div>
            <div className="flex items-center gap-1">
              <HeartOutlined /> <p>0</p>
            </div>
            <div className="flex items-center gap-1">
              <MessageOutlined /> <p>0</p>
            </div>
            <div className="flex items-center gap-1">
              <ShareAltOutlined /> <p>0</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Rendering;
