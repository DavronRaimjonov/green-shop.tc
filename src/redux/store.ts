import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal-slice";
import productSlice from "./product-slice";
import couponSlice from "./coupon";
import trackOrderSlice from "./track-order-slice";

const store = configureStore({
  reducer: {
    modalSlice,
    productSlice,
    couponSlice,
    trackOrderSlice,
  },
});

export default store;

export type RootStore = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
