import { Pie } from 'react-chartjs-2';
import type { ComponentPropsWithoutRef } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Colors, Title);

type PieChartProps = Omit<ComponentPropsWithoutRef<typeof Pie>, 'data' | 'options'> & {
  data: ChartData<'pie'>;
  options?: ChartOptions<'pie'>;
};

export const PieChart = ({ data,options, ...props }: PieChartProps) => {




  return (
    <Pie
      data={data}
      options={options}
      {...props}
    />
  );
};






