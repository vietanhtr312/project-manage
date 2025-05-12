import React from "react";
import logo from "../assets/logo.svg";
import { House, FolderKanban, Settings } from "lucide-react";
import { Link } from "react-router-dom";
const Sidebar = ({ display }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen w-[250px] bg-gray-100 shadow-lg z-50 transition-transform duration-700 ${
        display ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="">
        <div className="flex items-center ml-12 my-10 gap-4">
          <img src={logo} alt="Logo" className="" />
          <div className="flex flex-col text-blue-900 text-lg font-bold tracking-wide">
            <span className="text-black uppercase">Project</span>Tracker
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link to={"/"}>
            <div className="flex items-center space-x-2 w-full hover:bg-blue-100 pl-16 py-3 cursor-pointer">
              <House className="text-black" />
              <span className="text-sm font-semibold">Dashboard</span>
            </div>
          </Link>

          <Link to={"/wbs"}>
            <div className="flex items-center space-x-2 w-full hover:bg-blue-100 pl-16 py-3 cursor-pointer">
              <FolderKanban className="text-black" />
              <span className="text-sm font-semibold">Projects</span>
            </div>
          </Link>
          <div className="flex items-center space-x-2 w-full hover:bg-blue-100 pl-16 py-3 cursor-pointer">
            <Settings className="text-black" />
            <span className="text-sm font-semibold">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
