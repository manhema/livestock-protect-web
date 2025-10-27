import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import  { type FC } from 'react';

interface EmployeeCardProps {
  employee: boolean;
}

export const EmployeeCard : FC<EmployeeCardProps> = ({ employee }) => {
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
            primary={<small>Employee</small>}
            secondary={employee ? 'Yes' : 'No'}
            data-testid="employee"
          />
        </ListItem>
      </List>
    </Card>
  );
};
