import Box from '@mui/material/Box';

import type { MovementReport } from '../../services/models/movement-report-model.ts';
import { type FC, Fragment } from 'react';
import { MovementAlertCard } from './cards/movement-alert-card.tsx';
import Typography from '@mui/material/Typography';


interface AlertsStatisticsProps {
  isLoading: boolean;
  movements?: MovementReport;
}
export const AlertsStatistics: FC<AlertsStatisticsProps> = ({ isLoading, movements }) => {

  return (
    <Fragment>
      <Box sx={{ my: 2 }}>
        <Typography variant="subtitle2" >
          Alerts
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
      </Box>

      <Box sx={{ display: 'grid', gap: 2, my: 2 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          <MovementAlertCard isLoading={isLoading} value={movements?.alerts?.poultryContact} description={'Poultry Contact'} />
          <MovementAlertCard isLoading={isLoading} value={movements?.alerts?.livestockVisits} description={'Livestock Visits'} />
          <MovementAlertCard isLoading={isLoading} value={movements?.alerts?.illness} description={'Illness'} />
          <MovementAlertCard isLoading={isLoading} value={movements?.alerts?.travel} description={'Travel'} />
        </Box>
      </Box>
    </Fragment>
  );
};
