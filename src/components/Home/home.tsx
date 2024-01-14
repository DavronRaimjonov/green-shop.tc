import type { FC } from "react";
import Dashboard from "../dashboard";
import Hero from "../Hero/hero";
import Info from "../info/info";
import Posts from "../Posts/posts";

const Home: FC = () => {
  return (
    <>
      <Hero />
      <Dashboard />
      <Info />
      <Posts />
    </>
  );
};

export default Home;
