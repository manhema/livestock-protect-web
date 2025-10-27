import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs, { Dayjs } from 'dayjs';
import { type FC, Fragment, useState } from 'react';
import { useParams } from 'react-router';
import { DateRangePicker } from '../../../../../../features/access-protect/components/date-range-picker.tsx';
import { VisitorListItem } from '../../../../../../features/access-protect/components/visits/items/visitor-list-item.tsx';
import type { SiteModel } from '../../../../../../features/access-protect/services/models/site-model.ts';
import {
  useQuerySitesByPropertyId,
  useQueryVisitsByPropertyId,
} from '../../../../../../features/access-protect/state/server';
import { BasicBreadcrumbs } from '../../../../../../shared/components/breadcrumbs/basic-breadcrumbs.tsx';
import { SiteListItem } from '../../../../../../features/access-protect/components/sites/site-list-item.tsx';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  VisitsFilterPanel,
} from '../../../../../../features/access-protect/components/visits/filters/visits-filter-panel.tsx';
import type { VisitModel } from '../../../../../../features/access-protect/services/models/visit-model.ts';
import type { IVisitsFilter } from '../../../../../../features/access-protect/services/filters';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';

interface FiltersToolboxProps {
  isLoading: boolean;
  visits: VisitModel[];
  sites: SiteModel[];
  filter: IVisitsFilter | undefined;
  onFilterChange: (filter: IVisitsFilter | undefined) => void;
  onClose: () => void;
}
const FiltersToolbox: FC<FiltersToolboxProps> = ({ isLoading, visits, sites, filter, onFilterChange, onClose }) => {
  return (
    <Fragment>
      <>
        <Grid
          size={{ xs: 12, md: 'auto' }}
          sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'stretch', justifyContent: 'center' }}
        >
          <Divider orientation="vertical" flexItem />
        </Grid>

        <Grid size={{ md: 3.8, lg: 2.9 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">Filters</Typography>
            <IconButton
              onClick={() => {
                onClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ my:2 }} />
          {isLoading && (<LinearProgress variant="indeterminate" sx={{ width: '100%', mb: 1 }} />)}

          <VisitsFilterPanel
            visits={visits}
            sites={sites}
            filter={filter}
            onFilterChange={(filter) => {
              onFilterChange(filter);
            }}
          />
        </Grid>
      </>

    </Fragment>
  );
};

