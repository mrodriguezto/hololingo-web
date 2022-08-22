import NextLink from 'next/link';
import { Toolbar, AppBar, Link, Typography, Box, Button } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';
import Image from 'next/image';
import { useContext } from 'react';
import UIContext from 'context/ui/UIContext';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { toggleSideMenu } = useContext(UIContext);
  const { status } = useSession();

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
        {status === 'authenticated' && (
          <Button aria-label="Menú" onClick={toggleSideMenu} color="secondary">
            <MenuOutlined sx={{ color: 'white' }} />
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
