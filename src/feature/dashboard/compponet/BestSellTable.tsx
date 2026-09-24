import { ListFilter } from "lucide-react";
import { Input, Table, Tag, ConfigProvider } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { ProductType } from "../types/ProductType";
import { useIsDark } from "../../hook/UseIsDark";
import foto from "../../../assets/img/iphone.png";
import DashboardService from "../service/DashboardService";

const BestSellTable = () => {
  const darkMode = useIsDark();
  // const { bestSellingProduct } = DashboardService();

  // const { data: bestSell, isPending } = bestSellingProduct();
  // console.log(bestSell);

  const { Search } = Input;

  const data: ProductType[] = [
    {
      key: "1",
      product: "Apple iPhone 13",
      image: foto,
      totalOrder: 104,
      status: "Completed",
      price: 999,
    },
    {
      key: "2",
      product: "Samsung Galaxy S23",
      image: foto,
      totalOrder: 85,
      status: "Pending",
      price: 899,
    },
    {
      key: "3",
      product: "MacBook Air M2",
      image: foto,
      totalOrder: 65,
      status: "Completed",
      price: 1299,
    },
  ];

  const columns: ColumnsType<ProductType> = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            alt={record.product}
            className="w-[45px] h-[45px] rounded-lg object-contain"
          />

          <span className="font-semibold text-[#4B465C] dark:text-[#F9FAFB]">
            {record.product}
          </span>
        </div>
      ),
    },

    {
      title: "Total Order",
      dataIndex: "totalOrder",
      key: "totalOrder",
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
          status === "Completed"
            ? "green"
            : status === "Pending"
              ? "orange"
              : "red";

        return <Tag color={color}>{status}</Tag>;
      },
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="font-semibold text-[#23272E] dark:text-[#F9FAFB]">
          ${price.toFixed(2)}
        </span>
      ),
    },
  ];

  const handleSearch = (value: string) => {
    console.log("Search:", value);
  };

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
              onSearch={handleSearch}
              className="w-[220px]"
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
          <Table
            className="custom-table"
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default BestSellTable;
