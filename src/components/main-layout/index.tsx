import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="w-[80%] m-auto max-sm:w-[95%]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
