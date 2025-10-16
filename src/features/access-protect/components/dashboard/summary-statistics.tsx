import Box from '@mui/material/Box';

import type { MovementReport } from '../../services/models/movement-report-model.ts';
import type { FC } from 'react';
import { VisitorStatsCard } from './cards/visitor-stats-card.tsx';
import { VehicleStatsCard } from './cards/vehicle-stats-card.tsx';
import { DeliveryStatsCard } from './cards/delivery-stats-card.tsx';


interface SummaryStatisticsProps {
  isLoading: boolean;
  movements?: MovementReport;
}
export const SummaryStatistics: FC<SummaryStatisticsProps> = ({ isLoading, movements }) => {

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        <VisitorStatsCard isLoading={isLoading} movements={movements} />
        <VehicleStatsCard isLoading={isLoading} movements={movements} />
        <DeliveryStatsCard isLoading={isLoading} movements={movements} />
      </Box>
    </Box>
  );
};
