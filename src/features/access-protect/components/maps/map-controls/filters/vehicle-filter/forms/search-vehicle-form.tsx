import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, InputAdornment, List, TextField } from '@mui/material';
import React, { type FC, Fragment, useDeferredValue, useMemo, useState } from 'react';
import type { TrackAndTraceVisitor } from '../../../../../../services/models/movement-report-model.ts';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { SelectVehicleItem } from '../items/select-vehicle-item.tsx';
import Fuse from 'fuse.js';

interface SearchVehicleFormProps {
  visitors: TrackAndTraceVisitor[];
  selected:string[];
  onToggle: (id: string) => void;
}

export const SearchVehicleForm: FC<SearchVehicleFormProps> = ({ visitors, selected, onToggle }) => {

  const [inputValue, setInputValue] = useState('');
  const deferredInputValue = useDeferredValue(inputValue);

  const fuse = useMemo(() => {
    return new Fuse(visitors, {
      keys: [
        'vehicleRegNo',
      ],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true,
      useExtendedSearch: true,
    });
  }, [visitors]);

  const filteredOptions = useMemo(() => {
    const keyword = deferredInputValue.trim();
    if (!keyword) {
      return visitors;
    }

    const results = fuse.search(keyword);
    return results.map((result) => result.item);
  }, [visitors, deferredInputValue, fuse]);

  const handleInputChange = (_: any, newInputValue: string) => {
    setInputValue(newInputValue);
  };

  return (
    <Fragment>
      <Autocomplete
        sx={{ px: 2, py: 2 }}
        freeSolo
        options={[]}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={(event) => {
          event.preventDefault();
        }}
        openOnFocus={true}
        autoComplete
        includeInputInList
        filterSelectedOptions
        filterOptions={(options) => options}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search..."
            variant="outlined"
            size="small"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: (
                <React.Fragment>
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

      <Divider/>

      <Fragment>
        {filteredOptions?.length === 0 && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No results
            </Typography>
          </Box>
        )}

        <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
          <List sx={{ width: '100%', py: 0 }}>
            {filteredOptions?.map((visitor, index) => {
              return (
                <Fragment key={visitor.logId}>
                  <SelectVehicleItem
                    visitor={visitor}
                    checked={selected.includes(visitor.logId)}
                    onToggle={onToggle}
                  />
                  {index != (filteredOptions.length-1) && <Divider variant="fullWidth" component="li"/>}
                </Fragment>
              );
            })}
          </List>
        </Box>
      </Fragment>
    </Fragment>
  );
};
