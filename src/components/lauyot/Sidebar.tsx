import {
  CircleUserRound,
  House,
  LayoutGrid,
  LogOut,
  Notebook,
  Package,
  ShoppingCart,
  SquareChevronLeft,
  SquareChevronRight,
  Star,
  Users,
} from "lucide-react";
import logo from "../../assets/img/logo1.png";
import avatar from "../../assets/img/avatar.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../context/modContext";
import useMe from "../../feature/service/hooks/useMe";

export default function Sidebar() {
  const [sidebar, setSidebar] = useState(false);
  const { darkMode } = useTheme();
  const { data, isLoading } = useMe();
  const adminData = data?.data;

  return (
    <div
      className={`
    ${sidebar ? "w-[80px] min-w-[80px]" : "w-[260px] min-w-[260px]"} 
    shrink-0 dark:border border-r-[#2A2D35]
    transition-[width,min-width] duration-500 ease-in-out
    flex flex-col justify-between
    h-screen
    bg-white dark:bg-[#111827]
    shadow-[0px_3px_4px_0px_#0000001F]
  `}
    >
      {/* TOP */}
      <div>
        <div
          className={`${
            sidebar
              ? "justify-center p-5"
              : "justify-between flex items-center p-5"
          }`}
        >
          <div className="flex justify-center">
            {!sidebar && <img src={logo} alt="logo" />}
          </div>

          <div
            className={sidebar ? "w-full flex justify-center" : ""}
            onClick={() => setSidebar(!sidebar)}
          >
            {sidebar ? (
              <SquareChevronRight className="text-[#6A717F] cursor-pointer" />
            ) : (
              <SquareChevronLeft className="text-[#6A717F] cursor-pointer" />
            )}
          </div>
        </div>

        {/* MENU */}
        <div className="px-[14px]">
          {!sidebar && (
            <p className="sidebar-menu dark:text-gray-400">Main menu</p>
          )}

          <div className="mt-3 flex flex-col gap-2">
            {/* DASHBOARD */}
            <NavLink
              to="dashboard"
              className={({ isActive }) =>
                `group relative rounded-md flex items-center gap-2 px-4 py-2.25 transition-all duration-300 
                ${
                  isActive
                    ? "bg-[#4EA674] text-white"
                    : "text-[#6A717F] hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <House color={isActive ? "white" : "#6A717F"} size={20} />

                  {!sidebar && <p>Dashboard</p>}

                  {sidebar && (
                    <span
                      className="
                        absolute left-[68px] top-1/2 -translate-y-1/2
                        z-50 whitespace-nowrap
                        rounded-md px-3 py-2
                        text-sm font-medium
                        text-white
                        bg-[#1F2937] dark:bg-[#374151]
                        shadow-lg
                        opacity-0 invisible
                        group-hover:opacity-100
                        group-hover:visible
                        translate-x-[-5px]
                        group-hover:translate-x-0
                        transition-all duration-200
                        pointer-events-none
                      "
                    >
                      Dashboard
                    </span>
                  )}
                </>
              )}
            </NavLink>

            {/* ORDER MANAGEMENT */}
            <NavLink
              to="orderManagment"
              className={({ isActive }) =>
                `group relative rounded-md flex items-center gap-2 px-4 py-2.25 transition-all duration-300 
                ${
                  isActive
                    ? "bg-[#4EA674] text-white"
                    : "text-[#6A717F] hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <ShoppingCart
                    color={isActive ? "white" : "#6A717F"}
                    size={20}
                  />

                  {!sidebar && <p>Order Management</p>}

                  {sidebar && (
                    <span
                      className="
                        absolute left-[68px] top-1/2 -translate-y-1/2
                        z-50 whitespace-nowrap
                        rounded-md px-3 py-2
                        text-sm font-medium
                        text-white
                        bg-[#1F2937] dark:bg-[#374151]
                        shadow-lg
                        opacity-0 invisible
                        group-hover:opacity-100
                        group-hover:visible
                        translate-x-[-5px]
                        group-hover:translate-x-0
                        transition-all duration-200
                        pointer-events-none
                      "
                    >
                      Order Management
                    </span>
                  )}
                </>
              )}
            </NavLink>

            {/* CUSTOMERS */}
            <NavLink
              to="customer"
              className={({ isActive }) =>
                `group relative rounded-md flex items-center gap-2 px-4 py-2.25 transition-all duration-300 
                ${
                  isActive
                    ? "bg-[#4EA674] text-white"
                    : "text-[#6A717F] hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Users color={isActive ? "white" : "#6A717F"} size={20} />

                  {!sidebar && <p>Customers</p>}

                  {sidebar && (
                    <span
                      className="
                        absolute left-[68px] top-1/2 -translate-y-1/2
                        z-50 whitespace-nowrap
                        rounded-md px-3 py-2
                        text-sm font-medium
                        text-white
                        bg-[#1F2937] dark:bg-[#374151]
                        shadow-lg
                        opacity-0 invisible
                        group-hover:opacity-100
                        group-hover:visible
                        translate-x-[-5px]
                        group-hover:translate-x-0
                        transition-all duration-200
                        pointer-events-none
                      "
                    >
                      Customers
                    </span>
                  )}
                </>
              )}
            </NavLink>

            {/* CATEGORIES */}
            <NavLink
              to="categories"
              className={({ isActive }) =>
                `group relative rounded-md flex items-center gap-2 px-4 py-2.25 transition-all duration-300 
                ${
                  isActive
                    ? "bg-[#4EA674] text-white"
                    : "text-[#6A717F] hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <LayoutGrid
                    color={isActive ? "white" : "#6A717F"}
                    size={20}
                  />

                  {!sidebar && <p>Categories</p>}

                  {sidebar && (
                    <span
                      className="
                        absolute left-[68px] top-1/2 -translate-y-1/2
                        z-50 whitespace-nowrap
                        rounded-md px-3 py-2
                        text-sm font-medium
                        text-white
                        bg-[#1F2937] dark:bg-[#374151]
                        shadow-lg
                        opacity-0 invisible
                        group-hover:opacity-100
                        group-hover:visible
                        translate-x-[-5px]
                        group-hover:translate-x-0
                        transition-all duration-200
                        pointer-events-none
                      "
                    >
                      Categories
                    </span>
                  )}
                </>
              )}
            </NavLink>

            {/* PRODUCTS */}
            <NavLink
              to="products"
              className={({ isActive }) =>
                `group relative rounded-md flex items-center gap-2 px-4 py-2.25 transition-all duration-300 
                ${
                  isActive
                    ? "bg-[#4EA674] text-white"
                    : "text-[#6A717F] hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Package color={isActive ? "white" : "#6A717F"} size={20} />

                  {!sidebar && <p>Products</p>}

                  {sidebar && (
                    <span
                      className="
                        absolute left-[68px] top-1/2 -translate-y-1/2
                        z-50 whitespace-nowrap
                        rounded-md px-3 py-2
                        text-sm font-medium
                        text-white
                        bg-[#1F2937] dark:bg-[#374151]
                        shadow-lg
                        opacity-0 invisible
                        group-hover:opacity-100
                        group-hover:visible
                        translate-x-[-5px]
                        group-hover:translate-x-0
                        transition-all duration-200
                        pointer-events-none
                      "
                    >
                      Products
                    </span>
                  )}
                </>
              )}
            </NavLink>

            {/* BRANDS */}
            <NavLink
              to="brands"
              className={({ isActive }) =>
                `group relative rounded-md flex items-center gap-2 px-4 py-2.25 transition-all duration-300 
                ${
                  isActive
                    ? "bg-[#4EA674] text-white"
                    : "text-[#6A717F] hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Star color={isActive ? "white" : "#6A717F"} size={20} />

                  {!sidebar && <p>Brands</p>}

                  {sidebar && (
                    <span
                      className="
                        absolute left-[68px] top-1/2 -translate-y-1/2
                        z-50 whitespace-nowrap
                        rounded-md px-3 py-2
                        text-sm font-medium
                        text-white
                        bg-[#1F2937] dark:bg-[#374151]
                        shadow-lg
                        opacity-0 invisible
                        group-hover:opacity-100
                        group-hover:visible
                        translate-x-[-5px]
                        group-hover:translate-x-0
                        transition-all duration-200
                        pointer-events-none
                      "
                    >
                      Brands
                    </span>
                  )}
                </>
              )}
            </NavLink>
            <NavLink
              to="banners"
              className={({ isActive }) =>
                `group relative rounded-md flex items-center gap-2 px-4 py-2.25 transition-all duration-300 
                ${
                  isActive
                    ? "bg-[#4EA674] text-white"
                    : "text-[#6A717F] hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Notebook color={isActive ? "white" : "#6A717F"} size={20} />

                  {!sidebar && <p>Banners</p>}

                  {sidebar && (
                    <span
                      className="
                        absolute left-[68px] top-1/2 -translate-y-1/2
                        z-50 whitespace-nowrap
                        rounded-md px-3 py-2
                        text-sm font-medium
                        text-white
                        bg-[#1F2937] dark:bg-[#374151]
                        shadow-lg
                        opacity-0 invisible
                        group-hover:opacity-100
                        group-hover:visible
                        translate-x-[-5px]
                        group-hover:translate-x-0
                        transition-all duration-200
                        pointer-events-none
                      "
                    >
                      Brands
                    </span>
                  )}
                </>
              )}
            </NavLink>

            {/* ADMIN ROLE */}
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `group relative rounded-md flex items-center gap-2 px-4 py-2.25 transition-all duration-300 
                ${
                  isActive
                    ? "bg-[#4EA674] text-white"
                    : "text-[#6A717F] hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <CircleUserRound
                    color={isActive ? "white" : "#6A717F"}
                    size={20}
                  />

                  {!sidebar && <p>Admin role</p>}

                  {sidebar && (
                    <span
                      className="
                        absolute left-[68px] top-1/2 -translate-y-1/2
                        z-50 whitespace-nowrap
                        rounded-md px-3 py-2
                        text-sm font-medium
                        text-white
                        bg-[#1F2937] dark:bg-[#374151]
                        shadow-lg
                        opacity-0 invisible
                        group-hover:opacity-100
                        group-hover:visible
                        translate-x-[-5px]
                        group-hover:translate-x-0
                        transition-all duration-200
                        pointer-events-none
                      "
                    >
                      Admin role
                    </span>
                  )}
                </>
              )}
            </NavLink>
          </div>
        </div>
      </div>

      {/* USER */}
      <div
        className={`
          ${sidebar ? "w-full flex justify-center" : "flex justify-between items-center"} 
          px-[14px] mb-5 
        `}
      >
        <div className="flex gap-[12px] items-center">
          {isLoading ? (
            <div className="flex items-center gap-3">
              {/* Avatar skeleton */}
              <div
                className="
                  w-10
                  h-10
                  rounded-full
                  shrink-0
                  bg-gray-200
                  dark:bg-[#374151]
                  animate-pulse
                "
              />

              {!sidebar && (
                <div className="flex flex-col gap-2">
                  {/* Name skeleton */}
                  <div
                    className="
                      w-[120px]
                      h-4
                      rounded-md
                      bg-gray-200
                      dark:bg-[#374151]
                      animate-pulse
                    "
                  />

                  {/* Email skeleton */}
                  <div
                    className="
                      w-[150px]
                      h-3
                      rounded-md
                      bg-gray-200
                      dark:bg-[#374151]
                      animate-pulse
                    "
                  />
                </div>
              )}
            </div>
          ) : adminData ? (
            <NavLink to="/profile" className="flex items-center gap-3">
              {!sidebar && (
                <div className="w-10 h-10 shrink-0">
                  <img
                    className="rounded-full w-full h-full object-cover"
                    src={adminData.avatar || avatar}
                    alt="avatar"
                  />
                </div>
              )}

              {!sidebar && (
                <div className="min-w-0">
                  <div className="flex gap-2">
                    <p className="text-[#1F2937] dark:text-white font-medium">
                      {adminData.firstName}
                    </p>

                    <p className="text-[#1F2937] dark:text-white font-medium">
                      {adminData.lastName}
                    </p>
                  </div>

                  <p className="text-[#6A717F] dark:text-gray-400 text-sm truncate">
                    {adminData.email}
                  </p>
                </div>
              )}
            </NavLink>
          ) : null}
        </div>

        <LogOut
          onClick={() => {
            localStorage.removeItem("crmAccessToken");
            localStorage.removeItem("crmRefreshToken");
            localStorage.removeItem("admin");

            window.location.href = "/login";
          }}
          className="text-[#6A717F] hover:text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
}
