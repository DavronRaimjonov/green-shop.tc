import { Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import { useRef, useState } from "react";
import { useAxios } from "../../../hooks/useAxios";
import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { setCoupon } from "../../../redux/coupon";
import { useNotificationAPi } from "../../../generic/notition";

const CartTotal = () => {
  const cupon_title_style = "text-[#3D3D3D] text-[15px] font-normal";
  const { data } = useReduxSelector((state) => state.productSlice);
  const { coupon } = useReduxSelector((state) => state.couponSlice);
  const dispatch = useReduxDispatch();
  const notify = useNotificationAPi();

  const navigate = useNavigate();
  const totalPrice = data?.reduce((previousValue, currentValue) => {
    return currentValue.price * Number(currentValue.count) + previousValue;
  }, 0);
  const refInput = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [btnTitle, setBtnTitla] = useState<boolean>(false);
  const axios = useAxios();
  const getCoupon = async () => {
    if (refInput.current) {
      if (!refInput.current.value.length) {
        notify("coupon_length");
      }
      setLoading(true);
      await axios({
        url: "/features/coupon",
        params: {
          coupon_code: refInput.current.value,
        },
      })
        .then((data) => {
          dispatch(setCoupon(data?.data?.data?.discount_for));
          setLoading(false);
          setBtnTitla(true);
          notify("coupon_sucsses");
        })
        .catch(() => {
          notify("coupon_error");
          setLoading(false);
          setBtnTitla(false);
        });
    }
  };
  const couponPrice = (totalPrice * coupon) / 100;
  return (
    <div className="top-[100px] sticky">
      <div className="flex border-b-[1px] border-[#46A358]">
        <h2 className="pb-[9px] text-[#3D3D3D] font-bold text-[18px]">
          Card total
        </h2>
      </div>
      <Form className="flex h-[40px] mt-[35px]">
        <input
          disabled={coupon ? true : false}
          ref={refInput}
          name="coupon"
          placeholder="Enter coupon code here..."
          className="border w-4/5  border-[#46A358] pl-[15px] placeholder:font-light rounded-l-lg rounded-r-none outline-none text-[18px] text-black font-normal"
        />
        <button
          disabled={coupon ? true : false}
          onClick={getCoupon}
          className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-1/5 rounded-l-none "
        >
          {loading ? (
            <LoadingOutlined />
          ) : (
            <span>{btnTitle ? <CheckOutlined /> : "Apply"}</span>
          )}
        </button>
      </Form>
      <div className="mt-[20px]">
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
      <div>
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
        <button
          onClick={() =>
            data.length ? navigate("/product-checkout") : notify("nothing")
          }
          className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white w-full h-[40px] mt-[30px]"
        >
          Proceed To Checkout
        </button>
        <Link to={"/"} className="flex justify-center">
          <button className="mt-[14px] text-[#46A358] cursor-pointer">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartTotal;
