import NextLink from 'next/link';
import { Toolbar, AppBar, Link, Typography, IconButton, Box } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import Image from 'next/image';

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Image src="/logo.png" alt="HoloLingo logo" width={28} height={36} />
            <Typography variant="h6" marginLeft={1}>
              HoloLingo
            </Typography>
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
