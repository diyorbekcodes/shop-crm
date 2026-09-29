import { ArrowDownUp, CirclePlus } from "lucide-react";

import { useState } from "react";
import { ConfigProvider, Segmented } from "antd";
import Search, { type SearchProps } from "antd/es/input/Search";

import CategoriesTable from "../compponet/CategoriesTable";
import CategoriesModal from "../compponet/CategoriesModal";

import CategoriesService from "../service/CategoriesService";
import type { CreateCategoryType, CategoryType } from "../types/CategoriesType";
import { useTheme } from "../../../context/modContext";

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  // Segmented state
  const [selectedCategory, setSelectedCategory] = useState<
    "All Categories" | "Active"
  >("All Categories");

  const [editData, setEditData] = useState<CategoryType | null>(null);

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value);
  };

  const { createCotegories, editCategories } = CategoriesService();

  const { darkMode } = useTheme();

  // =========================
  // CREATE / UPDATE
  // =========================

  const handleSubmit = (values: CreateCategoryType) => {
    console.log("FORM VALUES:", values);

    if (editData) {
      editCategories.mutate(
        {
          id: editData.id,
          data: values,
        },
        {
          onSuccess: () => {
            setOpen(false);
            setEditData(null);
          },
        },
      );

      return;
    }

    createCotegories.mutate(values, {
      onSuccess: () => {
        setOpen(false);
        setEditData(null);
      },
    });
  };

  // =========================
  // CREATE MODAL
  // =========================

  const handleCreateClick = () => {
    setEditData(null);
    setOpen(true);
  };

  // =========================
  // EDIT MODAL
  // =========================

  const handleEdit = (category: CategoryType) => {
    setEditData(category);
    setOpen(true);
  };

  // =========================
  // CLOSE
  // =========================

  const handleClose = () => {
    setOpen(false);
    setEditData(null);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          controlHeight: 40,
          colorPrimary: "#4EA674",
          borderRadius: 8,

          colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",
          colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

          colorText: darkMode ? "#F9FAFB" : "#111827",
          colorTextSecondary: darkMode ? "#9CA3AF" : "#6B7280",

          colorBorder: darkMode ? "#374151" : "#E5E7EB",
        },

        components: {
          Input: {
            colorBgContainer: darkMode ? "#374151" : "#FFFFFF",
            colorText: darkMode ? "#FFFFFF" : "#111827",
            colorTextPlaceholder: "#9CA3AF",
            colorBorder: darkMode ? "#4B5563" : "#E5E7EB",

            hoverBorderColor: "#4EA674",
            activeBorderColor: "#4EA674",

            activeShadow: "0 0 0 2px rgba(78,166,116,0.15)",
          },

          Segmented: {
            itemColor: darkMode ? "#D1D5DB" : "#374151",

            itemHoverColor: darkMode ? "#FFFFFF" : "#111827",

            itemSelectedColor: "#FFFFFF",

            trackBg: darkMode ? "#374151" : "#F3F4F6",

            itemSelectedBg: "#4EA674",

            borderRadius: 8,
          },
        },
      }}
    >
      <div>
        {/* ================= MODAL ================= */}

        <CategoriesModal
          open={open}
          loading={createCotegories.isPending || editCategories.isPending}
          onClose={handleClose}
          onSubmit={handleSubmit}
          editData={editData}
        />

        {/* ================= HEADER ================= */}

        <div className="flex justify-between items-center mb-4">
          <p
            className={
              darkMode
                ? "text-[20px] font-bold text-white"
                : "text-[20px] font-bold text-[#111827]"
            }
          >
            Categories
          </p>

          <button
            onClick={handleCreateClick}
            className="bg-[#4EA674] flex items-center cursor-pointer gap-2 text-[15px] font-bold text-white py-2 px-4 rounded hover:bg-[#3d8f60] transition-colors"
          >
            <CirclePlus size={20} />
            Add Category
          </button>
        </div>

        {/* ================= CONTENT ================= */}

        <div
          className={
            darkMode
              ? "bg-[#1F2937] p-4 shadow shadow-black/20 rounded-[8px] mt-4"
              : "bg-white p-4 shadow rounded-[8px] mt-4"
          }
        >
          <div className="flex justify-between items-center">
            {/* SEGMENTED */}

            <Segmented<"All Categories" | "Active">
              options={["All Categories", "Active"]}
              value={selectedCategory}
              className="
    !h-10
    !p-1
    [&_.ant-segmented-group]:!h-full
    [&_.ant-segmented-item]:!h-full
    [&_.ant-segmented-item]:!flex
    [&_.ant-segmented-item]:!items-center
    [&_.ant-segmented-item]:!justify-center
  "
              onChange={(value) => {
                setSelectedCategory(value);
              }}
            />

            {/* ACTIONS */}

            <div className="flex gap-2 items-center py-2 px-4">
              <Search
                placeholder="Search..."
                allowClear
                className="w-[250px]"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
                onSearch={onSearch}
              />

              <button
                type="button"
                onClick={() => {
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
                }}
                className={
                  darkMode
                    ? "flex items-center cursor-pointer bg-[#374151] border border-[#4B5563] py-2 px-3 rounded text-gray-200 hover:bg-[#4B5563] transition-colors"
                    : "flex items-center cursor-pointer bg-white border border-[#E5E7EB] py-2 px-3 rounded text-[#374151] hover:bg-gray-100 transition-colors"
                }
                title={
                  sortOrder === "asc"
                    ? "Order: Low to High"
                    : "Order: High to Low"
                }
              >
                <ArrowDownUp
                  size={18}
                  className={
                    sortOrder === "desc"
                      ? "rotate-180 transition-transform duration-700"
                      : "transition-transform duration-700"
                  }
                />
              </button>
            </div>
          </div>

          {/* ================= TABLE ================= */}

          <div className="mt-8">
            <CategoriesTable
              searchValue={searchValue}
              onEdit={handleEdit}
              selectedCategory={selectedCategory}
              sortOrder={sortOrder}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
