import { useState } from 'react';
import { Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useQueryOrganizationMovementsByPropertyId } from '../../../../../features/access-protect/state/server';
import type { IMovementsFilter } from '../../../../../features/access-protect/services/access-protect-services.ts';
import { useParams } from 'react-router';
import {
  AccessProtectMovements,
} from '../../../../../features/access-protect/components/maps/access-protect-movements.tsx';


export const MovementsByPropertyIdPage = () => {
  const { propertyId } = useParams();

  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(30, 'day').startOf('day'), dayjs().endOf('day')]);
  const [filter, setFilter] = useState<IMovementsFilter | undefined>();

  const { isLoading, error, data } = useQueryOrganizationMovementsByPropertyId(propertyId as string, range, filter);

  if (error)
    return <Box>{JSON.stringify(error)} - {propertyId}</Box>;

  return(
    <AccessProtectMovements
      propertyId={propertyId}
      isLoading={isLoading}
      movements={data}
      range={range}
      setRange={setRange}
      onFilterChange={(filter) => setFilter(filter)}
    />
  );
};
