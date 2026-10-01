import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  Package,
  PackageCheck,
  PackageX,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

import { ConfigProvider, Segmented, Spin, Table, Tag, theme } from "antd";

import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DashboardService from "../service/DashboardService";
import { useIsDark } from "../../hook/UseIsDark";

/* =====================================================
   TYPES
===================================================== */

interface ChartItem {
  date: string;
  day: string;
  orders: number;
  revenue: number;
  value: number;
}

// interface ChartDetailsData {
//   success: boolean;

//   data: {
//     week: "this" | "last";

//     range: {
//       from: string;
//       to: string;
//     };

//     stats: {
//       customers: number;
//       totalProducts: number;
//       stockProducts: number;
//       outOfStock: number;
//       revenue: number;
//     };

//     chart: {
//       thisWeek: ChartItem[];
//       lastWeek: ChartItem[];
//       active: ChartItem[];
//     };
//   };
// }

/* =====================================================
   COMPONENT
===================================================== */

const ChartDetails = () => {
  const navigate = useNavigate();

  const darkMode = useIsDark();

  /* ===================================================
     WEEK STATE
  =================================================== */

  const [week, setWeek] = useState<"this" | "last">("this");

  /* ===================================================
     API
  =================================================== */

  const { thisWeekLastWeek } = DashboardService();

  const { data, isPending } = thisWeekLastWeek(week);

  /*
   * This week -> thisWeek
   * Last week -> lastWeek
   */

  const chartData: ChartItem[] =
    week === "this"
      ? (data?.data?.chart?.thisWeek ?? [])
      : (data?.data?.chart?.lastWeek ?? []);

  const stats = data?.data?.stats;

  /* ===================================================
     CALCULATIONS
  =================================================== */

  const totalOrders = chartData.reduce(
    (total, item) => total + Number(item.orders || 0),
    0,
  );

  const totalRevenue = chartData.reduce(
    (total, item) => total + Number(item.revenue || 0),
    0,
  );

  const averageOrders =
    chartData.length > 0 ? totalOrders / chartData.length : 0;

  const averageRevenue =
    chartData.length > 0 ? totalRevenue / chartData.length : 0;

  const bestRevenueDay =
    chartData.length > 0
      ? chartData.reduce((best, item) =>
          Number(item.revenue) > Number(best.revenue) ? item : best,
        )
      : null;

  const bestOrdersDay =
    chartData.length > 0
      ? chartData.reduce((best, item) =>
          Number(item.orders) > Number(best.orders) ? item : best,
        )
      : null;

  /* ===================================================
     FORMATTERS
  =================================================== */

  const formatNumber = (value: number) => {
    return Number(value || 0).toLocaleString("en-US");
  };

  const formatUZS = (value: number) => {
    return `${formatNumber(value)} UZS`;
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatRangeDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /* ===================================================
     TABLE COLUMNS
  =================================================== */

  const columns: ColumnsType<ChartItem> = [
    {
      title: "Day",
      dataIndex: "day",
      key: "day",
      width: 120,

      render: (_, record) => (
        <span
          style={{
            color: darkMode ? "#F9FAFB" : "#111827",
            fontWeight: 600,
          }}
        >
          {record.day}
        </span>
      ),
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: 180,

      render: (_, record) => (
        <span
          style={{
            color: darkMode ? "#D1D5DB" : "#6B7280",
          }}
        >
          {formatDate(record.date)}
        </span>
      ),
    },

    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
      width: 140,
      align: "center",

      render: (_, record) => (
        <span
          style={{
            color: darkMode ? "#F9FAFB" : "#111827",
            fontWeight: 600,
          }}
        >
          {formatNumber(Number(record.orders))}
        </span>
      ),
    },

    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
      width: 220,
      align: "right",

      render: (_, record) => (
        <span
          style={{
            color: "#4EA674",
            fontWeight: 600,
          }}
        >
          {formatUZS(Number(record.revenue))}
        </span>
      ),
    },
  ];

  /* ===================================================
     UI
  =================================================== */

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,

        token: {
          colorPrimary: "#4EA674",

          colorBgBase: darkMode ? "#111827" : "#FFFFFF",

          colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",

          colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

          colorText: darkMode ? "#F9FAFB" : "#111827",

          colorTextSecondary: darkMode ? "#9CA3AF" : "#6B7280",

          colorBorder: darkMode ? "#374151" : "#E5E7EB",

          colorBorderSecondary: darkMode ? "#374151" : "#E5E7EB",

          borderRadius: 8,
        },

        components: {
          Table: {
            colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",

            headerBg: darkMode ? "#374151" : "#F9FAFB",

            headerColor: darkMode ? "#F9FAFB" : "#111827",

            colorText: darkMode ? "#F9FAFB" : "#111827",

            colorTextHeading: darkMode ? "#F9FAFB" : "#111827",

            borderColor: darkMode ? "#374151" : "#E5E7EB",

            headerSplitColor: darkMode ? "#4B5563" : "#E5E7EB",

            rowHoverBg: darkMode ? "#263449" : "#F9FAFB",

            colorFillAlter: darkMode ? "#1F2937" : "#F9FAFB",

            rowSelectedBg: darkMode ? "#263449" : "#EAF6EF",

            rowSelectedHoverBg: darkMode ? "#2D3B50" : "#E3F3E9",

            fixedHeaderSortActiveBg: darkMode ? "#374151" : "#F3F4F6",

           

            headerSortHoverBg: darkMode ? "#4B5563" : "#F3F4F6",

            headerSortActiveBg: darkMode ? "#4B5563" : "#F3F4F6",

            filterDropdownBg: darkMode ? "#1F2937" : "#FFFFFF",

            filterDropdownMenuBg: darkMode ? "#1F2937" : "#FFFFFF",

            expandIconBg: darkMode ? "#374151" : "#FFFFFF",

            borderRadius: 10,

            cellPaddingBlock: 14,

            cellPaddingInline: 16,
          },

          Tag: {
            defaultBg: darkMode ? "#374151" : "#F3F4F6",

            defaultColor: darkMode ? "#D1D5DB" : "#374151",
          },

          Pagination: {
            itemBg: darkMode ? "#1F2937" : "#FFFFFF",

            itemActiveBg: darkMode ? "#374151" : "#FFFFFF",

            colorText: darkMode ? "#D1D5DB" : "#374151",

            colorTextDisabled: darkMode ? "#6B7280" : "#9CA3AF",

            colorPrimary: "#4EA674",
          },

          Segmented: {
            trackBg: darkMode ? "#1F2937" : "#F3F4F6",

            itemColor: darkMode ? "#D1D5DB" : "#374151",

            itemSelectedBg: darkMode ? "#374151" : "#FFFFFF",

            itemSelectedColor: darkMode ? "#FFFFFF" : "#111827",

            itemHoverBg: darkMode ? "#374151" : "#E5E7EB",
          },
        },
      }}
    >
      <div
        className="
          min-h-screen
          bg-[#F5F6F8]
          px-4
          py-5
          dark:bg-[#111827]
          md:px-6
          lg:px-8
        "
      >
        <div className="mx-auto max-w-[1400px]">
          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              mb-6
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* LEFT */}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-[#E5E7EB]
                  bg-white
                  text-[#374151]
                  transition-all
                  duration-200
                  hover:bg-[#F3F4F6]
                  dark:border-[#374151]
                  dark:bg-[#1F2937]
                  dark:text-[#D1D5DB]
                  dark:hover:bg-[#374151]
                  dark:hover:text-white
                "
              >
                <ArrowLeft size={19} />
              </button>

              <div>
                <h1
                  className="
                    text-[24px]
                    font-bold
                    text-[#111827]
                    dark:text-white
                  "
                >
                  Report Details
                </h1>

                <p
                  className="
                    mt-1
                    text-[13px]
                    text-[#6B7280]
                    dark:text-[#9CA3AF]
                  "
                >
                  Detailed revenue and orders report
                </p>
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex flex-wrap items-center gap-3">
              {/* WEEK SWITCH */}

              <Segmented<"this" | "last">
                value={week}
                options={[
                  {
                    label: "This week",
                    value: "this",
                  },
                  {
                    label: "Last week",
                    value: "last",
                  },
                ]}
                onChange={(value) => {
                  setWeek(value);
                }}
                className="
                  !rounded-[9px]
                  !border
                  !border-[#E5E7EB]
                  !bg-[#F3F4F6]
                  dark:!border-[#374151]
                  dark:!bg-[#1F2937]
                "
              />

              {/* TAG */}

              <Tag variant="filled" color={week === "this" ? "green" : "blue"}>
                {week === "this" ? "This week" : "Last week"}
              </Tag>

              {/* DATE */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-[13px]
                  text-[#6B7280]
                  dark:text-[#9CA3AF]
                "
              >
                <CalendarDays size={15} />

                <span>
                  {formatRangeDate(data?.data?.range?.from)}

                  {" — "}

                  {formatRangeDate(data?.data?.range?.to)}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {isPending ? (
            <div
              className="
                flex
                min-h-[500px]
                items-center
                justify-center
                rounded-xl
                border
                border-[#E5E7EB]
                bg-white
                dark:border-[#374151]
                dark:bg-[#1F2937]
              "
            >
              <Spin size="large" />
            </div>
          ) : (
            <>
              {/* =============================================
                  MAIN STATS
              ============================================= */}

              <div
                className="
                  mb-4
                  grid
                  grid-cols-1
                  gap-4
                  sm:grid-cols-2
                  xl:grid-cols-4
                "
              >
                {/* REVENUE */}

                <div
                  className="
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-[#374151]
                    dark:bg-[#1F2937]
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="
                          text-[13px]
                          font-medium
                          text-[#6B7280]
                          dark:text-[#9CA3AF]
                        "
                      >
                        Total Revenue
                      </p>

                      <p
                        className="
                          mt-2
                          text-[24px]
                          font-bold
                          text-[#111827]
                          dark:text-white
                        "
                      >
                        {formatUZS(totalRevenue)}
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#4EA674]/10
                      "
                    >
                      <CircleDollarSign size={21} className="text-[#4EA674]" />
                    </div>
                  </div>
                </div>

                {/* ORDERS */}

                <div
                  className="
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-[#374151]
                    dark:bg-[#1F2937]
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="
                          text-[13px]
                          font-medium
                          text-[#6B7280]
                          dark:text-[#9CA3AF]
                        "
                      >
                        Total Orders
                      </p>

                      <p
                        className="
                          mt-2
                          text-[24px]
                          font-bold
                          text-[#111827]
                          dark:text-white
                        "
                      >
                        {formatNumber(totalOrders)}
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-500/10
                      "
                    >
                      <ShoppingCart size={21} className="text-blue-500" />
                    </div>
                  </div>
                </div>

                {/* AVERAGE REVENUE */}

                <div
                  className="
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-[#374151]
                    dark:bg-[#1F2937]
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="
                          text-[13px]
                          font-medium
                          text-[#6B7280]
                          dark:text-[#9CA3AF]
                        "
                      >
                        Avg. Daily Revenue
                      </p>

                      <p
                        className="
                          mt-2
                          text-[24px]
                          font-bold
                          text-[#111827]
                          dark:text-white
                        "
                      >
                        {formatUZS(Math.round(averageRevenue))}
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-purple-500/10
                      "
                    >
                      <TrendingUp size={21} className="text-purple-500" />
                    </div>
                  </div>
                </div>

                {/* CUSTOMERS */}

                <div
                  className="
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-[#374151]
                    dark:bg-[#1F2937]
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className="
                          text-[13px]
                          font-medium
                          text-[#6B7280]
                          dark:text-[#9CA3AF]
                        "
                      >
                        Customers
                      </p>

                      <p
                        className="
                          mt-2
                          text-[24px]
                          font-bold
                          text-[#111827]
                          dark:text-white
                        "
                      >
                        {formatNumber(stats?.customers ?? 0)}
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-orange-500/10
                      "
                    >
                      <Users size={21} className="text-orange-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* =============================================
                  INVENTORY
              ============================================= */}

              <div
                className="
                  mb-4
                  grid
                  grid-cols-1
                  gap-4
                  min-[400px]:grid-cols-2
                  lg:grid-cols-4
                "
              >
                {/* PRODUCTS */}

                <div
                  className="
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    bg-white
                    p-4
                    dark:border-[#374151]
                    dark:bg-[#1F2937]
                  "
                >
                  <div className="flex items-center gap-2">
                    <Package size={17} className="text-blue-500" />

                    <span
                      className="
                        text-[12px]
                        font-medium
                        text-[#6B7280]
                        dark:text-[#9CA3AF]
                      "
                    >
                      Products
                    </span>
                  </div>

                  <p
                    className="
                      mt-2
                      text-[20px]
                      font-bold
                      text-[#111827]
                      dark:text-white
                    "
                  >
                    {formatNumber(stats?.totalProducts ?? 0)}
                  </p>
                </div>

                {/* IN STOCK */}

                <div
                  className="
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    bg-white
                    p-4
                    dark:border-[#374151]
                    dark:bg-[#1F2937]
                  "
                >
                  <div className="flex items-center gap-2">
                    <PackageCheck size={17} className="text-[#4EA674]" />

                    <span
                      className="
                        text-[12px]
                        font-medium
                        text-[#6B7280]
                        dark:text-[#9CA3AF]
                      "
                    >
                      In Stock
                    </span>
                  </div>

                  <p
                    className="
                      mt-2
                      text-[20px]
                      font-bold
                      text-[#111827]
                      dark:text-white
                    "
                  >
                    {formatNumber(stats?.stockProducts ?? 0)}
                  </p>
                </div>

                {/* OUT OF STOCK */}

                <div
                  className="
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    bg-white
                    p-4
                    dark:border-[#374151]
                    dark:bg-[#1F2937]
                  "
                >
                  <div className="flex items-center gap-2">
                    <PackageX size={17} className="text-red-500" />

                    <span
                      className="
                        text-[12px]
                        font-medium
                        text-[#6B7280]
                        dark:text-[#9CA3AF]
                      "
                    >
                      Out of Stock
                    </span>
                  </div>

                  <p
                    className="
                      mt-2
                      text-[20px]
                      font-bold
                      text-[#111827]
                      dark:text-white
                    "
                  >
                    {formatNumber(stats?.outOfStock ?? 0)}
                  </p>
                </div>

                {/* AVG ORDERS */}

                <div
                  className="
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    bg-white
                    p-4
                    dark:border-[#374151]
                    dark:bg-[#1F2937]
                  "
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={17} className="text-purple-500" />

                    <span
                      className="
                        text-[12px]
                        font-medium
                        text-[#6B7280]
                        dark:text-[#9CA3AF]
                      "
                    >
                      Avg. Orders / Day
                    </span>
                  </div>

                  <p
                    className="
                      mt-2
                      text-[20px]
                      font-bold
                      text-[#111827]
                      dark:text-white
                    "
                  >
                    {averageOrders.toFixed(1)}
                  </p>
                </div>
              </div>

              {/* =============================================
                  BEST DAYS
              ============================================= */}

              <div
                className="
                  mb-4
                  grid
                  grid-cols-1
                  gap-4
                  lg:grid-cols-2
                "
              >
                {/* BEST REVENUE */}

                <div
                  className="
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-[#374151]
                    dark:bg-[#1F2937]
                  "
                >
                  <p
                    className="
                      text-[13px]
                      font-medium
                      text-[#6B7280]
                      dark:text-[#9CA3AF]
                    "
                  >
                    Best Revenue Day
                  </p>

                  {bestRevenueDay ? (
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p
                          className="
                            text-[20px]
                            font-bold
                            text-[#111827]
                            dark:text-white
                          "
                        >
                          {bestRevenueDay.day}
                        </p>

                        <p className="mt-1 text-[12px] text-[#9CA3AF]">
                          {formatDate(bestRevenueDay.date)}
                        </p>
                      </div>

                      <p className="text-[16px] font-bold text-[#4EA674]">
                        {formatUZS(bestRevenueDay.revenue)}
                      </p>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-[#9CA3AF]">No data</p>
                  )}
                </div>

                {/* BEST ORDERS */}

                <div
                  className="
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    bg-white
                    p-5
                    shadow-sm
                    dark:border-[#374151]
                    dark:bg-[#1F2937]
                  "
                >
                  <p
                    className="
                      text-[13px]
                      font-medium
                      text-[#6B7280]
                      dark:text-[#9CA3AF]
                    "
                  >
                    Best Orders Day
                  </p>

                  {bestOrdersDay ? (
                    <div className="mt-3 flex items-end justify-between">
                      <div>
                        <p
                          className="
                            text-[20px]
                            font-bold
                            text-[#111827]
                            dark:text-white
                          "
                        >
                          {bestOrdersDay.day}
                        </p>

                        <p className="mt-1 text-[12px] text-[#9CA3AF]">
                          {formatDate(bestOrdersDay.date)}
                        </p>
                      </div>

                      <p className="text-[16px] font-bold text-blue-500">
                        {formatNumber(bestOrdersDay.orders)} orders
                      </p>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-[#9CA3AF]">No data</p>
                  )}
                </div>
              </div>

              {/* =============================================
                  DAILY REPORT
              ============================================= */}

              <div
                className="
                  rounded-xl
                  border
                  border-[#E5E7EB]
                  bg-white
                  p-5
                  shadow-sm
                  dark:border-[#374151]
                  dark:bg-[#1F2937]
                "
              >
                <div className="mb-4">
                  <h2
                    className="
                      text-[18px]
                      font-bold
                      text-[#111827]
                      dark:text-white
                    "
                  >
                    Daily Report
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[13px]
                      text-[#6B7280]
                      dark:text-[#9CA3AF]
                    "
                  >
                    Revenue and orders for each day
                  </p>
                </div>

                <div
                  className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    dark:border-[#374151]
                  "
                >
                  <Table<ChartItem>
                    rowKey="date"
                    className={
                      darkMode
                        ? "chart-details-table-dark"
                        : "chart-details-table-light"
                    }
                    columns={columns}
                    dataSource={chartData}
                    pagination={false}
                    size="middle"
                    scroll={{ x: 700 }}
                    locale={{
                      emptyText: (
                        <span
                          style={{
                            color: darkMode ? "#9CA3AF" : "#6B7280",
                          }}
                        >
                          No data
                        </span>
                      ),
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ChartDetails;
