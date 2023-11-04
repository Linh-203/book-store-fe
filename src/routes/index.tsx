import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
// import ProductPage from '../pages/ProductPage';
import AddProduct from '../pages/Admin/AddProduct';
import UpdateProduct from '../pages/Admin/UpdateProduct';
import LoginPage from '../pages/Auth/LoginPage';
import SignupPage from '../pages/Auth/SignupPage';
import AdminLayout from '../layouts/AdminLayout';
import DashBoard from '../pages/Admin/DashBoard';
import ProductsAdminPage from '../pages/Admin/ProductsAdminPage';
import HomePage from '../pages/User/Homepage/HomePage';
import CategoriesAdminPage from '../pages/Admin/CategoriesAdminPage';
import AddCate from '../pages/Admin/AddCate';
import UpdateCate from '../pages/Admin/UpdateCate';
import UsersAdminPage from '../pages/Admin/UsersAdminPage';
import UpdateUser from '../pages/Admin/UpdateUser';
import UserDetail from '../pages/Admin/UserDetail';
import UserPage from '../pages/User/UserPage/UserPage';
import DetailProduct from '../pages/User/ProductDetail/ProductDetail';
import CartPage from '../pages/User/Cart/CartPage';

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
            path: '/login',
            element: <LoginPage />
         },
         {
            path: '/signup',
            element: <SignupPage />
         },
         {
            path: '/userPage/:id',
            element: <UserPage />
         },
         {
            path: '/productDetail/:id',
            element: <DetailProduct />
         },
         {
            path: '/cart',
            element: <CartPage />
         }
      ]
   },
   {
      path: '/admin',
      element: <AdminLayout />,
      children: [
         {
            path: '',
            element: <DashBoard />
         },
         {
            path: 'products',
            element: <ProductsAdminPage />
         },
         {
            path: 'add-product',
            element: <AddProduct />
         },
         {
            path: 'update/:id',
            element: <UpdateProduct />
         },
         {
            path: 'products',
            element: <ProductsAdminPage />
         },
         //Categories
         {
            path: 'categories',
            element: <CategoriesAdminPage />
         },
         {
            path: 'add-category',
            element: <AddCate />
         },
         {
            path: 'updateCate/:id',
            element: <UpdateCate />
         },
         //users
         {
            path: 'user',
            element: <UsersAdminPage />
         },
         {
            path: 'updateUser/:id',
            element: <UpdateUser />
         },
         {
            path: 'detailUser/:id',
            element: <UserDetail />
         }
      ]
   }
]);

export default router;