interface SitesToolboxProps {
  sites: SiteModel[];
  onClose: () => void;
}
const SitesToolbox: FC<SitesToolboxProps> = ({  sites, onClose }) => {
  return (
    <Fragment>
      <>
        <Grid
          size={{ xs: 12, md: 'auto' }}
          sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'stretch', justifyContent: 'center' }}
        >
          <Divider orientation="vertical" flexItem />
        </Grid>

        <Grid size={{ md: 3.8, lg: 2.9 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1">Sites</Typography>
            <IconButton
              onClick={() => {
                onClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider sx={{ my:2 }} />

          {sites.map((site, index) => {
            return <SiteListItem key={index} site={site}/>;
          })}
        </Grid>
      </>

    </Fragment>
  );
};

interface ISidecar {
  toolbox?: 'sites' | 'filters';
  open: boolean;
}

interface VisitsDataProps {
  propertyId: string;
  sites: SiteModel[];
}
const VisitsData: FC<VisitsDataProps> = ({ propertyId, sites }) => {
  // sidecar manages toolbox visibility/state
  const [sidecar, setSidecar] = useState<ISidecar>({
    toolbox: undefined,
    open: false,
  });

  const [range, setRange] = useState<[Dayjs | null, Dayjs | null]>([dayjs().subtract(30, 'day').startOf('day'), dayjs().endOf('day')]);
  const [filter, setFilter] = useState<IVisitsFilter | undefined>();

  const { isLoading, error, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useQueryVisitsByPropertyId(propertyId as string, range, 10, filter);

  const fetchMore = () => {
    if (isFetchingNextPage) {
      return (
        <Box sx={{ my: 2 }} textAlign="center">
          <CircularProgress />
        </Box>
      );
    }

    if (hasNextPage) {
      return (
        <Box textAlign="center">
          <Button
            onClick={() => fetchNextPage()}
          >
            Load More
          </Button>
        </Box>
      );
    }

    return <Fragment />;
  };


  const visits = data?.pages.flatMap((page) => page);

  return (
    <Box>
      <BasicBreadcrumbs
        label={'Visits'}
        links={[
          {
            name: 'AP',
            href: '/access/protect/dashboard',
          },
          {
            name: 'Properties',
            href: '/access/protect/properties',
          },
          {
            name: 'Property',
            href: `/access/protect/properties/${propertyId}`,
          },
        ]}
      />

      <Container
        disableGutters={true}
        maxWidth={false}
        sx={{ p:2 }}
      >
        <Grid container spacing={2}
          sx={{
            my:1,
            flexWrap: { xs: 'wrap', md: 'nowrap' },
          }}
        >
          <Grid
            size={{
              xs: 12,
              ...(sidecar.open ? { md: 8, lg: 9 } : { md: 12 }),
            }}
          >
            {/*  Date & Filter Panel  */}
            <Grid container spacing={2} sx={{ my:0 }}>
              <Grid size={{ sm: 4, md: 4 }}>
                <DateRangePicker value={range} onChange={setRange} />
              </Grid>
              <Grid size={{ sm: 4, md: 4 }}>
              </Grid>
              <Grid
                size={{ sm: 4, md: 4 }}
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <Button
                  type="button"
                  size="small"
                  variant="contained"
                  sx={{ my: 0, mx: 1, fontSize: '75%' }}
                  // onClick={handleOpen}
                >
                  <small>Export</small>
                </Button>
                <IconButton
                  onClick={() => {
                    setSidecar((prev) => {
                      const open = !(prev.open && prev.toolbox === 'sites');
                      return { open, toolbox: 'sites' };
                    });
                  }}
                >
                  <SettingsOutlinedIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <IconButton
                  onClick={() => {
                    setSidecar((prev) => {
                      const open = !(prev.open && prev.toolbox === 'filters');
                      return { open, toolbox: 'filters' };
                    });
                  }}
                >
                  <TuneIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Divider sx={{ my:2 }} />
            {isLoading && (<LinearProgress variant="indeterminate" sx={{ width: '100%' }} />)}

            {error && <Alert sx={{ mb: 2 }} data-testid="error-message" severity="error">Something went wrong</Alert>}

            {
              visits?.map((visit) => (
                <VisitorListItem key={visit.id} visit={visit}/>
              ))
            }
          </Grid>

          {sidecar.open && sidecar.toolbox === 'sites' && (
            <>
              <SitesToolbox
                sites={sites}
                onClose={() => {
                  setSidecar({ open: false, toolbox: 'sites' });

                }}

              />
            </>
          )}

          {sidecar.open && sidecar.toolbox === 'filters' && (
            <>
              <FiltersToolbox
                isLoading={isLoading}
                visits={visits ?? []}
                sites={sites}
                filter={filter}
                onFilterChange={(_filter) => {
                  setFilter(_filter);
                }}
                onClose={() => {
                  setSidecar({ open: false, toolbox: 'filters' });
                }}
              />
            </>
          )}
        </Grid>

        {fetchMore()}
      </Container>
    </Box>
  );


  return (
    <Fragment>
      Nothing
    </Fragment>
  );
};

export const VisitsPage = () => {
  const { propertyId } = useParams();

  const { isLoading, error, data: sites } = useQuerySitesByPropertyId(propertyId as string);

  if (isLoading)
    return <Box>Loading...</Box>;

  if (error)
    return <Box>{JSON.stringify(error)}</Box>;

  if (sites) {
    return (
      <Box>
        <VisitsData propertyId={propertyId as string} sites={sites}/>
      </Box>
    );
  }

  return (
    <Fragment>
      Nothing
    </Fragment>
  );
};
