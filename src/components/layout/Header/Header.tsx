import { Link } from 'react-router-dom';
import { CiHeart, CiSearch, CiShoppingBasket, CiUser } from 'react-icons/ci';
import SearchFilter from './components/SearchFilter';
import { Button, Col, Popover, Row } from 'antd';

const Header = () => {
   return (
      <div className='lg:px-40 md:px-32 px-20'>
         <div className='header-top  flex justify-between items-center'>
            <div className='hidden opacity-0 invisible md:block md:opacity-100 md:visible'>
               <div className=' flex justify-between items-center gap-5 pb-3'>
                  <span className='hidden opacity-0 invisible md:block md:opacity-100 md:visible'>
                     <CiUser className='w-7 h-7 ' />
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
               <SearchFilter icon={<CiSearch className='w-7 h-7' />}></SearchFilter>
               <Button
                  className='pb-10 border-none hidden opacity-0 invisible md:block md:opacity-100 md:visible'
                  icon={<CiShoppingBasket className='w-8 h-8 ' />}
               />

               {/* <Button className='md:hidden' type='primary' onClick={showDrawer}>
                     <FaBars />
                  </Button> */}
            </div>
         </div>
         <hr />
         <Row
            justify='center'
            className='py-5 text-center items-center md:gap-10 hidden opacity-0 invisible md:flex md:opacity-100 md:visible'
         >
            <Col span={4} className='lg:text-lg md:text-base font-medium'>
               <Link to='/'>Trang chủ</Link>
            </Col>
            <Col span={4} className='lg:text-lg md:text-base font-medium'>
               <Popover
                  placement='bottom'
                  content={
                     <div>
                        {/* {isLoading
                              ? '...loading'
                              : data?.body?.map((item, index) => (
                                   <div key={index} className=''>
                                      <Divider orientation='left' orientationMargin={0}>
                                         <h1>{item.cateName}</h1>
                                      </Divider>
                                      {item.subCategories.map((sub: any, index) => (
                                         <div key={index}>
                                            <Link to={'/products?category=' + sub._id}>{sub.subCateName}</Link>
                                            <br />
                                         </div>
                                      ))}
                                   </div>
                                ))} */}
                     </div>
                  }
               >
                  <Link className='lg:text-lg md:text-base' to='/products'>
                     Danh mục
                  </Link>
               </Popover>
            </Col>
            <Col span={4} className='lg:text-lg md:text-base font-medium'>
               <Link to='/'>Giới thiệu</Link>
            </Col>
            <Col span={4} className='lg:text-lg md:text-base font-medium'>
               <Link to='/'>Liên hệ</Link>
            </Col>
         </Row>
         {/* <MenuSideBar open={open} data={data} isLoading={isLoading} onClose={onClose} /> */}
      </div>
   );
};

export default Header;
