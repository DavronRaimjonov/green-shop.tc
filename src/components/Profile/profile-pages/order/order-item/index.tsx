import type { FC } from "react";
import type { CheckoutModalType } from "../../../../../@types";
import { useReduxDispatch } from "../../../../../hooks/useRedux";
import { setTrackOrderModalVisibilty } from "../../../../../redux/modal-slice";
import { getOrder } from "../../../../../redux/track-order-slice";

const OrderItem: FC<CheckoutModalType> = (order) => {
  const dispatch = useReduxDispatch();

  return (
    <div
      key={order._id}
      className="bg-[#FBFBFB] w-full flex flex-col mb-[20px]"
    >
      <div className="w-full grid grid-cols-4 max-sm:grid-cols-2 mb-[10px]">
        <div className="border-r m-[4px] border-[#46A35833]">
          <h3 className="font-light">Order Number</h3>
          <p className="font-bold">{order._id.slice(0, 12)}</p>
        </div>
        <div className="border-r m-[4px] border-[#46A35833]">
          <h3 className="font-light">Date</h3>
          <p className="font-bold">
            {String(new Date(order.created_at)).slice(0, 15)}
          </p>
        </div>
        <div className="border-r m-[4px] border-[#46A35833]">
          <h3 className="font-light">Total</h3>
          <p className="font-bold">
            {order?.extra_shop_info?.total_price?.toFixed(2) || 0}
          </p>
        </div>
        <div className="border-r m-[4px] border-[#46A35833]">
          <h3 className="font-light">More</h3>
          <p
            onClick={() => {
              dispatch(setTrackOrderModalVisibilty());
              dispatch(getOrder(order));
            }}
            className="text-[#46A358] cursor-pointer"
          >
            Get Details
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
