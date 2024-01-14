import { Modal } from "antd";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { setCheckoutModalVisibilty } from "../../../../redux/modal-slice";
import type { ProductType } from "../../../../@types";
import { useNavigate } from "react-router-dom";
import { deleteDataItem } from "../../../../redux/product-slice";
const CheckoutModal = () => {
  const { checkoutModalVisibilty } = useReduxSelector(
    (state) => state.modalSlice,
  );
  const dispatch = useReduxDispatch();
  const { data } = useReduxSelector((state) => state.productSlice);
  const { coupon } = useReduxSelector((state) => state.couponSlice);
  const totalPrice = data.reduce((previousValue, currentValue) => {
    return currentValue.price * Number(currentValue.count) + previousValue;
  }, 0);
  const couponPrice = (totalPrice * coupon) / 100;
  const navigate = useNavigate();
  const closeModal = () => {
    dispatch(setCheckoutModalVisibilty());
    navigate("profile/track-order");
    dispatch(deleteDataItem());
  };
  return (
    <Modal
      footer={false}
      open={checkoutModalVisibilty}
      onCancel={closeModal}
      title="Order Confirmation"
      width={"650px"}
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
          <h3 className="font-bold">${totalPrice}</h3>
        </div>
        <div className="border-r m-[4px] border-[#46A35833]">
          <p>Payment Method</p>
          <h3 className="font-bold">Cash on delivery</h3>
        </div>
      </div>
      <h3 className="font-bold mt-[30px] text-xl border-b border-[#46A35880]">
        Order Details
      </h3>
      {data.map((value: ProductType) => (
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
          {couponPrice ? (
            <>
              <s>${totalPrice?.toFixed(2)}</s>
              <div>${(totalPrice - couponPrice).toFixed(2)}</div>
            </>
          ) : (
            <> ${totalPrice?.toFixed(2)}</>
          )}
        </p>
      </div>
      <p className="w-4/5 text-center m-auto mt-[16px]">
        Your order is currently being processed. You will receive an order
        confirmation email shortly with the expected delivery date for your
        items.
      </p>
      <button
        onClick={closeModal}
        className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white m-auto mt-[50px] w-[145px] h-[45px]"
      >
        Track your order
      </button>
    </Modal>
  );
};

export default CheckoutModal;
