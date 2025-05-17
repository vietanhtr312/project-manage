import React, { useEffect, useState } from "react";
import { SlidersHorizontal, Bell, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
const user = {
  name: "John Doe",
  email: "john@gmail.com",
};

const Header = ({ display, setDisplay }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleClickOutside = (event) => {
    if (showDropdown && !event.target.closest(".dropdown")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="h-14 bg-black/10 backdrop-blur-md shadow-md flex items-center justify-between px-4">
      <div onClick={() => setDisplay(!display)} className="cursor-pointer">
        <SlidersHorizontal size={22} color="white"/>
      </div>
      <div className="flex items-center space-x-4 mr-10">
        <Bell size={20} color="white" className="mr-10"/>
        <div
          className="flex items-center space-x-2 cursor-pointer relative user-dropdown-trigger mr-10"
          onClick={toggleDropdown}
        >
          <div className="rounded-full bg-black/20 p-2">
            <User size={20} color="white"/>
          </div>
          <div className="flex flex-col text-white">
            <span className="text-sm font-semibold">{user.name}</span>
            <span className="text-xs text-black/90">{user.email}</span>
          </div>
          <ChevronDown color="white"/>
          {showDropdown && (
            <div className="dropdown absolute top-10 right-0 mt-2 w-48 bg-black/50 text-white border rounded shadow-lg z-30">
              <div className="py-2 px-4 hover:bg-black/30">Profile</div>
              <div className="py-2 px-4 hover:bg-black/30">Settings</div>
              <Link to={"/login"}>
                <div className="py-2 px-4 hover:bg-black/30">Logout</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
