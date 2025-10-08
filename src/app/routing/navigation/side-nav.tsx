import { type FC, Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router';
import { ContingencyPlanIcon, OperationsIcon, PropertiesIcon } from '../../../core/utils/icons/icons.tsx';
import AccessControlIcon from '../../../core/utils/icons/access-control-icon.tsx';
import { Report as ReportIcon } from '@mui/icons-material';

interface SideNavProps {
  leftDrawerOpen: boolean;
}

export const SideNav : FC<SideNavProps> = ({ leftDrawerOpen }) => {
  return (
    <Fragment>
      <List>
        {/* Home */}
        <ListItem key="home" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to="/"
            sx={{
              minHeight: 48,
              justifyContent: leftDrawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: leftDrawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Home" sx={{ opacity: leftDrawerOpen ? 1 : 0 }}/>
          </ListItemButton>
        </ListItem>

        {/* Properties */}
        <ListItem key="properties" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to="/properties"
            sx={{
              minHeight: 48,
              justifyContent: leftDrawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: leftDrawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <PropertiesIcon/>
            </ListItemIcon>
            <ListItemText primary="Properties" sx={{ opacity: leftDrawerOpen ? 1 : 0 }}/>
          </ListItemButton>
        </ListItem>

        {/* Operations */}
        <ListItem key="operations" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to="/operations"
            sx={{
              minHeight: 48,
              justifyContent: leftDrawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: leftDrawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <OperationsIcon/>
            </ListItemIcon>
            <ListItemText primary="Operations" sx={{ opacity: leftDrawerOpen ? 1 : 0 }}/>
          </ListItemButton>
        </ListItem>

        {/* AccessProtect */}
        <ListItem key="access/protect" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to="/access/protect"
            sx={{
              minHeight: 48,
              justifyContent: leftDrawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: leftDrawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <AccessControlIcon/>
            </ListItemIcon>
            <ListItemText primary="AccessProtect" sx={{ opacity: leftDrawerOpen ? 1 : 0 }}/>
          </ListItemButton>
        </ListItem>

        {/* ContingencyPlanning */}
        <ListItem key="ebas" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to="/contingency-planning/ebas"
            sx={{
              minHeight: 48,
              justifyContent: leftDrawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: leftDrawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <ContingencyPlanIcon/>
            </ListItemIcon>
            <ListItemText primary="Contingency Planning" sx={{ opacity: leftDrawerOpen ? 1 : 0 }}/>
          </ListItemButton>
        </ListItem>

        {/* Reports */}
        <ListItem key="reports" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to="/reports"
            sx={{
              minHeight: 48,
              justifyContent: leftDrawerOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: leftDrawerOpen ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <ReportIcon color="error"/>
            </ListItemIcon>
            <ListItemText primary="Reports" sx={{ opacity: leftDrawerOpen ? 1 : 0 }}/>
          </ListItemButton>
        </ListItem>
      </List>


    </Fragment>
  );
};
