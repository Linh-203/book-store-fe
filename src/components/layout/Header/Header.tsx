import { Link } from 'react-router-dom';
import { CiHeart, CiSearch, CiShoppingBasket } from 'react-icons/ci';
import SearchFilter from './components/SearchFilter';
import { Button, Col, Divider, Popover, Row, Tooltip } from 'antd';
import { useGetAllCateQuery } from '../../../services/cate.service';
import CheckToken from '../../../pages/User/Homepage/components/CheckToken';
import { ICartSlice } from '../../../slices/cartSlice';
import { useSelector } from 'react-redux';
import { IAuth } from '../../../slices/authSlice';
import { PiPackageLight } from 'react-icons/pi';
const Header = () => {
   const { data, isLoading } = useGetAllCateQuery();
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   // console.log(auth);
   const totalProductInCart = useSelector((state: { cart: ICartSlice }) => state?.cart?.items.length);
   const totalProductInWishList = useSelector((state: { wishList: any }) => state?.wishList?.items.length);
   return (
      <div className='lg:px-40 md:px-32 px-20'>
         <div className='header-top  flex justify-between items-center'>
            <div className='hidden opacity-0 invisible md:block md:opacity-100 md:visible'>
               <div className=' flex justify-between items-center gap-5 pb-3'>
                  <Button
                     className='pb-8 border-none hidden opacity-0 invisible md:block md:opacity-100 md:visible'
                     icon={<CheckToken />}
                  ></Button>
                  <Link to={'/wishList'}>
                     <Button
                        className='pb-8 border-none hidden opacity-0 invisible md:block md:opacity-100 md:visible'
                        icon={<CiHeart className='w-7 h-7' />}
                     >
                        <span className='absolute top-[-4px] right-[9px] w-[20px] h-[20px] text-center leading-5 rounded-[50%] bg-[#d2401e] text-[14px] text-[white]'>
                           {totalProductInWishList}
                        </span>
                     </Button>
                  </Link>
               </div>
            </div>
            <div className='text-center'>
               <div className='md:w-48 md:h-36 w-24 mb-7'>
                  <img
                     src='https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/385550897_1420530008858255_1760137888083412855_n.png?_nc_cat=101&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=ythaKJ9WBrQAX9UANG_&_nc_ht=scontent.fhan14-1.fna&oh=03_AdQ2UR1CzaMfAQ71e5fKwNcqERqpnMLJjPnEG27_LELP2w&oe=657272CC'
                     alt=''
                  />
               </div>
            </div>
            <div className='flex justify-between items-center gap-5 '>
               <SearchFilter>
                  <CiSearch className='w-7 h-7' />
               </SearchFilter>
               {!auth?.accessToken && (
                  <Link className='ml-[10px]' to='/order'>
                     <Tooltip title={<span className='text-white font-thin'>Tra cứu đơn hàng</span>}>
                        {' '}
                        <PiPackageLight className='w-7 h-7 hover:text-[#d2401e] text-[#6f6f6f]' />
                     </Tooltip>
                  </Link>
               )}
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
