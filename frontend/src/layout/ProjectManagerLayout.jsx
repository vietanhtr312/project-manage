import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export const ProjectManagerLayout = () => {
  const tabs = [
    { label: "WBS", path: "/wbs" },
    { label: "Kanban", path: "/kaban" },
  ];

  return (
    <div>
      <div className="flex space-x-4 p-2 bg-black/20 m-3 rounded-xl px-4">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive
                  ? "bg-white/20 text-white"
                  : "bg-black/10 text-white/90 hover:bg-black/20 hover:text-white"
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
