import { ConfigProvider, Table, Tag, theme } from "antd";
import type { TableColumnsType } from "antd";
import CustomerService from "../service/CustomerServise";
import type { CustomerType } from "../types/CustomerType";
import { useIsDark } from "../../hook/UseIsDark";
import avatar from "../../../assets/img/avatar.png";
const { darkAlgorithm, defaultAlgorithm } = theme;

interface Props {
  selectedCustomerId: string | undefined;
  onSelectCustomer: (id: string) => void;
}

export default function CustomerTable({
  selectedCustomerId,
  onSelectCustomer,
}: Props) {
  const { data, isLoading } =
    CustomerService(selectedCustomerId);

  const isDark = useIsDark();

  const customers: CustomerType[] = Array.isArray(data?.data) ? data.data : [];

  const columns: TableColumnsType<CustomerType> = [
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.avatar || avatar}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />

          <div>
            <p className="font-medium text-[#111827] dark:text-white">
              {record.firstName} {record.lastName}
            </p>

            <p className="text-sm text-[#6A717F] dark:text-[#9CA3AF]">
              {record.email}
            </p>
          </div>
        </div>
      ),
    },

    {
      title: "Customer Id",
      dataIndex: "id",
      key: "id",
      render: (id: string) => (
        <span className="text-[#6A717F] dark:text-[#9CA3AF]">
          {id.slice(0, 8)}...
        </span>
      ),
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Order Count",
      key: "orderCount",
      render: (_, record) => <span>{record._count.orders}</span>,
    },

    {
      title: "Total Spend",
      dataIndex: "totalSpent",
      key: "totalSpent",
      render: (price: number) => (
        <span className="font-medium">${price.toFixed(2)}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? darkAlgorithm : defaultAlgorithm,

        token: {
          colorPrimary: "#4EA674",
          borderRadius: 8,

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

            headerBg: isDark ? "#111827" : "#F9FAFB",
            headerColor: isDark ? "#FFFFFF" : "#111827",

            colorText: isDark ? "#E5E7EB" : "#374151",
            rowHoverBg: isDark ? "#26364A" : "#F3F4F6",

            borderColor: isDark ? "#374151" : "#E5E7EB",
            colorBorderSecondary: isDark ? "#374151" : "#E5E7EB",

            // Selected row
            rowSelectedBg: isDark ? "#1E3A5F" : "#DBEAFE",
            rowSelectedHoverBg: isDark ? "#264B73" : "#BFDBFE",
          },

          Pagination: {
            itemBg: isDark ? "#374151" : "#FFFFFF",

            itemActiveBg: "#4EA674",
            itemLinkBg: isDark ? "#374151" : "#FFFFFF",
            colorText: isDark ? "#D1D5DB" : "#374151",
            colorTextDisabled: isDark ? "#6B7280" : "#9CA3AF",
            colorPrimary: "#FFFFFF",
            colorPrimaryHover: "#FFFFFF",
          },

          Tag: {
            defaultBg: isDark ? "#374151" : "#F3F4F6",
            defaultColor: isDark ? "#E5E7EB" : "#374151",
          },

          Spin: {
            colorPrimary: "#4EA674",
          },
        },
      }}
    >
      <Table<CustomerType>
        rowKey={(record) => record.id}
        loading={isLoading}
        className=" overflow-hidden"
        onRow={(record) => ({
          onClick: () => {
            onSelectCustomer(record.id);
          },
          className: "cursor-pointer",
        })}
        columns={columns}
        dataSource={customers}
        pagination={{
          pageSize: 6,
        }}
      />
    </ConfigProvider>
  );
}
