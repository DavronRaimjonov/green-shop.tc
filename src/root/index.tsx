import type { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Shop from "../pages/shop";
import MainLayout from "../components/main-layout";
import { Home, ProductCart, ProductCheckout, Profile } from "../pages";
import { useIsAuthenticated } from "react-auth-kit";
import { path_profile } from "../utils";
import Blog from "../pages/blog";

const Root: FC = () => {
  const isAuthed = useIsAuthenticated()();
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/shop/:category/:flower_id" element={<Shop />} />
        <Route path="product-cart" element={<ProductCart />} />
        <Route path="/product-checkout" element={<ProductCheckout />} />
        {isAuthed ? (
          <Route path="/profile" element={<Profile />}>
            {path_profile.map(({ id, Component, path }) => (
              <Route key={id} path={path} element={<Component />} />
            ))}
          </Route>
        ) : (
          <Route path="/profile" element={<Navigate to={"/"} />} />
        )}
        <Route path="/blog" element={<Blog />} />
      </Route>
    </Routes>
  );
};

export default Root;
