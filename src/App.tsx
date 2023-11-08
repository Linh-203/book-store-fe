import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { useGetTokenQuery } from './services/auth.service';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { saveTokenAndUser } from './slices/authSlice';
import { setCartName, setItem } from './slices/cartSlice';
import { setWishList, setWishListName } from './slices/wishListSlice';
function App() {
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
   return <RouterProvider router={router} />;
}

export default App;
