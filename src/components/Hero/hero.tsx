import { Carousel } from "antd";
import type { FC } from "react";
import { hero_mock } from "../../utils";
import HeroItem from "./HeroItem/hero-item";

const Hero: FC = () => {
  return (
    <div className="h-[450px] max-md:h-[400px] bg-[#F5F5F5]">
      <Carousel autoplay className="mt-5">
        {hero_mock.map((item) => (
          <HeroItem key={item.id} {...item} />
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
