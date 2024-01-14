import { Form, Input, notification } from "antd";
import { useAxios } from "../../../../hooks/useAxios";
import { useState } from "react";
import { CheckOutlined } from "@ant-design/icons";
interface PostEmailType {
  email: string;
}
const AdvcieEmail = () => {
  const axios = useAxios();
  const [succses, setSucsess] = useState<boolean>(false);
  const postEmail = async (data: PostEmailType) => {
    await axios({
      url: "/features/email-subscribe",
      method: "POST",
      body: data,
    })
      .then((res) => {
        notification.success({ message: "Successfully subscribed!" });
        setSucsess(true);
      })
      .catch((error) => {
        console.log(error);
        setSucsess(false);
      });
  };
  return (
    <div>
      <h1 className="font-bold text-[18px]">
        Would you like to join newsletters?
      </h1>
      <Form className="flex w-full  mb-[17px] mt-[20px]" onFinish={postEmail}>
        <Form.Item
          name="email"
          className="w-4/5 rounded-s-xl pl-[11px] placeholder:font-light"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Plase input your email",
            },
          ]}
        >
          <Input
            type="mail"
            placeholder="enter your email address..."
            className="h-[40px] "
            disabled={succses}
          />
        </Form.Item>
        <button
          disabled={succses}
          className="bg-[#46A358] flex items-center justify-center gap-1 text-base text-white h-[40px] w-1/5 rounded-none rounded-e-xl"
        >
          {succses ? <CheckOutlined /> : "Join"}
        </button>
      </Form>
      <p className="text-[13px] leading-6 text-[#727272] font-normal">
        We usually post offers and challenges in newsletter. We’re your online
        houseplant destination. We offer a wide range of houseplants and
        accessories shipped directly from our (green)house to yours!{" "}
      </p>
    </div>
  );
};

export default AdvcieEmail;
