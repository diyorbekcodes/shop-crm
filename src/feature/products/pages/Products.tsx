import Search, { type SearchProps } from "antd/es/input/Search";
import { ConfigProvider } from "antd";
import { useTheme } from "../../../context/modContext";
import { useNavigate } from "react-router";
import ProductTable from "../components/ProductTable";
import { useState } from "react";

export default function Products() {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  const [searchValue, setSearchValue] = useState("");

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value);
  };

  return (
    <div
      className={
        darkMode ? "min-h-screen bg-[#111827]" : "min-h-screen bg-[#f8faf9]"
      }
    >
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={
            darkMode
              ? "text-[22px] font-bold text-white"
              : "text-[22px] font-bold text-[#023337]"
          }
        >
          Product
        </p>

        <div className="flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          {/* SEARCH */}
          <ConfigProvider
            theme={{
              token: {
                controlHeight: 40,
                colorPrimary: "#4EA674",
                colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",
                colorBorder: darkMode ? "#374151" : "#D1D5DB",
                colorText: darkMode ? "#F9FAFB" : "#1F2937",
                colorTextPlaceholder: "#9CA3AF",
              },

              components: {
                Input: {
                  activeBorderColor: darkMode ? "#374151" : "#D1D5DB",
                  hoverBorderColor: darkMode ? "#4B5563" : "#D1D5DB",
                  colorIcon: darkMode ? "#9CA3AF" : "#6B7280",
                  activeShadow: "none",
                },
              },
            }}
          >
            <Search
              placeholder="Search..."
              allowClear
              className="w-full sm:w-[250px]"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onSearch={onSearch}
            />
          </ConfigProvider>

          {/* ADD PRODUCT */}
          <button
            className="min-h-10 w-full cursor-pointer rounded-sm bg-[#4EA674] px-4 py-2 text-[15px] font-bold text-white transition-colors hover:bg-[#3d8f60] sm:w-auto"
            onClick={() => navigate("/addproducts")}
          >
            Add Products
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-6">
        <ProductTable searchValue={searchValue} />
      </div>
    </div>
  );
}
