import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import { type FC, Fragment } from 'react';
import { Box, List } from '@mui/material';
import { VisitsSiteSelectedItem } from './items/visits-site-selected-item.tsx';
import type { SiteModel } from '../../../../services/models/site-model.ts';
import type { VisitModel } from '../../../../services/models/visit-model.ts';

interface VisitsSelectedEntitiesPanelProps {
  visitors: VisitModel[];
  vehicles: VisitModel[];
  sites: SiteModel[];
}
export const VisitsSelectedEntitiesPanel: FC<VisitsSelectedEntitiesPanelProps> = ({ sites }) => {


  return (
    <Fragment>
      {/*{visitors.length > 0 && (*/}
      {/*  <Accordion defaultExpanded>*/}
      {/*    <AccordionSummary*/}
      {/*      expandIcon={<ExpandMoreIcon />}*/}
      {/*      aria-controls="panel1-content"*/}
      {/*      id="panel1-header"*/}
      {/*    >*/}
      {/*      <Typography component="span">Visitors</Typography>*/}
      {/*    </AccordionSummary>*/}
      {/*    <Divider/>*/}
      {/*    <AccordionDetails sx={{ p:0 }}>*/}
      {/*      <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>*/}
      {/*        <List sx={{ width: '100%' }}>*/}
      {/*          {visitors.map((visitor) => {*/}
      {/*            return (*/}
      {/*              <Fragment key={visitor.logId}>*/}
      {/*                <SelectedVisitorItem*/}
      {/*                  visitor={visitor}*/}
      {/*                />*/}
      {/*                <Divider variant="fullWidth" component="li" />*/}
      {/*              </Fragment>*/}
      {/*            );*/}
      {/*          })}*/}
      {/*        </List>*/}
      {/*      </Box>*/}
      {/*    </AccordionDetails>*/}
      {/*  </Accordion>*/}
      {/*)}*/}

      {/*{vehicles.length > 0 && (*/}
      {/*  <Accordion defaultExpanded>*/}
      {/*    <AccordionSummary*/}
      {/*      expandIcon={<ExpandMoreIcon />}*/}
      {/*      aria-controls="panel1-content"*/}
      {/*      id="panel1-header"*/}
      {/*    >*/}
      {/*      <Typography component="span">Vehicles</Typography>*/}
      {/*    </AccordionSummary>*/}
      {/*    <Divider/>*/}
      {/*    <AccordionDetails sx={{ p:0 }}>*/}
      {/*      <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>*/}
      {/*        <List sx={{ width: '100%' }}>*/}
      {/*          {vehicles.map((visitor) => {*/}
      {/*            return (*/}
      {/*              <Fragment key={visitor.logId}>*/}
      {/*                <SelectedVehicleItem*/}
      {/*                  visitor={visitor}*/}
      {/*                />*/}
      {/*                <Divider variant="fullWidth" component="li" />*/}
      {/*              </Fragment>*/}
      {/*            );*/}
      {/*          })}*/}
      {/*        </List>*/}
      {/*      </Box>*/}
      {/*    </AccordionDetails>*/}
      {/*  </Accordion>*/}
      {/*)}*/}

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
                      <VisitsSiteSelectedItem
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
