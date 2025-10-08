import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import  { type FC, Fragment } from 'react';
import { TrackAndTraceSite, type TrackAndTraceVisitor } from '../../../../services/models/movement-report-model.ts';
import { Box, List } from '@mui/material';
import { SelectedVisitorItem } from './items/selected-visitor-item.tsx';
import { SelectedVehicleItem } from './items/selected-vehicle-item.tsx';
import { SelectedSiteItem } from './items/selected-site-item.tsx';

interface SelectedEntitiesPanelProps {
  visitors: TrackAndTraceVisitor[];
  vehicles: TrackAndTraceVisitor[];
  sites: TrackAndTraceSite[];
}
export const SelectedEntitiesPanel: FC<SelectedEntitiesPanelProps> = ({ visitors, vehicles, sites }) => {

  return (
    <Fragment>
      {visitors.length > 0 && (
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Visitors</Typography>
          </AccordionSummary>
          <Divider/>
          <AccordionDetails sx={{ p:0 }}>
            <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
              <List sx={{ width: '100%' }}>
                {visitors.map((visitor) => {
                  return (
                    <Fragment key={visitor.logId}>
                      <SelectedVisitorItem
                        visitor={visitor}
                      />
                      <Divider variant="fullWidth" component="li" />
                    </Fragment>
                  );
                })}
              </List>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

      {vehicles.length > 0 && (
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Vehicles</Typography>
          </AccordionSummary>
          <Divider/>
          <AccordionDetails sx={{ p:0 }}>
            <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
              <List sx={{ width: '100%' }}>
                {vehicles.map((visitor) => {
                  return (
                    <Fragment key={visitor.logId}>
                      <SelectedVehicleItem
                        visitor={visitor}
                      />
                      <Divider variant="fullWidth" component="li" />
                    </Fragment>
                  );
                })}
              </List>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

      {sites.length > 0 && (
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Sites</Typography>
          </AccordionSummary>
          <Divider/>
          <AccordionDetails sx={{ p:0 }}>
            <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
              <List sx={{ width: '100%' }}>
                {sites.map((site) => {
                  return (
                    <Fragment key={site.id}>
                      <SelectedSiteItem
                        site={site}
                      />
                      <Divider variant="fullWidth" component="li" />
                    </Fragment>
                  );
                })}
              </List>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}

    </Fragment>
  );
};
