import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import  { type FC } from 'react';

interface VehicleCardProps {
  vehicleRegNo: string;
}

export const VehicleCard : FC<VehicleCardProps> = ({ vehicleRegNo }) => {
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
            primary={<small>Vehicle Registration Number</small>}
            secondary={vehicleRegNo}
            data-testid="vehicle-registration-number"
          />
        </ListItem>
      </List>
    </Card>
  );
};
