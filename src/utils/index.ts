import type {
  AdviceMockItemType,
  FooterLinksType,
  HeroMockItemType,
  InfoMockItemType,
  PathProfileType,
  PostMockItemType,
  TypeFilter,
} from "../@types";
import {
  DashboardOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import post from "../assets/img/post.png";
import post1 from "../assets/img/post1.png";
import post2 from "../assets/img/post2.png";
import post3 from "../assets/img/post3.png";
import info from "../assets/img/info.png";
import info1 from "../assets/img/info1.png";
import vektor from "../assets/img/vektor.png";
import advice from "../assets/img/advice.png";
import advice1 from "../assets/img/advice1.png";
import advice2 from "../assets/img/advice2.png";
import Details from "../components/Profile/profile-pages/details";
import Products from "../components/Profile/profile-pages/products";
import Adress from "../components/Profile/profile-pages/adress";
import Wishlist from "../components/Profile/profile-pages/wishlist";
import Order from "../components/Profile/profile-pages/order";
import About from "../components/user/body/about";
import ProductsItem from "../components/user/body/products";
import Posts from "../components/user/body/posts";
import Likes from "../components/user/body/likes";
import Followers from "../components/user/body/followers";
import type { FC } from "react";
type HeroMockType = HeroMockItemType[];
type PostItem = PostMockItemType[];
type InfoItem = InfoMockItemType[];
type AdviceITem = AdviceMockItemType[];
type FooterItem = FooterLinksType[];
type TypeFilterItem = TypeFilter[];
type PathProfileTypeItem = PathProfileType[];
export interface ProfleTabType {
  key: string;
  label: string;
  Children: FC;
}
export const hero_mock: HeroMockType = [
  {
    id: 0,
    title: "Le’s Make a Better",
    subTitle: "WELCOME TO GREENSHOP",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
    buttonText: "SHOP NOW",
    big_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower1.png?alt=media&token=0b53d608-7264-4c54-b497-a9bf054fcd9d",
    small_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower2.png?alt=media&token=905a94e2-1250-4e56-9dcb-d16bbb1a31ca",
  },
  {
    id: 1,
    title: "LET'S LIVE IN A BETTER",
    subTitle: "WELCOME TO GREENSHOP",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
    buttonText: "LE'TS START",
    big_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-1.png?alt=media&token=74ea8d3d-06b5-41e7-bb12-7caaf3035a6d",
    small_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower2.png?alt=media&token=905a94e2-1250-4e56-9dcb-d16bbb1a31ca",
  },
  {
    id: 2,
    title: "LET'S OBSERVE A BETTER",
    subTitle: "WELCOME TO GREENSHOP",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!",
    buttonText: "GET CREDITS",
    big_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fhero-flower-2.png?alt=media&token=5b5addec-d344-4897-a983-95c9b10a1662",
    small_img_url:
      "https://firebasestorage.googleapis.com/v0/b/aema-image-upload.appspot.com/o/greenshop%2Fimages%2Fflower2.png?alt=media&token=905a94e2-1250-4e56-9dcb-d16bbb1a31ca",
  },
];
export const post_item: PostItem = [
  {
    id: 1,
    title: "Cactus & Succulent Care Tips",
    subTitle: "September 12  I Read in 6 minutes",
    description:
      "Cacti are succulents are easy care plants for any home or patio. ",
    img: post,
  },
  {
    id: 2,
    title: "Top 10 Succulents for Your Home",
    subTitle: "September 12  I Read in 6 minutes",
    description: "Best in hanging baskets. Prefers medium to high light.",
    img: post1,
  },
  {
    id: 3,
    title: "Cacti & Succulent Care Tips",
    subTitle: "September 15  I Read in 3 minutes",
    description:
      "Cacti and succulents thrive in containers and because most are.. ",
    img: post2,
  },
  {
    id: 4,
    title: "Best Houseplants Room by Room",
    subTitle: "September 15  I Read in 2 minutes",
    description: "The benefits of houseplants are endless. In addition to..",
    img: post3,
  },
];

export const info_item: InfoItem = [
  {
    id: 0,
    title: "Summer cactus & succulents",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants",
    img: info,
    vektor,
  },
  {
    id: 1,
    title: "STYLING TRENDS & MUCH MORE",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants",
    img: info1,
    vektor,
  },
];

export const advice_item: AdviceITem = [
  {
    id: 0,
    title: "Garden Care",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants.",
    img: advice,
    border: false,
  },
  {
    id: 1,
    title: "Plant Renovation",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants.",
    img: advice1,
    border: true,
  },
  {
    id: 2,
    title: "Watering Graden",
    description:
      "We are an online plant shop offering a wide range of cheap and trendy plants.",
    img: advice2,
    border: true,
  },
];

export const footer_links: FooterItem = [
  {
    id: 1,
    title: "My Account",
    link1: "My Account",
    link2: "Address",
    link3: "Wishlist",
  },
  {
    id: 2,
    title: "Categories",
    link1: "House Plants",
    link2: "Potter Plants",
    link3: "Seeds",
    link4: "Small Plants",
    link5: "Accessories",
  },
];
export const typeFilterItem: TypeFilterItem = [
  {
    _id: 1,
    name: " All Plants",
    id: "all-plants",
  },
  {
    _id: 2,
    name: "New Arrivals",
    id: "new-arrivals",
  },
  {
    _id: 3,
    name: " Sale",
    id: "sale",
  },
];

export const path_profile: PathProfileTypeItem = [
  {
    id: 1,
    path: "",
    Component: Details,
    Icon: UserOutlined,
    title: "Account Details",
  },
  {
    id: 2,
    path: "my-products",
    Component: Products,
    Icon: ShoppingOutlined,
    title: "My Products",
  },
  {
    id: 3,
    path: "address",
    Component: Adress,
    Icon: EnvironmentOutlined,
    title: "Adress",
  },
  {
    id: 4,
    path: "wishlist",
    Component: Wishlist,
    Icon: HeartOutlined,
    title: "Wishlist",
  },
  {
    id: 5,
    path: "track-order",
    Component: Order,
    Icon: DashboardOutlined,
    title: "Track Order",
  },
];

export const profile_tab_items: ProfleTabType[] = [
  {
    key: "1",
    label: "About",
    Children: About,
  },
  {
    key: "2",
    label: "Products",
    Children: ProductsItem,
  },
  {
    key: "3",
    label: "Posts",
    Children: Posts,
  },
  {
    key: "4",
    label: "Likees",
    Children: Likes,
  },
  {
    key: "5",
    label: "Followers",
    Children: Followers,
  },
];
