import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import React, { Fragment } from 'react';

import { useOrganizationStore } from '../state/client/store.ts';
import { OrganizationUtil } from '../../../shared/utils/organization-util.ts';

export const SelectOrganization = () => {
  const { organizationId, organizations,  setOrganizationId } = useOrganizationStore();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOrganizationId(event.target.value as string);
    OrganizationUtil.setCurrentOrganization(event.target.value as string);
  };

  if (organizationId === undefined) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <TextField
        sx={{ p: 0 }}
        size="small"
        data-testid="select-location-input"
        select
        variant="outlined"
        defaultValue={organizationId}
        onChange={handleChange}
      >
        {organizations.map((organization: any, i: number) => (
          <MenuItem key={i} value={organization.id} data-testid="select-organization-option">
            <small>
              {organization.name}
            </small>
          </MenuItem>
        ))}
      </TextField>
    </Fragment>
  );
};
