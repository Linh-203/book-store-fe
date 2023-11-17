import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header/Header';
import { Outlet } from 'react-router-dom';
import { useGetTokenQuery } from '../services/auth.service';
import { saveTokenAndUser } from '../slices/authSlice';
import { setCartName, setItem } from '../slices/cartSlice';
import { setWishListName, setWishList } from '../slices/wishListSlice';

const DefaultLayout = () => {
   const { data } = useGetTokenQuery();
   const dispatch = useDispatch();
   useEffect(() => {
      if (data?.data && data?.accessToken) {
         dispatch(saveTokenAndUser({ accessToken: data?.accessToken, user: data?.data }));
         dispatch(setCartName(data?.data ? data?.data?.email : 'cart'));
         dispatch(setWishListName(data?.data?.name || 'whishList'));
      }
      dispatch(setItem());
      dispatch(setWishList());
   }, [data]);
   return (
      <>
         <Header />
         <Outlet />
         <Footer />
      </>
   );
};

export default DefaultLayout;
