import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import { type FC, Fragment } from 'react';
import { VisitsSiteSearchForm } from './forms/visits-site-search-form.tsx';
import type { SiteModel } from '../../../../services/models/site-model.ts';

interface VisitsSiteFilterProps {
  sites: SiteModel[];
  selected: string[];
  onToggle: (id: string) => void;
}

export const VisitsSiteFilter: FC<VisitsSiteFilterProps> = ({ sites, selected, onToggle }) => {
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
          <VisitsSiteSearchForm
            sites={sites}
            selected={selected}
            onToggle={onToggle}
          />
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
};
