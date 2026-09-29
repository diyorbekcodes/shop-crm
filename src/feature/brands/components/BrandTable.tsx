import {
  ConfigProvider,
  Image,
  Table,
  Tag,
  theme,
  Popconfirm,
  message,
  Dropdown,
} from "antd";

import type { TableColumnsType } from "antd";

import { SquarePen, Trash2, Package, EllipsisVertical } from "lucide-react";

import { useState } from "react";
import { useTheme } from "../../../context/modContext";

import BrandService from "../hook/Brands";

import type { Brand } from "../types/BrandTypes";
import BrandDetailsModal from "./BrandDetails";

const { darkAlgorithm, defaultAlgorithm } = theme;

interface BrandTableProps {
  searchValue: string;
  onEdit: (id: string) => void;
}

interface BrandTableRowData {
  key: string;
  id: string;
  no: number;
  logo: string;
  name: string;
  slug: string;
  description: string;
  products: number;
  isActive: boolean;
}

export default function BrandTable({ searchValue, onEdit }: BrandTableProps) {
  const { darkMode } = useTheme();

  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClickBrand = (record: BrandTableRowData) => {
    setSelectedBrandId(record.id);
    setModalOpen(true);
  };

  const { data, isPending, useDeleteBrand } = BrandService();

  const deleteBrand = useDeleteBrand();

  const brands: Brand[] = data?.data ?? [];

  // =========================
  // SEARCH
  // =========================

  const filteredBrands = brands.filter((brand) => {
    const search = searchValue.toLowerCase().trim();

    return (
      brand.name.toLowerCase().includes(search) ||
      brand.slug.toLowerCase().includes(search) ||
      brand.description?.toLowerCase().includes(search)
    );
  });

  // =========================
  // TABLE DATA
  // =========================

  const tableData: BrandTableRowData[] = filteredBrands.map((brand, index) => ({
    key: brand.id,
    id: brand.id,
    no: index + 1,
    logo: brand.logo,
    name: brand.name,
    slug: brand.slug,
    description: brand.description,
    products: brand._count?.products ?? 0,
    isActive: brand.isActive,
  }));

  // =========================
  // ROW CLICK
  // =========================

  const handleRowClick = (record: BrandTableRowData) => {
    setSelectedBrandId(record.id);
    setModalOpen(true);
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (id: string) => {
    deleteBrand.mutate(id, {
      onSuccess: () => {
        message.success("Brand muvaffaqiyatli o'chirildi");
      },

      onError: (error: any) => {
        message.error(
          error?.response?.data?.message || "Brandni o'chirishda xatolik",
        );
      },
    });
  };

  // =========================
  // TABLE COLUMNS
  // =========================

  const columns: TableColumnsType<BrandTableRowData> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 65,
    },

    // LOGO
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      width: 100,

      render: (logo: string) =>
        logo && logo !== "string" ? (
          <Image
            src={logo}
            alt="Brand"
            width={65}
            height={40}
            preview
            className="rounded-sm object-contain"
          />
        ) : (
          <div
            className={
              darkMode
                ? "flex h-10 w-[65px] items-center justify-center rounded-sm bg-[#111827] text-[#6B7280]"
                : "flex h-10 w-[65px] items-center justify-center rounded-sm bg-[#F3F4F6] text-[#9CA3AF]"
            }
          >
            <Package size={20} />
          </div>
        ),
    },

    // NAME
    {
      title: "Nomi",
      dataIndex: "name",
      key: "name",

      render: (name: string) => (
        <span
          className={
            darkMode ? "font-medium text-white" : "font-medium text-[#111827]"
          }
        >
          {name}
        </span>
      ),
    },

    // SLUG
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",

      render: (slug: string) => (
        <span className={darkMode ? "text-[#9CA3AF]" : "text-[#64748B]"}>
          {slug}
        </span>
      ),
    },

    // DESCRIPTION
    {
      title: "Description",
      dataIndex: "description",
      key: "description",

      render: (description: string) => (
        <span
          className={
            darkMode
              ? "block max-w-[280px] truncate text-[#D1D5DB]"
              : "block max-w-[280px] truncate text-[#4B5563]"
          }
        >
          {description || "-"}
        </span>
      ),
    },

    // PRODUCTS
    {
      title: "Products",
      dataIndex: "products",
      key: "products",

      render: (products: number) => (
        <Tag color={products > 0 ? "green" : "default"}>{products} dona</Tag>
      ),
    },

    // STATUS
    {
      title: "Holati",
      dataIndex: "isActive",
      key: "isActive",

      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "default"}>
          {isActive ? "Faol" : "Nofaol"}
        </Tag>
      ),
    },

    // ACTION
    {
      title: "Action",
      key: "action",
      width: 80,

      render: (_, record) => {
        const deleting =
          deleteBrand.isPending && deleteBrand.variables === record.id;

        const items = [
          {
            key: "edit",
            label: (
              <div className="flex items-center gap-2">
                <SquarePen size={14} className="text-[#4EA674]" />

                <span
                  className={
                    darkMode
                      ? "text-[13px] text-gray-200"
                      : "text-[13px] text-gray-700"
                  }
                >
                  Edit
                </span>
              </div>
            ),
          },

          {
            type: "divider" as const,
          },

          {
            key: "delete",
            disabled: deleting,
            label: (
              <Popconfirm
                title="Brandni o'chirish"
                description="Haqiqatan ham ushbu brandni o'chirmoqchimisiz?"
                okText="Ha"
                cancelText="Yo'q"
                placement="topRight"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  handleDelete(record.id);
                }}
                onCancel={(e) => e?.stopPropagation()}
              >
                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {deleting ? (
                    <span
                      className="
                    inline-block
                    h-[14px]
                    w-[14px]
                    animate-spin
                    rounded-full
                    border-2
                    border-gray-400
                    border-t-red-500
                  "
                    />
                  ) : (
                    <Trash2 size={14} className="text-red-500" />
                  )}

                  <span className="text-[13px] text-red-500">
                    {deleting ? "Deleting..." : "Delete"}
                  </span>
                </div>
              </Popconfirm>
            ),
          },
        ];

        return (
          <div
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Dropdown
              trigger={["click"]}
              placement="bottomRight"
              menu={{
                items,
                className: darkMode
                  ? "dark-dropdown-menu"
                  : "light-dropdown-menu",

                onClick: ({ key }) => {
                  if (key === "edit") {
                    onEdit(record.id);
                  }
                },
              }}
            >
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className={`
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              transition-all
              duration-200
              ${
                darkMode
                  ? "text-gray-400 hover:bg-gray-700 hover:text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }
            `}
              >
                <EllipsisVertical size={18} />
              </button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  // =========================
  // RETURN
  // =========================

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,

        token: {
          colorPrimary: "#4EA674",

          borderRadius: 6,

          colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",

          colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

          colorText: darkMode ? "#F9FAFB" : "#111827",

          colorTextSecondary: darkMode ? "#9CA3AF" : "#6B7280",

          colorBorder: darkMode ? "#374151" : "#E2EDE9",

          colorBorderSecondary: darkMode ? "#374151" : "#E2EDE9",
        },

        components: {
          Table: {
            colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",

            headerBg: darkMode ? "#111827" : "#F7FAF9",

            headerColor: darkMode ? "#FFFFFF" : "#263B35",

            colorText: darkMode ? "#E5E7EB" : "#374151",

            rowHoverBg: darkMode ? "#273449" : "#F0F8F4",

            borderColor: darkMode ? "#374151" : "#E2EDE9",

            colorBorderSecondary: darkMode ? "#374151" : "#E2EDE9",
          },

          Pagination: {
            itemBg: darkMode ? "#374151" : "#FFFFFF",

            itemActiveBg: "#4EA674",

            itemLinkBg: darkMode ? "#374151" : "#FFFFFF",

            colorText: darkMode ? "#D1D5DB" : "#374151",

            colorTextDisabled: darkMode ? "#6B7280" : "#9CA3AF",

            colorPrimary: "#FFFFFF",

            colorPrimaryHover: "#FFFFFF",
          },

          Tag: {
            defaultBg: darkMode ? "#374151" : "#F3F4F6",

            defaultColor: darkMode ? "#E5E7EB" : "#374151",
          },

          Spin: {
            colorPrimary: "#4EA674",
          },
        },
      }}
    >
      <div className="mt-7">
        <Table<BrandTableRowData>
          columns={columns}
          dataSource={tableData}
          loading={isPending}
          rowKey="key"
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          onRow={(record) => ({
            onClick: () => handleRowClickBrand(record),
            className: "cursor-pointer",
          })}
        />
      </div>

      {/* BRAND DETAILS MODAL */}

      <BrandDetailsModal
        brandId={selectedBrandId}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedBrandId(null);
        }}
      />
    </ConfigProvider>
  );
}
