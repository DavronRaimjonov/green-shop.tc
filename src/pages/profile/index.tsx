import type { FC } from "react";
import { Outlet } from "react-router-dom";
import ProfileDashboard from "../../components/Profile/profile-dashbord";

const Profile: FC = () => {
  return (
    <section className="flex  my-[50px] gap-6">
      <ProfileDashboard />
      <div className="w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default Profile;
