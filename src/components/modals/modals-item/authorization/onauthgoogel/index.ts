import { useSignIn } from "react-auth-kit";
import type { AuthPropsType } from "../../../../../@types";
import { signInWithGoogle } from "../../../../../config";
import { useAxios } from "../../../../../hooks/useAxios";
import { useReduxDispatch } from "../../../../../hooks/useRedux";
import {
  setAuthorizationModalVisibility,
  setInProccesVisibilty,
} from "../../../../../redux/modal-slice";
import { notification } from "antd";
interface OnAuthGoogleUrlType {
  url: string;
  registred?: boolean;
}
export const OnAuthGoogle = () => {
  const dispatch = useReduxDispatch();
  const axios = useAxios();
  const signIn = useSignIn();
  const onAuthGoogle = async ({ url, registred }: OnAuthGoogleUrlType) => {
    try {
      dispatch(
        setAuthorizationModalVisibility({ open: false, loading: false }),
      );
      dispatch(setInProccesVisibilty());
      const response = await signInWithGoogle();
      const { data }: { data: AuthPropsType } = await axios({
        url,
        method: "POST",
        body: {
          email: response.user.email,
          name: response.user.displayName?.split(" ")[0] || " ",
          surname: response.user.displayName?.split(" ")[1] || " ",
        },
      });
      signIn({
        token: data.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: data.data.user,
      });
      dispatch(setInProccesVisibilty());
      localStorage.setItem("token", data.data.token);
      notification.success({ message: "Authorzation succsess with Google" });
    } catch (error) {
      dispatch(
        setAuthorizationModalVisibility({ open: false, loading: false }),
      );
      dispatch(setInProccesVisibilty());
      if (registred) {
        notification.error({ message: "Email already registered!" });
      }
    }
  };
  return onAuthGoogle;
};
