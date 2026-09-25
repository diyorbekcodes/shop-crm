import { ListFilter } from "lucide-react";
import { Input, Table, Tag, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useIsDark } from "../../hook/UseIsDark";

import DashboardService from "../service/DashboardService";
import type { Product } from "../types/ProductType";
import type { SearchProps } from "antd/es/input";
import { useState } from "react";

const BestSellTable = () => {
  const darkMode = useIsDark();
  const { bestSellingProduct } = DashboardService();
  const [searchValue, setSearchValue] = useState("");
  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value);
  };

  const { data: bestSell, isPending } = bestSellingProduct();
  console.log(bestSell);

  const { Search } = Input;
  const filterSearch = bestSell?.filter((order: Product) => {
    const search = searchValue.toLowerCase().trim();

    if (!search) return true;

    const productMatch = order.name?.toLowerCase().includes(search);

    const skuMatch = order.sku?.toLowerCase().includes(search);

    const statusMatch = order.status?.toLowerCase().includes(search);

    return productMatch || skuMatch || statusMatch;
  });
  const columns: ColumnsType<Product> = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            alt={record.name}
            className="w-[45px] h-[45px] rounded-lg object-contain"
          />

          <div className="flex flex-col">
            <span className="font-semibold text-[#4B465C] dark:text-[#F9FAFB]">
              {record.name}
            </span>

            <span className="text-xs text-gray-500 dark:text-gray-400">
              SKU: {record.sku}
            </span>
          </div>
        </div>
      ),
    },

    {
      title: "Total Orders",
      dataIndex: "totalOrders",
      key: "totalOrders",
      render: (value) => (
        <span className="text-[#23272E] dark:text-[#F9FAFB]">{value}</span>
      ),
    },

    {
      title: "Stock",
      dataIndex: "availableStock",
      key: "availableStock",
      render: (value) => (
        <span className="text-[#23272E] dark:text-[#F9FAFB]">{value}</span>
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

        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="font-semibold text-[#23272E] dark:text-[#F9FAFB]">
          {price.toLocaleString("uz-UZ")} so'm
        </span>
      ),
    },

    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      render: (revenue) => (
        <span className="font-semibold text-[#23272E] dark:text-[#F9FAFB]">
          {revenue.toLocaleString("uz-UZ")} so'm
        </span>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",
          colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",
          colorText: darkMode ? "#F9FAFB" : "#111827",
          colorTextSecondary: darkMode ? "#9CA3AF" : "#6B7280",
          colorBorder: darkMode ? "#374151" : "#E5E7EB",
        },

        components: {
          Table: {
            headerBg: darkMode ? "#111827" : "#F9FAFB",
            headerColor: darkMode ? "#F9FAFB" : "#111827",

            rowHoverBg: darkMode ? "#374151" : "#F9FAFB",

            borderColor: darkMode ? "#374151" : "#E5E7EB",

            colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",
          },

          Input: {
            colorBgContainer: darkMode ? "#374151" : "#FFFFFF",

            colorText: darkMode ? "#F9FAFB" : "#111827",

            colorTextPlaceholder: darkMode ? "#9CA3AF" : "#6B7280",

            colorBorder: darkMode ? "#4B5563" : "#E5E7EB",

            hoverBorderColor: "#4EA674",

            activeBorderColor: "#4EA674",

            colorIcon: darkMode ? "#9CA3AF" : "#6B7280",

            colorIconHover: "#4EA674",
          },
        },
      }}
    >
      <div className="bg-white dark:bg-[#1F2937] shadow rounded-[8px] border border-transparent dark:border-[#374151]">
        {/* HEADER */}
        <div className="p-4 flex justify-between items-center gap-4">
          <div>
            <p className="font-bold text-[18px] text-[#23272E] dark:text-[#F9FAFB]">
              Best selling product
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <Search
              placeholder="Search product..."
              allowClear
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onSearch={onSearch}
              className="w-[220px !outline-none
    !shadow-none
    [&_*]:!outline-none
    [&_*]:!shadow-none"
            />

            {/* FILTER */}
            <button
              className="
                flex
                items-center
                gap-2
                bg-[#4EA674]
                hover:bg-[#5DBA83]
                text-white
                px-4
                py-2
                rounded-[8px]
                transition
              "
            >
              <span>Filter</span>

              <ListFilter size={16} />
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto overflow-y-hidden">
          <Table<Product>
            loading={isPending}
            className="custom-table"
            columns={columns}
            dataSource={filterSearch}
            pagination={false}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default BestSellTable;
