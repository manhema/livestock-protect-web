import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import type { MovementReport } from '../../../services/models/movement-report-model.ts';
import type { FC } from 'react';
import { BarChart } from '../charts/bar-chart.tsx';

interface LocationStatsCardProps {
  isLoading: boolean;
  movements?: MovementReport;
}
export const LocationStatsCard: FC<LocationStatsCardProps> = ({ isLoading, movements }) => {
  // const locations = [
  //     { label: 'Musterfield', value: 39 },
  //     { label: 'Bryanston', value: 32 },
  //     { label: 'Linksfield', value: 21 },
  //     { label: 'Northern', value: 18 },
  //     { label: 'Broadacres', value: 17 },
  // ];

  const _locations = movements?.sites.map((site) => {
    const value = movements.visitors?.reduce((count, visitor) => (visitor.siteId === site.id ? count + 1 : count), 0);
    return {
      label: site.name,
      value: value ?? 0,
    };
  });

  const locations = (_locations ?? []).sort((a, b) => b.value - a.value).slice(0, 5);

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
            labels: locations.map((row) => row.label),
            datasets: [
              {
                label: 'Location',
                data: locations.map((row) => row.value),
              },
            ],
          }}
          options={{
            indexAxis: 'y', responsive: true, maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: { display: true, text: 'Top Locations by Visits' },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};
