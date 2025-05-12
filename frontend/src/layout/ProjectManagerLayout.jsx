import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const ProjectManagerLayout = () => {
  const tabs = [
    { label: "WBS", path: "/wbs" },
    { label: "Kanban", path: "/kaban" },
  ];

  return (
    <div>
      <div className="flex space-x-4 border-b p-2 bg-white m-3 rounded-xl">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-t ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>

      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};
