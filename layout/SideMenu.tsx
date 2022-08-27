import {
  AccountCircleOutlined,
  DashboardOutlined,
  GradingOutlined,
  GroupOutlined,
  ListAltOutlined,
  LoginOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import AuthContext from 'context/auth/AuthContext';
import UIContext from 'context/ui/UIContext';
import Image from 'next/image';

import { useRouter } from 'next/router';
import { useContext } from 'react';

const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UIContext);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
    toggleSideMenu();
  };

  const handleSignout = () => {
    toggleSideMenu();
    logout();
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: 'blur(1px)', transition: 'all 0.5s ease-out' }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image src="/images/user.png" alt="user logo" width={64} height={64} />
          <Typography variant="overline" marginTop={1}>
            {user?.name}
          </Typography>
          <Typography variant="body2">{user?.email}</Typography>
        </Box>

        <List>
          <ListItem button onClick={() => navigateTo('/dashboard')}>
            <ListItemIcon>
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText primary={'Inicio'} />
          </ListItem>

          <ListItem button onClick={() => navigateTo('/users')}>
            <ListItemIcon>
              <GroupOutlined />
            </ListItemIcon>
            <ListItemText primary={'Usuarios'} />
          </ListItem>
          <ListItem button onClick={() => navigateTo('/lessons')}>
            <ListItemIcon>
              <ListAltOutlined />
            </ListItemIcon>
            <ListItemText primary={'Lecciones'} />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleSignout}>
            <ListItemIcon>
              <LoginOutlined />
            </ListItemIcon>
            <ListItemText primary={'Cerrar Sesión'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
