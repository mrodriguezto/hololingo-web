import type { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { getToken } from 'next-auth/jwt';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import Layout from 'layout';
import { loginResolver } from 'utils/schemas';
import { useRouter } from 'next/router';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
    resolver: loginResolver,
  }); // prettier-ignore

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleLogin = async ({ email, password }: FormData) => {
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.status == 200) {
      router.replace('/dashboard');
    } else {
      enqueueSnackbar('Credenciales inválidas', { variant: 'error' });
    }
  };

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
          <form onSubmit={handleSubmit(handleLogin)} noValidate>
            <Stack spacing={4}>
              <TextField
                label="Correo"
                type="email"
                variant="outlined"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button type="submit" fullWidth>
                Ingresar
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const token = await getToken({ req });

  if (token) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
