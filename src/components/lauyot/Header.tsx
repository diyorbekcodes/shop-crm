import { ConfigProvider, Input } from "antd";
import { BellDot, Moon, Search as SearchIcon, Sun } from "lucide-react";
import avatar from "../../assets/img/avatar.png";
import { useTheme } from "../../context/modContext";
import { NavLink, useLocation } from "react-router-dom";
import useMe from "../../feature/service/hooks/useMe";
export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const { data } = useMe();
  const adminData = data?.data;
  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/orderManagment": "Orders",
    "/profile": "Profile",
    "/customer": "Customers",
    "/products": "Products",
    "/categories": "Categories",
    "/brands": "Brands",
  };

  const pageTitle = pageTitles[location.pathname] || "Dashboard";
  return (
    <div
      className={
        darkMode
          ? "flex h-[66px] w-full items-center border border-l-0 border-b-[#2A2D35] justify-between pl-[24px] pr-[44px] bg-[#111827]"
          : "flex h-[66px] w-full items-center justify-between pl-[24px] pr-[44px] bg-white"
      }
    >
      <div>
        <p className={darkMode ? "text-white" : "text-[#023337]"}>
          {pageTitle}
        </p>
      </div>

      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="flex items-stretch h-[40px]">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#4EA674",
                borderRadius: 8,
              },
              components: {
                Input: {
                  colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",
                  colorText: darkMode ? "#F9FAFB" : "#111827",
                  colorTextPlaceholder: "#9CA3AF",
                  colorBorder: darkMode ? "#374151" : "#D1D5DB",
                  hoverBorderColor: "#4EA674",
                  activeBorderColor: "#4EA674",
                  activeShadow: "0 0 0 2px rgba(78,166,116,0.15)",
                },
              },
            }}
          >
            <Input
              placeholder="input search text"
              style={{
                width: 260,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
          </ConfigProvider>

          {/* Search tugmasi */}
          <button
            type="button"
            className={`
    flex
    h-full
    items-center
    justify-center
    rounded-r-[8px]
    border
    px-3
    transition-all
    duration-200
    active:scale-[0.97]

    ${
      darkMode
        ? "border-gray-600 bg-gray-800 border-l-0 text-gray-200 hover:bg-gray-700"
        : "border-gray-300 border-l-0 bg-white text-gray-500 hover:bg-gray-50"
    }
  `}
          >
            <SearchIcon size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <BellDot
            size={20}
            className={darkMode ? "text-gray-300" : "text-[#6A717F]"}
          />
        </div>

        {/* Dark / Light toggle */}
        <div
          onClick={toggleDarkMode}
          className={
            darkMode
              ? "relative w-[56px] h-[30px] rounded-full p-1 cursor-pointer transition-colors duration-300 bg-[#374151]"
              : "relative w-[56px] h-[30px] rounded-full p-1 cursor-pointer transition-colors duration-300 bg-[#EAF8E7]"
          }
        >
          <div
            className={
              darkMode
                ? "flex bg-[#1e242e] items-center justify-center w-[22px] h-[22px] rounded-full  shadow-md transition-transform duration-300 translate-x-[26px]"
                : "flex items-center justify-center w-[22px] h-[22px] rounded-full bg-white shadow-md transition-transform duration-300 translate-x-0"
            }
          >
            {darkMode ? (
              <Moon
                size={14}
                className={darkMode ? "text-white" : "text-[#4EA674]"}
              />
            ) : (
              <Sun size={14} className="text-[#4EA674]" />
            )}
          </div>
        </div>

        {/* Avatar */}
        <NavLink to="profile">
          <img
            src={adminData?.avatar || avatar}
            alt="avatar"
            className={
              darkMode
                ? "h-[40px] w-[40px] rounded-full object-cover ring-2 ring-[#374151]"
                : "h-[40px] w-[40px] rounded-full object-cover ring-2 ring-transparent"
            }
          />
        </NavLink>
      </div>
    </div>
  );
}
