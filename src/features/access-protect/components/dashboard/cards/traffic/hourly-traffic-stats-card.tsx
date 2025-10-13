import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import type { MovementReport } from '../../../../services/models/movement-report-model.ts';
import type { FC } from 'react';
import { BarChart } from '../../charts/bar-chart.tsx';
import dayjs from 'dayjs';

interface HourlyTrafficStatsCardProps {
  isLoading: boolean;
  movements?: MovementReport;
}
export const HourlyTrafficStatsCard: FC<HourlyTrafficStatsCardProps> = ({ isLoading, movements }) => {
  const hours = Array.from({ length: 24 }, (_, hour) => hour);

  const hourly = hours.map((hour) => {
    const value = movements?.visitors?.reduce(
      (count, visitor) => {
        const visitTime = dayjs(visitor.dateTime);
        if (!visitTime.isValid()) {
          return count;
        }

        return visitTime.hour() === hour ? count + 1 : count;

      },
      0,
    );

    return {
      label: `${hour.toString().padStart(2, '0')}:00`,
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
            labels: hourly.map((row) => row.label),
            datasets: [
              {
                label: 'Visits',
                data: hourly.map((row) => row.value),
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: { display: true, text: 'Traffic by Hour' },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};
