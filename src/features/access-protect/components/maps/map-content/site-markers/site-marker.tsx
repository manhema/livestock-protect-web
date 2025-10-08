import type { FC } from 'react';
import { Box, Typography } from '@mui/material';
import type { TrackAndTraceSite } from '../../../../services/models/movement-report-model.ts';

export interface SiteMarkerProps {
  site: TrackAndTraceSite;
  visitCount: number;
}

export const SiteMarker: FC<SiteMarkerProps> = ({ site, visitCount }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}>
      {/* Circle with visit count */}
      <Box
        sx={{
          width: 42,
          height: 42,
          bgcolor: site.color,
          border: '3px solid white',
          boxShadow: 3,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}>
        <Typography
          variant="body2"
          sx={{
            fontSize: '15px',
            fontWeight: 'bold',
            color: 'white',
          }}>
          {visitCount}
        </Typography>
      </Box>

      {/* Site name label */}
      <Box
        sx={{
          position: 'absolute',
          left: '48px',
          bgcolor: 'white',
          borderRadius: '10px',
          px: 0.75,
          py: 0.25,
          boxShadow: 1,
        }}>
        <Typography
          sx={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'black',
            whiteSpace: 'nowrap',
          }}>
          {site.name}
        </Typography>
      </Box>
    </Box>
  );
};
