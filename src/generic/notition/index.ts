import { notification } from "antd";
type useNotificationAPiType =
  | 409
  | 406
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
  | "missing_value"
  | "edited_user"
  | "created_blog"
  | "token_created_blog"
  | "send_invitation"
  | "follow"
  | "unfollow";
export const useNotificationAPi = () => {
  const notier = (status: useNotificationAPiType) => {
    switch (status) {
      case 409:
        return notification.error({
          message: "User Not Found",
          description: "Email or Password is Wrong",
        });
      case 406:
        return notification.error({ message: "Email already registered!" });
      case "like":
        return notification.success({
          message: "Added to your wishlist!",
        });
      case "missing_value":
        return notification.error({ message: "Please fill all fields!" });
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
      case "created_blog":
        return notification.success({
          message: "Created Blog",
        });
      case "token_created_blog":
        return notification.info({
          message: "Your account has not been approved by admins!",
        });
      case "send_invitation":
        return notification.success({
          message: "Your invitation has been sent!",
        });
      case "follow":
        return notification.success({
          message: "Successfully followed!",
        });
      case "unfollow":
        return notification.success({
          message: "Successfully unfollowed!",
        });
      default:
        return notification.error({
          message: "Missing Status",
        });
    }
  };
  return notier;
};
