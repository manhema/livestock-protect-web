import { useState } from 'react';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useQueryOrganizationMovements } from '../../../../features/access-protect/state/server';
import type { IMovementsFilter } from '../../../../features/access-protect/services/access-protect-services.ts';
import { AccessProtectMovements } from '../../../../features/access-protect/components/maps/access-protect-movements.tsx';


export const MovementsPage = () => {
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(30, 'day').startOf('day'), dayjs().endOf('day')]);
  const [filter, setFilter] = useState<IMovementsFilter | undefined>();

  const { isLoading, error, data } = useQueryOrganizationMovements(range, filter);

  if (error)
    return <Box>{JSON.stringify(error)}</Box>;

  return(
    <AccessProtectMovements
      isLoading={isLoading}
      movements={data}
      range={range}
      setRange={setRange}
      filter={filter}
      onFilterChange={(filter) => setFilter(filter)}
    />
  );
};
