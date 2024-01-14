import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../useAxios";
import { useReduxDispatch } from "../../useRedux";
import { setTrackOrderModalVisibilty } from "../../../redux/modal-slice";
import type { CheckoutModalType, ProductType } from "../../../@types";
import useHandler from "../../../generic/hendler";

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
      console.log(oldData);
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

export { useDeleteTrackOrder, useDeleteteWishlistFromCache };
