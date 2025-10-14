import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { type FC, Fragment } from 'react';
import type { PropertyModel } from '../../../../properties/services/models/property-model.ts';


export interface IPropertyOptionsFilter {
  propertyId?: string;
}

interface PropertyDrillDownFilterProps {
  properties: PropertyModel[];
  options?: IPropertyOptionsFilter;
  onDrillDownFilter: (options?: IPropertyOptionsFilter) => void;
}
export const PropertyDrillDownFilter: FC<PropertyDrillDownFilterProps> = ({ properties, options, onDrillDownFilter }) => {

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value as string !== 'all'){
      onDrillDownFilter({ propertyId: event.target.value as string });
    } else {
      onDrillDownFilter();
    }
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
        defaultValue={options?.propertyId ?? 'all'}
        onChange={handleChange}
      >
        <MenuItem key={'all'} value={'all'} data-testid="select-property-option">
          <small>
            All | Properties
          </small>
        </MenuItem>

        {properties.map((property) => (
          <MenuItem key={property.id} value={property.id} data-testid="select-property-option">
            <small>
              {property.name}
            </small>
          </MenuItem>
        ))}
      </TextField>
    </Fragment>
  );
};
