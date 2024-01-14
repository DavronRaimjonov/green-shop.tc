import { createSlice } from "@reduxjs/toolkit";
import type { CheckoutModalType } from "../@types";

interface InitialStateType {
  track_order?: CheckoutModalType;
}

const initialState: InitialStateType = {};
const trackOrderSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getOrder(state, { payload }) {
      state.track_order = payload;
    },
  },
});

export default trackOrderSlice.reducer;

export const { getOrder } = trackOrderSlice.actions;
