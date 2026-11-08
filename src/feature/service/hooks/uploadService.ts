import api from "../pages/api";

export interface UploadResponse {
  success: boolean;
  data: {
    url: string;
    key: string;
    originalName: string;
    mimeType: string;
    size: number;
  };
}

export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Faqat rasm fayllarini yuklash mumkin");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<UploadResponse>("/admin/uploads", formData);

  const imageUrl = response.data.data?.url;

  if (!imageUrl) {
    throw new Error("Backend rasm URL manzilini qaytarmadi");
  }

  return imageUrl;
}

export function resolveImageUrl(url?: string | null): string {
  if (!url?.trim()) return "";

  const trimmedUrl = url.trim();

  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  const baseUrl = "https://oline-shop-backend.onrender.com";

  return `${baseUrl}/${trimmedUrl.replace(/^\/+/, "")}`;
}
