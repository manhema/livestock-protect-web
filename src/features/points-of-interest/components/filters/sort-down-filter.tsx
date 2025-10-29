import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { type FC, Fragment } from 'react';

export interface ISortOptionsFilter {
  type: 'name' | 'health';
}

interface SortDrillDownFilterProps {
  options?: ISortOptionsFilter;
  onDrillDownFilter: (options?: ISortOptionsFilter) => void;
}
export const SortSelectionFilter: FC<SortDrillDownFilterProps> = ({ options, onDrillDownFilter }) => {

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onDrillDownFilter({ type: event.target.value as ISortOptionsFilter['type'] });
  };

  return (
    <Fragment>
      <TextField
        sx={{ p: 0 }}
        // label={'Properties'}
        size="small"
        data-testid="select-location-input"
        select
        variant="outlined"
        value={options?.type ?? 'name'}
        onChange={handleChange}
        slotProps={{
          select: {
            renderValue: (value) => `Sort: ${value === 'name' ? 'A-Z' : 'Health'}`,
          },
        }}
      >
        <MenuItem key={'name'} value={'name'} data-testid="select-property-option">
          <small>
            A-Z
          </small>
        </MenuItem>

        <MenuItem key={'health'} value={'health'} data-testid="select-property-option">
          <small>
            Health
          </small>
        </MenuItem>
      </TextField>
    </Fragment>
  );
};
