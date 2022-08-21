import Head from 'next/head';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

type Props = {
  pageTitle: string;
  pageDescription: string;
  children: React.ReactNode;
};

const Layout = ({ children, pageTitle, pageDescription }: Props) => {
  const title = `${pageTitle} | HoloLingo`;

  return (
    <>
      <Head>
        <title>{title}</title>

        <meta name="description" content={pageDescription} />
      </Head>
      <nav>
        <Navbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '1440px',
          padding: '0 30px',
        }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
