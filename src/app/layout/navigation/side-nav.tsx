import { type FC, Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import { ContingencyPlanIcon, OperationsIcon, PropertiesIcon } from '../../../core/utils/icons/icons.tsx';
import AccessControlIcon from '../../../core/utils/icons/access-control-icon.tsx';
import { Report as ReportIcon } from '@mui/icons-material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import CoronavirusOutlinedIcon from '@mui/icons-material/CoronavirusOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import EmergencyOutlinedIcon from '@mui/icons-material/EmergencyOutlined';
import { Link } from '@tanstack/react-router';

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
              // flexDirection: 'column',
              // justifyContent: 'center',
              // alignItems: 'center',
              px: 2.5,
              py: 1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
              }}
            >
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText
              primary="Home"
              sx={{
                opacity: leftDrawerOpen ? 1 : 0,
                // mt: 0.5,
                ml: 2,
                '& .MuiTypography-root': {
                  fontSize: '0.65rem',
                  // textAlign: 'center',
                  lineHeight: 1.2,
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* Properties */}
        <ListItem key="properties" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to="/properties"
            sx={{
              minHeight: 48,
              // flexDirection: 'column',
              // justifyContent: 'center',
              // alignItems: 'center',
              px: 2.5,
              // py: 1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
              }}
            >
              <PropertiesIcon/>
            </ListItemIcon>
            <ListItemText
              primary="Properties"
              sx={{
                opacity: leftDrawerOpen ? 1 : 0,
                // mt: 0.5,
                ml: 2,
                '& .MuiTypography-root': {
                  fontSize: '0.65rem',
                  // textAlign: 'center',
                  lineHeight: 1.2,
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        {/*Start: Properties - Sub Navigation */}
        {leftDrawerOpen && (
          <Fragment>
            <Divider sx={{ my:0 }} />
            <Box sx={{ ml: 4, pl: 0, borderLeft: 1, borderColor: 'divider' }}>

              <ListItem key="access-protect/properties" disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to="/properties/poi"
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                    }}
                  >
                    <PlaceOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Points Of Interest"
                    sx={{
                      opacity: 1,
                      mt: 0.5,
                      ml: 2,
                      '& .MuiTypography-root': {
                        fontSize: '0.65rem',
                        lineHeight: 1.2,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
            <Divider sx={{ my:0 }} />
          </Fragment>
        )}
        {/*End: Properties - Sub Navigation */}

        {/* Operations */}
        <ListItem key="operations" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to="/operations"
            sx={{
              minHeight: 48,
              // flexDirection: 'column',
              // justifyContent: 'center',
              // alignItems: 'center',
              px: 2.5,
              // py: 1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
              }}
            >
              <OperationsIcon/>
            </ListItemIcon>
            <ListItemText
              primary="Operations"
              sx={{
                opacity: leftDrawerOpen ? 1 : 0,
                // mt: 0.5,
                ml: 2,
                '& .MuiTypography-root': {
                  fontSize: '0.65rem',
                  // textAlign: 'center',
                  lineHeight: 1.2,
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        {/*Start: Operations - Sub Navigation */}
        {leftDrawerOpen && (
          <Fragment>
            <Divider sx={{ my:0 }} />
            <Box sx={{ ml: 4, pl: 0, borderLeft: 1, borderColor: 'divider' }}>
              <ListItem key="access-protect/properties" disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to="/access/protect/properties"
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                    }}
                  >
                    <CalculateOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Depopulation Calculator"
                    sx={{
                      opacity: 1,
                      mt: 0.5,
                      ml: 2,
                      '& .MuiTypography-root': {
                        fontSize: '0.65rem',
                        lineHeight: 1.2,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem key="access-protect/properties" disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to="/access/protect/properties"
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                    }}
                  >
                    <HistoryOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Job History"
                    sx={{
                      opacity: 1,
                      mt: 0.5,
                      ml: 2,
                      '& .MuiTypography-root': {
                        fontSize: '0.65rem',
                        lineHeight: 1.2,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem key="access-protect/properties" disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to="/access/protect/properties"
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                    }}
                  >
                    <CoronavirusOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Confirmed Disease"
                    sx={{
                      opacity: 1,
                      mt: 0.5,
                      ml: 2,
                      '& .MuiTypography-root': {
                        fontSize: '0.65rem',
                        lineHeight: 1.2,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
            <Divider sx={{ my:0 }} />
          </Fragment>
        )}
        {/*End: Operations - Sub Navigation */}

        {/* AccessProtect */}
        <ListItem key="access/protect" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to="/access/protect"
            sx={{
              minHeight: 48,
              // flexDirection: 'column',
              // justifyContent: 'center',
              // alignItems: 'center',
              px: 2.5,
              // py: 1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
              }}
            >
              <AccessControlIcon/>
            </ListItemIcon>
            <ListItemText
              primary="Access Protect"
              sx={{
                opacity: leftDrawerOpen ? 1 : 0,
                // mt: 0.5,
                ml: 2,
                '& .MuiTypography-root': {
                  fontSize: '0.65rem',
                  // textAlign: 'center',
                  lineHeight: 1.2,
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        {/*Start: AccessProtect - Sub Navigation */}
        {leftDrawerOpen && (
          <>
            <Divider sx={{ my:0 }} />
            <Box sx={{ ml: 4, pl: 0, borderLeft: 1, borderColor: 'divider' }}>
              <ListItem key="access-protect/properties" disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to="/access/protect/properties"
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                    }}
                  >
                    <HomeWorkOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Properties"
                    sx={{
                      opacity: 1,
                      mt: 0.5,
                      ml: 2,
                      '& .MuiTypography-root': {
                        fontSize: '0.65rem',
                        lineHeight: 1.2,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
            <Divider sx={{ my:0 }} />
          </>
        )}
        {/*End: AccessProtect - Sub Navigation */}

        {/* ContingencyPlanning */}
        <ListItem key="ebas" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to="/contingency/planning/ebas"
            sx={{
              minHeight: 48,
              // flexDirection: 'column',
              // justifyContent: 'center',
              // alignItems: 'center',
              px: 2.5,
              // py: 1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
              }}
            >
              <ContingencyPlanIcon/>
            </ListItemIcon>
            <ListItemText
              primary="Contingency Planning"
              sx={{
                opacity: leftDrawerOpen ? 1 : 0,
                mt: 0.5,
                ml: 2,
                '& .MuiTypography-root': {
                  fontSize: '0.65rem',
                  // textAlign: 'center',
                  lineHeight: 1.2,
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        {/*Start: ContingencyPlanning - Sub Navigation */}
        {leftDrawerOpen && (
          <Fragment>
            <Divider sx={{ my:0 }} />
            <Box sx={{ ml: 4, pl: 0, borderLeft: 1, borderColor: 'divider' }}>
              <ListItem key="access-protect" disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to="/contingency/planning/ebas"
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                    }}
                  >
                    <HealthAndSafetyOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary="eBAS"
                    sx={{
                      opacity: 1,
                      ml: 2,
                      '& .MuiTypography-root': {
                        fontSize: '0.65rem',
                        lineHeight: 1.2,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>

              <ListItem key="access-protect/properties" disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  component={Link}
                  to="/access/protect/properties"
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: 'center',
                    }}
                  >
                    <EmergencyOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Emergency Response Plan"
                    sx={{
                      opacity: 1,
                      mt: 0.5,
                      ml: 2,
                      '& .MuiTypography-root': {
                        fontSize: '0.65rem',
                        lineHeight: 1.2,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Box>
            <Divider sx={{ my:0 }} />
          </Fragment>
        )}
        {/*End: ContingencyPlanning - Sub Navigation */}

        {/* Reports */}
        <ListItem key="reports" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={Link}
            to="/reports"
            sx={{
              minHeight: 48,
              // flexDirection: 'column',
              // justifyContent: 'center',
              // alignItems: 'center',
              px: 2.5,
              // py: 1,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
              }}
            >
              <ReportIcon color="error"/>
            </ListItemIcon>
            <ListItemText
              primary="Reports"
              sx={{
                opacity: leftDrawerOpen ? 1 : 0,
                // mt: 0.5,
                ml: 2,
                '& .MuiTypography-root': {
                  fontSize: '0.65rem',
                  // textAlign: 'center',
                  lineHeight: 1.2,
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>


    </Fragment>
  );
};
