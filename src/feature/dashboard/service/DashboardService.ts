import { useQuery } from "@tanstack/react-query";
import api from "../../service/pages/api";

import type {
  SalesByCountryType,
  DashboardStatsType,
  WeeklyReportResponse,
  UsersPerMinuteData,
} from "../types/ProductType";

const DashboardService = () => {
  const { isPending, data: kpisData } = useQuery<DashboardStatsType>({
    queryKey: ["DashboardService"],
    queryFn: async () => {
      const res = await api.get("/admin/dashboard/kpis");
      return res.data.data;
    },
  });

  const useSalesByCountr = () => {
    return useQuery<SalesByCountryType[]>({
      queryKey: ["salesByCountr"],
      queryFn: async () => {
        const res = await api.get("/admin/dashboard/sales-by-country");
        return res.data.data;
      },
    });
  };

  const useBestSellingProduct = () => {
    return useQuery({
      queryKey: ["bestSellingProduct"],
      queryFn: async () => {
        const res = await api.get("/admin/dashboard/best-selling");
        return res.data.data;
      },
    });
  };

  const useTopProducts = () => {
    return useQuery({
      queryKey: ["topProducts"],
      queryFn: async () => {
        const res = await api.get("/admin/dashboard/top-products");
        return res.data.data;
      },
    });
  };

  const useRealTime = () => {
    return useQuery<UsersPerMinuteData>({
      queryKey: ["realTime"],
      queryFn: async () => {
        const res = await api.get("/admin/dashboard/realtime-users");
        return res.data.data;
      },
    });
  };

  const useThisWeekLastWeek = (week: "this" | "last") => {
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
    useSalesByCountr,
    useBestSellingProduct,
    useThisWeekLastWeek,
    useRealTime,
    useTopProducts,
  };
};

export default DashboardService;
