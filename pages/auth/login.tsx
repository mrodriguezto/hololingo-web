import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Layout from 'layout';
import type { NextPage } from 'next';
import Image from 'next/image';

const LoginPage: NextPage = () => {
  return (
    <Layout
      pageTitle="Inicio de sesión"
      pageDescription="Página de inicio de sesión"
    >
      <Container>
        <Paper elevation={3} sx={{ px: 5, py: 8, maxWidth: 500, mx: 'auto' }}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginBottom={4}
          >
            <Image
              src="/images/hlingo.png"
              alt="HoloLingo logo"
              width={48}
              height={80}
            />
            <Typography fontSize={16} fontWeight={700}>
              HoloLingo
            </Typography>
          </Box>
          <Typography variant="h1" marginBottom={5} textAlign="center">
            Iniciar sesión
          </Typography>
          <Stack spacing={4}>
            <TextField label="Correo" type="email" variant="outlined" fullWidth />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
            />
            <Button fullWidth>Ingresar</Button>
          </Stack>
        </Paper>
      </Container>
    </Layout>
  );
};

export default LoginPage;
