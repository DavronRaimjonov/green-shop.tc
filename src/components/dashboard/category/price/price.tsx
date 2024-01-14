import { Slider } from "antd";
import { useState, type FC } from "react";
import { setModalCategoryFilterVisibility } from "../../../../redux/modal-slice";
import { useReduxDispatch } from "../../../../hooks/useRedux";
import searchParam from "../../../../generic/searchParam";

const PriceRange: FC = () => {
  const { paramValue, setParam } = searchParam();
  const sort: string = paramValue("sort") || "default-sorting";
  const type: string = paramValue("type") || "all-plants";
  const category: string = paramValue("category") || "house-plants";
  const dispatch = useReduxDispatch();
  const [value, setValue] = useState<[number, number]>([
    Number(paramValue("range_min") || 0),
    Number(paramValue("range_max") || 1000),
  ]);
  const filterRange = () => {
    setParam({
      range_min: String(value[0]),
      range_max: String(value[1]),
      sort,
      type,
      category,
    });
  };
  const modalBtn = () => {
    filterRange();
    dispatch(setModalCategoryFilterVisibility());
  };
  return (
    <div>
      <Slider
        min={0}
        max={1000}
        range
        defaultValue={value}
        onChange={(e) => setValue(e)}
      />
      <div className="flex items-center gap-2">
        <p className="text-[#3D3D3D] text-[16px] font-[500]">Price:</p>
        <p className="text-[#46A358] text-[15px] font-bold">
          {value[0]}$-{value[1]}$
        </p>
      </div>
      <button
        onClick={filterRange}
        className="w-[90px] h-[40px] bg-[#46A358] text-white rounded-md my-3 max-lg:hidden"
      >
        Filter
      </button>
      <button
        onClick={modalBtn}
        className="w-[90px] h-[40px] bg-[#46A358] text-white rounded-md my-3 hidden max-lg:block"
      >
        Filter
      </button>
    </div>
  );
};

export default PriceRange;
