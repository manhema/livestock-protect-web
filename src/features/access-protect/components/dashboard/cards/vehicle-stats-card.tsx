import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import type { MovementReport } from '../../../services/models/movement-report-model.ts';
import type { FC } from 'react';

interface VehicleStatsCardProps {
  isLoading: boolean;
  movements?: MovementReport;
}
export const VehicleStatsCard: FC<VehicleStatsCardProps> = ({ isLoading, movements }) => {
  const value = movements?.visitors.filter((visitor) => Boolean(visitor.vehicleRegNo?.trim())).length;

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
        }}
      >
        <Typography variant="h3" component="p" fontWeight={700}>
          {value ? value : '--'}
        </Typography>
        <Typography variant="body1" component="p" sx={{ color: 'primary.main', fontWeight: 500 }}>
          Vehicle movements
        </Typography>
      </CardContent>
    </Card>
  );
};
