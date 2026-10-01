import {  useState } from "react";
import {
  ConfigProvider,
  Modal,
  Descriptions,
  Tag,
  Table,
  Spin,
  Select,
  Input,
  message,
  theme,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useIsDark } from "../../hook/UseIsDark";
import OrderService from "../service/Order";
import type { OrderItem, OrderStatus } from "../types/TableType";

const { darkAlgorithm, defaultAlgorithm } = theme;



interface Props {
  orderId: string | null;
  open: boolean;
  onClose: () => void;
}

const statusColor: Record<OrderStatus, string> = {
  PENDING: "orange",
  PROCESSING: "blue",
  SHIPPED: "cyan",
  DELIVERED: "green",
  CANCELLED: "red",
};

const statusOptions: {
  value: OrderStatus;
  label: string;
}[] = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "PROCESSING",
    label: "Processing",
  },
  {
    value: "SHIPPED",
    label: "Shipped",
  },
  {
    value: "DELIVERED",
    label: "Delivered",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
  },
];

const itemColumns: ColumnsType<OrderItem> = [
  {
    title: "Rasm",
    dataIndex: "productImage",
    key: "productImage",

    render: (src: string) => (
      <img src={src} alt="" className="w-12 h-12 object-contain rounded" />
    ),
  },

  {
    title: "Mahsulot",
    dataIndex: "productName",
    key: "productName",
  },

  {
    title: "SKU",
    dataIndex: "productSku",
    key: "productSku",
  },

  {
    title: "Narx",
    dataIndex: "price",
    key: "price",

    render: (price: number) => `${price.toLocaleString("uz-UZ")} so'm`,
  },

  {
    title: "Soni",
    dataIndex: "quantity",
    key: "quantity",
  },

  {
    title: "Jami",
    dataIndex: "total",
    key: "total",

    render: (total: number) => `${total.toLocaleString("uz-UZ")} so'm`,
  },
];

