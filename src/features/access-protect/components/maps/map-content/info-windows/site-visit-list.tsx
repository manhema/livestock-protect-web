import { Box, Paper, Typography } from '@mui/material';
import { type FC, Fragment } from 'react';

interface SiteVisitsListProps {
  visits: any[];
}
export const SiteVisitsList: FC<SiteVisitsListProps> = ({ visits }) => {
  if (visits.length === 0) {
    return <Fragment />;
  }

  return (
    <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
      <Typography variant="caption" fontWeight="bold" display="block" mb={1.5} align="center">
        Complete Visit Log:
      </Typography>

      {visits.map((visit: any, idx: number) => (
        <Paper
          key={idx}
          elevation={0}
          sx={{
            my: 0.5,
            p: 0.75,
            bgcolor: 'grey.100',
            borderRadius: 1,
            borderLeft: '3px solid',
            borderLeftColor: 'primary.main',
          }}>
          <Typography variant="caption" fontWeight="bold" display="block">
            {visit.person}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {visit.purpose}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};
