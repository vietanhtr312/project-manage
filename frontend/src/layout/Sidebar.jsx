import logo from "../assets/logo.svg";
import { House, FolderKanban, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
const Sidebar = ({ display }) => {
  const path = useLocation().pathname;
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[250px] bg-black/10 backdrop-blur-md shadow-md z-50 transition-transform duration-700 ${
        display ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="">
        <div className="flex items-center ml-12 my-10 gap-4">
          <img src={logo} alt="Logo" className="" />
          <div className="flex flex-col text-blue-900 text-lg font-bold tracking-wide">
            <span className="text-white uppercase">Project</span>Tracker
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link to={"/"}>
            <div className={`text-white flex items-center space-x-2 w-full hover:bg-black/30 pl-14 py-3 cursor-pointer ${path === '/' ? 'bg-black/20' : ''}`}>
              <House className="" />
              <span className="text-sm font-semibold">Home</span>
            </div>
          </Link>

          <Link to={"/wbs"}>
            <div className={`text-white flex items-center space-x-2 w-full hover:bg-black/30 hover:backdrop-blur-md pl-14 py-3 cursor-pointer ${path === '/wbs' || path === '/kaban' ? 'bg-black/20' : ''}`}>
              <FolderKanban className="" />
              <span className="text-sm font-semibold">Manage Projects</span>
            </div>
          </Link>
          <div className="text-white flex items-center space-x-2 w-full hover:bg-black/30 hover:backdrop-blur-md pl-14 py-3 cursor-pointer">
            <Settings className="" />
            <span className="text-sm font-semibold">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
