import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import  { type FC } from 'react';
import type { VisitModel } from '../../../services/models/visit-model.ts';

interface UserCardProps {
  user:   VisitModel['user'];
}

export const UserCard : FC<UserCardProps> = ({ user }) => {
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
            primary={<small>Name</small>}
            secondary={`${user.firstName} ${user.lastName}`}
            data-testid="details-card-name"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={<small>Email</small>}
            secondary={user.email}
            data-testid="details-card-email"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={<small>Mobile No.</small>}
            secondary={`${user.contact.countryCode} ${user.contact.phoneNumber}`}
            data-testid="details-card-mobile-no"
          />
        </ListItem>
      </List>
    </Card>
  );
};
