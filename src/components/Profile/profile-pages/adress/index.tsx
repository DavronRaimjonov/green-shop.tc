import type { FC } from "react";
import { Form, Input } from "antd";
import { useAuthUser } from "react-auth-kit";
import type { AuthUser } from "../../../../@types";
import useHandler from "../../../../generic/hendler";

const Adress: FC = () => {
  const authUser = useAuthUser()() as AuthUser;
  const { adressDetailUpdeter } = useHandler();
  const finish = async (e: any) => {
    await adressDetailUpdeter({ shouldUpdate: { ...e } });
  };
  const grid_style_form_item =
    "grid grid-cols-2 gap-4 max-[585px]:grid-cols-1 max-[585px]:gap-2";
  return (
    <div>
      <h3 className="mb-[10px]">Billing Address</h3>
      <p className="font-light">
        The following addresses will be used on the checkout page by default.
      </p>
      <Form
        layout="vertical"
        onFinish={finish}
        fields={[
          { name: ["name"], value: authUser?.name },
          { name: ["surname"], value: authUser?.surname },
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
            name="name"
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
            name="surname"
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
        <div className={`${grid_style_form_item}`}>
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
            label="Extra adress"
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
        <button className="bg-[#46A358] flex rounded-md items-center justify-center gap-1 text-base text-white mt-[40px] h-[40px] px-[10px]">
          Place Order
        </button>
      </Form>
    </div>
  );
};

export default Adress;
