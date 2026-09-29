import { ChevronUp, Download, EllipsisVertical, Eye, Users } from "lucide-react";
import { useState } from "react";
import {
  Segmented,
  Skeleton,
  ConfigProvider,
  Input,
  Spin,
  Dropdown,
  type MenuProps,
} from "antd";

import SignUpChart from "../compponet/Chart";
import BestSellingProduct from "../compponet/BestSellTable";

import map from "../../../assets/img/bg-map.png";
import us from "../../../assets/img/us 1.png";

import type {
  DashboardStatsType,
  Product,
  TopProduct,
} from "../types/ProductType";
import DashboardService from "../service/DashboardService";
import { useIsDark } from "../../hook/UseIsDark";
import CountUp from "../../../context/CountUp";
import ChartColumn from "../compponet/ChartColumn";
import AnimatedProgress from "../../../context/AnimatedProgress";
import { useNavigate } from "react-router";
import type { SearchProps } from "antd/es/input";
import api from "../../service/pages/api";

export default function Dashboard() {
  const darkMode = useIsDark();
  const navigate = useNavigate();
  const { Search } = Input;

  const {
    isPending,
    kpisData,
    salesByCountr,
    thisWeekLastWeek,
    topProducts,
    realTime,
  } = DashboardService();
  const reportMenuItems: MenuProps["items"] = [
    {
      key: "details",
      icon: <Eye size={16} />,
      label: "View details",
    },
    {
      key: "export",
      icon: <Download size={16} />,
      label: "Export data",
    },
  ];
  const exportWeeklyReport = async () => {
    try {
      const response = await api.get(
        `/admin/dashboard/weekly-report?week=${week}`,
      );

      const report = response.data.data;

      const rows = report.chart.active.map((item: any) => ({
        Day: item.day,
        Date: item.date,
        Orders: item.orders,
        Revenue: item.revenue,
      }));

      const headers = ["Day", "Date", "Orders", "Revenue"];

      const csv = [
        headers.join(","),
        ...rows.map((row: any) =>
          [row.Day, row.Date, row.Orders, row.Revenue].join(","),
        ),
      ].join("\n");

      const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `weekly-report-${week}.csv`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  const handleReportMenuClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "details") {
      navigate("/dashboard/chart-details");
    }

    if (key === "export") {
      await exportWeeklyReport();
    }
  };
  const { data: topProductsData, isPending: topProductsPanding } =
    topProducts();
  console.log(topProductsData);

  const [week, setWeek] = useState<"this" | "last">("this");
  const { data: salesData, isPending: salesPending } = salesByCountr();
  const { data: weekData } = thisWeekLastWeek(week);
  const { data: realTimeData, isPending: realTimePanding } = realTime();

  const salesDatas = salesData ?? [];

  const kpisDatas: DashboardStatsType | undefined = kpisData;

  const [searchValue, setSearchValue] = useState("");
  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearchValue(value);
  };
  const filterSearch = topProductsData?.filter((order: Product) => {
    const search = searchValue.toLowerCase().trim();

    if (!search) return true;

    const productMatch = order.name?.toLowerCase().includes(search);

    const skuMatch = order.sku?.toLowerCase().includes(search);

    return productMatch || skuMatch;
  });
  const statsItems = [
    {
      key: "customers",
      label: "Customers",
      value: weekData?.data.stats.customers ?? 0,
    },
    {
      key: "totalProducts",
      label: "Total Products",
      value: weekData?.data.stats.totalProducts ?? 0,
    },
    {
      key: "stockProducts",
      label: "In Stock",
      value: weekData?.data.stats.stockProducts ?? 0,
    },
    {
      key: "outOfStock",
      label: "Out of Stock",
      value: weekData?.data.stats.outOfStock ?? 0,
    },
    {
      key: "revenue",
      label: "Revenue",
      value: weekData?.data.stats.revenue ?? 0,
    },
  ];

  return (
    <div className="w-full text-[#23272E] dark:text-[#F9FAFB]">
      {/* ================================================= */}
      {/* FIRST ROW */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* ================= TOTAL SALES ================= */}

        <div className="bg-white dark:bg-[#1F2937] p-4 shadow rounded-[8px] h-full border border-transparent dark:border-[#374151]">
          {isPending ? (
            <Skeleton active />
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-[18px]">Total Sales</p>

                  <p className="text-gray-500 dark:text-[#9CA3AF] text-[14px]">
                    {" "}
                    {kpisDatas?.label === "30d" ? "30 days" : kpisDatas?.label}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <p className="font-bold text-[32px]">
                  <CountUp end={kpisDatas?.totalSales?.value ?? 0} /> so'm
                </p>

                <p className="text-[14px]">
                  Sales:{" "}
                  <span className="font-bold text-green-500">
                    <CountUp end={kpisDatas?.totalSales?.changePercent ?? 0} />%
                  </span>
                </p>
              </div>

              <p className="text-gray-500 dark:text-[#9CA3AF] text-[14px]">
                Previous period{" "}
                <span className="text-[#6467F2]">
                  (<CountUp end={kpisDatas?.totalSales?.previousValue ?? 0} />
                  so'm)
                </span>
              </p>
            </div>
          )}
        </div>

        {/* ================= TOTAL ORDERS ================= */}

        <div className="bg-white dark:bg-[#1F2937] p-4 shadow rounded-[8px] h-full border border-transparent dark:border-[#374151]">
          {isPending ? (
            <Skeleton active />
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-[18px]">Total Orders</p>

                  <p className="text-gray-500 dark:text-[#9CA3AF] text-[14px]">
                    {" "}
                    {kpisDatas?.label === "30d" ? "30 days" : kpisDatas?.label}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <p className="font-bold text-[32px]">
                  <CountUp end={kpisDatas?.totalOrders?.value ?? 0} />
                </p>

                <p className="text-[14px]">
                  Orders:{" "}
                  <span className="font-bold text-green-500">
                    <CountUp end={kpisDatas?.totalOrders?.changePercent ?? 0} />
                    %
                  </span>
                </p>
              </div>

              <p className="text-gray-500 dark:text-[#9CA3AF] text-[14px]">
                Previous period{" "}
                <span className="text-[#6467F2]">
                  (<CountUp end={kpisDatas?.totalOrders?.previousValue ?? 0} />{" "}
                  orders)
                </span>
              </p>
            </div>
          )}
        </div>

        {/* ================= ORDER STATUS ================= */}

        <div className="bg-white dark:bg-[#1F2937] flex flex-col p-4 rounded-[8px] shadow h-full border border-transparent dark:border-[#374151]">
          {isPending ? (
            <Skeleton active />
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-bold text-[18px]">Order Status</p>

                  <p className="text-gray-500 dark:text-[#9CA3AF] text-[14px]">
                    {" "}
                    {kpisDatas?.label === "30d" ? "30 days" : kpisDatas?.label}
                  </p>
                </div>
              </div>

              <div className="flex items-stretch gap-4">
                {/* ================= PENDING ================= */}

                <div className="flex flex-1 flex-col justify-between p-3">
                  <p className="text-[13px] font-medium text-yellow-500">
                    Pending
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {/* Users */}
                    <div
                      className="
          rounded-lg
          bg-[#F9FAFB]
          dark:bg-[#111827]
          border border-[#E5E7EB]
          dark:border-[#374151]
          px-3
          py-2
        "
                    >
                      <p className="text-[11px] font-medium text-[#9CA3AF]">
                        Users
                      </p>

                      <p className="mt-1 text-[20px] leading-none font-bold text-[#023337] dark:text-[#F9FAFB]">
                        <CountUp end={Number(kpisDatas?.pending?.users ?? 0)} />
                      </p>
                    </div>

                    {/* Orders */}
                    <div
                      className="
          rounded-lg
          bg-[#F9FAFB]
          dark:bg-[#111827]
          border border-[#E5E7EB]
          dark:border-[#374151]
          px-3
          py-2
        "
                    >
                      <p className="text-[11px] font-medium text-[#9CA3AF]">
                        Orders
                      </p>

                      <p className="mt-1 text-[20px] leading-none font-bold text-[#023337] dark:text-[#F9FAFB]">
                        <CountUp
                          end={Number(kpisDatas?.pending?.orders ?? 0)}
                        />
                      </p>
                    </div>
                  </div>
                </div>

                {/* ================= DIVIDER ================= */}

                <div className="w-px self-stretch bg-[#E5E7EB] dark:bg-[#374151]" />

                {/* ================= CANCELED ================= */}

                <div className="flex flex-1 flex-col justify-between p-3">
                  <p className="text-[13px] font-medium text-red-500">
                    Canceled
                  </p>

                  <div className="mt-3">
                    {/* Value + Change */}
                    <div className="flex items-end gap-3">
                      <p className="text-[28px] leading-none font-bold text-[#111827] dark:text-[#F9FAFB]">
                        <CountUp
                          end={Number(kpisDatas?.cancelled?.value ?? 0)}
                        />
                      </p>

                      <span
                        className="
            mb-[2px]
            flex
            items-center
            gap-1
            rounded-full
            bg-red-500/10
            px-2
            py-[3px]
            text-[12px]
            font-semibold
            text-red-500
          "
                      >
                        ↑ {kpisDatas?.cancelled?.changePercent ?? 0}%
                      </span>
                    </div>

                    {/* Previous */}
                    <p className="mt-2 text-[11px] text-[#9CA3AF] dark:text-[#6B7280]">
                      Previous:{" "}
                      <span className="font-medium">
                        {Number(
                          kpisDatas?.cancelled?.previousValue ?? 0,
                        ).toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================================================= */}
      {/* SECOND ROW */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 mt-4 gap-4 items-start">
        {/* ================= REPORT ================= */}

        <div className="xl:col-span-2 grid grid-cols-1 gap-4 self-start">
          <div className="bg-white dark:bg-[#1F2937] p-4 rounded-[8px] shadow border border-transparent dark:border-[#374151] self-start">
            <div className="flex justify-between items-center mb-4 gap-4 flex-wrap">
              <p className="font-bold text-[18px]">Report for this week</p>

              <div className="flex items-center gap-4">
                {/* THIS WEEK / LAST WEEK */}

                <ConfigProvider
                  theme={{
                    components: {
                      Segmented: {
                        trackBg: darkMode ? "#1F2937" : "#F3F4F6",

                        itemColor: darkMode ? "#9CA3AF" : "#6B7280",

                        itemHoverColor: darkMode ? "#FFFFFF" : "#23272E",

                        itemSelectedColor: darkMode ? "#FFFFFF" : "#23272E",

                        itemSelectedBg: darkMode ? "#4B5563" : "#FFFFFF",

                        itemHoverBg: darkMode ? "#374151" : "#FFFFFF",

                        borderRadius: 8,
                      },
                      Dropdown: {
                        colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",
                        colorText: darkMode ? "#F9FAFB" : "#111827",
                        colorTextDescription: darkMode ? "#9CA3AF" : "#6B7280",
                        controlItemBgHover: darkMode ? "#374151" : "#F3F4F6",
                        controlItemBgActive: darkMode ? "#374151" : "#F3F4F6",
                        colorBorder: darkMode ? "#374151" : "#E5E7EB",
                        borderRadiusLG: 10,
                        boxShadowSecondary: darkMode
                          ? "0 10px 30px rgba(0, 0, 0, 0.35)"
                          : "0 10px 30px rgba(0, 0, 0, 0.10)",
                      },
                    },
                  }}
                >
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
    !p-[3px]
    !rounded-[9px]
    !border
    !border-[#E5E7EB]
    dark:!border-[#374151]
    !bg-[#F3F4F6]
    dark:!bg-[#1F2937]
  "
                  />

                  <Dropdown
                    trigger={["click"]}
                    placement="rightTop"
                    menu={{
                      items: reportMenuItems,
                      onClick: handleReportMenuClick,
                    }}
                  >
                    <button
                      type="button"
                      className="
      flex
      h-9
      w-9
      items-center
      justify-center
      rounded-lg
      text-gray-500
      transition
      hover:bg-gray-100
      dark:text-[#9CA3AF]
      dark:hover:bg-[#374151]
      dark:hover:text-white
    "
                    >
                      <EllipsisVertical size={20} />
                    </button>
                  </Dropdown>
                </ConfigProvider>
              </div>
            </div>

            {/* ================= STATS ================= */}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
              {statsItems.map((item) => (
                <div
                  key={item.key}
                  className={`
        flex flex-col items-start justify-between
        p-3
        
        border-b-[2px]
        border-b-blue-500
        transition-all

       
      `}
                >
                  <p className="font-bold text-[20px]">
                    <CountUp end={Number(item.value)} />
                    {item.key === "revenue" && " UZS"}
                  </p>

                  <p className="text-[13px]  text-[#8B909A] dark:text-[#9CA3AF] font-medium">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* ================= CHART ================= */}

            <div className="w-full">
              <SignUpChart data={weekData} />
            </div>
          </div>
          <div className="self-start">
            <BestSellingProduct />
          </div>
        </div>

        {/* ================= USERS / SALES ================= */}

        <div className="xl:col-span-1 grid grid-cols-1 gap-4 self-start">
          {/* =====================================================
      REAL TIME USERS + SALES
  ===================================================== */}

          <div
            className="
      overflow-hidden
      rounded-[12px]
      border
      border-[#E5E7EB]
      bg-white
      shadow-sm
      dark:border-[#374151]
      dark:bg-[#1F2937]
      dark:shadow-black/10
    "
          >
            {/* ================= USERS HEADER ================= */}

            <div
              className="
        border-b
        border-[#E5E7EB]
        px-4
        pt-4
        pb-3
        dark:border-[#374151]
      "
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* ICON */}

                  <div
                    className="
              flex
              h-[42px]
              w-[42px]
              shrink-0
              items-center
              justify-center
              rounded-[10px]
              bg-[#6467F2]/10
              dark:bg-[#6467F2]/15
            "
                  >
                    <Users size={21} className="text-[#6467F2]" />
                  </div>

                  {/* TEXT */}

                  <div>
                    <p
                      className="
                text-[13px]
                font-semibold
                text-[#6467F2]
                dark:text-[#818CF8]
              "
                    >
                      Users in last {realTimeData?.windowMinutes ?? 0} minutes
                    </p>

                    <div className="mt-1 flex items-end gap-2">
                      <p
                        className="
                  text-[30px]
                  font-bold
                  leading-none
                  text-[#23272E]
                  dark:text-[#F9FAFB]
                "
                      >
                        {realTimeData?.total ?? 0}
                      </p>

                      <span
                        className="
                  mb-[2px]
                  flex
                  items-center
                  gap-1
                  text-[11px]
                  font-medium
                  text-[#28C76F]
                "
                      >
                        <span
                          className="
                    h-[6px]
                    w-[6px]
                    rounded-full
                    bg-[#28C76F]
                    animate-pulse
                  "
                        />
                        Live
                      </span>
                    </div>
                  </div>
                </div>

                {/* MORE */}

                
              </div>
            </div>

            {/* ================= USERS CHART ================= */}

            <div className="px-4 pt-4">
              <div className="mb-3 flex items-center justify-between">
                <p
                  className="
            text-[13px]
            font-semibold
            text-[#374151]
            dark:text-[#E5E7EB]
          "
                >
                  Users per minute
                </p>

                <span
                  className="
            rounded-full
            bg-[#6467F2]/10
            px-2
            py-1
            text-[10px]
            font-semibold
            text-[#6467F2]
            dark:bg-[#6467F2]/15
            dark:text-[#818CF8]
          "
                >
                  Real-time
                </span>
              </div>

              <div
                className="
          rounded-[10px]
          border
          border-[#E5E7EB]
          bg-[#F9FAFB]
          p-2
          dark:border-[#374151]
          dark:bg-[#111827]
        "
              >
                <ChartColumn data={realTimeData} />
              </div>
            </div>

            {/* ================= SALES HEADER ================= */}

            <div
              className="
        mt-5
        flex
        items-center
        justify-between
        border-t
        border-[#E5E7EB]
        px-4
        pt-4
        dark:border-[#374151]
      "
            >
              <div>
                <p
                  className="
            text-[16px]
            font-bold
            text-[#23272E]
            dark:text-[#F9FAFB]
          "
                >
                  Sales by Country
                </p>

                <p
                  className="
            mt-1
            text-[11px]
            text-[#8B909A]
            dark:text-[#9CA3AF]
          "
                >
                  Revenue distribution
                </p>
              </div>

              <p
                className="
          text-[13px]
          font-semibold
          text-[#8B909A]
          dark:text-[#9CA3AF]
        "
              >
                Sales
              </p>
            </div>

            {/* ================= SALES BY COUNTRY ================= */}

            <div
              className="
        relative
        mx-3
        mt-3
        mb-3
        min-h-[200px]
        overflow-hidden
        rounded-[10px]
        bg-cover
        bg-center
        bg-no-repeat
        p-2
        dark:bg-[#111827]/50
      "
              style={{
                backgroundImage: `url(${map})`,
              }}
            >
              {/* DARK OVERLAY */}

              <div
                className="
          absolute
          inset-0
          bg-white/40
          dark:bg-[#111827]/50
        "
              />

              <div
                className="
          relative
          z-10
          flex
          min-h-[200px]
          flex-col
          gap-3
        "
              >
                {salesPending ? (
                  <div className="flex min-h-[200px] items-center justify-center">
                    <Spin />
                  </div>
                ) : salesDatas.length === 0 ? (
                  <div className="flex min-h-[200px] items-center justify-center">
                    <p className="text-[13px] text-gray-500 dark:text-[#9CA3AF]">
                      Sales data not found
                    </p>
                  </div>
                ) : (
                  salesDatas.map((item) => (
                    <div
                      key={item.code}
                      className="
                flex
                items-center
                justify-between
                gap-3
                rounded-[9px]
                border
                border-white/60
                bg-white/75
                px-3
                py-2
                backdrop-blur-md
                dark:border-white/10
                dark:bg-[#1F2937]/75
              "
                    >
                      {/* COUNTRY */}

                      <div className="flex min-w-0 items-center gap-[10px]">
                        <div
                          className="
                    flex
                    h-[30px]
                    w-[30px]
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-white
                    shadow-sm
                  "
                        >
                          <img
                            src={us}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="min-w-0">
                          <div
                            className="
                      flex
                      items-center
                      gap-1
                      text-[13px]
                      font-bold
                      text-[#23272E]
                      dark:text-[#F9FAFB]
                    "
                          >
                            <CountUp
                              end={Number(item.sales)}
                              formattingFn={(value) =>
                                value.toLocaleString("uz-UZ")
                              }
                            />
                          </div>

                          <p
                            className="
                      truncate
                      text-[11px]
                      text-[#8B909A]
                      dark:text-[#9CA3AF]
                    "
                          >
                            {item.name}
                          </p>
                        </div>
                      </div>

                      {/* PERCENTAGE */}

                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <p
                          className={`
                    flex
                    items-center
                    text-[12px]
                    font-bold
                    ${
                      item.changePercent >= 0
                        ? "text-[#28C76F]"
                        : "text-red-500"
                    }
                  `}
                        >
                          {item.share >= 0 ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronUp size={14} className="rotate-180" />
                          )}
                          <CountUp end={Number(item.changePercent)} />%
                        </p>

                        <div
                          className="
                    h-[5px]
                    w-[110px]
                    overflow-hidden
                    rounded-full
                    bg-[#E5E7EB]
                    dark:bg-[#374151]
                    sm:w-[140px]
                  "
                        >
                          <AnimatedProgress value={Number(item.share)} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* =====================================================
      TOP PRODUCTS
  ===================================================== */}

          <div
            className="
      overflow-hidden
      rounded-[12px]
      border
      border-[#E5E7EB]
      bg-white
      p-4
      shadow-sm
      dark:border-[#374151]
      dark:bg-[#1F2937]
      dark:shadow-black/10
    "
          >
            {/* HEADER */}

            <div className="mb-4 flex items-center justify-between">
              <div>
                <p
                  className="
            text-[17px]
            font-bold
            text-[#23272E]
            dark:text-[#F9FAFB]
          "
                >
                  Top Products
                </p>

                <p
                  className="
            mt-1
            text-[11px]
            text-[#8B909A]
            dark:text-[#9CA3AF]
          "
                >
                  Best performing products
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/products")}
                className="
          rounded-[7px]
          px-2
          py-1
          text-[12px]
          font-medium
          text-[#6467F2]
          transition
          hover:bg-[#6467F2]/10
          dark:text-[#818CF8]
          dark:hover:bg-[#6467F2]/10
        "
              >
                All products
              </button>
            </div>

            {/* SEARCH */}

            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#4EA674",

                  colorBgContainer: darkMode ? "#111827" : "#FFFFFF",

                  colorText: darkMode ? "#F9FAFB" : "#111827",

                  colorTextPlaceholder: darkMode ? "#6B7280" : "#9CA3AF",

                  colorBorder: darkMode ? "#374151" : "#E5E7EB",
                },

                components: {
                  Input: {
                    colorBgContainer: darkMode ? "#111827" : "#FFFFFF",

                    colorText: darkMode ? "#F9FAFB" : "#111827",

                    colorTextPlaceholder: darkMode ? "#9CA3AF" : "#6B7280",

                    colorBorder: darkMode ? "#374151" : "#E5E7EB",

                    hoverBorderColor: "#4EA674",

                    activeBorderColor: "#4EA674",

                    colorIcon: darkMode ? "#9CA3AF" : "#6B7280",

                    colorIconHover: "#4EA674",
                  },
                },
              }}
            >
              <div className="mb-3">
                <Search
                  placeholder="Search product..."
                  allowClear
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  onSearch={onSearch}
                  className="
            w-full
            !rounded-[9px]
            !outline-none
            !shadow-none
            [&_*]:!outline-none
            [&_*]:!shadow-none
          "
                />
              </div>
            </ConfigProvider>

            {/* PRODUCTS */}

            <div className="flex flex-col">
              {topProductsPanding ? (
                <div className="flex justify-center py-6">
                  <Spin />
                </div>
              ) : filterSearch?.length === 0 ? (
                <div
                  className="
            py-8
            text-center
            text-[12px]
            text-[#8B909A]
            dark:text-[#9CA3AF]
          "
                >
                  Product not found
                </div>
              ) : (
                filterSearch?.map((item: TopProduct) => (
                  <div
                    key={item.sku}
                    className="
              flex
              items-center
              justify-between
              gap-3
              border-b
              border-[#E5E7EB]
              px-1
              py-3
              last:border-b-0
              dark:border-[#374151]
            "
                  >
                    {/* IMAGE */}

                    <div
                      className="
                flex
                h-[45px]
                w-[45px]
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-[9px]
                border
                border-[#E5E7EB]
                bg-[#F9FAFB]
                dark:border-[#374151]
                dark:bg-[#111827]
              "
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* INFO */}

                    <div className="min-w-0 flex-1">
                      <p
                        className="
                  truncate
                  text-[13px]
                  font-semibold
                  text-[#23272E]
                  dark:text-[#F9FAFB]
                "
                      >
                        {item.name}
                      </p>

                      <p
                        className="
                  mt-1
                  text-[11px]
                  text-[#8B909A]
                  dark:text-[#9CA3AF]
                "
                      >
                        {item.sku}
                      </p>
                    </div>

                    {/* PRICE */}

                    <p
                      className="
                shrink-0
                text-[13px]
                font-bold
                text-[#23272E]
                dark:text-[#F3F4F6]
              "
                    >
                      {Number(item.price).toLocaleString("uz-UZ")} so'm
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
