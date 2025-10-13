import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import type { MovementReport } from '../../../../services/models/movement-report-model.ts';
import type { FC } from 'react';
import { BarChart } from '../../charts/bar-chart.tsx';
import dayjs from 'dayjs';

interface DailyTrafficStatsCardProps {
  isLoading: boolean;
  movements?: MovementReport;
}
export const DailyTrafficStatsCard: FC<DailyTrafficStatsCardProps> = ({ isLoading, movements }) => {
  const options = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const daily = options.map((label) => {
    const value = movements?.visitors?.reduce(
      (count, visitor) => {
        const visitDay = dayjs(visitor.dateTime);
        if (!visitDay.isValid()) {
          return count;
        }

        return visitDay.format('dddd') === label ? count + 1 : count;

      },
      0,
    );

    return {
      label: label,
      value: value ?? 0,
    };
  });

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#fff',
      }}
    >
      {isLoading && (<LinearProgress variant="indeterminate" sx={{ width: '100%' }} />)}
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          py: 3,
          minHeight: 300,
        }}
      >
        <BarChart
          data={  {
            labels: daily.map((row) => row.label),
            datasets: [
              {
                label: 'Visits',
                data: daily.map((row) => row.value),
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: { display: true, text: 'Traffic by Day' },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};
