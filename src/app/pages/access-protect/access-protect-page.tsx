import { useState } from 'react';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useQueryOrganizationMovements } from '../../../features/access-protect/state/server';
import {
  AccessProtectMovementsMap,
} from '../../../features/access-protect/components/maps/access-protect-movements-map.tsx';
import type { IMovementsFilter } from '../../../features/access-protect/services/access-protect-services.ts';


export const AccessProtectPage = () => {
  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(30, 'day').startOf('day'), dayjs().endOf('day')]);
  const [filter, setFilter] = useState<IMovementsFilter | undefined>();

  const { isLoading, error, data } = useQueryOrganizationMovements(range, filter);

  if (error)
    return <Box>{JSON.stringify(error)}</Box>;

  return(
    <AccessProtectMovementsMap
      isLoading={isLoading}
      movements={data}
      range={range}
      setRange={setRange}
      onFilterChange={(filter) => setFilter(filter)}
    />
  );
};
