import { useState } from "react";
import { Button, Image, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadImage } from "../../feature/service/hooks/uploadService";

interface ImageUploadProps {
  value?: string | null;
  onChange?: (url: string) => void;
  buttonText?: string;
  previewAlt?: string;
}

export default function ImageUpload({
  value,
  onChange,
  buttonText = "Rasm tanlash",
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [previewError, setPreviewError] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      message.error("Faqat rasm fayllarini tanlang");
      event.target.value = "";
      return;
    }

    setLoading(true);

    try {
      const url = await uploadImage(file);

      setPreviewError(false);
      onChange?.(url);

      message.success("Rasm muvaffaqiyatli yuklandi");
    } catch (error) {
      console.error("Upload xatosi:", error);

      message.error(
        error instanceof Error
          ? error.message
          : "Rasmni yuklashda xatolik yuz berdi",
      );
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {value && !previewError && (
        <div className="flex min-h-32 items-center justify-center rounded-lg border border-gray-200 p-3">
          <Image
            src={value}
            alt="Yuklangan rasm"
            style={{
              maxHeight: 192,
              maxWidth: "100%",
              objectFit: "contain",
            }}
            onError={() => setPreviewError(true)}
          />
        </div>
      )}

      {previewError && (
        <p className="text-sm text-red-500">
          Rasm ochilmadi. URL yoki server ruxsatlarini tekshiring.
        </p>
      )}

      <Button
        icon={<UploadOutlined />}
        loading={loading}
        disabled={loading}
        onClick={() => {
          document.getElementById("image-upload-input")?.click();
        }}
      >
        {loading ? "Yuklanmoqda..." : buttonText}
      </Button>

      <input
        id="image-upload-input"
        type="file"
        accept="image/*"
        hidden
        disabled={loading}
        onChange={handleFileChange}
      />
    </div>
  );
}
