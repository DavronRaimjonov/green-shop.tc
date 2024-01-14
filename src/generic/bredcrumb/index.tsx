import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
interface BreadcrumbType {
  pathTitle: string;
}
export const BreadcrumbItem = ({ pathTitle }: BreadcrumbType) => {
  return (
    <Breadcrumb
      className="my-[10px]"
      items={[
        {
          title: <Link to={"/"}>Home</Link>,
        },
        {
          title: pathTitle,
        },
      ]}
    />
  );
};
