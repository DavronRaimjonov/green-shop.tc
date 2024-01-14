import { createSlice } from "@reduxjs/toolkit";
import { type ProductType } from "../@types";
import { getStore, setStore } from "../store";

interface InitialStateType {
  data: ProductType[];
}

const initialState: InitialStateType = {
  data: getStore("korzinka") || [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getData(state, { payload }) {
      if (state.data?.some((value) => value._id === payload._id)) {
        state.data = state.data.map((item) => {
          if (item._id === payload._id) {
            return {
              ...item,
              count: Number(item.count) + 1,
              userPrice: (Number(item.count) + 1) * item.price,
            };
          }
          return item;
        });
        return;
      }

      state.data = [...state.data, { ...payload, count: 1 }];
      setStore("korzinka", state.data);
    },
    deleteData(state, { payload }) {
      state.data = [...state.data.filter((item) => item._id !== payload)];
      setStore("korzinka", state.data);
    },
    incrementCount(state, { payload }) {
      state.data = state.data.map((value) =>
        value._id === payload
          ? { ...value, count: Number(value.count) + 1 }
          : value,
      );
      setStore("korzinka", state.data);
    },
    decrementCount(state, { payload }) {
      state.data = state.data.map((value) =>
        value._id === payload
          ? { ...value, count: Number(value.count) - 1 }
          : value,
      );
      setStore("korzinka", state.data);
    },
    deleteDataItem(state) {
      state.data = [];
      localStorage.removeItem("korzinka");
    },
  },
});

export default productSlice.reducer;

export const {
  getData,
  deleteData,
  incrementCount,
  decrementCount,
  deleteDataItem,
} = productSlice.actions;
// const { type, id }: ToggleCountType = payload;
// if (type === "add") {
//   const newData = state.data?.map((item) => {
//     if (item._id === id) {
//       return {
//         ...item,
//         count: Number(item.count) + 1,
//         userPrice: (Number(item.count) + 1) * item.price,
//       };
//     }
//     return item;
//   });
//   return { ...state, data: newData };
// }
// if (type === "remove") {
//   const newData = state.data?.map((item) => {
//     if (item._id === id) {
//       return {
//         ...item,
//         count: Number(item.count) - 1,
//         userPrice: (Number(item.count) - 1) * item.price,
//       };
//     }
//     return item;
//   });
//   return { ...state, data: newData };
// }
