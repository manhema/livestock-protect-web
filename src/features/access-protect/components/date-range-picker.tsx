import type { FC } from 'react';
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from '@mui/material';
import type { DateTimeRange } from '../types';

interface DateTimeRangePickerProps {
  value: DateTimeRange;
  onChange: (range: DateTimeRange) => void;
  disabled?: boolean;
}

export const DateRangePicker: FC<DateTimeRangePickerProps> = ({ value, onChange, disabled = false }) => {
  const [start, end] = value;

  // Max selectable date is today
  const max = dayjs().endOf('day');
  // Min selectable date is 3 months ago (start of the day)
  const min = dayjs().subtract(3, 'month').startOf('day').startOf('day');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" gap={2} width="100%" sx={{ '& > *': { flexGrow: 1 } }}>
        <DatePicker
          label="Start Date"
          value={start}
          onChange={(newStart) => onChange([newStart, end])}
          minDate={min}
          maxDate={end ?? max}
          disabled={disabled}
          format="DD MMM YYYY"
          slotProps={{
            textField: { size: 'small' },
          }}
          // renderInput={(params) => (
          //   <TextField  {...params} />
          // )}
        />
        <DatePicker
          label="End Date"
          value={end}
          onChange={(newEnd) => onChange([start, newEnd])}
          minDate={start ?? min}
          maxDate={max}
          disabled={disabled}
          format="DD MMM YYYY"
          slotProps={{
            textField: { size: 'small' },
          }}
          // renderInput={(params) => (
          //   <TextField  {...params}  />
          // )}
        />
      </Box>
    </LocalizationProvider>
  );
};
