import api from "./pages/api";

const pendingUploads = new Map<string, Promise<string>>();
const completedUploads = new Map<string, string>();

interface UploadImageResponse {
  success: boolean;
  data: {
    url: string;
    key: string;
    originalName: string;
    mimeType: string;
    size: number;
  };
}

const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<UploadImageResponse>(
    "/admin/uploads",
    formData,
  );

  const uploadedUrl = response.data.data?.url;

  if (!uploadedUrl) {
    throw new Error("Upload javobida rasm URL manzili topilmadi");
  }

  return uploadedUrl;
};

export const uploadImage = (file: File): Promise<string> => {
  const uploadKey = `${file.name}:${file.size}:${file.lastModified}`;

  const completedUrl = completedUploads.get(uploadKey);

  if (completedUrl) {
    return Promise.resolve(completedUrl);
  }

  const pendingUpload = pendingUploads.get(uploadKey);

  if (pendingUpload) {
    return pendingUpload;
  }

  const request = uploadFile(file)
    .then((url) => {
      completedUploads.set(uploadKey, url);
      return url;
    })
    .finally(() => {
      pendingUploads.delete(uploadKey);
    });

  pendingUploads.set(uploadKey, request);

  return request;
};

export const resolveImageUrl = (url?: string | null): string => {
  if (!url) return "";

  const trimmedUrl = url.trim();

  if (!trimmedUrl) return "";

  if (/^https?:\/\//i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  if (trimmedUrl.startsWith("//")) {
    return `${window.location.protocol}${trimmedUrl}`;
  }

  try {
    const baseUrl = api.defaults.baseURL;

    if (!baseUrl) return trimmedUrl;

    const origin = new URL(baseUrl).origin;
    const normalizedPath = trimmedUrl.replace(/^\/+/, "");

    return new URL(normalizedPath, `${origin}/`).toString();
  } catch {
    return trimmedUrl;
  }
};
