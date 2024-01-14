import { Modal } from "antd";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { setModalCategoryFilterVisibility } from "../../../../redux/modal-slice";
import { useQueryClient } from "react-query";
import type { CategoryType } from "../../../../@types";
import PriceRange from "../../../dashboard/category/price/price";
import searchParam from "../../../../generic/searchParam";

const ModalFilter = () => {
  const { modalCategoryFilterVisibility } = useReduxSelector(
    (state) => state.modalSlice,
  );
  type CategoryTypeItem = CategoryType[];
  const dispatch = useReduxDispatch();
  const queryClinent = useQueryClient();
  const data = queryClinent.getQueryData<CategoryTypeItem>("category");
  const { paramValue, setParam } = searchParam();
  const category_style =
    "flex justify-between font-medium cursor-pointer mb-[15px] text-[#3D3D3D] text-base hover:text-[#46A358] transition-colors pl-[15px]";
  const active_category_style = "text-[#46A358] font-bold";
  const getCategoryParams = (searchParam: string) => {
    setParam({
      category: searchParam,
    });
    dispatch(setModalCategoryFilterVisibility());
  };
  const getCategoryRoutePath: string = paramValue("category") || "house-plants";
  return (
    <Modal
      footer={false}
      open={modalCategoryFilterVisibility}
      title="Dashboard"
      onCancel={() => dispatch(setModalCategoryFilterVisibility())}
    >
      <div>
        <h3 className="font-bold">Categories</h3>
        {data?.map((item: CategoryType) => (
          <div
            onClick={() => getCategoryParams(item.route_path)}
            key={item._id}
            className={`${category_style} ${
              item.route_path === getCategoryRoutePath && active_category_style
            }`}
          >
            <h2 className="pt-[10px]">{item.title}</h2>
            <p>({item.count})</p>
          </div>
        ))}
        <PriceRange />
      </div>
    </Modal>
  );
};

export default ModalFilter;
