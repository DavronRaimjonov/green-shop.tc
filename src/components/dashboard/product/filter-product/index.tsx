import { Select } from "antd";
import { typeFilterItem } from "../../../../utils";
import type { TypeFilter } from "../../../../@types";
import { useReduxDispatch } from "../../../../hooks/useRedux";
import { setModalCategoryFilterVisibility } from "../../../../redux/modal-slice";
import searchParam from "../../../../generic/searchParam";
type SortType = "default-sorting" | "the-cheapest" | "most-expensive";
type TypeItem = "all-plants" | "new-arrivals" | "sale";
const FilterProduct = () => {
  const filter_text_style =
    "text-[#3D3D3D] text-[16px] cursor-pointer font-[600] transition-colors";
  const filter_text_active_style =
    "cursor-pointer !font-[700] transition-colors pb-[3px] text-[#46A358] border-b-[2px] border-[#46A358]";
  const { paramValue, setParam } = searchParam();
  const sort: string = paramValue("sort") || ("default-sorting" as SortType);
  const type: string = paramValue("type") || ("all-plants" as TypeItem);
  const range_min = String(paramValue("range_min") || 0);
  const range_max = String(paramValue("range_max") || 1000);
  const category: string = paramValue("category") || "house-plants";

  const dispatch = useReduxDispatch();

  const changeSortFilter = (sort: string) => {
    setParam({
      sort,
      type,
      range_min,
      range_max,
      category,
    });
  };
  const typeFilter = (type: string) => {
    setParam({
      sort,
      type,
      range_min,
      range_max,
      category,
    });
  };
  return (
    <div className="flex items-center gap-3 justify-between">
      <div className="flex item-center gap-5 max-sm:gap-[10px]">
        {typeFilterItem.map((props: TypeFilter) => (
          <h3
            onClick={(e) => typeFilter(e.currentTarget.id)}
            className={`${
              type === props.id && filter_text_active_style
            } ${filter_text_style}`}
            key={props._id}
            id={props.id}
          >
            {props.name}
          </h3>
        ))}
      </div>
      <div className="flex gap-3 items-center max-[1027px]:hidden">
        <h2 className="text-[#3D3D3D] font-normal text-[15px]">Sort by:</h2>
        <Select
          onChange={(e: string) => changeSortFilter(e)}
          defaultValue={String(sort)}
          style={{ width: 150, color: "#3D3D3D" }}
          bordered={false}
          className="filter"
          options={[
            { value: "default-sorting", label: "Default Sorting" },
            { value: "the-cheapest", label: "The Cheapest" },
            { value: "most-expensive", label: "Most Expensive" },
          ]}
        />
      </div>
      <div
        className="hidden max-lg:flex cursor-pointer"
        onClick={() => dispatch(setModalCategoryFilterVisibility())}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Ficons%2Fcontroller.svg?alt=media&token=deb9f856-b453-4688-ad78-293bb8b3fb71"
          alt=""
        />
      </div>
    </div>
  );
};

export default FilterProduct;
