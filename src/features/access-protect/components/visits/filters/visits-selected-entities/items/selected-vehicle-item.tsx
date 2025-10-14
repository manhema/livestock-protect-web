import type { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import type { TrackAndTraceVisitor } from '../../../../../services/models/movement-report-model.ts';

interface SelectedVehicleItemProps {
  visitor: TrackAndTraceVisitor;

}
export const SelectedVehicleItem: FC<SelectedVehicleItemProps> = ({ visitor  }) => {
  const labelId = `checkbox-list-label-${visitor.logId}`;

  return (
    <ListItem
      key={visitor.logId}
      disablePadding
    >
      <ListItemButton
        role={undefined}
        dense
      >
        <ListItemText
          id={labelId}
          primary={(
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {visitor.vehicleRegNo}
            </Box>
          )}
        />
      </ListItemButton>
    </ListItem>
  );
};
