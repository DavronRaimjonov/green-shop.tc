import { createSlice } from "@reduxjs/toolkit";
interface initialStateType {
  coupon: number;
}

const initialState: initialStateType = {
  coupon: 0,
};

const couponSlice = createSlice({
  initialState,
  name: "coupon",
  reducers: {
    setCoupon(state, { payload }) {
      state.coupon = payload;
    },
  },
});
export default couponSlice.reducer;

export const { setCoupon } = couponSlice.actions;
