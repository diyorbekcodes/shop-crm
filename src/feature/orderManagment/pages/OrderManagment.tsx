import Search, { type SearchProps } from "antd/es/input/Search";
import { ArrowDownUp } from "lucide-react";
import { ConfigProvider, Segmented, Dropdown, type MenuProps } from "antd";
import { useState } from "react";

import ProductTable from "../compponet/ProductTable";
import { useIsDark } from "../../hook/UseIsDark";
import OrderService from "../service/Order";
import { useTheme } from "../../../context/modContext";

export default function OrderManagment() {
  const { data, isPending } = OrderService();
  const { darkMode, toggleDarkMode } = useTheme();
  const orders = Array.isArray(data) ? data : [];

  const isDark = useIsDark();

  const [sortBy, setSortBy] = useState("newest");
  const [status, setStatus] = useState<string>("");
  const [searchValue, setSearchValue] = useState("");

  const sortItems: MenuProps["items"] = [
    {
      key: "newest",
      label: "Newest first",
    },
    {
      key: "oldest",
      label: "Oldest first",
    },
    {
      type: "divider",
    },
    {
      key: "price-high",
      label: "Price: High → Low",
    },
    {
      key: "price-low",
      label: "Price: Low → High",
    },
  ];

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value.trim());
  };

  const sortedOrders = [...orders].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      case "price-high":
        return Number(b.total ?? 0) - Number(a.total ?? 0);

      case "price-low":
        return Number(a.total ?? 0) - Number(b.total ?? 0);

      default:
        return 0;
    }
  });

  console.log("ORDERS:", orders);
  console.log("SORTED ORDERS:", sortedOrders);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: isDark ? "#1F2937" : "#FFFFFF",
          colorBgElevated: isDark ? "#1F2937" : "#FFFFFF",
          colorBgLayout: isDark ? "#111827" : "#F5F6F8",

          colorText: isDark ? "#F9FAFB" : "#111827",
          colorTextSecondary: isDark ? "#9CA3AF" : "#6B7280",

          colorBorder: isDark ? "#374151" : "#E5E7EB",
          colorPrimary: "#4EA674",

          borderRadius: 8,
        },

        components: {
          Input: {
            controlHeight: 40,
            colorBgContainer: isDark ? "#374151" : "#FFFFFF",
            colorText: isDark ? "#FFFFFF" : "#111827",
            colorTextPlaceholder: "#9CA3AF",

            activeBorderColor: "#4EA674",
            hoverBorderColor: "#4EA674",

            activeShadow: "0 0 0 2px rgba(78,166,116,0.15)",
          },

          Segmented: {
            itemColor: isDark ? "#D1D5DB" : "#374151",
            itemHoverColor: isDark ? "#FFFFFF" : "#111827",
            itemSelectedColor: "#FFFFFF",

            trackBg: isDark ? "#374151" : "#F3F4F6",
            itemSelectedBg: "#4EA674",

            borderRadius: 8,
          },

          Table: {
            headerBg: isDark ? "#374151" : "#F9FAFB",
            headerColor: isDark ? "#FFFFFF" : "#111827",

            rowHoverBg: isDark ? "#374151" : "#F3F4F6",

            colorBgContainer: isDark ? "#1F2937" : "#FFFFFF",
            colorText: isDark ? "#E5E7EB" : "#374151",

            borderColor: isDark ? "#374151" : "#E5E7EB",

            cellPaddingBlock: 14,
            cellPaddingInline: 16,
          },

          Pagination: {
            itemBg: isDark ? "#374151" : "#FFFFFF",
            itemActiveBg: "#4EA674",
            itemLinkBg: isDark ? "#374151" : "#FFFFFF",
            colorText: isDark ? "#D1D5DB" : "#374151",
            colorPrimary: "#FFFFFF",
          },

          Dropdown: {
            colorBgElevated: isDark ? "#1F2937" : "#FFFFFF",
            colorText: isDark ? "#F9FAFB" : "#111827",
          },
        },
      }}
    >
      <div className="min-h-screen bg-[#F5F6F8] dark:bg-[#111827] text-[#111827] dark:text-white transition-colors duration-300">
        {/* Header */}
        <div className="flex justify-start items-center mb-4">
          <p className="text-[20px] font-bold dark:text-white">Order List</p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-[#1F2937] p-4 shadow dark:shadow-black/20 rounded-[8px] mt-4">
          {/* Top */}
          <div className="flex items-center justify-between gap-4 w-full">
            {/* Status */}
            <div className="flex items-center h-10">
              <Segmented<string>
                value={status}
                options={[
                  {
                    label: "All orders",
                    value: "",
                  },
                  {
                    label: "Pending",
                    value: "PENDING",
                  },
                  {
                    label: "Processing",
                    value: "PROCESSING",
                  },
                  {
                    label: "Shipped",
                    value: "SHIPPED",
                  },
                  {
                    label: "Delivered",
                    value: "DELIVERED",
                  },
                  {
                    label: "Cancelled",
                    value: "CANCELLED",
                  },
                ]}
                className="!h-10 !p-1.5"
                onChange={(value) => {
                  setStatus(value);
                }}
              />
            </div>

            {/* Search + Sort */}
            <div className="flex items-center gap-2 h-10">
              <Search
                placeholder="Search..."
                allowClear
                className="w-[250px] h-10"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                onSearch={(value) => {
                  onSearch(value);
                }}
              />

              <Dropdown
                trigger={["click"]}
                placement="bottomRight"
                dropdownRender={() => (
                  <div
                    className="
        w-[200px]
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
        p-1.5
        shadow-xl
        dark:border-gray-700
        dark:bg-[#111827]
        dark:shadow-black/40
      "
                  >
                    {/* Newest */}
                    <button
                      type="button"
                      onClick={() => setSortBy("newest")}
                      className={`
          flex
          w-full
          items-center
          justify-between
          rounded-lg
          px-3
          py-2
          text-left
          text-[13px]
          font-medium
          transition-all
          duration-150

          ${
            sortBy === "newest"
              ? `
                bg-gray-100
                text-gray-900
                dark:bg-[#374151]
                dark:text-white
              `
              : `
                text-gray-600
                hover:bg-gray-100
                dark:text-gray-300
                dark:hover:bg-[#1F2937]
                dark:hover:text-white
              `
          }
        `}
                    >
                      <span>Newest first</span>

                      {sortBy === "newest" && (
                        <span className="text-[14px] text-gray-700 dark:text-gray-200">
                          ✓
                        </span>
                      )}
                    </button>

                    {/* Oldest */}
                    <button
                      type="button"
                      onClick={() => setSortBy("oldest")}
                      className={`
          flex
          w-full
          items-center
          justify-between
          rounded-lg
          px-3
          py-2
          text-left
          text-[13px]
          font-medium
          transition-all
          duration-150

          ${
            sortBy === "oldest"
              ? `
                bg-gray-100
                text-gray-900
                dark:bg-[#374151]
                dark:text-white
              `
              : `
                text-gray-600
                hover:bg-gray-100
                dark:text-gray-300
                dark:hover:bg-[#1F2937]
                dark:hover:text-white
              `
          }
        `}
                    >
                      <span>Oldest first</span>

                      {sortBy === "oldest" && (
                        <span className="text-[14px] text-gray-700 dark:text-gray-200">
                          ✓
                        </span>
                      )}
                    </button>

                    {/* Divider */}
                    <div className="my-1.5 h-px bg-gray-200 dark:bg-gray-700" />

                    {/* Price High */}
                    <button
                      type="button"
                      onClick={() => setSortBy("price-high")}
                      className={`
          flex
          w-full
          items-center
          justify-between
          rounded-lg
          px-3
          py-2
          text-left
          text-[13px]
          font-medium
          transition-all
          duration-150

          ${
            sortBy === "price-high"
              ? `
                bg-gray-100
                text-gray-900
                dark:bg-[#374151]
                dark:text-white
              `
              : `
                text-gray-600
                hover:bg-gray-100
                dark:text-gray-300
                dark:hover:bg-[#1F2937]
                dark:hover:text-white
              `
          }
        `}
                    >
                      <span>Price: High → Low</span>

                      {sortBy === "price-high" && (
                        <span className="text-[14px] text-gray-700 dark:text-gray-200">
                          ✓
                        </span>
                      )}
                    </button>

                    {/* Price Low */}
                    <button
                      type="button"
                      onClick={() => setSortBy("price-low")}
                      className={`
          flex
          w-full
          items-center
          justify-between
          rounded-lg
          px-3
          py-2
          text-left
          text-[13px]
          font-medium
          transition-all
          duration-150

          ${
            sortBy === "price-low"
              ? `
                bg-gray-100
                text-gray-900
                dark:bg-[#374151]
                dark:text-white
              `
              : `
                text-gray-600
                hover:bg-gray-100
                dark:text-gray-300
                dark:hover:bg-[#1F2937]
                dark:hover:text-white
              `
          }
        `}
                    >
                      <span>Price: Low → High</span>

                      {sortBy === "price-low" && (
                        <span className="text-[14px] text-gray-700 dark:text-gray-200">
                          ✓
                        </span>
                      )}
                    </button>
                  </div>
                )}
              >
                <button
                  type="button"
                  className={`
      group
      relative
      flex
      h-10
      w-10
      shrink-0
      cursor-pointer
      items-center
      justify-center
      rounded-lg
      border
      transition-all
      duration-200

      ${
        darkMode
          ? sortBy !== "newest"
            ? `
              border-gray-500
              bg-[#374151]
              text-white
              shadow-sm
            `
            : `
              border-gray-700
              bg-[#1F2937]
              text-gray-400
              hover:border-gray-500
              hover:bg-[#374151]
              hover:text-gray-200
            `
          : sortBy !== "newest"
            ? `
              border-gray-400
              bg-gray-100
              text-gray-700
            `
            : `
              border-gray-300
              bg-white
              text-gray-500
              hover:border-gray-400
              hover:bg-gray-50
              hover:text-gray-700
            `
      }
    `}
                >
                  <ArrowDownUp
                    size={17}
                    strokeWidth={2}
                    className="
        transition-transform
        duration-200
        group-hover:scale-110
      "
                  />

                  {sortBy !== "newest" && (
                    <span
                      className={`
          absolute
          -right-0.5
          -top-0.5
          h-2
          w-2
          rounded-full
          ring-2
          ${darkMode ? "bg-gray-300 ring-[#111827]" : "bg-gray-600 ring-white"}
        `}
                    />
                  )}
                </button>
              </Dropdown>
            </div>
          </div>

          {/* Table */}
          <div className="mt-8">
            <ProductTable
              loading={isPending}
              dataSource={sortedOrders}
              searchValue={searchValue}
              status={status}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
