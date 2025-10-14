import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import type { FC } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { useMutationCheckoutVisitor } from '../../../state/server';
import type { VisitModel } from '../../../services/models/visit-model.ts';
import { useOrganizationStore } from '../../../../user-management/state/client/store.ts';

interface CheckoutVisitorFormProps {
  visit: VisitModel;
  onSuccess: () => void;
}

interface IFormInput {
  datetime: dayjs.Dayjs;
}

export const CheckoutVisitorForm: FC<CheckoutVisitorFormProps> = ({   visit, onSuccess }) => {
  const { organizationId } = useOrganizationStore();

  const { isPending, mutate } = useMutationCheckoutVisitor(organizationId!, visit.property.id, visit.id);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>({
    defaultValues: {
      datetime: dayjs(),
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    mutate(data.datetime, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  const checkOutButton = () => {
    if (isPending) {
      return (
        <Button
          loading
          type="reset"
          size="medium"
          variant="contained"
          sx={{ my: 2 }}
          fullWidth
        >
          Check-Out
        </Button>
      );
    }

    return (
      <Button
        type="submit"
        size="medium"
        variant="contained"
        sx={{ my: 2 }}
        fullWidth
      >
        Check-Out
      </Button>
    );
  };

  return (
    <Box>
      <Card
        sx={{
          p: { xs: 0, md: 0 },
          display: 'block', width: '100%', mb: 2,
        }}
      >
        <List>
          <ListItem>
            <ListItemText
              primary={<small>{`${visit.user.firstName} ${visit.user.lastName}`}</small>}
              secondary={`Check-In: ${new Date(visit.visitedAt).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}`}
            />
          </ListItem>
        </List>

      </Card>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { my: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="datetime"
            control={control}
            rules={{ required: 'Date and time is required' }}
            render={({ field }) => (
              <DateTimePicker
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                slotProps={{
                  textField: {
                    label: 'Exit Date and Time',
                    fullWidth: true,
                    variant: 'outlined',
                    error: !!errors.datetime,
                    helperText: errors.datetime?.message,
                  },
                }}
                disableFuture
                minDateTime={dayjs(visit.visitedAt)}
              />
            )}
          />
        </LocalizationProvider>

        {checkOutButton()}
      </Box>
    </Box>
  );
};
