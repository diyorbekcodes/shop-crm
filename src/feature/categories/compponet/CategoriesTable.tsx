import { ConfigProvider, Table, theme } from "antd";
import type { TableColumnsType } from "antd";
import { SquarePen, Trash } from "lucide-react";

import foto from "../../../assets/img/iphone.png";

import type { CategoryType } from "../types/CategoriesType";
import CategoriesService from "../service/CategoriesService";
import { useTheme } from "../../../context/modContext";

const { darkAlgorithm, defaultAlgorithm } = theme;

interface Props {
  onEdit: (category: CategoryType) => void;
  searchValue: string;
  selectedCategory: "All Categories" | "Active";
  sortOrder: "asc" | "desc";
}

export default function CategoriesTable({
  onEdit,
  selectedCategory,
  searchValue,
  sortOrder,
}: Props) {
  const { isLoading, data, deleteCategory, createCotegories, editCategories } =
    CategoriesService();

  const { darkMode } = useTheme();

  const categories: CategoryType[] = Array.isArray(data)
    ? data
    : (data?.data ?? []);
  console.log(categories);

  const filteredProducts = categories
    .filter((category) => {
      const search = searchValue.toLowerCase().trim();

      const matchesSearch = category.name.toLowerCase().includes(search);

      const matchesSegment =
        selectedCategory === "All Categories"
          ? true
          : category.isActive === true;

      return matchesSearch && matchesSegment;
    })
    .sort((a, b) => {
      const aOrder = a.sortOrder ?? 0;
      const bOrder = b.sortOrder ?? 0;

      return sortOrder === "asc" ? aOrder - bOrder : bOrder - aOrder;
    });
  const columns: TableColumnsType<CategoryType> = [
    {
      title: "No",
      key: "no",
      render: (_, __, index) => index + 1,
    },

    {
      title: "Category",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image ?? foto}
            alt={record.name}
            className="w-10 h-10 object-contain rounded-lg"
          />

          <span
            className={
              darkMode ? "font-medium text-white" : "font-medium text-[#111827]"
            }
          >
            {record.name}
          </span>
        </div>
      ),
    },

    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (slug) => (
        <span className={darkMode ? "text-gray-300" : "text-[#6A717F]"}>
          {slug}
        </span>
      ),
    },

    {
      title: "Order",
      key: "sortOrder",
      render: (_, record) => <span>{record.sortOrder ?? 0}</span>,
    },

    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => (
        <span className={isActive ? "text-green-500" : "text-red-500"}>
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {/* EDIT */}
          <button onClick={() => onEdit(record)} className="cursor-pointer">
            <SquarePen
              size={18}
              className={
                darkMode
                  ? "text-gray-400 hover:text-[#4EA674]"
                  : "text-[#6A717F] hover:text-[#4EA674]"
              }
            />
          </button>

          {/* DELETE */}
          <button
            disabled={
              deleteCategory.isPending && deleteCategory.variables === record.id
            }
            onClick={() => deleteCategory.mutate(record.id)}
            className="cursor-pointer disabled:cursor-not-allowed"
          >
            {deleteCategory.isPending &&
            deleteCategory.variables === record.id ? (
              <span
                className={
                  darkMode
                    ? "inline-block w-[18px] h-[18px] border-2 border-gray-600 border-t-red-500 rounded-full animate-spin"
                    : "inline-block w-[18px] h-[18px] border-2 border-gray-300 border-t-red-500 rounded-full animate-spin"
                }
              />
            ) : (
              <Trash
                size={18}
                className={
                  darkMode
                    ? "text-gray-400 hover:text-red-500"
                    : "text-[#6A717F] hover:text-red-500"
                }
              />
            )}
          </button>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,

        token: {
          colorPrimary: "#4EA674",
          borderRadius: 8,

          colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",
          colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

          colorText: darkMode ? "#F9FAFB" : "#111827",
          colorTextSecondary: darkMode ? "#9CA3AF" : "#6B7280",

          colorBorder: darkMode ? "#374151" : "#E5E7EB",
          colorBorderSecondary: darkMode ? "#374151" : "#E5E7EB",
        },

        components: {
          Table: {
            colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",

            headerBg: darkMode ? "#111827" : "#F9FAFB",
            headerColor: darkMode ? "#FFFFFF" : "#111827",

            colorText: darkMode ? "#E5E7EB" : "#374151",

            rowHoverBg: darkMode ? "#26364A" : "#F3F4F6",

            borderColor: darkMode ? "#374151" : "#E5E7EB",
            colorBorderSecondary: darkMode ? "#374151" : "#E5E7EB",

            // Selected row
            rowSelectedBg: darkMode ? "#1E3A5F" : "#DBEAFE",
            rowSelectedHoverBg: darkMode ? "#264B73" : "#BFDBFE",
          },

          Checkbox: {
            colorPrimary: "#3B82F6",
            colorPrimaryHover: "#60A5FA",
            colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",
            colorBorder: darkMode ? "#6B7280" : "#D1D5DB",
          },

          Pagination: {
            itemBg: darkMode ? "#374151" : "#FFFFFF",

            itemActiveBg: "#374151",
            itemLinkBg: darkMode ? "#374151" : "#FFFFFF",
            colorText: darkMode ? "#D1D5DB" : "#374151",
            colorTextDisabled: darkMode ? "#6B7280" : "#9CA3AF",
            colorPrimary: "#FFFFFF",
            colorPrimaryHover: "#FFFFFF",
          },

          Spin: {
            colorPrimary: "#4EA674",
          },
        },
      }}
    >
      <Table<CategoryType>
        loading={
          isLoading || createCotegories.isPending || editCategories.isPending
        }
        rowKey="id"
        rowSelection={{
          type: "checkbox",
        }}
        columns={columns}
        dataSource={filteredProducts}
        pagination={{
          pageSize: 5,
          placement: ["bottomCenter"],
        }}
      />
    </ConfigProvider>
  );
}
