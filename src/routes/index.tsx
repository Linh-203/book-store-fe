import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/Homepage/HomePage';
import DefaultLayout from '../layouts/DefaultLayout';
// import ProductPage from '../pages/ProductPage';
import AddProduct from '../pages/Admin/AddProduct';
import AdminPage from '../pages/Admin/AdminPage';
import UpdateProduct from '../pages/Admin/UpdateProduct';

const router = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout />,
      children: [
         {
            path: '/',
            element: <HomePage />
         },
         {
            path: '/abc',
            element: <AdminPage />
         },
         {
            path: '/admin/addProduct',
            element: <AddProduct />
         },
         {
            path: '/update/:id',
            element: <UpdateProduct />
         }
      ]
   }
]);

export default router;
