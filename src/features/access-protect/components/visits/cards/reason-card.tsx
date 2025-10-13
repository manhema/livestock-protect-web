import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import  { type FC } from 'react';

interface ReasonCardProps {
  reason: string;
}

export const ReasonCard : FC<ReasonCardProps> = ({ reason }) => {
  return (
    <Card
      sx={{
        p: { xs: 0, md: 1 },
        mb: 2,
      }}
    >
      <List>
        <ListItem>
          <ListItemText
            primary={<small>Reason for visit</small>}
            secondary={reason}
            data-testid="reason-for-visit"
          />
        </ListItem>
      </List>
    </Card>
  );
};
