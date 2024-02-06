import axios from "axios";
interface AxiosPops {
  url: string;
  method?: "PUT" | "POST" | "PATCH" | "DELETE";
  body?: object;
  headers?: object;
  params?: object;
}
export const useAxios = () => {
  const request = (props: AxiosPops) => {
    const { url, body, method = "GET", headers, params } = props;

    return axios({
      url: `${process.env.REACT_APP_BASE_URL}${url}`,
      method,
      data: body,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        "Accsess-Control-Allow-Origin": true,
        ...headers,
      },
      params: {
        access_token: "65a7d6833074d58d24476752",
        ...params,
      },
    });
  };

  return request;
};
// "64f476a63c25fcecd17fd5ab"
