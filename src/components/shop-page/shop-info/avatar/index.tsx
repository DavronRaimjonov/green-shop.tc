import type { FC } from "react";
import { useQueryHendler } from "../../../../hooks/useQuery";
import { Avatar, Tooltip } from "antd";
import type { AuthUser } from "../../../../@types";

interface UserType {
  data?: AuthUser;
}
interface AvatarType {
  by_id?: string;
}
const AvatarItem: FC<AvatarType> = ({ by_id }) => {
  const { data }: UserType = useQueryHendler({
    url: `/user/by_id/${by_id}`,
    pathname: "user",
  });
  return (
    <Tooltip title={`${data?.name} ${data?.surname}`}>
      <Avatar
        className="w-[50px] h-[50px] cursor-pointer"
        src={data?.profile_photo}
      />
    </Tooltip>
  );
};

export default AvatarItem;
