import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export function LivestockBadge({
  livestockType,
  disabled = false,
}: {
  livestockType: string;
  disabled?: boolean;
}) {
  const theme = useTheme();

  const getColor = () => {
    switch (livestockType) {
      case 'Poultry':
        return theme.palette.livetec.secondary.sunOrange;

        // switch (species) {
        //   case 'Chicken':
        //   case 'Ducks':
        //   case 'Geese':
        //   case 'Turkey':
        //   case 'Pheasant':
        //   case 'Pigeon':
        //   case 'Quail':
        //     return '#ffcc00';
        //   default:
        //     return '#ffffff'; // Default color for unknown livestock types
        // }

      case 'Cattle':
        return theme.palette.livetec.tertiary.waterBlue;
      case 'Pigs':
        return theme.palette.livetec.tertiary.healthPink;
      default:
        return theme.palette.livetec.primary.landGreen;
    }
  };

  return (
    <Chip
      size="small"
      label={<small>{livestockType}</small>}
      style={{
        fontSize: '0.65rem',
        color: 'white',
        backgroundColor: disabled ? '#bdbdbd' : getColor(),
      }}
    />
  );
}
