import { useAuthUser, useSignIn } from "react-auth-kit";
import type { AuthUser, WishListItemType } from "../../@types";
import { useAxios } from "../../hooks/useAxios";
import { useNotificationAPi } from "../notition";

interface LikeItemType {
  isLiked: boolean;
  data: WishListItemType;
}

const useHandler = () => {
  const axios = useAxios();
  const signIn = useSignIn();
  const authUser = useAuthUser()() as AuthUser;
  const notify = useNotificationAPi();
  const userUpdeter = ({ shouldUpdate }: { shouldUpdate: object }) => {
    signIn({
      token: String(localStorage.getItem("token")),
      expiresIn: 3600,
      tokenType: "Bearer",
      authState: {
        ...authUser,
        ...shouldUpdate,
      },
    });
  };

  const accountDetailsUpdater = async ({
    shouldUpdate,
  }: {
    shouldUpdate: object;
  }) => {
    try {
      userUpdeter({
        shouldUpdate: { ...authUser, ...shouldUpdate },
      });
      await axios({
        url: "/user/account-details",
        method: "POST",
        body: {
          ...shouldUpdate,
          _id: authUser._id,
        },
      });
      notify("edited_user");
    } catch (error) {
      console.log(error);
    }
  };
  const adressDetailUpdeter = async ({
    shouldUpdate,
  }: {
    shouldUpdate: object;
  }) => {
    try {
      userUpdeter({ shouldUpdate: { ...authUser, ...shouldUpdate } });
      await axios({
        url: "/user/address",
        method: "POST",
        body: {
          ...shouldUpdate,
          _id: authUser._id,
        },
      });
      notify("edited_adress");
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = ({ isLiked, data }: LikeItemType) => {
    const like = async () => {
      signIn({
        token: String(localStorage.getItem("token")),
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {
          ...authUser,
          wishlist: [...(authUser.wishlist ?? []), data],
        },
      });
      notify("like");
      await axios({
        url: "/user/create-wishlist",
        body: data,
        method: "POST",
      });
    };
    const unLike = async () => {
      userUpdeter({
        shouldUpdate: {
          ...authUser,
          wishlist: authUser.wishlist?.filter(
            ({ flower_id }) => flower_id !== data.flower_id,
          ),
        },
      });
      notify("unlike");
      await axios({
        url: "/user/delete-wishlist",
        body: {
          _id: data.flower_id,
        },
        method: "DELETE",
      });
    };

    if (isLiked) return unLike();
    return like();
  };
  const followUserUpdateCashe = ({ _id }: { _id: string }) => {
    return userUpdeter({
      shouldUpdate: { followers: [...(authUser.followers ?? []), _id] },
    });
  };
  const unfollowUserUpdateCashe = ({ _id }: { _id: string }) => {
    return userUpdeter({
      shouldUpdate: { followers: authUser.followers?.filter((v) => v !== _id) },
    });
  };

  return {
    likeHandler,
    accountDetailsUpdater,
    adressDetailUpdeter,
    followUserUpdateCashe,
    unfollowUserUpdateCashe,
  };
};

export default useHandler;
