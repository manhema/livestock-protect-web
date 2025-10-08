import type { FC } from 'react';
import type { VisitModel } from '../../services/models/visit-model.ts';
import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

interface VisitsTableProps {
  visits: VisitModel[];
}

export const VisitsTable: FC<VisitsTableProps> = ({ visits }) => {
  const navigate =  useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'visitor',
      headerName: 'Visitor',
      sortable: true,
      flex: 2,
      valueGetter: (_, row: VisitModel) => `${row.user.firstName} ${row.user.lastName} | ${row.user.email} | ${`${row.user.contact.countryCode ?? ''} ${row.user.contact.phoneNumber ?? ''}`.trim()}`,
      renderCell: (params) => {
        const row = params.row as VisitModel;
        return (
          <Stack>
            <Typography>{`${row.user.firstName} ${row.user.lastName}`}</Typography>
            <Typography variant="body2">{row.user.email}</Typography>
            <Typography variant="body2" color="text.secondary">
              {`${row.user.contact.countryCode ?? ''} ${row.user.contact.phoneNumber ?? ''}`.trim()}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: 'vehicleRegNo',
      headerName: 'Vehicle Reg No.',
      sortable: false,
      flex: 1,
      valueGetter: (_, row: VisitModel) =>
        row.vehicleRegNo && row.vehicleRegNo !== 'null' && row.vehicleRegNo.trim() !== ''
          ? row.vehicleRegNo
          : 'N/A',
    },
    {
      field: 'arrivedAt',
      headerName: 'Time on Site',
      sortable: true,
      flex: 1,
      valueGetter: (_, row: VisitModel) =>
        new Date(row.visitedAt).toLocaleString(),
    },
    {
      field: 'area',
      headerName: 'Area',
      sortable: true,
      flex: 1,
      valueGetter: (_, row: VisitModel) => row.property?.qrCode?.name || '',
    },
    {
      field: 'action',
      headerName: '',
      disableExport: true,
      sortable: false,
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params: { row: VisitModel }) => {
        return (
          <Button
            variant="contained"
            size="small"
            disableElevation
            onClick={() => navigate(`/access/protect/${params.row.property.id}/visits/${params.row.id}`)}
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <Box>
      <DataGrid
        autoHeight
        rows={visits}
        columns={columns}
        // loading={isLoading}
        // paginationMode="server"
        // rowCount={data?.meta?.totalItems ?? 0}
        // paginationModel={paginationModel}
        // onPaginationModelChange={setPaginationModel}
        // initialState={{ pagination: { paginationModel: { pageSize: 20, page: 0 } } }}
        // pageSizeOptions={[10, 20]}
        rowHeight={68}
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        disableRowSelectionOnClick
        disableDensitySelector
        // hideFooter={rows.length <= 10}
        slots={{
          // toolbar: () => (visits.length > 0 && <CustomToolbar />),
          noRowsOverlay: () => (
            <Stack py={4} alignItems="center">
              <Typography variant="h6" fontWeight={500} color="text.secondary">
                No Access Logs Found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Once users begin visiting this property, their logs will appear here.
              </Typography>
            </Stack>
          ),
        }}
      />
    </Box>
  );
};
