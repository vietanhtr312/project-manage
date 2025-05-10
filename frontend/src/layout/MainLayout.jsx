import { Outlet } from "react-router-dom";
import Header from "./Header";
const MainLayout = () => {
  return (
    <div className="flex">
      <div className="flex-1 bg-gray-100 min-h-screen">
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;