import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface PerMinute {
  time: string;
  users: number;
}

interface UsersPerMinuteData {
  total: number;
  windowMinutes: number;
  from: string;
  to: string;
  perMinute: PerMinute[];
}

interface ChartColumnProps {
  data?: UsersPerMinuteData;
}

const ChartColumn = ({ data }: ChartColumnProps) => {
  const perMinute = data?.perMinute ?? [];

  const series = [
    {
      name: "Users",
      data: perMinute.map((item) => item.users),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 0,
        columnWidth: "55%",
      },
    },

    colors: ["#4EA674"],

    dataLabels: {
      enabled: false,
    },

    grid: {
      show: false,
    },

    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },

    yaxis: {
      show: false,
    },

    tooltip: {
      enabled: false,
    },

    legend: {
      show: false,
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={45}
      width="100%"
    />
  );
};

export default ChartColumn;
