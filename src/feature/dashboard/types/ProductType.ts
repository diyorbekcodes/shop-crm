export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  image: string;
  price: number;
  orders: number;
  totalOrders: number;
  revenue: number;
  availableStock: number;
  status: string;
}
export interface DashboardStatsType {
  label: string;

  range: {
    from: string;
    to: string;
  };

  previousRange: {
    from: string;
    to: string;
  };

  totalSales: {
    value: number;
    previousValue: number;
    changePercent: number;
  };

  totalOrders: {
    value: number;
    previousValue: number;
    changePercent: number;
  };

  pending: {
    orders: number;
    users: number;
  };

  cancelled: {
    value: number;
    previousValue: number;
    changePercent: number;
  };
}
export interface SalesByRegionType {
  name: string;
  code: string;
  sales: number;
  previousSales: number;
  changePercent: number;
  share: number;
}

export interface SalesByRegionResponseType {
  success: boolean;
  data: SalesByRegionType[];
}
export interface SalesByCountryType {
  name: string;
  code: string;
  sales: number;
  previousSales: number;
  changePercent: number;
  share: number;
}
export interface DashboardStats {
  success: boolean;
  data: DashboardData;
}

export interface DashboardData {
  week: string;
  range: DashboardRange;
  stats: DashboardStatsData;
  chart: DashboardChart;
}

export interface DashboardRange {
  from: string;
  to: string;
}

export interface DashboardStatsData {
  customers: number;
  totalProducts: number;
  stockProducts: number;
  outOfStock: number;
  revenue: number;
}

export interface DashboardChart {
  thisWeek: ChartItem[];
  lastWeek: ChartItem[];
  active: ChartItem[];
}

export interface ChartItem {
  date: string;
  day: string;
  orders: number;
  revenue: number;
  value: number;
}
export interface WeeklyReportResponse {
  success: boolean;
  data: {
    week: "this" | "last";

    range: {
      from: string;
      to: string;
    };

    stats: {
      customers: number;
      totalProducts: number;
      stockProducts: number;
      outOfStock: number;
      revenue: number;
    };

    chart: {
      thisWeek: ChartItem[];
      lastWeek: ChartItem[];
      active: ChartItem[];
    };
  };
}

export interface PerMinute {
  time: string;
  users: number;
}

export interface UsersPerMinuteData {
  total: number;
  windowMinutes: number;
  from: string;
  to: string;
  perMinute: PerMinute[];
}

export interface UsersPerMinuteResponse {
  success: boolean;
  data: UsersPerMinuteData;
}
export interface TopProduct {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
}

export interface ProductResponse {
  success: boolean;
  data: Product[];
}
