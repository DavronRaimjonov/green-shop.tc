import { Tabs } from "antd";
import { profile_tab_items } from "../../../utils";
import type { ProfleTabType } from "../../../utils";
const Body = () => {
  return (
    <div className="my-[40px]">
      <Tabs
        size="large"
        defaultActiveKey="1"
        items={profile_tab_items.map(
          ({ Children, key, label }: ProfleTabType) => ({
            key,
            label,
            children: <Children />,
          }),
        )}
      />
    </div>
  );
};

export default Body;
