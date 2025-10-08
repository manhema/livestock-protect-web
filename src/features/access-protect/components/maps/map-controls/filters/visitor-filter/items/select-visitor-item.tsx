import type { FC } from 'react';
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Box, Typography } from '@mui/material';
import type { TrackAndTraceVisitor } from '../../../../../../services/models/movement-report-model.ts';

interface SelectVisitorItemProps {
  visitor: TrackAndTraceVisitor;
  checked?: boolean;
  onToggle: (id: string) => void;
}
export const SelectVisitorItem: FC<SelectVisitorItemProps> = ({ visitor,   checked = false, onToggle  }) => {
  const labelId = `checkbox-list-label-${visitor.logId}`;

  const handleToggle = () => {
    onToggle(visitor.logId);
  };

  return (
    <ListItem
      key={visitor.logId}
      disablePadding
    >
      <ListItemButton
        role={undefined}
        onClick={handleToggle}
        dense
      >
        <ListItemIcon sx={{ padding: 0, mr: 0.5, minWidth:0 }}>
          <Checkbox
            edge="start"
            checked={checked}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
          primary={(
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {visitor.name}
              <Typography
                component="span"
                variant="caption"
                sx={{ color: 'text.secondary', ml: 'auto' }}
              >
                {(() => {
                  const date = new Date(visitor.dateTime);
                  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                })()}
              </Typography>
            </Box>
          )}
          secondary={(
            <React.Fragment>
              <Typography variant="caption" display={'block'}>
                Email: {visitor.email}
              </Typography>
              <Typography variant="caption" display={'block'}>
                Phone: {`${visitor.contact?.countryCode}${visitor.contact?.phoneNumber}` || 'N/A'}
              </Typography>
            </React.Fragment>
          )}
        />
      </ListItemButton>
    </ListItem>
  );
};
