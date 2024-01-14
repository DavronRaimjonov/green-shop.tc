import { Form, Input, Radio } from "antd";
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux";
import { useAxios } from "../../../hooks/useAxios";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import {
  setAuthorizationModalVisibility,
  setCheckoutModalVisibilty,
} from "../../../redux/modal-slice";
import type {
  AuthUser,
  ChechkoutFromType,
  ExtraShopInfoType,
} from "../../../@types";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";

const CheckoutForm = () => {
  const radio_style: string =
    "bordant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-in-form-item border border-[#46A358] w-full h-[40px] flex items-center pl-[10px] rounded-lg css-k7429zer";
  const { coupon } = useReduxSelector((state) => state.couponSlice);
  const { data } = useReduxSelector((state) => state.productSlice);
  const totalPrice = data.reduce((previousValue, currentValue) => {
    return currentValue.price * Number(currentValue.count) + previousValue;
  }, 0);
  const dispatch = useReduxDispatch();
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const isAuth = useIsAuthenticated()();
  const authUser = useAuthUser()() as AuthUser;
  const extra_shop_info: ExtraShopInfoType = {
    coupon: { has_coupon: coupon !== 0, discount_for: coupon },
    total_price: totalPrice,
  };
  const finish = async (e: ChechkoutFromType) => {
    if (!isAuth) {
      dispatch(setAuthorizationModalVisibility({ open: true, loading: false }));
    }

    const billing_address = { ...e };
    setLoading(true);
    await axios({
      url: "/order/make-order",
      method: "POST",
      body: { billing_address, extra_shop_info, shop_list: data },
    })
      .then(() => {
        setLoading(false);
        dispatch(setCheckoutModalVisibilty());
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  const grid_style_form_item =
    "grid grid-cols-2 gap-4 max-[361px]:grid-cols-1 max-[361px]:gap-2";
  return (
    <div>
      <h3 className="font-bold mb-[23px]">Billing Address</h3>
      <Form
        layout="vertical"
        onFinish={finish}
        fields={[
          { name: ["first_name"], value: authUser?.name },
          { name: ["last_name"], value: authUser?.surname },
          { name: ["country"], value: authUser?.country },
          { name: ["town"], value: authUser?.town },
          { name: ["street_address"], value: authUser?.street_address },
          {
            name: ["additional_street_address"],
            value: authUser?.additional_street_address,
          },
          { name: ["state"], value: authUser?.state },
          { name: ["zip"], value: authUser?.zip },
          { name: ["email"], value: authUser?.email },
          { name: ["phone_number"], value: authUser?.phone_number },
        ]}
      >
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="first_name"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please enter First name",
              },
            ]}
          >
            <Input placeholder="Type your first name..." />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last name"
            rules={[
              {
                required: true,
                message: "Please enter Last name",
              },
            ]}
          >
            <Input placeholder="Type your last name..." />
          </Form.Item>
        </div>
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="country"
            label="Country / Region"
            rules={[
              {
                required: true,
                message: "Please enter Country / Region",
              },
            ]}
          >
            <Input placeholder="Type your country name..." />
          </Form.Item>
          <Form.Item
            name="town"
            label="Town / City"
            rules={[
              {
                required: true,
                message: "Please enter Town / City",
              },
            ]}
          >
            <Input placeholder="Type your town..." />
          </Form.Item>
        </div>
        <div className={`${grid_style_form_item} tems-center`}>
          <Form.Item
            name="street_address"
            label="Streed Address"
            rules={[
              {
                required: true,
                message: "Please enter Streed Address",
              },
            ]}
          >
            <Input placeholder="Type your street name..." />
          </Form.Item>
          <Form.Item
            name="additional_street_address"
            label=""
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input
              className="mt-[30px]"
              placeholder="Appartament suite, unit, etc (optional)..."
            />
          </Form.Item>
        </div>
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="state"
            label="State"
            rules={[
              {
                required: true,
                message: "Please enter State",
              },
            ]}
          >
            <Input placeholder="Type your country name..." />
          </Form.Item>
          <Form.Item
            name="zip"
            label="Zip"
            rules={[
              {
                required: true,
                message: "Please enter Zip",
              },
            ]}
          >
            <Input placeholder="Type your town..." />
          </Form.Item>
        </div>
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="email"
            label="Email address"
            rules={[
              {
                required: true,
                message: "Please enter Email address",
              },
            ]}
          >
            <Input placeholder="Type your email..." />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please enter Phone Number",
              },
            ]}
          >
            <Input addonBefore={"+998"} placeholder="Type your town..." />
          </Form.Item>
        </div>
        <div className={`${grid_style_form_item}`}>
          <Form.Item
            name="payment_method"
            label="Payment Method"
            rules={[
              {
                required: true,
                message: "Please enter Payment Method",
              },
            ]}
          >
            <Radio.Group className="flex flex-col gap-3">
              <Radio
                className={`${radio_style}`}
                value={"other-payment-methods"}
              >
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fpayment_collected_methods.png?alt=media&token=c4bfd991-8bd8-4e6b-97dc-83381db193f7"
                  alt=""
                />
              </Radio>
              <Radio
                className={`${radio_style}`}
                value={"dorect-bank-transfer"}
              >
                Dorect bank transfer
              </Radio>
              <Radio className={`${radio_style}`} value={"cash-on-delivery"}>
                Cash on delivery
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <Form.Item name="order_notes" label="Order notes (optional)">
          <Input.TextArea
            rows={10}
            placeholder="Your order notes, thoughts, feedback, etc..."
          />
        </Form.Item>
        <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white mt-[40px] w-full h-[40px]">
          {loading ? <LoadingOutlined /> : "Place Order"}
        </button>
      </Form>
    </div>
  );
};

export default CheckoutForm;
