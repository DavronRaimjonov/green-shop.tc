import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../useAxios";
import { useReduxDispatch } from "../../useRedux";
import { setTrackOrderModalVisibilty } from "../../../redux/modal-slice";
import type { CheckoutModalType, ProductType } from "../../../@types";
import useHandler from "../../../generic/hendler";
import { useNotificationAPi } from "../../../generic/notition";
import { useNavigate } from "react-router-dom";

const useDeleteteWishlistFromCache = () => {
  const { likeHandler } = useHandler();
  const queryClient = useQueryClient();
  return async (reciedData: ProductType) => {
    queryClient.setQueryData("wishlist-item", (oldData: any) => {
      return oldData?.filter((v: ProductType) => v._id !== reciedData._id);
    });
    await likeHandler({
      data: { route_path: reciedData.category, flower_id: reciedData._id },
      isLiked: true,
    });
  };
};
const useDeleteTrackOrderFromCache = () => {
  const queryClient = useQueryClient();
  return ({ _id }: { _id: string }) => {
    queryClient.setQueryData("order", (oldData: any) => {
      return oldData?.filter((v: CheckoutModalType) => v._id !== _id);
    });
  };
};

const useDeleteTrackOrder = () => {
  const dispatch = useReduxDispatch();
  const useDelete = useDeleteTrackOrderFromCache();
  const axios = useAxios();
  return useMutation(({ _id }: { _id: string }) => {
    dispatch(setTrackOrderModalVisibilty());
    useDelete({ _id });
    return axios({
      url: "/order/delete-order",
      method: "DELETE",
      body: { _id },
    });
  });
};
const createBlogMutation = () => {
  const axios = useAxios();
  const notify = useNotificationAPi();
  const navigate = useNavigate();
  return useMutation(
    ({
      data,
    }: {
      data: { title: string; short_description: string; content: string };
    }) => {
      return axios({
        url: "/user/blog",
        method: "POST",
        body: { ...data },
      }).then(() => {
        notify("created_blog");
        navigate("/blog");
      });
    },
  );
};

const useViewBlog = () => {
  const axios = useAxios();
  return useMutation(({ _id }: { _id: string }) => {
    return axios({ url: "/user/blog/view", method: "PUT", body: { _id } });
  });
};
const useSendInvitation = () => {
  const axios = useAxios();
  const notify = useNotificationAPi();
  return useMutation(({ _id }: { _id: string }) => {
    return axios({
      url: "/user/notification/invite",
      method: "POST",
      body: { _id },
    }).then(() => notify("send_invitation"));
  });
};
const useFollowUser = () => {
  const axios = useAxios();
  const notify = useNotificationAPi();
  const { followUserUpdateCashe } = useHandler();
  return useMutation(({ _id }: { _id: string }) => {
    followUserUpdateCashe({ _id });
    return axios({ url: "/user/follow", method: "POST", body: { _id } }).then(
      () => notify("follow"),
    );
  });
};
const useUnFollowUser = () => {
  const axios = useAxios();
  const { unfollowUserUpdateCashe } = useHandler();
  const notify = useNotificationAPi();
  return useMutation(({ _id }: { _id: string }) => {
    unfollowUserUpdateCashe({ _id });
    return axios({ url: "/user/unfollow", method: "POST", body: { _id } }).then(
      () => notify("unfollow"),
    );
  });
};

export {
  useDeleteTrackOrder,
  useDeleteteWishlistFromCache,
  createBlogMutation,
  useViewBlog,
  useSendInvitation,
  useFollowUser,
  useUnFollowUser,
};
