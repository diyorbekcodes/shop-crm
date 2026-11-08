const BASE_URL = "https://oline-shop-backend.onrender.com";

export const getImageUrl = (url?: string | null): string => {
  if (!url) return "/placeholder.png";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;
};