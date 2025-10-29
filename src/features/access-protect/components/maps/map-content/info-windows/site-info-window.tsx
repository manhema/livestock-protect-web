import type { FC } from 'react';
import { InfoWindow } from '@vis.gl/react-google-maps';
import { Box, Button, Paper, Typography } from '@mui/material';
import { SiteVisitsList } from './site-visit-list.tsx';
import { useNavigate } from '@tanstack/react-router';

interface SiteInfoWindowProps {
  selectedSite?: any;
  propertyId?: string;
  onClose: () => void;
}

export const SiteInfoWindow: FC<SiteInfoWindowProps> = ({ selectedSite, propertyId, onClose }) => {
  const navigate = useNavigate();

  return (
    <InfoWindow
      position={{ lat: selectedSite.location.latitude, lng: selectedSite.location.longitude }}
      onCloseClick={() => onClose()}
    >
      <Box sx={{ minWidth: '280px', py: 0 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            color: selectedSite.color,
            fontWeight: 'bold',
            fontSize: '15px',
            textAlign: 'center',
          }}>
          {selectedSite.name}
        </Typography>

        <Paper
          elevation={0}
          sx={{
            mb: 1.5,
            p: 0.75,
            backgroundColor: 'primary.light',
            borderRadius: 1,
            textAlign: 'center',
          }}>
          <Typography variant="caption" color="primary.contrastText">Total Visits</Typography>
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            {selectedSite.totalVisits}
          </Typography>
        </Paper>

        {!propertyId && (
          <Button
            sx={{ mb: 1 }}
            fullWidth
            variant="outlined"
            // href={`/access-control/access-logs/${selectedSite.id}/dashboard`}
            onClick={
              () => navigate({ to: `/access/protect/${selectedSite.id}` })
            }
          >
            View Property Movements
          </Button>
        )}

        <SiteVisitsList visits={selectedSite.visits}/>
      </Box>
    </InfoWindow>
  );
};
