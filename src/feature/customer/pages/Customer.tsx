import {
  ArrowUp,
  Copy,
  Check,
  EllipsisVertical,
  MapPin,
  Phone,
} from "lucide-react";

import { useState } from "react";
import { ConfigProvider, Segmented, Switch } from "antd";

import SignUpChart from "../../dashboard/compponet/Chart";
import CustomerTable from "../compponet/CustomerTable";

import avatar from "../../../assets/img/avatar2.png";
import facebookIcon from "../../../assets/svg/facebook.svg";
import twitterIcon from "../../../assets/svg/twitter.svg";
import instagramIcon from "../../../assets/svg/instagram.svg";
import whatsappIcon from "../../../assets/svg/whatsapp.svg";
import linkedinIcon from "../../../assets/svg/linkedin.svg";

import CustomerService from "../service/CustomerServise";
import { useIsDark } from "../../hook/UseIsDark";
import DashboardService from "../../dashboard/service/DashboardService";
import CountUp from "../../../context/CountUp";

export default function Customer() {
  const darkMode = useIsDark();
  const { thisWeekLastWeek } = DashboardService();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeChart, setActiveChart] = useState("customers");
  const [copied, setCopied] = useState(false);
  const [week, setWeek] = useState<"this" | "last">("this");
  const { data: weekData } = thisWeekLastWeek(week);
  const handleCopy = async (text?: string) => {
    if (!text) return;

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };
  const [selectedCustomerId, setSelectedCustomerId] = useState<
    string | undefined
  >();

  const { customerData, isCustomerLoading, changeCustomerStatus } =
    CustomerService(selectedCustomerId);

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
    <div>
      {/* =========================================
          TOP SECTION
      ========================================= */}

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
        {/* =========================================
            STAT CARDS
        ========================================= */}

        <div className="grid-cols-1 flex flex-col gap-4">
          {/* CARD 1 */}
          <div className="bg-white dark:bg-[#1F2937] p-4 shadow dark:shadow-black/20 rounded-[8px]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-[18px] dark:text-white">
                  Total Sales
                </p>
              </div>

              <div>
                <EllipsisVertical
                  size={20}
                  className="text-gray-500 dark:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-bold text-[32px] dark:text-white">1,240</p>

              <p className="text-[14px] font-medium flex gap-1 items-center text-[#21C45D]">
                <ArrowUp size={14} />
                12%
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400 text-[14px]">
                Last 7 days
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white dark:bg-[#1F2937] p-4 shadow dark:shadow-black/20 rounded-[8px]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-[18px] dark:text-white">
                  Total Sales
                </p>
              </div>

              <div>
                <EllipsisVertical
                  size={20}
                  className="text-gray-500 dark:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-bold text-[32px] dark:text-white">1,240</p>

              <p className="text-[14px] font-medium flex gap-1 items-center text-[#21C45D]">
                <ArrowUp size={14} />
                12%
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400 text-[14px]">
                Last 7 days
              </p>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white dark:bg-[#1F2937] p-4 shadow dark:shadow-black/20 rounded-[8px]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-[18px] dark:text-white">
                  Total Sales
                </p>
              </div>

              <div>
                <EllipsisVertical
                  size={20}
                  className="text-gray-500 dark:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-bold text-[32px] dark:text-white">1,240</p>

              <p className="text-[14px] font-medium flex gap-1 items-center text-[#21C45D]">
                <ArrowUp size={14} />
                12%
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400 text-[14px]">
                Last 7 days
              </p>
            </div>
          </div>
        </div>

        {/* =========================================
            REPORT
        ========================================= */}

        <div className="col-span-2 bg-white dark:bg-[#1F2937] p-4 rounded-[8px] shadow dark:shadow-black/20">
          <div className="flex justify-between items-center mb-4">
            <p className="font-bold text-[18px] dark:text-white">
              Report for this week
            </p>

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

          {/* STATS */}

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
                <p className="font-bold text-[#000000] dark:text-white text-[20px]">
                  <CountUp end={Number(item.value)} />
                  {item.key === "revenue" && " UZS"}
                </p>

                <p className="text-[13px]  text-[#8B909A] dark:text-[#9CA3AF] font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* CHART */}

          <div className="w-full">
            <SignUpChart data={weekData} />
          </div>
        </div>
      </div>

      {/* =========================================
          CUSTOMER DETAILS TITLE
      ========================================= */}

      <div className="flex justify-between items-center mt-8">
        <p className="font-bold text-[18px] dark:text-white">
          Customer Details
        </p>
      </div>

      {/* =========================================
          CUSTOMER TABLE
      ========================================= */}

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mt-4 items-start">
        <div className="col-span-3 bg-white dark:bg-[#1F2937] w-full overflow-x-auto shadow dark:shadow-black/20 rounded-[8px]">
          <CustomerTable
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={(id) => {
              setSelectedCustomerId(id);
              setIsModalOpen(true);
            }}
          />
        </div>

        {/* =========================================
            CUSTOMER MODAL
        ========================================= */}

        {isModalOpen && customerData && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="w-full max-w-[500px] max-h-[90vh] overflow-y-auto scrollbar-hide bg-white dark:bg-[#1F2937] rounded-xl shadow-xl p-5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* =====================================
                  HEADER
              ===================================== */}

              <div className="flex items-center justify-between mb-5">
                <p className="font-bold text-[20px] dark:text-white">
                  Customer Details
                </p>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-[24px]"
                >
                  ×
                </button>
              </div>

              {/* =====================================
                  CUSTOMER
              ===================================== */}

              <div className="flex items-center gap-4">
                <div className="w-14 h-14">
                  <img
                    src={customerData?.data?.avatar || avatar}
                    alt="Customer"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                <div>
                  <p className="font-bold text-[18px] dark:text-white">
                    {customerData?.data?.firstName}{" "}
                    {customerData?.data?.lastName}
                  </p>

                  <p className="text-[14px] flex gap-1 items-center text-[#6A717F] dark:text-gray-400">
                    {customerData?.data?.email}

                    <span
                      onClick={() => handleCopy(customerData?.data?.email)}
                      className="cursor-pointer flex items-center"
                    >
                      {copied ? (
                        <Check
                          size={14}
                          className="text-green-500 animate-[bounce_0.4s_ease-in-out]"
                        />
                      ) : (
                        <Copy
                          size={14}
                          className="text-blue-500 transition-transform duration-200 hover:scale-110"
                        />
                      )}
                    </span>
                  </p>
                </div>
              </div>

              {/* =====================================
                  CUSTOMER INFO
              ===================================== */}

              <div className="mt-5">
                <p className="font-medium text-[14px] text-[#9CA3AF]">
                  Customer Info
                </p>

                <div className="flex flex-col gap-2 mt-3">
                  {/* PHONE */}

                  <div className="flex px-[10px] py-[10px] gap-2 items-center border rounded-[6px] border-[#EAF8E7] dark:border-[#374151]">
                    <Phone
                      size={20}
                      className="text-gray-700 dark:text-gray-300"
                    />

                    <p className="text-[14px] text-[#6A717F] dark:text-gray-300">
                      {customerData?.data?.phone || "No phone"}
                    </p>
                  </div>

                  {/* ADDRESS */}

                  <div className="flex px-[10px] py-[10px] gap-2 items-center border rounded-[6px] border-[#EAF8E7] dark:border-[#374151]">
                    <MapPin
                      size={20}
                      className="text-gray-700 dark:text-gray-300"
                    />

                    <p className="text-[14px] text-[#6A717F] dark:text-gray-300">
                      {customerData?.data?.address || "No address"}
                    </p>
                  </div>
                </div>
              </div>

              {/* =====================================
                  STATUS
              ===================================== */}

              <div className="mt-5">
                <p className="font-medium text-[14px] text-[#9CA3AF]">Status</p>

                <div className="flex items-center justify-between mt-3 px-[10px] py-[10px] border rounded-[6px] border-[#EAF8E7] dark:border-[#374151]">
                  <div>
                    <p className="text-[14px] font-medium text-[#4B5563] dark:text-gray-200">
                      Customer status
                    </p>

                    <p
                      className={`text-[12px] ${
                        customerData?.data?.isActive
                          ? "text-[#21C45D]"
                          : "text-[#EF4343]"
                      }`}
                    >
                      {customerData?.data?.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>

                  <Switch
                    checked={customerData?.data?.isActive}
                    loading={changeCustomerStatus.isPending}
                    onChange={(checked) => {
                      if (!selectedCustomerId) return;

                      changeCustomerStatus.mutate({
                        id: selectedCustomerId,
                        isActive: checked,
                      });
                    }}
                  />
                </div>
              </div>

              {/* =====================================
                  SOCIAL MEDIA
              ===================================== */}

              <div className="mt-5">
                <p className="font-medium text-[14px] text-[#9CA3AF]">
                  Social Media
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <img
                    className="cursor-pointer"
                    src={facebookIcon}
                    alt="Facebook"
                  />

                  <img
                    className="cursor-pointer"
                    src={whatsappIcon}
                    alt="WhatsApp"
                  />

                  <img
                    className="cursor-pointer"
                    src={twitterIcon}
                    alt="Twitter"
                  />

                  <img
                    className="cursor-pointer"
                    src={linkedinIcon}
                    alt="LinkedIn"
                  />

                  <img
                    className="cursor-pointer"
                    src={instagramIcon}
                    alt="Instagram"
                  />
                </div>
              </div>

              {/* =====================================
                  ACTIVITY
              ===================================== */}

              <div className="mt-5">
                <p className="font-medium text-[14px] text-[#9CA3AF]">
                  Activity
                </p>

                <div className="flex flex-col gap-2 mt-3 px-[10px] py-[8px]">
                  <p className="text-[14px] text-[#4B5563] dark:text-gray-300">
                    Registration: 15.01.2025
                  </p>

                  <p className="text-[14px] text-[#4B5563] dark:text-gray-300">
                    Last purchase: 10.01.2025
                  </p>
                </div>
              </div>

              {/* =====================================
                  ORDER OVERVIEW
              ===================================== */}

              <div className="mt-5">
                <p className="font-medium text-[14px] text-[#9CA3AF]">
                  Order overview
                </p>

                <div className="grid grid-cols-3 mt-4 gap-2">
                  {/* TOTAL */}

                  <div className="flex flex-col rounded-[6px] items-center py-3 justify-center border dark:border-[#374151]">
                    <p className="text-[#023337] dark:text-white text-[18px] font-bold">
                      150
                    </p>

                    <p className="text-[12px] text-[#6467F2]">Total order</p>
                  </div>

                  {/* COMPLETED */}

                  <div className="flex flex-col rounded-[6px] items-center py-3 justify-center border dark:border-[#374151]">
                    <p className="text-[#023337] dark:text-white text-[18px] font-bold">
                      140
                    </p>

                    <p className="text-[12px] text-[#21C45D]">Completed</p>
                  </div>

                  {/* CANCELED */}

                  <div className="flex flex-col rounded-[6px] items-center py-3 justify-center border dark:border-[#374151]">
                    <p className="text-[#023337] dark:text-white text-[18px] font-bold">
                      10
                    </p>

                    <p className="text-[12px] text-[#EF4343]">Canceled</p>
                  </div>
                </div>
              </div>

              {/* =====================================
                  CLOSE
              ===================================== */}

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-6 py-2.5 rounded-lg bg-[#0b1bf1] text-white font-medium hover:bg-[#3340f8] transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
