import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';

import type { MovementReport } from '../../../services/models/movement-report-model.ts';
import type { FC } from 'react';
import { BarChart } from '../charts/bar-chart.tsx';
import Grid from '@mui/material/Grid';
import { PieChart } from '../charts/pie-chart.tsx';

interface ReasonStatsCardProps {
  isLoading: boolean;
  movements?: MovementReport;
}
export const ReasonStatsCard: FC<ReasonStatsCardProps> = ({ isLoading, movements }) => {
  const reasonOptions = [
    { value: 'Biosecurity visit', label: 'Biosecurity visit' },
    { value: 'Chick population', label: 'Chick population' },
    { value: 'Deliveries', label: 'Deliveries' },
    { value: 'Egg collection', label: 'Egg collection' },
    { value: 'End of production collection', label: 'End of production collection' },
    { value: 'Fallen stock collection', label: 'Fallen stock collection' },
    { value: 'Feed delivery', label: 'Feed delivery' },
    { value: 'Pest control', label: 'Pest control' },
    { value: 'Pullet population', label: 'Pullet population' },
    { value: 'Site visit', label: 'Site visit' },
    { value: 'Veterinary visit', label: 'Veterinary visit' },
    { value: 'Wash down', label: 'Wash down' },
    { value: 'other', label: 'Other' },
  ];

  const options = reasonOptions.map((option) => (option.value.toLowerCase()));

  const _reasons = options.map((reason) => {
    const value = movements?.visitors?.reduce(
      (count, visitor) => (visitor.reason?.toLowerCase() === reason ? count + 1 : count),
      0,
    );
    return {
      label: reason,
      value: value ?? 0,
    };
  });

  const reasons = (_reasons ?? []).sort((a, b) => b.value - a.value).slice(0, 5);

  return (
    <Grid container spacing={2} sx={{ mt:2 }}>
      <Grid size={{ sm: 6, md: 6 }}>
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
          <CardContent sx={{ minHeight: 300 }}>
            <BarChart
              data={  {
                labels: reasons.map((row) => row.label),
                datasets: [
                  {
                    label: 'Reasons for Visits',
                    data: reasons.map((row) => row.value),
                  },
                ],
              }}
              options={{
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  title: { display: true, text: 'Top Reasons for Visits' },
                },
              }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ sm: 6, md: 6 }}>

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
          <CardContent sx={{ height: 300 }}>
            <PieChart
              data={  {
                labels: reasons.map((row) => row.label),
                datasets: [
                  {
                    label: 'Reasons for Visits',
                    data: reasons.map((row) => row.value),
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  title: {
                    display: true, text: 'Reasons Share',
                    padding: { bottom: 30 },   // push chart down so title is visible
                  },

                  'pieExternalLabels': {
                    display: true,
                    offset: 28,
                    bend: 14,
                  },
                },
                layout: {
                  padding: { top: 30, bottom: 28, left: 12, right: 12 },
                },
              }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
