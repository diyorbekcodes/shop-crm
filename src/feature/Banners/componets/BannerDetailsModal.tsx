import { Button, Image, Modal } from "antd";

import { ExternalLink, Link2, Smartphone, X } from "lucide-react";

import type { Banner } from "../types/BannersType";

interface BannerDetailsModalProps {
  open: boolean;
  banner: Banner | null;
  darkMode: boolean;
  onClose: () => void;
}

export default function BannerDetailsModal({
  open,
  banner,
  darkMode,
  onClose,
}: BannerDetailsModalProps) {
  if (!banner) return null;

  const mutedClass = darkMode ? "text-gray-400" : "text-gray-500";

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      className="banner-modal"
      width={820}
      closeIcon={
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            darkMode
              ? "bg-[#1F2937] text-gray-400 hover:bg-[#374151] hover:text-white"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          <X size={17} />
        </div>
      }
      styles={{
        mask: {
          backgroundColor: "rgba(0,0,0,0.72)",
          backdropFilter: "blur(5px)",
        },
       
        body: {
          padding: 0,
        },
      }}
    >
      <div className={darkMode ? "bg-[#111827]" : "bg-white"}>
        <div className="relative h-[300px] overflow-hidden">
          <Image
            src={banner.image}
            alt={banner.title}
            width="100%"
            height="100%"
            preview
            className="!h-full !w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

          <div className="absolute bottom-6 left-7 right-7">
            <span
              className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md ${
                banner.isActive
                  ? "border-green-400/20 bg-green-500/20 text-green-300"
                  : "border-red-400/20 bg-red-500/20 text-red-300"
              }`}
            >
              {banner.isActive ? "● Active" : "● Inactive"}
            </span>

            <h2 className="mt-3 text-2xl font-bold text-white">
              {banner.title}
            </h2>

            <p className="mt-1 max-w-2xl text-sm text-gray-200">
              {banner.subtitle}
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <DetailBox
              darkMode={darkMode}
              title="Banner ID"
              value={banner.id}
              breakAll
            />

            <DetailBox
              darkMode={darkMode}
              title="Sort Order"
              value={`#${banner.sortOrder}`}
            />

            <DetailBox
              darkMode={darkMode}
              title="Button Text"
              value={banner.buttonText || "Not set"}
            />

            <DetailBox
              darkMode={darkMode}
              title="Status"
              value={banner.isActive ? "● Active" : "● Inactive"}
              valueClass={banner.isActive ? "text-green-500" : "text-red-500"}
            />
          </div>

          {banner.link && (
            <div
              className={`mt-4 rounded-2xl border p-4 ${
                darkMode
                  ? "border-[#374151] bg-[#1F2937]"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <Link2 size={16} className="text-blue-500" />

                <span className={`text-xs ${mutedClass}`}>Banner Link</span>
              </div>

              <a
                href={banner.link}
                target="_blank"
                rel="noreferrer"
                className="break-all text-sm text-blue-500 hover:underline"
              >
                {banner.link}
              </a>
            </div>
          )}

          {banner.mobileImage && (
            <div
              className={`mt-4 rounded-2xl border p-4 ${
                darkMode
                  ? "border-[#374151] bg-[#1F2937]"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="mb-3 flex items-center gap-2">
                <Smartphone size={17} className={mutedClass} />

                <span
                  className={`text-sm font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Mobile Banner
                </span>
              </div>

              <Image
                src={banner.mobileImage}
                alt="Mobile banner"
                width="100%"
                height={180}
                className="rounded-xl object-cover"
              />
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3">
            <Button
              onClick={onClose}
              className={`!h-10 !rounded-xl ${
                darkMode ? "!border-[#374151] !bg-[#1F2937] !text-gray-300" : ""
              }`}
            >
              Close
            </Button>

            {banner.link && (
              <Button
                type="primary"
                icon={<ExternalLink size={16} />}
                href={banner.link}
                target="_blank"
                className="!h-10 !rounded-xl"
              >
                Open Link
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

interface DetailBoxProps {
  darkMode: boolean;
  title: string;
  value: string;
  breakAll?: boolean;
  valueClass?: string;
}

function DetailBox({
  darkMode,
  title,
  value,
  breakAll,
  valueClass,
}: DetailBoxProps) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        darkMode
          ? "border-[#374151] bg-[#1F2937]"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <p
        className={`mb-2 text-xs ${
          darkMode ? "text-gray-500" : "text-gray-400"
        }`}
      >
        {title}
      </p>

      <p
        className={`text-sm font-semibold ${breakAll ? "break-all" : ""} ${
          valueClass || (darkMode ? "text-gray-100" : "text-gray-900")
        }`}
      >
        {value}
      </p>
    </div>
  );
}
