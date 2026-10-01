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
import { Popover } from "antd";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../../assets/img/logo1.png";
import avatar from "../../assets/img/avatar.png";
import useMe from "../../feature/service/hooks/useMe";

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [sidebar, setSidebar] = useState(false);

  const { data, isLoading } = useMe();
  const adminData = data?.data;

  useEffect(() => {
    if (mobileOpen) {
      setSidebar(false);
    }
  }, [mobileOpen]);

  // ============================================
  // POPOVER CONTENT
  // ============================================

  const getPopoverContent = (title: string) => (
    <div
      className="
        rounded-lg
        px-3
        py-2
        text-sm
        font-medium
        whitespace-nowrap
        text-gray-800
        dark:text-white
      "
    >
      {title}
    </div>
  );

  // ============================================
  // POPOVER STYLE
  // ============================================

  const popoverStyles = {
    root: {
      zIndex: 2147483647,
      width: "max-content",
      maxWidth: "calc(100vw - 16px)",
    },

    container: {
      display: "inline-flex",
      width: "max-content",
      maxWidth: "calc(100vw - 16px)",
      padding: 0,
      borderRadius: "10px",
      background: "rgba(31, 41, 55, 0.88)",
      color: "#F9FAFB",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.24)",
      border: "1px solid rgba(107, 114, 128, 0.5)",
    },
  };

  // ============================================
  // DARK MODE POPOVER
  // ============================================

  const darkPopoverStyles = {
    root: {
      zIndex: 2147483647,
      width: "max-content",
      maxWidth: "calc(100vw - 16px)",
    },

    container: {
      display: "inline-flex",
      width: "max-content",
      maxWidth: "calc(100vw - 16px)",
      padding: 0,
      borderRadius: "10px",
      background: "rgba(31, 41, 55, 0.90)",
      color: "#F9FAFB",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.45)",
      border: "1px solid rgba(75, 85, 99, 0.7)",
    },
  };

  // ============================================
  // MENU ITEM
  // ============================================

  const MenuItem = ({
    to,
    title,
    icon,
  }: {
    to: string;
    title: string;
    icon: React.ReactNode;
  }) => {
    const link = (
      <NavLink
        to={to}
        onClick={onMobileClose}
        className={({ isActive }) =>
          `
            group
            relative
            flex
            items-center
            gap-2
            rounded-md
            px-4
            py-2.25
            transition-all
            duration-300

            ${
              isActive
                ? "bg-[#4EA674] text-white"
                : "text-[#6A717F] hover:bg-gray-100 dark:hover:bg-gray-800"
            }
          `
        }
      >
        <span className="flex shrink-0 text-current">{icon}</span>

        {!sidebar && <p className="truncate">{title}</p>}
      </NavLink>
    );

    // ==========================================
    // SIDEBAR YOPIQ BO'LSA POPOVER
    // ==========================================

    if (sidebar) {
      return (
        <Popover
          content={getPopoverContent(title)}
          placement="right"
          trigger="hover"
          arrow={false}
          zIndex={2147483647}
          getPopupContainer={() => document.body}
          styles={
            document.documentElement.classList.contains("dark")
              ? darkPopoverStyles
              : popoverStyles
          }
          mouseEnterDelay={0.05}
          mouseLeaveDelay={0.05}
        >
          {link}
        </Popover>
      );
    }

    // ==========================================
    // SIDEBAR OCHIQ
    // ==========================================

    return link;
  };

  // ============================================
  // LOGOUT
  // ============================================

  const handleLogout = () => {
    localStorage.removeItem("crmAccessToken");
    localStorage.removeItem("crmRefreshToken");
    localStorage.removeItem("admin");

    window.location.href = "/login";
  };

  return (
    <aside
      onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
          onMobileClose();
        }
      }}
      className={`
        ${
          sidebar
            ? "w-[260px] min-w-[260px] lg:w-[80px] lg:min-w-[80px]"
            : "w-[260px] min-w-[260px] lg:w-[260px] lg:min-w-[260px]"
        }

        fixed
        inset-y-0
        left-0

        z-50

        flex
        shrink-0
        flex-col
        justify-between

        overflow-visible

        border-r
        border-[#E5E7EB]

        bg-white

        shadow-[0px_3px_4px_0px_#0000001F]

        transition-all
        duration-300
        ease-in-out

        dark:border-[#2A2D35]
        dark:bg-[#111827]

        lg:sticky
        lg:top-0
        lg:z-auto
        lg:h-dvh
        lg:translate-x-0

        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}

        lg:transition-[width,min-width]
      `}
    >
      {/* ================================================= */}
      {/* TOP */}
      {/* ================================================= */}

      <div>
        {/* ================================================= */}
        {/* LOGO + COLLAPSE */}
        {/* ================================================= */}

        <div
          className={`
            ${
              sidebar
                ? "flex justify-center p-5"
                : "flex items-center justify-between p-5"
            }
          `}
        >
          {!sidebar && (
            <div className="flex justify-center">
              <img src={logo} alt="logo" />
            </div>
          )}

          <button
            type="button"
            onClick={() => setSidebar((prev) => !prev)}
            className="
              flex
              cursor-pointer
              items-center
              justify-center
              rounded-md
              p-1
              transition-all
              duration-200
              hover:bg-gray-100
              dark:hover:bg-gray-800
            "
          >
            {sidebar ? (
              <SquareChevronRight size={22} className="text-[#6A717F]" />
            ) : (
              <SquareChevronLeft size={22} className="text-[#6A717F]" />
            )}
          </button>
        </div>

        {/* ================================================= */}
        {/* MENU */}
        {/* ================================================= */}

        <div className="px-[14px]">
          {!sidebar && (
            <p className="sidebar-menu dark:text-gray-400">Main menu</p>
          )}

          <div className="mt-3 flex flex-col gap-2">
            {/* DASHBOARD */}

            <MenuItem
              to="dashboard"
              title="Dashboard"
              icon={<House size={20} />}
            />

            {/* ORDER MANAGEMENT */}

            <MenuItem
              to="orderManagment"
              title="Order Management"
              icon={<ShoppingCart size={20} />}
            />

            {/* CUSTOMERS */}

            <MenuItem
              to="customer"
              title="Customers"
              icon={<Users size={20} />}
            />

            {/* CATEGORIES */}

            <MenuItem
              to="categories"
              title="Categories"
              icon={<LayoutGrid size={20} />}
            />

            {/* PRODUCTS */}

            <MenuItem
              to="products"
              title="Products"
              icon={<Package size={20} />}
            />

            {/* BRANDS */}

            <MenuItem to="brands" title="Brands" icon={<Star size={20} />} />

            {/* BANNERS */}

            <MenuItem
              to="banners"
              title="Banners"
              icon={<Notebook size={20} />}
            />

            {/* ADMIN ROLE */}

            <MenuItem
              to="profile"
              title="Admin role"
              icon={<CircleUserRound size={20} />}
            />
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* BOTTOM */}
      {/* ================================================= */}

      <div
        className={`
          mb-5
          px-[14px]

          ${
            sidebar
              ? "flex w-full justify-center"
              : "flex items-center justify-between"
          }
        `}
      >
        {/* ================================================= */}
        {/* USER — FAQAT SIDEBAR OCHIQ BO'LSA */}
        {/* ================================================= */}

        {!sidebar && (
          <div className="flex min-w-0 items-center gap-3">
            {isLoading ? (
              <div className="flex items-center gap-3">
                {/* Avatar skeleton */}

                <div
                  className="
                    h-10
                    w-10
                    shrink-0
                    animate-pulse
                    rounded-full
                    bg-gray-200
                    dark:bg-[#374151]
                  "
                />

                <div className="flex flex-col gap-2">
                  {/* Name */}

                  <div
                    className="
                      h-4
                      w-[120px]
                      animate-pulse
                      rounded-md
                      bg-gray-200
                      dark:bg-[#374151]
                    "
                  />

                  {/* Email */}

                  <div
                    className="
                      h-3
                      w-[150px]
                      animate-pulse
                      rounded-md
                      bg-gray-200
                      dark:bg-[#374151]
                    "
                  />
                </div>
              </div>
            ) : adminData ? (
              <NavLink
                to="/profile"
                onClick={onMobileClose}
                className="
                  flex
                  min-w-0
                  items-center
                  gap-3
                "
              >
                {/* Avatar */}

                <div className="h-10 w-10 shrink-0">
                  <img
                    className="
                      h-full
                      w-full
                      rounded-full
                      object-cover
                    "
                    src={adminData.avatar || avatar}
                    alt="avatar"
                  />
                </div>

                {/* Name + Email */}

                <div className="min-w-0">
                  <div className="flex gap-2">
                    <p
                      className="
                        truncate
                        font-medium
                        text-[#1F2937]
                        dark:text-white
                      "
                    >
                      {adminData.firstName}
                    </p>

                    <p
                      className="
                        truncate
                        font-medium
                        text-[#1F2937]
                        dark:text-white
                      "
                    >
                      {adminData.lastName}
                    </p>
                  </div>

                  <p
                    className="
                      max-w-[150px]
                      truncate
                      text-sm
                      text-[#6A717F]
                      dark:text-gray-400
                    "
                  >
                    {adminData.email}
                  </p>
                </div>
              </NavLink>
            ) : null}
          </div>
        )}

        {/* ================================================= */}
        {/* LOGOUT */}
        {/* ================================================= */}

        <Popover
          content={getPopoverContent("Logout")}
          placement="right"
          trigger={sidebar ? "hover" : []}
          arrow={false}
          zIndex={2147483647}
          getPopupContainer={() => document.body}
          styles={
            document.documentElement.classList.contains("dark")
              ? darkPopoverStyles
              : popoverStyles
          }
          mouseEnterDelay={0.05}
          mouseLeaveDelay={0.05}
        >
          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              h-9
              w-9
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-md
              text-[#6A717F]
              transition-all
              duration-200
              hover:bg-red-50
              hover:text-red-500
              dark:hover:bg-red-500/10
              dark:hover:text-red-400
            "
          >
            <LogOut size={20} />
          </button>
        </Popover>
      </div>
    </aside>
  );
}
