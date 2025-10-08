import { Chip } from '@mui/material';
import { Fragment } from 'react';
import  { RiskLevel } from '../../services/models/property-model.ts';

export default function StatusBadge({ riskLevel }: { riskLevel: RiskLevel }) {
  const text
    = riskLevel === RiskLevel.High
      ? 'Protection'
      : riskLevel === RiskLevel.Medium
        ? 'Surveillance'
        : riskLevel === RiskLevel.Low
          ? 'Monitoring'
          : riskLevel === RiskLevel.None
            ? 'Healthy'
            : '';

  const colorMap: Record<RiskLevel, string> = {
    [RiskLevel.High]: '#e84b27', // fireRed
    [RiskLevel.Medium]: '#edb00d', // sunYellow
    [RiskLevel.Low]: '#5ba0c7', // waterBlue
    [RiskLevel.None]: '#378c36', // treeGreen
  };

  if (riskLevel === undefined || riskLevel === null)
    return <Fragment />;

  return (
    <Chip
      size="small"
      label={<small>{text}</small>}
      sx={{
        fontSize: '0.65rem',
        color: 'white',
        backgroundColor: colorMap[riskLevel] || '#2a403b',
      }}
    />
  );
}
