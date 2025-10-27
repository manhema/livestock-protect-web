import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import  { type FC } from 'react';

interface CompanyCardProps {
  company: string;
}

export const CompanyCard : FC<CompanyCardProps> = ({ company }) => {
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
            primary={<small>Company</small>}
            secondary={company}
            data-testid="company"
          />
        </ListItem>
      </List>
    </Card>
  );
};
