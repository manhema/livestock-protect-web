import type { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import { TrackAndTraceSite } from '../../../../../services/models/movement-report-model.ts';

interface SelectedSiteItemProps {
  site: TrackAndTraceSite;

}
export const SelectedSiteItem: FC<SelectedSiteItemProps> = ({ site  }) => {

  return (
    <ListItem disablePadding>
      <ListItemButton
        role={undefined}
        dense
      >
        <ListItemText
          primary={(
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {site.name}
            </Box>
          )}
        />
      </ListItemButton>
    </ListItem>
  );
};
