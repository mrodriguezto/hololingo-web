import { Card, CardActionArea, Grid, Typography } from '@mui/material';
import Layout from 'layout';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

const DashboardPage: NextPage = () => {
  const router = useRouter();

  return (
    <Layout pageTitle="Inicio" pageDescription="Página principal">
      <Grid container spacing={5} marginY={16}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardActionArea
              sx={{
                py: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onClick={() => router.push('/users')}
            >
              <Image
                src="/images/users.png"
                alt="Ir a usuarios"
                width={200}
                height={200}
              />
              <Typography textAlign="center" variant="h2" marginTop={4}>
                Usuarios
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardActionArea
              sx={{
                py: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onClick={() => router.push('/lessons')}
            >
              <Image
                src="/images/lesson.png"
                alt="Ir a lecciones"
                width={200}
                height={200}
              />
              <Typography textAlign="center" variant="h2" marginTop={4}>
                Lecciones
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default DashboardPage;
