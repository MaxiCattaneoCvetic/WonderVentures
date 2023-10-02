import { Outlet } from 'react-router-dom';
import Footer from '../layouts/Footer/Index';

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
