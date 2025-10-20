import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Colors, Title } from 'chart.js';
import type { ComponentPropsWithoutRef } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Colors, Title);

type BarChartProps = Omit<ComponentPropsWithoutRef<typeof Bar>, 'data' | 'options'> & {
  data: ChartData<'bar'>;
  options?: ChartOptions<'bar'>;
};

export const BarChart = ({ data, ...props }: BarChartProps) => {


  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} {...props} />;
};
