import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import { type FC, Fragment } from 'react';
import { SearchSiteForm } from './forms/search-site-form.tsx';
import { TrackAndTraceSite } from '../../../../../services/models/movement-report-model.ts';

interface SiteFilterProps {
  sites: TrackAndTraceSite[];
  selected: string[];
  onToggle: (id: string) => void;
}

export const SiteFilter: FC<SiteFilterProps> = ({ sites, selected, onToggle }) => {
  return (
    <Fragment>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">Sites</Typography>
        </AccordionSummary>
        <Divider/>
        <AccordionDetails sx={{ p:0 }}>
          <SearchSiteForm
            sites={sites}
            selected={selected}
            onToggle={onToggle}
          />
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
};
