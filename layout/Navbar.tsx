import NextLink from 'next/link';
import { Toolbar, AppBar, Link, Typography, IconButton, Box } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">HoloLingo</Typography>
          </Link>
        </NextLink>
        <Box sx={{ flex: 1 }} />
        <IconButton aria-label="Menú" onClick={() => {}} color="secondary">
          <MenuOutlined sx={{ color: 'white' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
