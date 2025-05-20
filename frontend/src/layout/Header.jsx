import React, { useEffect, useState } from "react";
import { SlidersHorizontal, Bell, User, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import axiosClient from "../api/axiosClient";

const Header = ({ display, setDisplay }) => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosClient.get("/notifications/me");
        const notifications = response.data.data;
        if (response.data.success) {
          const unreadCount = notifications.filter(
            (notification) => !notification.isRead
          ).length;
          setNewNotificationCount(unreadCount);
          setNotifications(notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

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

  const handleLogout = () => {
    clearUser();
    navigate("/login");
  };

  const handleMarkAllAsRead = async () => {
    try {
      const response = await axiosClient.patch("/notifications/marks-all-read");
      if (response.data.success)
        setNotifications((prev) =>
          prev.map((notification) => ({ ...notification, isRead: true }))
        );
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
    setNewNotificationCount(0);
  }

  const handleClickNotification = async (notification) => {
    if (!notification.isRead) {
      try {
        const response = await axiosClient.patch(`/notifications/${notification._id}/marks-read`);
        if (response.data.success)
          setNotifications((prev) =>
            prev.map((n) =>
              n._id === notification._id ? { ...n, isRead: true } : n
            )
          );
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }
    setShowNotifications(false);
    setNewNotificationCount((prev) => prev - 1);
    navigate('/kaban');
  }

  return (
    <div className="h-14 bg-black/10 shadow-md flex items-center justify-between px-4 z-50">
      <div onClick={() => setDisplay(!display)} className="cursor-pointer">
        <SlidersHorizontal size={22} color="white" />
      </div>
      <div className="flex items-center space-x-4 mr-10">
        <div className="relative">
          <Bell
            size={20}
            color="white"
            className="mr-10 cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
            id="notification-bell"
          />
          {newNotificationCount > 0 && (
            <span className="absolute -top-2 right-8 bg-red-500 text-white text-xs rounded-full px-1 py-0.5 min-w-[18px] text-center">
              {newNotificationCount}
            </span>
          )}
          <div className={`absolute top-8 right-0 mt-2 w-72 max-h-[400px] overflow-auto bg-black/50 text-white border rounded shadow-lg z-30 ${showNotifications ? "block" : "hidden"}`}>
            <div className="py-2 px-4 border-b font-semibold">
              Notifications
              {
                newNotificationCount > 0 && (
                  <span
                    className="text-xs text-blue-500 cursor-pointer float-right mt-1"
                    onClick={handleMarkAllAsRead}
                  >
                    Mark all as read
                  </span>
                )
              }
            </div>
            {
              notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className="py-2 px-4 hover:bg-black/30 cursor-pointer flex items-center justify-between"
                    onClick={handleClickNotification.bind(null, notification)}
                  >
                    <span>{notification.message}</span>
                    {!notification.isRead && (
                      <span className="ml-1 w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-2 px-4 text-center">No notifications</div>
              )
            }
          </div>
        </div>
        <div
          className="flex items-center space-x-2 cursor-pointer relative user-dropdown-trigger mr-10"
          onClick={toggleDropdown}
        >
          <div className="rounded-full bg-black/20 p-2">
            <User size={20} color="white" />
          </div>
          <div className="flex flex-col text-white">
            <span className="text-sm font-semibold">{user?.name}</span>
            <span className="text-xs text-black/90">{user?.email}</span>
          </div>
          <ChevronDown color="white" />
          {showDropdown && (
            <div className="dropdown absolute top-10 right-0 mt-2 w-48 bg-black/50 text-white border rounded shadow-lg z-30">
              <div className="py-2 px-4 hover:bg-black/30">Profile</div>
              <div className="py-2 px-4 hover:bg-black/30">Settings</div>
              <div
                className="py-2 px-4 hover:bg-black/30"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
