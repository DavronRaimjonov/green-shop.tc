import type { FC } from "react";
import { useReduxSelector } from "../../hooks/useRedux";
import Authorization from "./modals-item/authorization";
import InProcces from "./modals-item/in-proces";
import SiteMap from "./modals-item/sitemap/sitemap";
import ModalFilter from "./modals-item/modal-category";
import CheckoutModal from "./modals-item/checkout-modal";
import TrackModal from "./modals-item/track-modal";

const Modals: FC = () => {
  const {
    modalSliceVisibility,
    authorizationModalVisibility,
    inProccesVisiblity,
    modalCategoryFilterVisibility,
    checkoutModalVisibilty,
    trackOrderModalVisibilty,
  } = useReduxSelector((state) => state.modalSlice);
  return (
    <>
      {modalSliceVisibility && <SiteMap />}
      {authorizationModalVisibility && <Authorization />}
      {inProccesVisiblity && <InProcces />}
      {modalCategoryFilterVisibility && <ModalFilter />}
      {checkoutModalVisibilty && <CheckoutModal />}
      {trackOrderModalVisibilty && <TrackModal />}
    </>
  );
};

export default Modals;
