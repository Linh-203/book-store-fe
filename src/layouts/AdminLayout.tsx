import React, { useEffect, useState } from 'react';
import {
   PieChartOutlined,
   // NotificationOutlined,
   UserOutlined,
   MenuFoldOutlined,
   MenuUnfoldOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, message, theme } from 'antd';
import { Outlet } from 'react-router';
import { logoUrl } from '../constants/imageUrl';
import ProductIcon from '../components/Icons/ProductIcon';
import { Link, useNavigate } from 'react-router-dom';
// import TicketIcon from '../components/Icons/TicketIcon';
// import OrderIcon from '../components/Icons/OrderIcon';
import HeaderAdmin from '../components/layout/Header/HeaderAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { useGetTokenQuery } from '../services/auth.service';
import { saveTokenAndUser } from '../slices/authSlice';
import { setCartName } from '../slices/cartSlice';
import Loading from '../components/Loading/Loading';

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
   return {
      key,
      icon,
      children,
      label
   } as MenuItem;
}

const items: MenuItem[] = [
   getItem(<Link to='/admin'>Trang chủ</Link>, '1', <PieChartOutlined />),
   getItem('Sản phẩm cửa hàng', '2', <ProductIcon />, [
      getItem(<Link to='/admin/products'>Sản phẩm</Link>, '3'),
      getItem(<Link to='/admin/categories'>Danh mục</Link>, '4')
   ]),
   getItem(<Link to='/admin/user'>Tài khoản</Link>, 'sub3', <UserOutlined />)
   // getItem(<Link to='/admin'>Đơn hàng</Link>, 'sub1', <OrderIcon />),
   // getItem(<Link to='/admin'>Mã khuyễn mãi</Link>, 'sub2', <TicketIcon />),
   // getItem(<Link to='/admin'>Thông báo người dùng</Link>, 'sub4', <NotificationOutlined />)
];

const AdminLayout = () => {
   const { data, isLoading } = useGetTokenQuery();
   console.log(data);

   const dispatch = useDispatch();
   const auth = useSelector((state: any) => state.userReducer);
   console.log(auth);

   const [collapsed, setCollapsed] = useState(false);
   const [open, setOpen] = useState(true);
   const [checking, setChecking] = useState(true);
   const navigate = useNavigate();
   const ButtonTrigger = (
      <button className='bg-greenPrimary text-white w-full font-semibold'>{collapsed ? 'Hiện' : 'Ẩn'}</button>
   );
   const {
      token: { colorBgContainer }
   } = theme.useToken();
   useEffect(() => {
      setChecking(true);
      if (!isLoading && data?.data && Object.keys(auth.user).length == 0) {
         if (Object.keys(data.data).length > 0) {
            dispatch(saveTokenAndUser({ accessToken: data.accessToken, user: data.data }));
            dispatch(setCartName(data.data.email || 'cart'));
         } else {
            message.warning('You are not logged in');
            navigate('/');
         }
         setChecking(false);
      } else if (Object.keys(auth.user).length > 0) {
         if (auth.user.role !== 'admin') {
            message.warning('You are not allowed to arrive this');
            navigate('/');
         }
         setChecking(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, isLoading, auth.user]);
   if (checking) {
      return (
         <div className='h-screen flex items-center justify-center'>
            <Loading sreenSize='lg' />
         </div>
      );
   }
   return (
      <Layout style={{ minHeight: '100vh' }}>
         <Sider
            width={250}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            style={{ background: colorBgContainer }}
            className={
               'fixed z-[9999] transition-all ' +
               (open ? '-translate-x-0' : '-translate-x-full') +
               ' md:-translate-x-0 h-screen'
            }
            trigger={ButtonTrigger}
         >
            <div className='max-h-[150px] flex justify-center items-center'>
               <Link to={'/'}>
                  <img src={logoUrl} alt='logo' className='object-cover' />
               </Link>
            </div>
            <Menu theme='light' defaultSelectedKeys={['1']} mode='inline' items={items} />
            <Button
               className='absolute right-[-40px] top-[70px] z-[999] md:hidden md:opacity-0 md:invisible'
               onClick={() => setOpen((prev) => !prev)}
               icon={open ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
               style={{ color: 'white' }}
            ></Button>
         </Sider>
         {open ? (
            <div className='fixed top-0 right-0 z-[99] w-screen h-full bg-[rgba(0,0,0,0.1)] md:hidden md:opacity-0 md:invisible'></div>
         ) : (
            ''
         )}
         <Layout className={'transition-all ' + (!collapsed ? 'md:pl-[250px]' : 'md:pl-[80px]')}>
            <HeaderAdmin />
            <Content className='min-h-screen overflow-auto flex justify-center w-full'>
               <Outlet />
            </Content>
         </Layout>
      </Layout>
   );
};

export default AdminLayout;
