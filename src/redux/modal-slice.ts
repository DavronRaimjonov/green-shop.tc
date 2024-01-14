import { createSlice } from "@reduxjs/toolkit";

interface AuthModalType {
  loading: boolean;
  open: boolean;
}
interface ModalType {
  modalSliceVisibility: boolean;
  authorizationModalVisibility: AuthModalType;
  inProccesVisiblity: boolean;
  modalCategoryFilterVisibility: boolean;
  checkoutModalVisibilty: boolean;
  trackOrderModalVisibilty: boolean;
}
const initialState: ModalType = {
  modalSliceVisibility: false,
  inProccesVisiblity: false,
  authorizationModalVisibility: {
    loading: false,
    open: false,
  },
  checkoutModalVisibilty: false,
  modalCategoryFilterVisibility: false,
  trackOrderModalVisibilty: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setSiteModalVisiblity(state) {
      state.modalSliceVisibility = !state.modalSliceVisibility;
    },
    setAuthorizationModalVisibility(state, { payload }) {
      state.authorizationModalVisibility = payload;
    },
    setInProccesVisibilty(state) {
      state.inProccesVisiblity = !state.inProccesVisiblity;
    },
    setModalCategoryFilterVisibility(state) {
      state.modalCategoryFilterVisibility =
        !state.modalCategoryFilterVisibility;
    },
    setCheckoutModalVisibilty(state) {
      state.checkoutModalVisibilty = !state.checkoutModalVisibilty;
    },
    setTrackOrderModalVisibilty(state) {
      state.trackOrderModalVisibilty = !state.trackOrderModalVisibilty;
    },
  },
});

export default modalSlice.reducer;

export const {
  setSiteModalVisiblity,
  setAuthorizationModalVisibility,
  setInProccesVisibilty,
  setModalCategoryFilterVisibility,
  setCheckoutModalVisibilty,
  setTrackOrderModalVisibilty,
} = modalSlice.actions;
