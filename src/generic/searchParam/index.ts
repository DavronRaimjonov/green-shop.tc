import { useSearchParams } from "react-router-dom";

const searchParam = () => {
  const [param, setParams] = useSearchParams();
  const paramValue = (value: string) => param.get(value);
  const setParam = (setParamValue: object) =>
    setParams({
      ...setParamValue,
    });
  return { paramValue, setParam };
};

export default searchParam;
