import { Link } from 'react-router-dom';
import { CiHeart, CiSearch, CiShoppingBasket } from 'react-icons/ci';
import SearchFilter from './components/SearchFilter';
import { Button, Col, Divider, Popover, Row } from 'antd';
import { useGetAllCateQuery } from '../../../services/cate.service';
import CheckToken from '../../../pages/User/Homepage/components/CheckToken';
import { ICartSlice } from '../../../slices/cartSlice';
import { useSelector } from 'react-redux';
const Header = () => {
   const { data, isLoading } = useGetAllCateQuery();
   // console.log(data);
   const totalProductInCart = useSelector((state: { cart: ICartSlice }) => state?.cart?.items.length);
   return (
      <div className='lg:px-40 md:px-32 px-20'>
         <div className='header-top  flex justify-between items-center'>
            <div className='hidden opacity-0 invisible md:block md:opacity-100 md:visible'>
               <div className=' flex justify-between items-center gap-5 pb-3'>
                  <span className='hidden opacity-0 invisible md:block md:opacity-100 md:visible'>
                     <CheckToken />
                  </span>
                  <CiHeart className='w-7 h-7  hidden opacity-0 invisible md:block md:opacity-100 md:visible' />
               </div>
            </div>
            <div className='text-center'>
               <div className='md:w-48 md:h-36 w-24 h-fit py-2'>
                  <img src='https://theme.hstatic.net/1000363117/1000911694/14/logo.png?v=471' alt='' />
               </div>
            </div>
            <div className='flex justify-between items-center gap-5 '>
               <SearchFilter>
                  <CiSearch className='w-7 h-7' />
               </SearchFilter>
               <Link to={'/cart'}>
                  <Button
                     className='pb-10 border-none hidden opacity-0 invisible md:block md:opacity-100 md:visible'
                     icon={<CiShoppingBasket className='w-8 h-8 ' />}
                  >
                     <span className='absolute top-[1px] right-[10px] w-[20px] h-[20px] text-center leading-5 rounded-[50%] bg-[#d2401e] text-[14px] text-[white]'>
                        {totalProductInCart}
                     </span>
                  </Button>
               </Link>

               {/* <Button className='md:hidden' type='primary' onClick={showDrawer}>
                     <FaBars />
                  </Button> */}
            </div>
         </div>
         <hr />
         <Row
            justify='center'
            className='py-5 text-center items-center md:gap-10 hidden opacity-0 invisible md:flex md:opacity-100 md:visible '
         >
            <Col span={4} className='lg:text-lg md:text-base font-medium'>
               <Link className='hover:text-[#00ab9f]  focus:text-[#00ab9f] focus:underline' to='/'>
                  Trang chủ
               </Link>
            </Col>
            <Col span={4} className='lg:text-lg md:text-base font-medium'>
               <Popover
                  placement='bottom'
                  content={
                     <div>
                        {isLoading
                           ? '...loading'
                           : data?.data?.map((item, index) => (
                                <div key={index} className=''>
                                   <Divider orientation='left' orientationMargin={0}>
                                      <h1 className='hover:text-[#00ab9f]'>{item.cateName}</h1>
                                   </Divider>
                                   {/* {item.subCategories.map((sub: any, index) => (
                                      <div key={index}>
                                         <Link to={'/products?category=' + sub._id}>{sub.subCateName}</Link>
                                         <br />
                                      </div>
                                   ))} */}
                                </div>
                             ))}
                     </div>
                  }
               >
                  <Link
                     className='lg:text-lg md:text-base hover:text-[#00ab9f]  focus:text-[#00ab9f] focus:underline'
                     to='/'
                  >
                     Danh mục
                  </Link>
               </Popover>
            </Col>
            <Col span={4} className='lg:text-lg md:text-base font-medium'>
               <Link className='hover:text-[#00ab9f]  focus:text-[#00ab9f] focus:underline' to='/'>
                  Giới thiệu
               </Link>
            </Col>
            <Col span={4} className='lg:text-lg md:text-base font-medium'>
               <Link className='hover:text-[#00ab9f]  focus:text-[#00ab9f] focus:underline' to='/'>
                  Liên hệ
               </Link>
            </Col>
         </Row>
         {/* <MenuSideBar open={open} data={data} isLoading={isLoading} onClose={onClose} /> */}
      </div>
   );
};

export default Header;
