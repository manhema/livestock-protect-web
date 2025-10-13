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
  // const locations = [
  //   { label: 'Musterfield', value: 39 },
  //   { label: 'Bryanston', value: 32 },
  //   { label: 'Linksfield', value: 21 },
  //   { label: 'Northern', value: 18 },
  //   { label: 'Broadacres', value: 17 },
  // ];

  // const data: ChartData<'bar'> = {
  //   labels: locations.map((row) => row.label),
  //   datasets: [
  //     {
  //       label: 'Location visits',
  //       data: locations.map((row) => row.value),
  //     },
  //   ],
  // };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} {...props} />;
};
