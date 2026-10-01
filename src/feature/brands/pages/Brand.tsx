import Search, { type SearchProps } from "antd/es/input/Search";

import { ConfigProvider } from "antd";

import { useState } from "react";

import { useTheme } from "../../../context/modContext";

import BrandTable from "../components/BrandTable";

import BrandModal from "../components/BrandModal";

export default function Brand() {
  const { darkMode } = useTheme();

  const [searchValue, setSearchValue] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedBrandId, setSelectedBrandId] = useState<string | undefined>();

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value);
  };

  const handleCreate = () => {
    setSelectedBrandId(undefined);
    setModalOpen(true);
  };

  const handleEdit = (id: string) => {
    setSelectedBrandId(id);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedBrandId(undefined);
  };

  return (
    <div
      className={
        darkMode ? "min-h-screen bg-[#111827]" : "min-h-screen bg-[#F8FAF9]"
      }
    >
      {/* HEADER */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* TITLE */}

        <div>
          <h1
            className={
              darkMode
                ? "text-[22px] font-bold text-white"
                : "text-[22px] font-bold text-[#023337]"
            }
          >
            Brands
          </h1>

          <p
            className={
              darkMode
                ? "mt-1 text-sm text-[#9CA3AF]"
                : "mt-1 text-sm text-[#6B7280]"
            }
          >
            Mahsulot brendlarini boshqarish
          </p>
        </div>

        {/* RIGHT */}

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
              placeholder="Search brand..."
              allowClear
              className="w-full sm:w-62.5"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={onSearch}
            />
          </ConfigProvider>

          {/* ADD */}

          <button
            type="button"
            onClick={handleCreate}
            className="min-h-10 w-full cursor-pointer rounded-sm bg-[#4EA674] px-3 text-sm font-semibold text-white transition hover:bg-[#3D8F60] sm:w-auto"
          >
            + Add Brand
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="mt-7">
        <BrandTable searchValue={searchValue} onEdit={handleEdit} />
      </div>

      {/* MODAL */}

      <BrandModal
        open={modalOpen}
        brandId={selectedBrandId}
        onClose={handleClose}
      />
    </div>
  );
}
