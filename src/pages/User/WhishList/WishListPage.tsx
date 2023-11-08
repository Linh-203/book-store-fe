import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWishList } from '../../../slices/wishListSlice';

const WhishListPage = () => {
   const wishList = useSelector((state: { wishList: any }) => state?.wishList);
   console.log(wishList.items);
   const dispatch = useDispatch();
   const remove_from_wishList = (id: any) => {
      console.log(id);

      dispatch(removeFromWishList({ id: id }));
   };
   const totalProductInWishList = useSelector((state: { wishList: any }) => state?.wishList?.items.length);
   return (
      <div>
         {wishList?.items?.length <= 0 ? (
            <div className='cart-emty'>
               <p className='cart-title xl:text-[30px]  border-[#e2e2e2] max-xl:text-[18px] text-[#51A55C] font-bold items-center text-center pb-[12px]'>
                  Không có sản phẩm yêu thích
               </p>
               <div className='start-shopping cart-title xl:text-[17px]  border-[#e2e2e2] max-xl:text-[18px] text-[#51A55C] font-bold flex justify-center items-center text-center pb-[12px]'>
                  <Link to={'/'}>
                     <button
                        type='button'
                        className=' bg-[#00ab9f]  text-white py-[10px] px-[15px] rounded-[5px] mt-[25px]'
                     >
                        Thêm sản phẩm yêu thích ?
                     </button>
                  </Link>
               </div>
            </div>
         ) : (
            <div className='mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center'>
               <div className='flex flex-col '>
                  {/*   */}
                  <div className='mt-3'>
                     <h1 className='text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800 dark:text-white text-center items-center'>
                        Wish List
                     </h1>
                  </div>
                  <div className='mt-4'>
                     <p className='text-2xl tracking-tight leading-6 text-gray-600 dark:text-white  text-center items-center'>
                        {totalProductInWishList} sản phẩm
                     </p>
                  </div>
                  <div className='mt-10  lg:mt-12 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-10 lg:gap-y-0 px-20 items-center text-center'>
                     {wishList?.items?.map((item: any, index: number) => (
                        <div key={index} className='flex flex-col'>
                           <div className='relative'>
                              <img className='hidden lg:block' src={item.image} alt='bag' />
                              <img className='hidden sm:block lg:hidden' src={item.image} alt='bag' />
                              <img className='sm:hidden' src={item.image} alt='bag' />
                              <button
                                 aria-label='close'
                                 onClick={() => remove_from_wishList(item._id)}
                                 className='top-2 right-9 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 absolute p-1.5 bg-gray-800 dark:bg-white dark:text-gray-800 text-white hover:text-gray-400 '
                              >
                                 <svg
                                    className='fil-current'
                                    width='14'
                                    height='14'
                                    viewBox='0 0 14 14'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                 >
                                    <path
                                       d='M13 1L1 13'
                                       stroke='currentColor'
                                       stroke-width='1.25'
                                       stroke-linecap='round'
                                       stroke-linejoin='round'
                                    />
                                    <path
                                       d='M1 1L13 13'
                                       stroke='currentColor'
                                       stroke-width='1.25'
                                       stroke-linecap='round'
                                       stroke-linejoin='round'
                                    />
                                 </svg>
                              </button>
                           </div>
                           <div className='mt-6 flex justify-between items-center'>
                              <div className='flex justify-center items-center w-full'>
                                 <p className='tracking-tight items-center text-center text-2xl font-semibold leading-6 text-gray-800 dark:text-white'>
                                    {item.name}
                                 </p>
                              </div>
                           </div>
                           <div id='menu1' className='flex flex-col  '>
                              <div className='mt-6'>
                                 <p className='tracking-tight text-xl font-medium leading-4 text-[#00ab9f] dark:text-white'>
                                    {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                 </p>
                              </div>
                              <div className='flex jusitfy-between flex-col lg:flex-row items-center mt-6 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8'>
                                 <div className='w-full'>
                                    <Link to={`/productDetail/${item._id}`}>
                                       <button className='focus:outline-none focus:ring-gray-800 focus:ring-offset-2 focus:ring-2 text-white   w-full tracking-tight py-4 text-lg leading-4 hover:bg-gray-300 hover:text-gray-800 dark:text-white dark:bg-transparent dark:border-white dark:hover:bg-gray-800 bg-[#00ab9f] border border-gray-800 dark:hover:text-white mb-10'>
                                          More information
                                       </button>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default WhishListPage;
