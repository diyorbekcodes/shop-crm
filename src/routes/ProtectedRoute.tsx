import { Navigate, Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";
import api from "../feature/service/pages/api";
import { Spin } from "antd";

const ProtectedRoute = () => {
  const token = localStorage.getItem("crmAccessToken");

  const { isLoading, isError } = useQuery({
    queryKey: ["useMe"],
    queryFn: async () => {
      const response = await api.get("/admin/auth/me");
      return response.data;
    },
    enabled: !!token,
    retry: false,
  });

  // Token umuman yo'q
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Backend tokenni tekshirayotgan paytda
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>
          <Spin description="Loading..." size="large">
            {""}
          </Spin>
        </p>
      </div>
    );
  }

  // Token noto'g'ri yoki muddati tugagan
  if (isError) {
    localStorage.removeItem("crmAccessToken");
    localStorage.removeItem("crmRefreshToken");
    localStorage.removeItem("admin");

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
