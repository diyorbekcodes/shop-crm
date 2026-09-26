import { ChevronUp, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Segmented, Skeleton, ConfigProvider, Input, Spin } from "antd";

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

  const { data: topProductsData, isPending: topProductsPanding } =
    topProducts();
  console.log(topProductsData);

  const [week, setWeek] = useState<"this" | "last">("this");
  const { data: salesData, isPending: salesPending } = salesByCountr();
  const { data: weekData } = thisWeekLastWeek(week);
  const { data: realTimeData, isPending: realTimePanding } = realTime();

  const salesDatas = salesData ?? [];
 

  const kpisDatas: DashboardStatsType | undefined = kpisData;

  const [activeChart, setActiveChart] = useState("customers");
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

                <EllipsisVertical
                  size={20}
                  className="text-gray-500 dark:text-[#9CA3AF]"
                />
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

                <EllipsisVertical
                  size={20}
                  className="text-gray-500 dark:text-[#9CA3AF]"
                />
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

                <EllipsisVertical
                  size={20}
                  className="text-gray-500 dark:text-[#9CA3AF]"
                />
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
                </ConfigProvider>

                <EllipsisVertical
                  size={20}
                  className="text-gray-500 dark:text-[#9CA3AF]"
                />
              </div>
            </div>

            {/* ================= STATS ================= */}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
              {statsItems.map((item) => (
                <div
                  key={item.key}
                  onClick={() => setActiveChart(item.key)}
                  className={`
        flex flex-col items-start justify-between
        p-3
        cursor-pointer
        border-b-[2px]
        transition-all

        ${
          activeChart === item.key
            ? `
              bg-[linear-gradient(
                180deg,
                rgba(78,166,116,0)_0%,
                rgba(78,166,116,0.08)_100%
              )]
              border-b-[#4EA674]
            `
            : "border-b-[#E5E7EB] dark:border-b-[#374151]"
        }
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
          <div className="bg-white dark:bg-[#1F2937] p-4 rounded-[8px] shadow border border-transparent dark:border-[#374151] self-start">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-[14px] text-[#6467F2]">
                  Users in last 30 minutes
                </p>

                <p className="font-bold text-[32px]">21.5K</p>
              </div>

              <EllipsisVertical
                size={20}
                className="text-gray-500 dark:text-[#9CA3AF]"
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-medium">Users per minute</p>

              <div>
                <ChartColumn data={realTimeData} />
              </div>

              {/* ================= SALES HEADER ================= */}

              <div className="flex justify-between items-center">
                <p className="font-semibold text-[18px]">Sales by Country</p>

                <p className="font-semibold text-[18px]">Sales</p>
              </div>

              {/* ================= SALES BY COUNTRY ================= */}

              <div
                className="
    min-h-[200px]
    mx-[-16px]
    p-[10px]
    bg-no-repeat
    bg-cover
    bg-center
    flex flex-col
    gap-[26px]
    dark:backdrop-blur-[6px]
    dark:bg-[#1F2937]/35
  "
                style={{
                  backgroundImage: `url(${map})`,
                }}
              >
                {salesPending ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <p className="text-gray-500 dark:text-[#9CA3AF]">
                      Loading...
                    </p>
                  </div>
                ) : salesDatas.length === 0 ? (
                  <div className="flex justify-center items-center min-h-[200px]">
                    <p className="text-gray-500 dark:text-[#9CA3AF]">
                      Sales data not found
                    </p>
                  </div>
                ) : (
                  salesDatas.map((item) => (
                    <div
                      key={item.code}
                      className="
    flex
    justify-between
    items-start
    gap-3
    dark:bg-[#111827]/40
    dark:backdrop-blur-md
    dark:border
    dark:border-white/10
    dark:rounded-[10px]
    dark:px-3
    dark:py-2
  "
                    >
                      {/* COUNTRY */}

                      <div className="flex gap-[10px] items-center">
                        <img
                          src={us}
                          alt={item.name}
                          className="w-[30px] h-[20px] object-cover"
                        />

                        <div>
                          <div className="font-bold text-[14px] flex ">
                            <CountUp
                              end={Number(item.sales)}
                              formattingFn={(value) =>
                                value.toLocaleString("uz-UZ")
                              }
                            />{" "}
                            {/* <p className="font-bold text-[14px]">so'm</p> */}
                          </div>

                          <p className="text-[12px] text-[#8B909A] dark:text-[#9CA3AF]">
                            {item.name}
                          </p>
                        </div>
                      </div>

                      {/* PERCENTAGE */}

                      <div className="flex flex-col gap-[3px]">
                        <p
                          className={`
      font-bold
      text-[14px]
      flex
      justify-end
      items-center
      ${item.changePercent >= 0 ? "text-[#28C76F]" : "text-red-500"}
    `}
                        >
                          {item.share >= 0 ? (
                            <ChevronUp size={16} color="#28C76F" />
                          ) : (
                            <ChevronUp
                              size={16}
                              color="red"
                              className="rotate-180"
                            />
                          )}
                          <CountUp end={Number(item.changePercent)} />%
                        </p>

                        <div className="bg-[#F0F3FF] dark:bg-[#374151] w-[150px] sm:w-[179px] h-[6px] rounded-[10px] overflow-hidden">
                          <AnimatedProgress value={Number(item.share)} />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* ================= VIEW INSIGHT ================= */}

              <button
                className="
                bg-white dark:bg-[#1F2937]
                w-full
                border border-[#6467F2]
                text-[#6467F2]
                text-[16px]
                py-2
                px-5
                rounded-[50px]
                hover:bg-[#6467F2]
                hover:text-white
                transition
              "
              >
                View Insight
              </button>
            </div>
          </div>
          {/* Top product */}
          <div className="bg-white dark:bg-[#1F2937] p-4 shadow rounded-[8px] border border-transparent dark:border-[#374151] self-start">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-[18px]">Top Products</p>

              <p
                onClick={() => navigate("/products")}
                className="text-[12px] cursor-pointer font-regular text-[#6467F2]"
              >
                All products
              </p>
            </div>

            {/* ================= SEARCH ================= */}

            <ConfigProvider
              theme={{
                token: {
                  colorBgContainer: darkMode ? "#374151" : "#FFFFFF",

                  colorText: darkMode ? "#F9FAFB" : "#111827",

                  colorTextPlaceholder: darkMode ? "#9CA3AF" : "#6B7280",

                  colorBorder: darkMode ? "#4B5563" : "#E5E7EB",
                },

                components: {
                  Input: {
                    colorBgContainer: darkMode ? "#374151" : "#FFFFFF",

                    colorText: darkMode ? "#F9FAFB" : "#111827",

                    colorTextPlaceholder: darkMode ? "#9CA3AF" : "#6B7280",

                    colorBorder: darkMode ? "#4B5563" : "#E5E7EB",

                    hoverBorderColor: "#4EA674",

                    activeBorderColor: "#4EA674",

                    colorIcon: darkMode ? "#9CA3AF" : "#6B7280",

                    colorIconHover: "#4EA674",
                  },
                },
              }}
            >
              <div className="mb-4">
                <Search
                  placeholder="Search product..."
                  allowClear
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                  }}
                  onSearch={onSearch}
                  className="w-full !outline-none
    !shadow-none
    [&_*]:!outline-none
    [&_*]:!shadow-none"
                />
              </div>
            </ConfigProvider>

            {/* PRODUCT 1 */}

            {filterSearch?.map((item: TopProduct) =>
              topProductsPanding ? (
                <Spin />
              ) : (
                <div className="flex justify-between items-center mt-4 p-2 border-b border-[#E0E0E0] dark:border-[#374151] gap-2">
                  <img
                    src={item.image}
                    alt="Apple iPhone 13"
                    className="w-[45px] h-[45px] object-contain rounded-lg"
                  />

                  <div className="flex-1">
                    <p className="font-medium text-[15px]">{item.name}</p>

                    <p className="text-[12px] text-[#8B909A] dark:text-[#9CA3AF]">
                      {item.sku}
                    </p>
                  </div>

                  <p className="font-bold text-[15px]">{item.price} so'm</p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* THIRD ROW */}
      {/* ================================================= */}
    </div>
  );
}
