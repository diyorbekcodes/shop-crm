import { Navigate, Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";
import api from "../feature/service/pages/api";
import logo from "../assets/img/logo1.png";

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
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-[#111827]">
        <div className="relative flex items-center justify-center">
          <div className="relative w-37.5 h-12.5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl p-[2px] overflow-hidden">
              <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,#4EA674_90deg,transparent_180deg)] animate-spin [animation-duration:2.5s]" />

              <div className="absolute inset-[2px] rounded-2xl bg-white dark:bg-[#1F2937]" />
            </div>

            <div className="relative z-10">
              <img src={logo} alt="Logo" className="object-contain" />
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
          Loading...
        </p>

        <div className="flex gap-1.5 mt-3">
          <span className="w-2 h-2 rounded-full bg-[#4EA674] animate-bounce" />
          <span className="w-2 h-2 rounded-full bg-[#4EA674] animate-bounce [animation-delay:150ms]" />
          <span className="w-2 h-2 rounded-full bg-[#4EA674] animate-bounce [animation-delay:300ms]" />
        </div>
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
