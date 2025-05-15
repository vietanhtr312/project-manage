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
    <div className="h-14 bg-white shadow-md border-b border-gray-200 flex items-center justify-between px-4">
      <div onClick={() => setDisplay(!display)} className="cursor-pointer">
        <SlidersHorizontal size={22} />
      </div>
      <div className="flex items-center space-x-4">
        <Bell size={20} />
        <div
          className="flex items-center space-x-2 cursor-pointer relative user-dropdown-trigger"
          onClick={toggleDropdown}
        >
          <div className="rounded-full bg-gray-100 p-2">
            <User size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{user.name}</span>
            <span className="text-xs text-gray-500">{user.email}</span>
          </div>
          <ChevronDown />
          {showDropdown && (
            <div className="dropdown absolute top-10 right-0 mt-2 w-48 bg-white border rounded shadow-lg z-20">
              <div className="py-2 px-4 hover:bg-gray-100">Profile</div>
              <div className="py-2 px-4 hover:bg-gray-100">Settings</div>
              <Link to={"/login"}>
                <div className="py-2 px-4 hover:bg-gray-100">Logout</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
