import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [displaySidebar, setDisplaySidebar] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-sky-300">
      <Sidebar display={displaySidebar} />
      <div
        className={`transition-all duration-700 ${
          displaySidebar ? "pl-[250px]" : "pl-0"
        }`}
      >
        <Header display={displaySidebar} setDisplay={setDisplaySidebar}/>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
