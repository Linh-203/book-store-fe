import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header/Header';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
   return (
      <>
         <Header />
         <Outlet />
         <Footer />
      </>
   );
};

export default DefaultLayout;
