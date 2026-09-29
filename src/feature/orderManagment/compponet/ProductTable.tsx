import { useState } from "react";
import { ConfigProvider, Table, Tag, theme } from "antd";
import type { TableColumnsType } from "antd";
import type { Order, OrderStatus, ProductTableRow } from "../types/TableType";
import OrderDetailsModal from "../compponet/ProductDetailes";
import { useIsDark } from "../../hook/UseIsDark";

const { darkAlgorithm, defaultAlgorithm } = theme;

const statusColor: Record<OrderStatus, string> = {
  PENDING: "orange",
  PROCESSING: "blue",
  SHIPPED: "cyan",
  DELIVERED: "green",
  CANCELLED: "red",
};

const statusLabel: Record<OrderStatus, string> = {
  PENDING: "Pending",
  PROCESSING: "Processing",
  SHIPPED: "Shipped",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

interface ProductTableProps {
  searchValue: string;
  status: string;
  dataSource: Order[];
  loading?: boolean;
}

export default function ProductTable({
  searchValue,
  dataSource,
  status,
  loading = false,
}: ProductTableProps) {
  const isDark = useIsDark();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // sortedOrders har doim array bo'lishini kafolatlaymiz
  const orders: Order[] = Array.isArray(dataSource) ? dataSource : [];
console.log(orders);

  // Search + Status filter
  const filteredOrders = orders.filter((order) => {
    const search = searchValue.toLowerCase().trim();

    // Status filter
    const matchesStatus = status === "" || order.status === status;

    // Search bo'lmasa faqat statusni tekshiramiz
    if (!search) {
      return matchesStatus;
    }

    // Product search
    const productMatch = order.items?.some((item) =>
      item.productName?.toLowerCase().includes(search),
    );

    // Order ID search
    const orderMatch = order.orderNumber?.toLowerCase().includes(search);

    // Payment search
    const paymentMatch = order.paymentMethod?.toLowerCase().includes(search);

    // Status search
    const statusMatch = order.status?.toLowerCase().includes(search);

    return (
      matchesStatus &&
      Boolean(productMatch || orderMatch || paymentMatch || statusMatch)
    );
  });

  // Table uchun data
  const tableData: ProductTableRow[] = filteredOrders.map((order, index) => ({
    key: order.id,
    no: index + 1,
    orderId: order.orderNumber,

    product: order.items?.map((item) => item.productName).join(", ") || "-",

    image: order.items?.[0]?.productImage,

    date: order.createdAt
      ? new Date(order.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        })
      : "-",

    price: Number(order.total ?? 0),

    payment: order.paymentMethod || "-",

    status: order.status,
  }));

  const columns: TableColumnsType<ProductTableRow> = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 70,
    },

    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      width: 150,
      render: (orderId: string) => (
        <span className="font-medium">{orderId}</span>
      ),
    },

    {
      title: "Product",
      dataIndex: "product",
      key: "product",

      render: (_, record) => (
        <div className="flex items-center gap-3 min-w-0">
          {record.image ? (
            <img
              src={record.image}
              alt={record.product}
              className="w-10 h-10 object-contain rounded-lg shrink-0 bg-white"
            />
          ) : (
            <div
              className="
                w-10
                h-10
                shrink-0
                rounded-lg
                flex
                items-center
                justify-center
                bg-[#F3F4F6]
                dark:bg-[#374151]
                text-[#9CA3AF]
                text-xs
              "
            >
              N/A
            </div>
          )}

          <span className="font-medium truncate">{record.product}</span>
        </div>
      ),
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 130,
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 160,

      render: (price: number) =>
        `${Number(price).toLocaleString("uz-UZ")} so'm`,
    },

    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      width: 130,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 130,

      render: (orderStatus: OrderStatus) => (
        <Tag color={statusColor[orderStatus]}>{statusLabel[orderStatus]}</Tag>
      ),
    },
  ];

  const handleRowClick = (record: ProductTableRow) => {
    setSelectedOrderId(record.key);
    setModalOpen(true);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,

        token: {
          colorPrimary: "#4EA674",

          borderRadius: 8,

          colorBgBase: isDark ? "#111827" : "#FFFFFF",

          colorBgContainer: isDark ? "#1F2937" : "#FFFFFF",

          colorBgElevated: isDark ? "#1F2937" : "#FFFFFF",

          colorText: isDark ? "#F9FAFB" : "#111827",

          colorTextSecondary: isDark ? "#9CA3AF" : "#6B7280",

          colorBorder: isDark ? "#374151" : "#E5E7EB",

          colorBorderSecondary: isDark ? "#374151" : "#E5E7EB",
        },

        components: {
          Table: {
            colorBgContainer: isDark ? "#1F2937" : "#FFFFFF",

            // Header
            headerBg: isDark ? "#111827" : "#F9FAFB",

            headerColor: isDark ? "#FFFFFF" : "#111827",

            // Body
            colorText: isDark ? "#E5E7EB" : "#374151",

            rowHoverBg: isDark ? "#374151" : "#F3F4F6",

            // Border
            borderColor: isDark ? "#374151" : "#E5E7EB",

            colorBorderSecondary: isDark ? "#374151" : "#E5E7EB",

            cellPaddingBlock: 14,
            cellPaddingInline: 16,

            // Selected row
            rowSelectedBg: isDark ? "#243B30" : "#E8F5EE",

            rowSelectedHoverBg: isDark ? "#2F4A3C" : "#D7EDE0",

            selectionColumnWidth: 48,
          },

          

          Pagination: {
            itemBg: isDark ? "#374151" : "#FFFFFF",

            itemActiveBg: "#4EA674",

            itemLinkBg: isDark ? "#374151" : "#FFFFFF",

            colorText: isDark ? "#D1D5DB" : "#374151",

            colorTextDisabled: isDark ? "#6B7280" : "#9CA3AF",

            colorPrimary: "#FFFFFF",
            colorPrimaryHover: "#FFFFFF",

            borderRadius: 8,
          },

          Tag: {
            defaultBg: isDark ? "#374151" : "#F3F4F6",

            defaultColor: isDark ? "#E5E7EB" : "#374151",
          },

          Empty: {
            colorText: isDark ? "#9CA3AF" : "#6B7280",

            colorTextDescription: isDark ? "#9CA3AF" : "#6B7280",
          },

          Spin: {
            colorPrimary: "#4EA674",
          },

          Dropdown: {
            colorBgElevated: isDark ? "#1F2937" : "#FFFFFF",

            colorText: isDark ? "#E5E7EB" : "#374151",

            controlItemBgHover: isDark ? "#374151" : "#F3F4F6",

            controlItemBgActive: "#4EA674",
          },

          Tooltip: {
            colorBgSpotlight: "#374151",
            colorTextLightSolid: "#FFFFFF",
          },
        },
      }}
    >
      <div className="mt-8">
        <Table<ProductTableRow>
         
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={{
            pageSize: 6,
            showSizeChanger: false,
          }}
          rowKey="key"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            className: "cursor-pointer",
          })}
        />

        <OrderDetailsModal
          orderId={selectedOrderId}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </ConfigProvider>
  );
}
