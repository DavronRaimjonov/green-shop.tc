import { useReduxSelector } from "../../../hooks/useRedux";
import CheckData from "./check-product";

const CheckoutData = () => {
  const { data } = useReduxSelector((state) => state.productSlice);
  const { coupon } = useReduxSelector((state) => state.couponSlice);
  const totalPrice = data.reduce((previousValue, currentValue) => {
    return currentValue.price * Number(currentValue.count) + previousValue;
  }, 0);
  const cupon_title_style = "text-[#3D3D3D] text-[15px] font-normal";
  const couponPrice = (totalPrice * coupon) / 100;
  return (
    <section>
      <h3 className="font-bold ">Your Order</h3>
      {data.map((item) => (
        <CheckData key={item._id} {...item} />
      ))}
      <div className="mt-[20px] border-b-[1px] pb-[10px]">
        <div className="flex justify-between items-center pt-3">
          <h3 className={`${cupon_title_style}`}>Subtotal</h3>
          <h2 className="text-[#3D3D3D] text-[18px] font-medium">
            ${totalPrice?.toFixed(2)}
          </h2>
        </div>
        <div className="flex justify-between items-center pt-3">
          <h3 className={`${cupon_title_style}`}>Coupon Discount</h3>
          <h2 className="text-[#3D3D3D] text-[15px]">
            -$({couponPrice?.toFixed(2)})
          </h2>
        </div>
        <div className="flex justify-between items-center pt-3">
          <h3 className={`${cupon_title_style}`}>Shiping</h3>
          <h2 className="text-[#3D3D3D] text-[18px] font-medium">$16.00</h2>
        </div>
      </div>
      <div className="flex justify-between mt-[20px]">
        <h2 className="text-[#3D3D3D] text-[16px] font-bold">Total:</h2>
        <h1 className="text-[#46A358] text-[18px] font-bold">
          {couponPrice ? (
            <>
              <s>${totalPrice?.toFixed(2)}</s>
              <div>${(totalPrice - couponPrice).toFixed(2)}</div>
            </>
          ) : (
            <> ${totalPrice?.toFixed(2)}</>
          )}
        </h1>
      </div>
    </section>
  );
};
export default CheckoutData;
