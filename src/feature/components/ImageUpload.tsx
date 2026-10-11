import { Button, Image, Upload, message } from "antd";
import type { UploadProps } from "antd";
import { isAxiosError } from "axios";
import { useRef, useState } from "react";

import { useTheme } from "../../context/modContext";
import { resolveImageUrl, uploadImage } from "../service/UploadService";

interface ImageUploadProps {
  className?: string;
  value?: string | null;
  onChange?: (url: string) => void;
  buttonText?: string;
  previewAlt?: string;
}

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError<{ message?: string }>(error)) {
    return (
      error.response?.data?.message ?? "Rasmni yuklashda xatolik yuz berdi"
    );
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Rasmni yuklashda xatolik yuz berdi";
};

export default function ImageUpload({
  className = "",
  value,
  onChange,
  buttonText = "Rasm tanlash",
  previewAlt = "Yuklangan rasm",
}: ImageUploadProps) {
  const { darkMode } = useTheme();
  const activeUploads = useRef(new Set<string>());
  const [uploadCount, setUploadCount] = useState(0);
  const [imageError, setImageError] = useState(false);

  const imageUrl = value ? resolveImageUrl(value) : "";

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    if (!file.type.startsWith("image/")) {
      message.error("Faqat rasm fayllarini yuklash mumkin");
      return Upload.LIST_IGNORE;
    }

    const uploadKey = `${file.name}:${file.size}:${file.lastModified}`;

    if (activeUploads.current.has(uploadKey)) {
      return Upload.LIST_IGNORE;
    }

    activeUploads.current.add(uploadKey);
    setUploadCount(activeUploads.current.size);

    void uploadImage(file)
      .then((url) => {
        setImageError(false);
        onChange?.(url);
        message.success("Rasm muvaffaqiyatli yuklandi");
      })
      .catch((error: unknown) => {
        message.error(getErrorMessage(error));
      })
      .finally(() => {
        activeUploads.current.delete(uploadKey);
        setUploadCount(activeUploads.current.size);
      });

    return Upload.LIST_IGNORE;
  };
  console.log("Backend URL:", value);
  console.log("Resolved URL:", resolveImageUrl(value));
  return (
    <div
      className={`         flex min-w-0 flex-col gap-3 rounded-xl border p-4
        transition-all duration-300
        ${
          darkMode
            ? "border-[#374151] bg-[#1F2937]"
            : "border-[#E5E7EB] bg-[#F9FAFB]"
        }
        ${className}
      `}
    >
      {imageUrl && !imageError && (
        <div
          className={`             flex min-h-28 min-w-0 items-center justify-center
            overflow-hidden rounded-lg border p-3
            ${
              darkMode
                ? "border-[#374151] bg-[#111827]"
                : "border-[#E5E7EB] bg-white"
            }
          `}
        >
          <Image
            key={imageUrl}
            src={imageUrl}
            alt={previewAlt}
            preview
            onError={() => setImageError(true)}
            className="!max-h-48 !max-w-full object-contain"
            style={{
              maxHeight: 192,
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />{" "}
        </div>
      )}

      {imageError && (
        <div
          className={`rounded-lg border p-4 text-center text-sm ${
            darkMode
              ? "border-red-900 bg-red-950/30 text-red-400"
              : "border-red-200 bg-red-50 text-red-500"
          }`}
        >
          Rasmni ko‘rsatib bo‘lmadi. URL manzilini tekshiring.
        </div>
      )}

      <Upload
        accept="image/*"
        beforeUpload={beforeUpload}
        maxCount={1}
        multiple={false}
        showUploadList={false}
      >
        <Button
          loading={uploadCount > 0}
          disabled={uploadCount > 0}
          className={`
        !h-10 !rounded-lg !px-5 !font-medium
        !transition-all !duration-300
        ${
          darkMode
            ? "!border-[#4B5563] !bg-[#374151] !text-[#F9FAFB] hover:!border-[#6B7280] hover:!bg-[#4B5563] hover:!text-white"
            : "!border-[#D1D5DB] !bg-white !text-[#374151] hover:!border-[#9CA3AF] hover:!bg-[#F3F4F6] hover:!text-[#111827]"
        }
      `}
        >
          {uploadCount > 0 ? "Yuklanmoqda..." : buttonText}
        </Button>
      </Upload>
    </div>
  );
}
