import { notification } from "antd";
type useNotificationAPiType =
  | 409
  | "like"
  | "unlike"
  | "coupon_length"
  | "add"
  | "coupon_sucsses"
  | "coupon_error"
  | "remove"
  | "nothing"
  | "delete"
  | "edited_adress"
  | "edited_user";
export const useNotificationAPi = () => {
  const notier = (status: useNotificationAPiType) => {
    switch (status) {
      case 409:
        return notification.error({
          message: "User Not Found",
          description: "Email or Password is Wrong",
        });
      case "like":
        return notification.success({
          message: "Added to your wishlist!",
        });
      case "unlike":
        return notification.success({
          message: "Removed from your wishlist!",
        });
      case "add":
        return notification.success({
          message: "Added to you shopping card!",
        });
      case "coupon_sucsses":
        return notification.success({
          message: "Coupon success",
        });
      case "coupon_length":
        return notification.error({
          message: "Please fill all fields!",
        });
      case "remove":
        return notification.success({
          message: "Removed from your shopping card!",
        });
      case "delete":
        return notification.success({
          message: "Deleted from your order!",
        });
      case "coupon_error":
        return notification.error({
          message: "Coupon not found",
        });
      case "nothing":
        return notification.error({
          message: "Nothing status",
        });
      case "edited_adress":
        return notification.success({
          message: "Your address has been updated!",
        });
      case "edited_user":
        return notification.success({
          message: "Your account details has been updated!",
        });
      default:
        return notification.error({
          message: "Missing Status",
        });
    }
  };
  return notier;
};