export default function OrderDetailsModal({ orderId, open, onClose }: Props) {
  const { useProductDetails, useUpdateOrderStatus } = OrderService();

  const isDark = useIsDark();

  const { isPending, data } = useProductDetails(orderId ?? "");

  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus();

  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);

  const [comment, setComment] = useState("");

  const order = data?.data;

  const handleSelectStatus = (newStatus: OrderStatus) => {
    setPendingStatus(newStatus);
  };

  const handleConfirm = () => {
    if (!orderId || !pendingStatus) return;

    updateStatus(
      {
        orderId,
        status: pendingStatus,
        comment,
      },
      {
        onSuccess: () => {
          message.success("Status muvaffaqiyatli yangilandi");

          setPendingStatus(null);
          setComment("");
        },

        onError: () => {
          message.error("Statusni yangilashda xatolik yuz berdi");
        },
      },
    );
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

          colorFillSecondary: isDark ? "#374151" : "#F3F4F6",
          colorFillTertiary: isDark ? "#374151" : "#F3F4F6",
          colorFillQuaternary: isDark ? "#374151" : "#F9FAFB",
        },

        components: {
          Modal: {
            contentBg: isDark ? "#1F2937" : "#FFFFFF",
            headerBg: isDark ? "#1F2937" : "#FFFFFF",
            titleColor: isDark ? "#FFFFFF" : "#111827",

            colorIcon: isDark ? "#9CA3AF" : "#6B7280",
            colorIconHover: isDark ? "#FFFFFF" : "#111827",
          },

          Descriptions: {
            labelBg: isDark ? "#374151" : "#F9FAFB",
            labelColor: isDark ? "#D1D5DB" : "#374151",
            contentColor: isDark ? "#F9FAFB" : "#111827",

            
          },

          Select: {
            colorBgContainer: isDark ? "#374151" : "#FFFFFF",
            colorText: isDark ? "#FFFFFF" : "#111827",
            colorTextPlaceholder: isDark ? "#9CA3AF" : "#9CA3AF",

            colorBorder: isDark ? "#4B5563" : "#D1D5DB",
            hoverBorderColor: "#4EA674",

            activeBorderColor: "#4EA674",
            activeOutlineColor: "rgba(78,166,116,0.15)",

            optionSelectedBg: isDark ? "#4EA674" : "#E8F5EE",
            optionActiveBg: isDark ? "#4B5563" : "#F3F4F6",

            colorBgElevated: isDark ? "#1F2937" : "#FFFFFF",
          },

          Input: {
            colorBgContainer: isDark ? "#374151" : "#FFFFFF",
            colorText: isDark ? "#FFFFFF" : "#111827",
            colorTextPlaceholder: "#9CA3AF",

            colorBorder: isDark ? "#4B5563" : "#D1D5DB",

            hoverBorderColor: "#4EA674",
            activeBorderColor: "#4EA674",

            activeShadow: "0 0 0 2px rgba(78,166,116,0.15)",
          },

          Table: {
            colorBgContainer: isDark ? "#1F2937" : "#FFFFFF",

            headerBg: isDark ? "#374151" : "#F9FAFB",
            headerColor: isDark ? "#FFFFFF" : "#111827",

            colorText: isDark ? "#E5E7EB" : "#374151",

            rowHoverBg: isDark ? "#374151" : "#F3F4F6",

            borderColor: isDark ? "#374151" : "#E5E7EB",
            colorBorderSecondary: isDark ? "#374151" : "#E5E7EB",

            cellPaddingBlock: 12,
            cellPaddingInline: 12,
          },

          Spin: {
            colorPrimary: "#4EA674",
          },

          Tag: {
            defaultBg: isDark ? "#374151" : "#F3F4F6",
            defaultColor: isDark ? "#E5E7EB" : "#374151",
          },
        },
      }}
    >
      <Modal
        title={
          order ? `Buyurtma: ${order.orderNumber}` : "Buyurtma tafsilotlari"
        }
        open={open}
        onCancel={onClose}
        footer={null}
        width="min(800px, calc(100vw - 24px))"
        centered
        styles={{
          body: { maxHeight: "calc(100dvh - 180px)", overflowY: "auto" },
        }}
      >
        {isPending || !order ? (
          <div className="flex justify-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* BUYURTMA MA'LUMOTLARI */}

            <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
              <Descriptions.Item label="Buyurtma raqami">
                {order.orderNumber}
              </Descriptions.Item>

              <Descriptions.Item label="Holat">
                <Select<OrderStatus>
                  value={pendingStatus ?? order.status}
                  onChange={handleSelectStatus}
                  loading={isUpdating}
                  disabled={isUpdating}
                  style={{ width: "min(160px, 100%)" }}
                  options={statusOptions.map((opt) => ({
                    value: opt.value,

                    label: (
                      <Tag
                        color={statusColor[opt.value]}
                        style={{
                          margin: 0,
                        }}
                      >
                        {opt.label}
                      </Tag>
                    ),
                  }))}
                />
              </Descriptions.Item>

              <Descriptions.Item label="To'lov usuli">
                {order.paymentMethod}
              </Descriptions.Item>

              <Descriptions.Item label="To'lov holati">
                {order.paymentStatus}
              </Descriptions.Item>

              <Descriptions.Item label="Sana">
                {new Date(order.createdAt).toLocaleString("uz-UZ")}
              </Descriptions.Item>

              <Descriptions.Item label="Jami summa">
                {order.total.toLocaleString("uz-UZ")} so'm
              </Descriptions.Item>
            </Descriptions>

            {/* STATUS O'ZGARTIRISH */}

            {pendingStatus && pendingStatus !== order.status && (
              <div
                className="
                    flex
                    flex-col
                    gap-3
                    border
                    border-gray-200
                    dark:border-[#4B5563]
                    rounded-lg
                    p-4
                    bg-gray-50
                    dark:bg-[#374151]
                  "
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Statusni{" "}
                  <Tag color={statusColor[pendingStatus]}>{pendingStatus}</Tag>{" "}
                  ga o'zgartirish
                </span>

                <Input.TextArea
                  placeholder="Izoh (ixtiyoriy)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />

                <div className="flex gap-2 justify-end">
                  <button
                    className="
                        px-4
                        py-2
                        text-sm
                        rounded-lg

                        bg-white
                        dark:bg-[#1F2937]

                        border
                        border-gray-200
                        dark:border-[#4B5563]

                        text-gray-700
                        dark:text-gray-200

                        hover:bg-gray-100
                        dark:hover:bg-[#4B5563]

                        transition
                      "
                    onClick={() => {
                      setPendingStatus(null);
                      setComment("");
                    }}
                    disabled={isUpdating}
                  >
                    Bekor qilish
                  </button>

                  <button
                    className="
                        px-4
                        py-2
                        text-sm
                        bg-[#4EA674]
                        text-white
                        rounded-lg
                        hover:bg-[#419563]
                        transition
                      "
                    onClick={handleConfirm}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Saqlanmoqda..." : "Tasdiqlash"}
                  </button>
                </div>
              </div>
            )}

            {/* MIJOZ */}

            <div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                Mijoz
              </h3>

              <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
                <Descriptions.Item label="Ism">
                  {order.customerSnapshot.firstName}{" "}
                  {order.customerSnapshot.lastName}
                </Descriptions.Item>

                <Descriptions.Item label="Telefon">
                  {order.customerSnapshot.phone}
                </Descriptions.Item>

                <Descriptions.Item label="Email" span={2}>
                  {order.customerSnapshot.email}
                </Descriptions.Item>
              </Descriptions>
            </div>

            {/* MANZIL */}

            <div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                Yetkazib berish manzili
              </h3>

              <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
                <Descriptions.Item label="Shahar">
                  {order.addressSnapshot.city}
                </Descriptions.Item>

                <Descriptions.Item label="Ko'cha">
                  {order.addressSnapshot.street}
                </Descriptions.Item>

                <Descriptions.Item label="Uy">
                  {order.addressSnapshot.house}
                </Descriptions.Item>

                <Descriptions.Item label="Nomi">
                  {order.addressSnapshot.title}
                </Descriptions.Item>
              </Descriptions>
            </div>

            {/* STATUS HISTORY */}

            <div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                Buyurtma tarixi
              </h3>

              <div className="flex flex-col gap-2">
                {order.statusHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        text-sm
                        border-b
                        pb-2
                        border-gray-200
                        dark:border-[#374151]
                      "
                  >
                    <Tag color={statusColor[entry.status]}>{entry.status}</Tag>

                    <span className="text-gray-500 dark:text-gray-400 flex-1">
                      {entry.comment}
                    </span>

                    <span className="text-gray-400 dark:text-gray-500">
                      {new Date(entry.createdAt).toLocaleString("uz-UZ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PRODUCTS */}

            <div>
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                Mahsulotlar
              </h3>

              <Table
                columns={itemColumns}
                dataSource={order.items}
                rowKey="id"
                pagination={false}
                size="small"
              />
            </div>
          </div>
        )}
      </Modal>
    </ConfigProvider>
  );
}
