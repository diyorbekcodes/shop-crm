import { ConfigProvider, Table, Tag, Image, theme, Dropdown } from "antd";
import type { TableColumnsType } from "antd";
import type { Product, ProductTableRowData } from "../types/ProductTypes";
import ProductService from "../service/ProductService";
import { useTheme } from "../../../context/modContext";
import { useNavigate } from "react-router";
import {
  EllipsisVertical,
  MoreHorizontal,
  SquarePen,
  Trash,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import EditModal from "./EditModal";

const { darkAlgorithm, defaultAlgorithm } = theme;
interface ProductTableProps {
  searchValue: string;
}
export default function ProductTable({ searchValue }: ProductTableProps) {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const handleEdit = (id: string) => {
    setSelectedProductId(id);
    setEditOpen(true);
  };

  const [selectedProductId, setSelectedProductId] = useState<string>();
  const { isPending, data, useDeleteProduct } = ProductService();
  const deleteProduct = useDeleteProduct();
  const { darkMode } = useTheme();

  const products: Product[] = data?.data ?? [];
  const filteredProducts = products.filter((product) => {
    const search = searchValue.toLowerCase().trim();

    return (
      product.name.toLowerCase().includes(search) ||
      product.brand?.name?.toLowerCase().includes(search) ||
      product.category?.name?.toLowerCase().includes(search)
    );
  });

  const tableData: ProductTableRowData[] = filteredProducts.map(
    (product, index) => ({
      key: product.id,
      id: product.id,
      no: index + 1,
      name: product.name,

      image:
        product.images.find((img) => img.isMain)?.url ??
        product.images[0]?.url ??
        "",

      brand: product.brand?.name ?? "-",
      category: product.category?.name ?? "-",
      price: product.price,
      oldPrice: product.oldPrice,
      stock: product.availableStock,
      isActive: product.isActive,
    }),
  );

  const columns: TableColumnsType<ProductTableRowData> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 60,
    },

    {
      title: "Rasm",
      dataIndex: "image",
      key: "image",

      render: (src: string) => (
        <Image
          src={src}
          alt=""
          width={48}
          height={48}
          className="object-contain rounded-lg"
        />
      ),
    },

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

    {
      title: "Brend",
      dataIndex: "brand",
      key: "brand",

      render: (brand: string) => (
        <span className={darkMode ? "text-gray-300" : "text-[#374151]"}>
          {brand}
        </span>
      ),
    },

    {
      title: "Kategoriya",
      dataIndex: "category",
      key: "category",

      render: (category: string) => (
        <span className={darkMode ? "text-gray-300" : "text-[#374151]"}>
          {category}
        </span>
      ),
    },

    {
      title: "Narx",
      dataIndex: "price",
      key: "price",

      render: (price: number, record) => (
        <div className="flex flex-col">
          <span className={darkMode ? "text-white" : "text-[#111827]"}>
            {price.toLocaleString("uz-UZ")} so'm
          </span>

          {record.oldPrice && (
            <span
              className={
                darkMode
                  ? "text-xs text-gray-500 line-through"
                  : "text-xs text-gray-400 line-through"
              }
            >
              {record.oldPrice.toLocaleString("uz-UZ")} so'm
            </span>
          )}
        </div>
      ),
    },

    {
      title: "Ombordagi soni",
      dataIndex: "stock",
      key: "stock",

      render: (stock: number) => (
        <Tag color={stock > 0 ? "green" : "red"}>{stock} dona</Tag>
      ),
    },

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

    {
      title: "Action",
      key: "action",

      render: (_, record) => {
        const deleting =
          deleteProduct.isPending && deleteProduct.variables === record.id;

        const items = [
          {
            key: "edit",
            label: (
              <div className="flex items-center gap-3 px-1 py-1">
                <SquarePen
                  size={16}
                  className={darkMode ? "text-blue-400" : "text-blue-600"}
                />
                <span className={darkMode ? "text-gray-200" : "text-gray-700"}>
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
            label: (
              <div className="flex items-center gap-3 px-1 py-1">
                <Trash2 size={16} className="text-red-500" />
                <span className="text-red-500">
                  {deleting ? "Deleting..." : "Delete"}
                </span>
              </div>
            ),
            disabled: deleting,
          },
        ];

        return (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center"
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
                    handleEdit(record.id);
                  }

                  if (key === "delete") {
                    deleteProduct.mutate(record.id);
                  }
                },
              }}
              popupRender={(menu) => (
                <div
                  className={`
                overflow-hidden
                rounded-xl
                border
                shadow-xl
                backdrop-blur-sm
                ${
                  darkMode
                    ? "border-gray-700 bg-[#1F2937]"
                    : "border-gray-200 bg-white"
                }
              `}
                >
                  {menu}
                </div>
              )}
            >
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                className={`
              flex
              h-9
              w-9
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
                <EllipsisVertical className="cursor-pointer" size={20} />
              </button>
            </Dropdown>
          </div>
        );
      },
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

            rowHoverBg: darkMode ? "#374151" : "#F3F4F6",

            borderColor: darkMode ? "#374151" : "#E5E7EB",

            colorBorderSecondary: darkMode ? "#374151" : "#E5E7EB",
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

          Image: {
            colorBgMask: darkMode ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.45)",
          },
        },
      }}
    >
      <div className="mt-8">
        <Table<ProductTableRowData>
          columns={columns}
          dataSource={tableData}
          loading={isPending}
          rowKey="key"
          pagination={{ pageSize: 20 }}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/products/${record.id}`);
            },
            style: {
              cursor: "pointer",
            },
          })}
        />
      </div>
      <EditModal
        open={editOpen}
        productId={selectedProductId}
        onClose={() => {
          setEditOpen(false);
          setSelectedProductId(undefined);
        }}
      />
    </ConfigProvider>
  );
}
