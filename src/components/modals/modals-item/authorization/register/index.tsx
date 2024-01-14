import { Form, Input, notification } from "antd";
import FacebookIcon from "../../../../../assets/icon/facebook";
import GoogleIcon from "../../../../../assets/icon/google";
import { useAxios } from "../../../../../hooks/useAxios";
import { useSignIn } from "react-auth-kit";
import {
  useReduxDispatch,
  useReduxSelector,
} from "../../../../../hooks/useRedux";
import { setAuthorizationModalVisibility } from "../../../../../redux/modal-slice";
import { LoadingOutlined } from "@ant-design/icons";
import { OnAuthGoogle } from "../onauthgoogel";
interface UserRegisterType {
  name: string;
  surname: string;
  email: string;
  password: string;
  second_password: string;
}
const Register = () => {
  const input_style: string = "h-[40px] mt-2";
  const icon_style: string =
    "border h-[40px] rounded-md flex items-center justify-center gap-3 mb-4 cursor-pointer";
  const axios = useAxios();
  const signIn = useSignIn();
  const registerWithGoogleItem = OnAuthGoogle();
  const dispatch = useReduxDispatch();
  const { authorizationModalVisibility } = useReduxSelector(
    (state) => state.modalSlice,
  );
  const userRegister = ({
    name,
    surname,
    email,
    password,
    second_password,
  }: UserRegisterType) => {
    if (password !== second_password)
      return notification.error({
        message: "Not matched!",
        description: "You confirmed your password with wrong credential!",
      });
    dispatch(setAuthorizationModalVisibility({ open: false, loading: true }));
    const userData = { name, surname, email, password };

    axios({
      url: "/user/sign-up/google",
      body: userData,
      method: "POST",
    })
      .then((res) => {
        dispatch(
          setAuthorizationModalVisibility({ open: false, loading: false }),
        );
        const { data } = res.data;
        signIn({
          token: data.token,
          expiresIn: 3600,
          tokenType: "Bearer",
          authState: data.user,
        });
        localStorage.setItem("token", data.token);
        notification.success({ message: "Registration succsess" });
      })
      .catch((error) => {
        dispatch(
          setAuthorizationModalVisibility({ open: true, loading: false }),
        );
        console.log(error);
      });
  };
  const registerWithGoogle = async () => {
    await registerWithGoogleItem({
      url: "/user/sign-up/google",
      registred: true,
    });
  };
  return (
    <div className="w-4/5 m-auto">
      <div className="mt-5">
        <p>Enter your email and password to register.</p>
        <Form onFinish={userRegister}>
          <Form.Item
            name={"name"}
            rules={[{ required: true, message: "Plase input your name" }]}
          >
            <Input placeholder="Name" className={`${input_style}`} />
          </Form.Item>
          <Form.Item
            name={"surname"}
            rules={[{ required: true, message: "Plase input your surname" }]}
          >
            <Input placeholder="surname" className={`${input_style}`} />
          </Form.Item>
          <Form.Item
            name={"email"}
            rules={[{ required: true, message: "Plase input your email" }]}
          >
            <Input
              type="email"
              placeholder="Enter your email address"
              className={`${input_style}`}
            />
          </Form.Item>

          <Form.Item
            name={"password"}
            rules={[{ required: true, message: "Plase input your password" }]}
          >
            <Input.Password
              placeholder="Password"
              className={`${input_style}`}
            />
          </Form.Item>
          <Form.Item
            name={"second_password"}
            rules={[
              { required: true, message: "Plase input your confirm password" },
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              className={`${input_style}`}
            />
          </Form.Item>

          <p className="text-end mt-2 text-[#46A358] text-sm cursor-pointer">
            Forgot Password?
          </p>
          <button className="bg-[#46A358] w-full mt-4 text-white h-[40px] rounded-md">
            {authorizationModalVisibility.loading ? (
              <LoadingOutlined />
            ) : (
              "Register"
            )}
          </button>
        </Form>
        <div className="flex items-center justify-center mt-5 mb-5 gap-4">
          <div className="w-[30%] h-[2px] bg-[#EAEAEA]"></div>
          <p className="w-[40%]text-[#3D3D3D] text-[13px]">Or register with</p>
          <div className="w-[30%] h-[2px] bg-[#EAEAEA]"></div>
        </div>
        <div className={`${icon_style}`} onClick={registerWithGoogle}>
          <GoogleIcon />
          <p>Register with Google</p>
        </div>
        <div className={`${icon_style}`}>
          <FacebookIcon />
          <p>Register with Facebook</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
// davron_raimjonov4447@mail.ru
// 12312321434
