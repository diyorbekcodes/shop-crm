import { ListFilter, Search as SearchIcon } from "lucide-react";
import { ConfigProvider, Dropdown, Input, Table, Tag } from "antd";

import type { ColumnsType } from "antd/es/table";
import type { MenuProps } from "antd";

import { useIsDark } from "../../hook/UseIsDark";
import DashboardService from "../service/DashboardService";
import type { Product } from "../types/ProductType";
import type { SearchProps } from "antd/es/input";

import { useState } from "react";

const BestSellTable = () => {
  const darkMode = useIsDark();

  const { bestSellingProduct } = DashboardService();

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { Search } = Input;

  /* =====================================================
     SEARCH
  ===================================================== */

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value);
  };

  /* =====================================================
     API
  ===================================================== */

  const { data: bestSell, isPending } = bestSellingProduct();

  /* =====================================================
     FILTER
  ===================================================== */

  const filterSearch = bestSell?.filter((product: Product) => {
    const search = searchValue.toLowerCase().trim();

    const productMatch = product.name?.toLowerCase().includes(search);

    const skuMatch = product.sku?.toLowerCase().includes(search);

    const statusMatch = product.status?.toLowerCase().includes(search);

    const matchesSearch = !search || productMatch || skuMatch || statusMatch;

    const matchesStatus =
      statusFilter === "all" ||
      product.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  /* =====================================================
     FILTER MENU
  ===================================================== */

  const filterItems: MenuProps["items"] = [
    {
      key: "all",
      label: (
        <div className="flex min-w-[170px] items-center justify-between">
          <span>All products</span>

          {statusFilter === "all" && (
            <span className="font-bold text-[#4EA674]">✓</span>
          )}
        </div>
      ),
    },

    {
      key: "Stock",
      label: (
        <div className="flex min-w-[170px] items-center justify-between">
          <span>In stock</span>

          {statusFilter === "Stock" && (
            <span className="font-bold text-[#4EA674]">✓</span>
          )}
        </div>
      ),
    },

    {
      key: "Out of Stock",
      label: (
        <div className="flex min-w-[170px] items-center justify-between">
          <span>Out of stock</span>

          {statusFilter === "Out of Stock" && (
            <span className="font-bold text-red-400">✓</span>
          )}
        </div>
      ),
    },

    {
      key: "Low",
      label: (
        <div className="flex min-w-[170px] items-center justify-between">
          <span>Low stock</span>

          {statusFilter === "Low Stock" && (
            <span className="font-bold text-orange-400">✓</span>
          )}
        </div>
      ),
    },
  ];

  const handleFilterClick: MenuProps["onClick"] = ({ key }) => {
    setStatusFilter(key);
  };

  /* =====================================================
     TABLE COLUMNS
  ===================================================== */

  const columns: ColumnsType<Product> = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",

      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-[45px]
              w-[45px]
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-[10px]
              border
              border-[#E5E7EB]
              bg-[#F9FAFB]
              dark:border-[#374151]
              dark:bg-[#111827]
            "
          >
            <img
              src={record.image}
              alt={record.name}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <span
              className="
                truncate
                font-semibold
                text-[#23272E]
                dark:text-[#F9FAFB]
              "
            >
              {record.name}
            </span>

            <span
              className="
                mt-[2px]
                text-xs
                text-[#6B7280]
                dark:text-[#9CA3AF]
              "
            >
              SKU: {record.sku}
            </span>
          </div>
        </div>
      ),
    },

    {
      title: "Orders",
      dataIndex: "totalOrders",
      key: "totalOrders",

      render: (value) => (
        <span
          className="
            font-medium
            text-[#374151]
            dark:text-[#E5E7EB]
          "
        >
          {Number(value).toLocaleString("en-US")}
        </span>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",

      render: (status) => {
        const color =
          status === "Stock"
            ? "green"
            : status === "Out of Stock"
              ? "red"
              : "orange";

        return (
          <Tag
            color={color}
            variant="filled"
            className="!rounded-full !px-2.5 !py-[2px]"
          >
            {status}
          </Tag>
        );
      },
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",

      render: (price) => (
        <span
          className="
            font-semibold
            text-[#23272E]
            dark:text-[#F3F4F6]
          "
        >
          {Number(price).toLocaleString("uz-UZ")} so'm
        </span>
      ),
    },

    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",

      render: (revenue) => (
        <span
          className="
            font-semibold
            text-[#23272E]
            dark:text-[#F3F4F6]
          "
        >
          {Number(revenue).toLocaleString("uz-UZ")} so'm
        </span>
      ),
    },
  ];

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4EA674",

          colorBgBase: darkMode ? "#111827" : "#FFFFFF",

          colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",

          colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

          colorText: darkMode ? "#F9FAFB" : "#111827",

          colorTextSecondary: darkMode ? "#9CA3AF" : "#6B7280",

          colorBorder: darkMode ? "#374151" : "#E5E7EB",

          borderRadius: 9,
        },

        components: {
          Table: {
            headerBg: darkMode ? "#111827" : "#F9FAFB",

            headerColor: darkMode ? "#F9FAFB" : "#111827",

            rowHoverBg: darkMode ? "#263449" : "#F9FAFB",

            borderColor: darkMode ? "#374151" : "#E5E7EB",

            colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",

            cellPaddingBlock: 13,

            cellPaddingInline: 16,
          },

          Input: {
            colorBgContainer: darkMode ? "#111827" : "#FFFFFF",

            colorText: darkMode ? "#F9FAFB" : "#111827",

            colorTextPlaceholder: darkMode ? "#6B7280" : "#9CA3AF",

            colorBorder: darkMode ? "#374151" : "#E5E7EB",

            hoverBorderColor: "#4EA674",

            activeBorderColor: "#4EA674",

            activeShadow: "0 0 0 2px rgba(78,166,116,0.12)",

            colorIcon: darkMode ? "#9CA3AF" : "#6B7280",

            colorIconHover: "#4EA674",
          },

          Dropdown: {
            colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

            colorText: darkMode ? "#F9FAFB" : "#111827",

            colorTextDescription: darkMode ? "#9CA3AF" : "#6B7280",

            controlItemBgHover: darkMode ? "#374151" : "#F3F4F6",

            controlItemBgActive: darkMode ? "#374151" : "#EAF6EF",

            controlItemBgActiveHover: darkMode ? "#374151" : "#E3F3E9",
          },
        },
      }}
    >
      <div
        className="
          overflow-hidden
          rounded-[12px]
          border
          border-[#E5E7EB]
          bg-white
          shadow-sm
          dark:border-[#374151]
          dark:bg-[#1F2937]
          dark:shadow-black/20
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            border-b
            border-[#E5E7EB]
            p-4
            dark:border-[#374151]
          "
        >
          {/* TITLE */}

          <div>
            <div className="flex items-center gap-2">
              <p
                className="
                  text-[18px]
                  font-bold
                  text-[#23272E]
                  dark:text-[#F9FAFB]
                "
              >
                Best selling product
              </p>

              {statusFilter !== "all" && (
                <span
                  className="
                    rounded-full
                    bg-[#4EA674]/10
                    px-2
                    py-0.5
                    text-[11px]
                    font-semibold
                    text-[#4EA674]
                  "
                >
                  Filtered
                </span>
              )}
            </div>

            <p
              className="
                mt-1
                text-[12px]
                text-[#6B7280]
                dark:text-[#9CA3AF]
              "
            >
              Top performing products by sales
            </p>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-2">
            {/* SEARCH */}

            <div className="relative">
              <Search
                placeholder="Search product..."
                allowClear
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                onSearch={onSearch}
                className="
                  w-[230px]
                  !rounded-[9px]
                  !outline-none
                  !shadow-none
                  [&_*]:!outline-none
                  [&_*]:!shadow-none
                "
              />
            </div>

            {/* FILTER */}

            <Dropdown
              menu={{
                items: filterItems,
                selectedKeys: [statusFilter],
                onClick: handleFilterClick,
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <button
                type="button"
                className={`
                  group
                  flex
                  h-[38px]
                  items-center
                  gap-2
                  rounded-[9px]
                  border
                  px-3.5
                  text-[13px]
                  font-medium
                  transition-all
                  duration-200

                  ${
                    statusFilter !== "all"
                      ? `
                        border-[#4EA674]
                        bg-[#4EA674]/10
                        text-[#4EA674]
                        dark:bg-[#4EA674]/10
                      `
                      : `
                        border-[#E5E7EB]
                        bg-white
                        text-[#374151]
                        hover:border-[#4EA674]
                        hover:text-[#4EA674]
                        dark:border-[#374151]
                        dark:bg-[#111827]
                        dark:text-[#D1D5DB]
                        dark:hover:border-[#4EA674]
                        dark:hover:text-[#4EA674]
                      `
                  }
                `}
              >
                <ListFilter
                  size={16}
                  className="transition-transform duration-200 group-hover:rotate-12"
                />

                <span>Filter</span>

                {statusFilter !== "all" && (
                  <span
                    className="
                      flex
                      h-[18px]
                      min-w-[18px]
                      items-center
                      justify-center
                      rounded-full
                      bg-[#4EA674]
                      px-1
                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    1
                  </span>
                )}
              </button>
            </Dropdown>
          </div>
        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className=" overflow-hidden">
          <Table<Product>
            loading={isPending}
            className="custom-table"
            columns={columns}
            dataSource={filterSearch}
            pagination={false}
            rowKey={(record) => record.id ?? record.sku}
          />
        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        {statusFilter !== "all" && (
          <div
            className="
              flex
              items-center
              justify-between
              border-t
              border-[#E5E7EB]
              px-4
              py-3
              dark:border-[#374151]
            "
          >
            <span
              className="
                text-[12px]
                text-[#6B7280]
                dark:text-[#9CA3AF]
              "
            >
              Showing{" "}
              <span className="font-semibold text-[#374151] dark:text-[#F9FAFB]">
                {filterSearch?.length ?? 0}
              </span>{" "}
              products
            </span>

            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className="
                text-[12px]
                font-medium
                text-[#4EA674]
                transition
                hover:underline
              "
            >
              Clear filter
            </button>
          </div>
        )}
      </div>
    </ConfigProvider>
  );
};

export default BestSellTable;
