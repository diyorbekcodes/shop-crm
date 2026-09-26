import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../pages/api";
import { message } from "antd";

interface LoginData {
  email: string;
  password: string;
}

const useLogin = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login"],

    mutationFn: async (data: LoginData) => {
      const res = await api.post("/admin/auth/login", data);

      return res.data;
    },

    onSuccess: (data) => {
     

      const admin = data.data;

      if (!admin?.accessToken || !admin?.refreshToken) {
        localStorage.removeItem("crmAccessToken");
        localStorage.removeItem("crmRefreshToken");
        localStorage.removeItem("admin");

        message.error("Login ma'lumotlari noto'g'ri");
        return;
      }

      localStorage.setItem("crmAccessToken", admin.accessToken);
      localStorage.setItem("crmRefreshToken", admin.refreshToken);
      localStorage.setItem("admin", JSON.stringify(admin));

      message.success("Success");

      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      console.log("Login error:", error);

      localStorage.removeItem("crmAccessToken");
      localStorage.removeItem("crmRefreshToken");
      localStorage.removeItem("admin");

      message.error("Login yoki password noto'g'ri");
    },
  });

  return {
    isPending,
    login: mutate,
  };
};

export default useLogin;
