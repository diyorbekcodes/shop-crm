import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_REACT_BASE_URL,
});

// ===============================
// REQUEST INTERCEPTOR
// ===============================

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("crmAccessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// ===============================
// RESPONSE INTERCEPTOR
// ===============================

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    // Login 401 bo'lsa refresh qilmaymiz
    if (status === 401 && originalRequest?.url?.includes("/admin/auth/login")) {
      return Promise.reject(error);
    }

    // Refresh endpointning o'zi 401 bersa
    if (
      status === 401 &&
      originalRequest?.url?.includes("/admin/auth/refresh")
    ) {
      localStorage.removeItem("crmAccessToken");
      localStorage.removeItem("crmRefreshToken");
      localStorage.removeItem("admin");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    // Oddiy API request 401 bersa
    if (status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("crmRefreshToken");

      // Refresh token yo'q
      if (!refreshToken) {
        localStorage.removeItem("crmAccessToken");
        localStorage.removeItem("crmRefreshToken");
        localStorage.removeItem("admin");

        window.location.href = "/login";

        return Promise.reject(error);
      }

      try {
        // Refresh token orqali yangi token olamiz
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_BASE_URL}/admin/auth/refresh`,
          {
            refreshToken,
          },
        );

        // Backend response:
        // {
        //   success: true,
        //   data: {
        //     accessToken: "...",
        //     refreshToken: "...",
        //     tokenType: "Bearer",
        //     expiresIn: "1d"
        //   }
        // }

        const data = response.data?.data;

        const newAccessToken = data?.accessToken;
        const newRefreshToken = data?.refreshToken;

        if (!newAccessToken) {
          throw new Error("New access token olinmadi");
        }

        // Yangi access tokenni saqlaymiz
        localStorage.setItem("crmAccessToken", newAccessToken);

        // Backend yangi refresh token bergan bo'lsa,
        // uni ham yangilaymiz
        if (newRefreshToken) {
          localStorage.setItem("crmRefreshToken", newRefreshToken);
        }

        // Eski requestga yangi token beramiz
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Eski requestni qayta yuboramiz
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh ham ishlamasa logout
        localStorage.removeItem("crmAccessToken");
        localStorage.removeItem("crmRefreshToken");
        localStorage.removeItem("admin");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
