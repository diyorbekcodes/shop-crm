import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../service/pages/api";
import type {
  SalesByCountryType,
  DashboardStatsType,
  DashboardStats,
  WeeklyReportResponse,
  UsersPerMinuteData,
} from "../types/ProductType";

const DashboardService = () => {
  const queryClient = useQueryClient();
  const { isPending, data: kpisData } = useQuery<DashboardStatsType>({
    queryKey: ["DashboardService"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard/kpis");
      return res.data.data;
    },
  });
  const salesByCountr = () => {
    return useQuery<SalesByCountryType[]>({
      queryKey: ["salesByCountr"],
      queryFn: async () => {
        const res = await api.get("/admin/dashboard/sales-by-country");
        return res.data.data;
      },
    });
  };
  const bestSellingProduct = () => {
    return useQuery<SalesByCountryType[]>({
      queryKey: ["bestSellingProduct"],
      queryFn: async () => {
        const res = await api.get("/admin/dashboard/best-selling");
        console.log("BEST SELLERS RESPONSE:", res.data.data);
        return res.data.data;
      },
    });
  };
  const realTime = () => {
    return useQuery<UsersPerMinuteData>({
      queryKey: ["realTime"],
      queryFn: async () => {
        const res = await api.get("/admin/dashboard/realtime-users");

        return res.data.data;
      },
    });
  };
  const thisWeekLastWeek = (week: "this" | "last") => {
    return useQuery<WeeklyReportResponse>({
      queryKey: ["week", week],
      queryFn: async () => {
        const res = await api.get(
          `/admin/dashboard/weekly-report?week=${week}`,
        );

        return res.data;
      },
    });
  };
  return {
    isPending,
    kpisData,
    salesByCountr,
    bestSellingProduct,
    thisWeekLastWeek,
    realTime,
  };
};
export default DashboardService;
