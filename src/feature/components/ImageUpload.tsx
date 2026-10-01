import { Button, Image, Upload, message } from "antd";
import type { UploadProps } from "antd";
import { isAxiosError } from "axios";
import { useRef, useState } from "react";

import { useTheme } from "../../context/modContext";
import { resolveImageUrl, uploadImage } from "../service/UploadService";

interface ImageUploadProps {
  value?: string | null;
  onChange?: (url: string) => void;
  buttonText?: string;
  previewAlt?: string;
}

const getErrorMessage = (error: unknown): string => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? "Rasmni yuklashda xatolik yuz berdi";
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Rasmni yuklashda xatolik yuz berdi";
};

export default function ImageUpload({
  value,
  onChange,
  buttonText = "Rasm tanlash",
  previewAlt = "Yuklangan rasm",
}: ImageUploadProps) {
  const { darkMode } = useTheme();
  const activeUploads = useRef(new Set<string>());
  const [uploadCount, setUploadCount] = useState(0);

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

    // Upload.LIST_IGNORE prevents Ant Design's default upload/list handling.
    return Upload.LIST_IGNORE;
  };

  return (
    <div
      className={`flex min-w-0 flex-col gap-3 rounded-lg border p-3 ${
        darkMode
          ? "border-[#4B5563] bg-[#111827]"
          : "border-[#E5E7EB] bg-[#F9FBFA]"
      }`}
    >
      {value && (
        <div
          className={`flex min-h-24 min-w-0 items-center justify-center overflow-hidden rounded-md p-2 ${
            darkMode ? "bg-[#1F2937]" : "bg-white"
          }`}
        >
          <Image
            src={resolveImageUrl(value)}
            alt={previewAlt}
            preview
            className="!max-h-48 !max-w-full object-contain"
            style={{ maxHeight: 192, maxWidth: "100%", objectFit: "contain" }}
          />
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
          className="!h-10 w-full sm:w-auto"
        >
          {uploadCount > 0 ? "Yuklanmoqda..." : buttonText}
        </Button>
      </Upload>
    </div>
  );
}
