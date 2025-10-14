import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import {  useNavigate } from 'react-router';

interface ILink {
  name: string;
  href: string;
}

interface BasicBreadcrumbsProps {
  label: string;
  links: ILink[];
}
export const BasicBreadcrumbs: FC<BasicBreadcrumbsProps> = ({ label, links }) => {

  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          {links.map((link) => (
            <Link
              underline="hover"
              color="inherit"
              sx={{ cursor: 'pointer' }}
              // to={link.href}
              onClick={() => navigate(link.href)}
            >
              {link.name}
            </Link>
          ))}
          <Typography sx={{ color: 'text.primary' }}>{label}</Typography>
        </Breadcrumbs>
      </Box>
      <Divider/>
    </Box>
  );
};
