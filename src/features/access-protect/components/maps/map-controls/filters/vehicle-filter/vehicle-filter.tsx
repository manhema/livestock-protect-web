import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import { type FC, Fragment } from 'react';
import type { TrackAndTraceVisitor } from '../../../../../services/models/movement-report-model.ts';
import { SearchVehicleForm } from './forms/search-vehicle-form.tsx';

interface VehicleFilterProps {
  visitors: TrackAndTraceVisitor[];
  selected: string[];
  onToggle: (id: string) => void;
}

export const VehicleFilter: FC<VehicleFilterProps> = ({ visitors, selected, onToggle }) => {
  return (
    <Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Vehicles</Typography>
        </AccordionSummary>
        <Divider/>
        <AccordionDetails sx={{ p:0 }}>
          <SearchVehicleForm
            visitors={visitors}
            selected={selected}
            onToggle={onToggle}
          />
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
};
