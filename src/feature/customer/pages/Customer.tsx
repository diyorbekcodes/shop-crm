import { Check, Copy, MapPin, Phone } from "lucide-react";

import { useState } from "react";
import { ConfigProvider, Spin, Switch } from "antd";

import CustomerTable from "../compponet/CustomerTable";

import avatar from "../../../assets/img/avatar2.png";
import facebookIcon from "../../../assets/svg/facebook.svg";
import twitterIcon from "../../../assets/svg/twitter.svg";
import instagramIcon from "../../../assets/svg/instagram.svg";
import whatsappIcon from "../../../assets/svg/whatsapp.svg";
import linkedinIcon from "../../../assets/svg/linkedin.svg";

import CustomerService from "../service/CustomerServise";
import { useIsDark } from "../../hook/UseIsDark";


export default function Customer() {
  const darkMode = useIsDark();



  const [isModalOpen, setIsModalOpen] = useState(false);

  const [copied, setCopied] = useState(false);


  

  const [selectedCustomerId, setSelectedCustomerId] = useState<
    string | undefined
  >();

  const { customerData, isCustomerLoading, changeCustomerStatus } =
    CustomerService(selectedCustomerId);

  const handleCopy = async (text?: string) => {
    if (!text) return;

    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4EA674",

          colorBgContainer: darkMode ? "#1F2937" : "#FFFFFF",

          colorBgElevated: darkMode ? "#1F2937" : "#FFFFFF",

          colorText: darkMode ? "#F3F4F6" : "#111827",

          colorTextSecondary: darkMode ? "#9CA3AF" : "#6B7280",

          colorBorder: darkMode ? "#374151" : "#E5E7EB",

          borderRadius: 8,
        },

        components: {
          Segmented: {
            itemColor: darkMode ? "#AEB8C5" : "#4B5563",

            itemHoverColor: darkMode ? "#F3F4F6" : "#111827",

            itemSelectedColor: "#FFFFFF",

            trackBg: darkMode ? "#111827" : "#F3F4F6",

            itemSelectedBg: "#4EA674",

            borderRadius: 8,
          },

          Switch: {
            colorPrimary: "#2563EB",
            colorPrimaryHover: "#1D4ED8",
          },
        },
      }}
    >
      <div className="min-h-screen  text-[#111827] transition-colors duration-300 dark:bg-[#111827] dark:text-white">
        <div className="mt-8 mb-4 flex items-end justify-between">
          <div>
            <h2
              className="
                text-[18px]
                font-bold
                text-[#111827]
                dark:text-[#F3F4F6]
              "
            >
              Customer Details
            </h2>

            <p
              className="
                mt-1
                text-[13px]
                text-[#6B7280]
                dark:text-[#9CA3AF]
              "
            >
              View and manage all registered customers
            </p>
          </div>

          <div
            className="
              hidden
              items-center
              gap-1.5
              text-[12px]
              text-[#6B7280]
              dark:text-[#9CA3AF]
              sm:flex
            "
          >
            
          </div>
        </div>

        {/* =========================================================
            CUSTOMER TABLE
        ========================================================= */}

        <div
          className="
            grid
            grid-cols-1
            items-start
            gap-4
          "
        >
          <div
            className="
              col-span-3
              w-full
              overflow-x-auto
              rounded-[8px]
              bg-white
              shadow
              dark:bg-[#1F2937]
              dark:shadow-black/20
            "
          >
            <CustomerTable
              selectedCustomerId={selectedCustomerId}
              onSelectCustomer={(id) => {
                setSelectedCustomerId(id);
                isCustomerLoading ? <Spin /> : setIsModalOpen(true);
              }}
            />
          </div>

          {/* =====================================================
              CUSTOMER MODAL
          ===================================================== */}

          {isModalOpen && (
            <div
              className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/50
      p-4
    "
              onClick={() => setIsModalOpen(false)}
            >
              <div
                className="
        max-h-[90vh]
        w-full
        max-w-[500px]
        overflow-y-auto
        rounded-xl
        bg-white
        p-5
        shadow-xl
        scrollbar-hide
        dark:bg-[#1F2937]
      "
                onClick={(e) => e.stopPropagation()}
              >
                {/* LOADING */}
                {isCustomerLoading ? (
                  <div className="flex h-[400px] items-center justify-center">
                    <Spin size="large" />
                  </div>
                ) : customerData?.data ? (
                  <>
                    {/* HEADER */}
                    <div className="mb-5 flex items-center justify-between">
                      <p
                        className="
                text-[20px]
                font-bold
                text-[#111827]
                dark:text-white
              "
                      >
                        Customer Details
                      </p>

                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="
                text-[24px]
                text-gray-500
                transition
                hover:text-black
                dark:text-gray-400
                dark:hover:text-white
              "
                      >
                        ×
                      </button>
                    </div>

                    {/* CUSTOMER */}
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14">
                        <img
                          src={customerData?.data?.avatar || avatar}
                          alt="Customer"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>

                      <div>
                        <p
                          className="
                  text-[18px]
                  font-bold
                  text-[#111827]
                  dark:text-white
                "
                        >
                          {customerData?.data?.firstName}{" "}
                          {customerData?.data?.lastName}
                        </p>

                        <p
                          className="
                  flex
                  items-center
                  gap-1
                  text-[14px]
                  text-[#6A717F]
                  dark:text-gray-400
                "
                        >
                          {customerData?.data?.email}

                          <span
                            onClick={() =>
                              handleCopy(customerData?.data?.email)
                            }
                            className="flex cursor-pointer items-center"
                          >
                            {copied ? (
                              <Check
                                size={14}
                                className="
                        animate-[bounce_0.4s_ease-in-out]
                        text-green-500
                      "
                              />
                            ) : (
                              <Copy
                                size={14}
                                className="
                        text-blue-500
                        transition-transform
                        duration-200
                        hover:scale-110
                      "
                              />
                            )}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* CUSTOMER INFO */}
                    <div className="mt-5">
                      <p className="text-[14px] font-medium text-[#9CA3AF]">
                        Customer Info
                      </p>

                      <div className="mt-3 flex flex-col gap-2">
                        {/* PHONE */}
                        <div
                          className="
                  flex
                  items-center
                  gap-2
                  rounded-[6px]
                  border
                  border-[#EAF8E7]
                  px-[10px]
                  py-[10px]
                  dark:border-[#374151]
                "
                        >
                          <Phone
                            size={20}
                            className="text-gray-700 dark:text-gray-300"
                          />

                          <p className="text-[14px] text-[#6A717F] dark:text-gray-300">
                            {customerData?.data?.phone || "No phone"}
                          </p>
                        </div>

                        {/* ADDRESS */}
                        <div
                          className="
                  flex
                  items-center
                  gap-2
                  rounded-[6px]
                  border
                  border-[#EAF8E7]
                  px-[10px]
                  py-[10px]
                  dark:border-[#374151]
                "
                        >
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

                    {/* STATUS */}
                    <div className="mt-5">
                      <p className="text-[14px] font-medium text-[#9CA3AF]">
                        Status
                      </p>

                      <div
                        className="
                mt-3
                flex
                items-center
                justify-between
                rounded-[6px]
                border
                border-[#EAF8E7]
                px-[10px]
                py-[10px]
                dark:border-[#374151]
              "
                      >
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
                            {customerData?.data?.isActive
                              ? "Active"
                              : "Inactive"}
                          </p>
                        </div>

                        <Switch
                          checked={customerData?.data?.isActive}
                          loading={changeCustomerStatus.isPending}
                          className="customer-status-switch"
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

                    {/* SOCIAL MEDIA */}
                    <div className="mt-5">
                      <p className="text-[14px] font-medium text-[#9CA3AF]">
                        Social Media
                      </p>

                      <div className="mt-3 flex items-center gap-2">
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

                    {/* ACTIVITY */}
                    <div className="mt-5">
                      <p className="text-[14px] font-medium text-[#9CA3AF]">
                        Activity
                      </p>

                      <div className="mt-3 flex flex-col gap-2 px-[10px] py-[8px]">
                        <p className="text-[14px] text-[#4B5563] dark:text-gray-300">
                          Registration: 15.01.2025
                        </p>

                        <p className="text-[14px] text-[#4B5563] dark:text-gray-300">
                          Last purchase: 10.01.2025
                        </p>
                      </div>
                    </div>

                    {/* ORDER OVERVIEW */}
                    <div className="mt-5">
                      <p className="text-[14px] font-medium text-[#9CA3AF]">
                        Order overview
                      </p>

                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {/* TOTAL */}
                        <div
                          className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-[6px]
                  border
                  py-3
                  dark:border-[#374151]
                "
                        >
                          <p className="text-[18px] font-bold text-[#023337] dark:text-white">
                            150
                          </p>

                          <p className="text-[12px] text-[#6467F2]">
                            Total order
                          </p>
                        </div>

                        {/* COMPLETED */}
                        <div
                          className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-[6px]
                  border
                  py-3
                  dark:border-[#374151]
                "
                        >
                          <p className="text-[18px] font-bold text-[#023337] dark:text-white">
                            140
                          </p>

                          <p className="text-[12px] text-[#21C45D]">
                            Completed
                          </p>
                        </div>

                        {/* CANCELED */}
                        <div
                          className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-[6px]
                  border
                  py-3
                  dark:border-[#374151]
                "
                        >
                          <p className="text-[18px] font-bold text-[#023337] dark:text-white">
                            10
                          </p>

                          <p className="text-[12px] text-[#EF4343]">Canceled</p>
                        </div>
                      </div>
                    </div>

                    {/* CLOSE */}
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="
    mt-6
    w-full
    rounded-xl
    bg-blue-600
    py-2.5
    font-medium
    text-white
    shadow-md
    shadow-blue-500/20
    transition-all
    duration-200
    hover:bg-blue-700
    hover:shadow-lg
    hover:shadow-blue-500/30
    active:scale-[0.98]

    dark:bg-blue-500
    dark:shadow-blue-500/10
    dark:hover:bg-blue-600
    dark:hover:shadow-blue-500/20
  "
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <div className="flex h-[300px] items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400">
                      Customer not found
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ConfigProvider>
  );
}
