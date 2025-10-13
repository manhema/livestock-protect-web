import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type StatsCardProps = {
  value: number | string;
  label: string;
};

export const StatsCard = ({ value, label }: StatsCardProps) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: '#fff',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          py: 3,
        }}
      >
        <Typography variant="h3" component="p" fontWeight={700}>
          {value}
        </Typography>
        <Typography variant="body1" component="p" sx={{ color: 'primary.main', fontWeight: 500 }}>
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};
