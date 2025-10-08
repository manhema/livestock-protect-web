import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, FormControlLabel, InputAdornment, List, TextField } from '@mui/material';
import React, { type FC, Fragment, useDeferredValue, useMemo, useState } from 'react';
import type { TrackAndTraceVisitor } from '../../../../../../services/models/movement-report-model.ts';
import Typography from '@mui/material/Typography';
import { SelectVisitorItem } from '../items/select-visitor-item.tsx';
import Divider from '@mui/material/Divider';
import Fuse from 'fuse.js';
import Checkbox from '@mui/material/Checkbox';
import { useVisitorSelection } from '../../../hooks/use-visitor-selection.ts';

interface SearchVisitorFormProps {
  visitors: TrackAndTraceVisitor[];
  selected: string[];
  onToggle: (id: string) => void;
}

export const SearchVisitorForm: FC<SearchVisitorFormProps> = ({ visitors, selected, onToggle }) => {

  const [inputValue, setInputValue] = useState('');
  const deferredInputValue = useDeferredValue(inputValue);

  const fuse = useMemo(() => {
    return new Fuse(visitors, {
      keys: [
        'name',
        'email',
        { name: 'contact.countryCode', weight: 0.5 },
        { name: 'contact.phoneNumber', weight: 0.5 },
        // custom key for the combined phone number
        {
          name: 'fullPhoneNumber',
          weight: 1,
          getFn: (visitor) => {
            if (visitor.contact?.countryCode && visitor.contact?.phoneNumber) {
              return `${visitor.contact.countryCode}${visitor.contact.phoneNumber}`;
            }
            return '';
          },
        },
      ],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true,
      useExtendedSearch: true,
    });
  }, [visitors]);

  const filteredOptions = useMemo(() => {
    const keyword = deferredInputValue.trim().toLowerCase();
    if (!keyword) {
      return visitors;
    }

    const results = fuse.search(keyword);
    return results.map((result) => result.item);
  }, [visitors, deferredInputValue, fuse]);

  const { allSelected, someSelected, selectionCount, handleSelectAll } = useVisitorSelection({
    filteredOptions,
    selected,
    onToggle,
    deferredInputValue,
  });


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
                  <SearchIcon fontSize="small"/>
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
        {/* Show "Select All" checkbox only when search is active and there are results */}
        {deferredInputValue.trim() !== '' && filteredOptions.length > 0 && (
          <Fragment>
            <Box sx={{ px: 2, py: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      size="small"
                      aria-label="Select all search results"
                      checked={allSelected}
                      indeterminate={someSelected && !allSelected}
                      onChange={handleSelectAll}
                    />
                  )}
                  label={(
                    <Typography variant="body2" >
                      <Box component="span">Select All Results ({filteredOptions.length})</Box>
                    </Typography>
                  )}
                />

                {selectionCount > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1, height: '24px' }} />
                    <Typography variant="body2" sx={{ color: 'primary.main' }}>
                      {selectionCount} selected
                    </Typography>
                  </Box>
                )}
              </Box>

            </Box>
            <Divider sx={{}}/>
          </Fragment>
        )}

        {filteredOptions?.length === 0 && (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No results
            </Typography>
          </Box>
        )}

        <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
          <List sx={{ width: '100%', py:0 }}>
            {filteredOptions?.map((visitor, index) => {
              return (
                <Fragment key={visitor.logId}>
                  <SelectVisitorItem
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
