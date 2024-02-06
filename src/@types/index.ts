import type React from "react";

export interface HeroMockItemType {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  buttonText: string;
  big_img_url: string;
  small_img_url: string;
}
export interface PostMockItemType {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  img: string;
}
export interface InfoMockItemType {
  id: number;
  title: string;
  description: string;
  img: string;
  vektor: string;
}
export interface AdviceMockItemType {
  id: number;
  title: string;
  description: string;
  img: string;
  border: boolean;
}
export interface WishListItemType {
  flower_id: string;
  route_path: string;
}
export interface AuthUser {
  _id?: string;
  email?: string;
  name?: string;
  surname?: string;
  profile_photo?: string;
  create_account_limit?: number;
  phone_number?: string;
  wishlist?: WishListItemType[];
  username?: string;
  country?: string;
  town?: string;
  street_address?: string;
  additional_street_address?: string;
  state?: string;
  zip?: string;
  followers?: string[];
  permission?: {
    create: boolean;
    update: boolean;
    delete: boolean;
    read: boolean;
  };
}

export interface AuthPropsType {
  message: "succses" | "error";
  data: {
    token: "string";
    user: AuthUser;
  };
}
export interface FooterLinksType {
  id: number;
  title: string;
  link1: string;
  link2: string;
  link3: string;
  link4?: string;
  link5?: string;
}
export interface ProductType {
  _id: string;
  title: string;
  price: number;
  main_image: string;
  discount: boolean;
  discount_price?: number;
  short_description: string;
  description: string;
  detailed_images: string[];
  rate: number;
  views: number;
  tags: [];
  comments: [];
  sold_times: number;
  created_by: string;
  created_at: string;
  category: string;
  count?: number | undefined;
  userPrice?: number;
}
export interface TypeFilter {
  _id: number;
  name: string;
  id: string;
}
export interface CategoryType {
  _id: string;
  title: string;
  count: number;
  route_path: string;
  created_by: string;
  created_at: string;
}

export interface ShopProductType {
  isError?: boolean;
  isLoading?: boolean;
  data?: ProductType;
}

export interface PathProfileType {
  id: number;
  title: string;
  path: string;
  Component: React.FC;
  Icon: React.ForwardRefExoticComponent<any>;
}
export interface ExtraShopInfoType {
  coupon: {
    has_coupon: boolean;
    discount_for: number;
  };
  total_price: number;
}
export interface ChechkoutFromType {
  first_name: string;
  last_name: string;
  country: string;
  town: string;
  state: string;
  payment_method: string;
  phone_number: string;
  street_address: string;
  order_notes?: string;
  additional_street_address?: string;
  zip: string;
}
export interface CheckoutModalType {
  created_by: string;
  shop_list: ProductType[];
  extra_shop_info: ExtraShopInfoType;
  billing_address: ChechkoutFromType;
  _id: string;
  created_at: string;
  __v: number;
}
export type UploadType = {
  file: {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originalFileObj: typeof File;
    response: {
      message: string;
      image_url: {
        api_key: string;
        asset_id: string;
        bytes: number;
        created_at: string;
        etag: string;
        folder: string;
        format:
          | "jpg"
          | "svg"
          | "jpag"
          | "jpeg"
          | "gif"
          | "png"
          | "eps"
          | "raw"
          | "cr2"
          | "nef"
          | "orf"
          | "sr2";
        height: number;
        width: number;
        original_extension: string;
        original_filename: string;
        placeholder: boolean;
        public_id: string;
        resource_type: "image" | "video" | "images" | "videos";
        secure_url: string;
        signature: string;
        tags: string[];
        type: "upload" | "pre-upload";
        url: string;
        version: number;
        version_id: string;
      };
    };
    size: number;
    percent: number;
    status: "done" | "failed";
    thumbUrl: string;
    type: string;
    uid: string;
    xhr: typeof XMLHttpRequest;
  };
};
export interface BlogTypeItem {
  _id: string;
  _v: number;
  views: number;
  title: string;
  short_description: string;
  reaction_length: number;
  created_by: string;
  created_at: string;
  content: string;
}
export interface UserType {
  name?: string;
  surname?: string;
  followers?: string[];
  profile_photo?: string;
  _id?: string;
}
