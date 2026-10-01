import type { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface ChartItem {
  date: string;
  day: string;
  orders: number;
  revenue: number;
  value: number;
}

interface SignUpChartProps {
  data?: {
    success: boolean;
    data: {
      week: "this" | "last";
      chart: {
        thisWeek: ChartItem[];
        lastWeek: ChartItem[];
        active: ChartItem[];
      };
    };
  };
}

const SignUpChart = ({ data }: SignUpChartProps) => {
  // API response:
  // data.data.chart.active
  const chartData = data?.data?.chart?.active ?? [];

  const series = [
    {
      name: data?.data?.week === "this" ? "This week" : "Last week",
      data: chartData.map((item) => item.revenue),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 380,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    stroke: {
      curve: "smooth",
      width: 3,
    },

    markers: {
      size: 4,
      hover: {
        size: 6,
      },
    },

    xaxis: {
      categories: chartData.map((item) => item.day),

      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "12px",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "12px",
        },

        formatter: (value) => {
          if (value >= 1_000_000) {
            return `${(value / 1_000_000).toFixed(0)}M`;
          }

          if (value >= 1_000) {
            return `${(value / 1_000).toFixed(0)}K`;
          }

          return `${value}`;
        },
      },
    },

    tooltip: {
      y: {
        formatter: (value) => `${value.toLocaleString()} UZS`,
      },
    },

    dataLabels: {
      enabled: false,
    },

    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },

    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
    },

    noData: {
      text: "No data",
    },

    responsive: [
      {
        breakpoint: 576,
        options: {
          chart: { height: 300 },
          legend: { position: "bottom", horizontalAlign: "center" },
          xaxis: { labels: { style: { fontSize: "10px" } } },
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default SignUpChart;
