import { Box, Paper, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { InfoWindow } from '@vis.gl/react-google-maps';
import { calculateAreasCenter } from '../../../../utils/maths.ts';
import Divider from '@mui/material/Divider';
import type { TrackAndTraceSite } from '../../../../services/models/movement-report-model.ts';


interface MovementInfoWindowProps {
  selectedMovement?: any;
  sites: TrackAndTraceSite[];
  onClose: () => void;
}

export const MovementInfoWindow: FC<MovementInfoWindowProps> = ({  selectedMovement, sites, onClose }) => {

  return (
    <InfoWindow
      position={selectedMovement.midpoint || calculateAreasCenter(sites)}
      onCloseClick={() => onClose()}
    >
      <Box sx={{ minWidth: '320px', p: 0 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 1.5,
            fontWeight: 'bold',
            fontSize: '16px',
            textAlign: 'center',
          }}>
          Site Connection Details
        </Typography>

        <Paper
          elevation={0}
          sx={{
            mb: 1.5,
            p: 1.5,
            backgroundColor: 'grey.100',
            borderRadius: 1,
          }}>
          <Typography variant="subtitle2" fontWeight="bold" gutterBottom
            sx={{ textAlign: 'center' }}
          >
            {selectedMovement.sites[0]}
            {' '}
            ↔
            {' '}
            {selectedMovement.sites[1]}
          </Typography>

          <Stack spacing={1} sx={{ mt: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                borderLeft: '4px solid #2196f3',
              }}>
              <Typography variant="body2" fontWeight="bold" color="text.secondary">
                {selectedMovement.sites[0]}
                {' '}
                →
                {' '}
                {selectedMovement.sites[1]}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {selectedMovement.counts.fromTo}
                {' '}
                visits
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                borderLeft: '4px solid #f44336',
              }}>
              <Typography variant="body2" fontWeight="bold" color="text.secondary">
                {selectedMovement.sites[1]}
                {' '}
                →
                {' '}
                {selectedMovement.sites[0]}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {selectedMovement.counts.toFrom}
                {' '}
                visits
              </Typography>
            </Paper>

            <Divider sx={{ my: 1 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">Total Traffic</Typography>
              <Typography variant="h5" fontWeight="bold" color="primary.main">
                {selectedMovement.totalMovements}
                {' '}
                movements
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </InfoWindow>
  );
};
