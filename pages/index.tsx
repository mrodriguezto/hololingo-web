import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    redirect: {
      destination: '/auth/login',
      permanent: true,
    },
  };
};

export default Home;
