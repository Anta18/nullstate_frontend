import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TransactionDistributionChartProps {
  transactions: { type: string }[];
  typeColors: Record<string, string>;
}

const TransactionDistributionChart: React.FC<
  TransactionDistributionChartProps
> = ({ transactions, typeColors }) => {
  // Compute counts for each transaction type
  const distribution = transactions.reduce<Record<string, number>>(
    (acc, tx) => {
      acc[tx.type] = (acc[tx.type] || 0) + 1;
      return acc;
    },
    {}
  );

  const data = {
    labels: ["Transactions"],
    datasets: Object.keys(distribution).map((type) => ({
      label: type,
      data: [distribution[type]],
      backgroundColor: typeColors[type] || "#ccc",
    })),
  };

  const options = {
    indexAxis: "y" as const,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          // Use point style so that we can use the rounded rectangle
          usePointStyle: true,
          // Set the pointStyle to 'rectRounded' for rounded boxes
          pointStyle: "rectRounded" as const,
          // Optionally, adjust the box width to your liking
          boxWidth: 20,
        },
      },
      title: { display: true, text: "Transaction Distribution" },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        display: false, // hide x-axis
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar data={data} options={options} height={50} />;
};

export default TransactionDistributionChart;
