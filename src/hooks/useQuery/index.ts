import { useQuery } from "react-query";
import { useAxios } from "../useAxios";

interface QueryType {
  pathname: string;
  url: string;
  params?: object;
}
export const useQueryHendler = (props: QueryType) => {
  const axios = useAxios();
  const { pathname, url, params } = props;
  return useQuery(
    pathname,
    () => axios({ url, params }).then((res) => res.data.data),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    },
  );
};
