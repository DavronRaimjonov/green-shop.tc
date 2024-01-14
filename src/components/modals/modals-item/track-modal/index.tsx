import { Modal } from "antd";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { setTrackOrderModalVisibilty } from "../../../../redux/modal-slice";
import type { ProductType } from "../../../../@types";
import { useDeleteTrackOrder } from "../../../../hooks/useQuery/useQueryActions";
import { useNotificationAPi } from "../../../../generic/notition";

const TrackModal = () => {
  const dispatch = useReduxDispatch();
  const { trackOrderModalVisibilty } = useReduxSelector(
    (state) => state.modalSlice,
  );
  const { track_order } = useReduxSelector((state) => state.trackOrderSlice);

  const { mutate } = useDeleteTrackOrder();
  const total: number = track_order?.extra_shop_info.total_price ?? 0;
  const hasCoupon: boolean =
    track_order?.extra_shop_info.coupon.has_coupon ?? false;
  const discount_for: number =
    track_order?.extra_shop_info.coupon.discount_for ?? 0;
  const payment_method = track_order?.billing_address?.payment_method
    .replaceAll("-", " ")
    .toUpperCase();
  const cupon_price = (total * discount_for) / 100;
  const notify = useNotificationAPi();
  return (
    <Modal
      open={trackOrderModalVisibilty}
      onCancel={() => dispatch(setTrackOrderModalVisibilty())}
      title="Order Confirmation"
      width={"650px"}
      okButtonProps={{ danger: true }}
      okText="Delete"
      onOk={() => {
        mutate({ _id: String(track_order?._id) });
        notify("delete");
      }}
    >
      <div className="grid grid-cols-4 max-sm:grid-cols-2">
        <div className="border-r m-[4px] border-[#46A35833]">
          <p>Order Number</p>
          <h3 className="font-bold">{new Date().getTime()}</h3>
        </div>
        <div className="border-r m-[4px] border-[#46A35833]">
          <p>Date</p>
          <h3 className="font-bold">{String(new Date()).slice(0, 15)}</h3>
        </div>
        <div className="border-r m-[4px] border-[#46A35833]">
          <p>Total</p>
          <h3 className="font-bold">${total.toFixed(2)}</h3>
        </div>
        <div className="border-r m-[4px] border-[#46A35833]">
          <p>Payment Method</p>
          <h3 className="font-bold">{payment_method}</h3>
        </div>
      </div>
      <h3 className="font-bold mt-[30px] text-xl border-b border-[#46A35880]">
        Order Details
      </h3>
      {track_order?.shop_list.map((value: ProductType) => (
        <div
          key={value._id}
          className="bg-[#FBFBFB] h-[70px] w-full mt-[11px]  grid grid-cols-[3fr_1fr_1fr] items-center p-[5px]"
        >
          <div className=" flex items-center">
            <img className="w-[70px] h-[70px]" src={value.main_image} alt="" />
            <div>
              <h3>{value.title}</h3>
              <div className="font-light text-[14px]">
                <p>SKU:</p>
                <p>{value._id}</p>
              </div>
            </div>
          </div>
          <h3 className="text-[#727272]">(x{value.count})</h3>
          <h3>${value.price * Number(value.count)}</h3>
        </div>
      ))}
      <div className="flex justify-between py-5">
        <p>Shipping</p>
        <p className="font-bold text-[#46A358]">$16.00</p>
      </div>
      <div className="flex justify-between border-b border-[#46A35880]">
        <p>Total</p>
        <p className="font-bold text-[#46A358]">
          {hasCoupon ? (
            <>
              <s>${total.toFixed(2)}</s>
              <div>${(total - cupon_price).toFixed(2)}</div>
            </>
          ) : (
            <> ${total.toFixed(2)}</>
          )}
        </p>
      </div>
    </Modal>
  );
};

export default TrackModal;
