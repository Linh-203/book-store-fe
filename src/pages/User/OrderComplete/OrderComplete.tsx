import { Link, useParams } from 'react-router-dom';
import { useGetOrdersByIdQuery } from '../../../services/order.service';

const OrderComplete = () => {
   const { id } = useParams();
   const { data } = useGetOrdersByIdQuery(id);
   // console.log(data);

   return (
      <div>
         <div className='py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto'>
            <div className='flex justify-start item-start space-y-2 flex-col'>
               <h1 className='text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800'>
                  Order #{data?.body?.data?._id}
               </h1>
               <p className='text-base dark:text-gray-300 font-medium leading-6 text-gray-600'>
                  {data?.body?.data?.createdAt}
               </p>
            </div>
            <div className='mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0'>
               <div className='flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8'>
                  <div className='flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full'>
                     <p className='text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800'>
                        Customer’s Cart
                     </p>
                     <div className='mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full'>
                        <div className='pb-4 md:pb-8 w-full md:w-40'>
                           <img
                              className='w-full hidden md:block'
                              src={data?.body?.data?.products[0]?.image}
                              alt='dress'
                           />
                           <img
                              className='w-full md:hidden'
                              src='https://i.ibb.co/L039qbN/Rectangle-10.png'
                              alt='dress'
                           />
                        </div>
                        <div className='border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0'>
                           <div className='w-full flex flex-col justify-start items-start space-y-8'>
                              <h3 className='text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800'>
                                 {data?.body?.data?.products[0]?.name}
                              </h3>
                              {/* <div className='flex justify-start items-start flex-col space-y-2'>
                                 <p className='text-sm dark:text-white leading-none text-gray-800'>
                                    <span className='dark:text-gray-400 text-gray-300'>Style: </span> Italic Minimal
                                    Design
                                 </p>
                                 <p className='text-sm dark:text-white leading-none text-gray-800'>
                                    <span className='dark:text-gray-400 text-gray-300'>Size: </span> Small
                                 </p>
                                 <p className='text-sm dark:text-white leading-none text-gray-800'>
                                    <span className='dark:text-gray-400 text-gray-300'>Color: </span> Light Blue
                                 </p>
                              </div> */}
                           </div>
                           <div className='flex justify-between space-x-8 items-start w-full'>
                              <p className='text-base dark:text-white xl:text-lg leading-6'>
                                 {data?.body?.data?.products[0]?.price?.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                 })}
                                 <span className='text-red-300 line-through'>
                                    {' '}
                                    {data?.body?.data?.products[0]?.discount > 0
                                       ? (
                                            data?.body?.data?.products[0]?.price -
                                            (data?.body?.data?.products[0]?.price * data?.product?.discount) / 100
                                         ).toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND'
                                         })
                                       : ''}
                                 </span>
                              </p>
                              <p className='text-base dark:text-white xl:text-lg leading-6 text-gray-800'>01</p>
                              <p className='text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800'>
                                 $36.00
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className='flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8'>
                     <div className='flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
                        <h3 className='text-xl dark:text-white font-semibold leading-5 text-gray-800'>Hóa đơn</h3>
                        <div className='flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4'>
                           <div className='flex justify-between w-full'>
                              <p className='text-base dark:text-white leading-4 text-gray-800'>Tính tạm</p>
                              <p className='text-base dark:text-gray-300 leading-4 text-gray-600'>
                                 {data?.body?.data?.totalPayment.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                 })}
                              </p>
                           </div>
                           <div className='flex justify-between items-center w-full'>
                              <p className='text-base dark:text-white leading-4 text-gray-800'>
                                 Mã giảm giá{' '}
                                 <span className='bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800'>
                                    none
                                 </span>
                              </p>
                              <p className='text-base dark:text-gray-300 leading-4 text-gray-600'>0</p>
                           </div>
                           <div className='flex justify-between items-center w-full'>
                              <p className='text-base dark:text-white leading-4 text-gray-800'>Shipping</p>
                              <p className='text-base dark:text-gray-300 leading-4 text-gray-600'>0</p>
                           </div>
                        </div>
                        <div className='flex justify-between items-center w-full'>
                           <p className='text-base dark:text-white font-semibold leading-4 text-gray-800'>Tổng tiền</p>
                           <p className='text-base dark:text-gray-300 font-semibold leading-4 text-gray-600'>
                              {data?.body?.data?.totalPayment.toLocaleString('vi-VN', {
                                 style: 'currency',
                                 currency: 'VND'
                              })}
                           </p>
                        </div>
                     </div>
                     <div className='flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6'>
                        <h3 className='text-xl dark:text-white font-semibold leading-5 text-gray-800'>
                           Trở về trang chủ
                        </h3>
                        {/* <div className='flex justify-between items-start w-full'>
                           <div className='flex justify-center items-center space-x-4'>
                              <div className='w-8 h-8'>
                                 <img className='w-full h-full' alt='logo' src='https://i.ibb.co/L8KSdNQ/image-3.png' />
                              </div>
                              <div className='flex flex-col justify-start items-center'>
                                 <p className='text-lg leading-6 dark:text-white font-semibold text-gray-800'>
                                    DPD Delivery
                                    <br />
                                    <span className='font-normal'>Delivery with 24 Hours</span>
                                 </p>
                              </div>
                           </div>
                           <p className='text-lg font-semibold leading-6 dark:text-white text-gray-800'>$8.00</p>
                        </div> */}
                        <div className='w-full flex justify-center items-center'>
                           <Link className='py-5 w-96 md:w-full ' to={'/order'}>
                              <button className='hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white'>
                                 Đơn hàng
                              </button>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
               <div className='bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col'>
                  <h3 className='text-xl dark:text-white font-semibold leading-5 text-gray-800'>Khách hàng</h3>
                  <div className='flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0'>
                     <div className='flex flex-col justify-start items-start flex-shrink-0'>
                        <div className='flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200'>
                           <img src='https://i.ibb.co/5TSg7f6/Rectangle-18.png' alt='avatar' />
                           <div className='flex justify-start items-start flex-col space-y-2'>
                              <p className='text-base dark:text-white font-semibold leading-4 text-left text-gray-800'>
                                 {data?.body?.data?.customerName}
                              </p>
                              <p className='text-sm dark:text-gray-300 leading-5 text-gray-600'>
                                 {' '}
                                 {data?.body?.data?.orderDate}
                              </p>
                           </div>
                        </div>

                        <div className='flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full'>
                           <svg
                              width='24'
                              height='24'
                              viewBox='0 0 24 24'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 d='M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z'
                                 stroke='currentColor'
                                 stroke-linecap='round'
                                 stroke-linejoin='round'
                              />
                              <path
                                 d='M3 7L12 13L21 7'
                                 stroke='currentColor'
                                 stroke-linecap='round'
                                 stroke-linejoin='round'
                              />
                           </svg>
                           <p className='cursor-pointer text-sm leading-5 '> {data?.body?.data?.email}</p>
                        </div>
                     </div>
                     <div className='flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0'>
                        <div className='flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start'>
                           <div className='flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8'>
                              <p className='text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800'>
                                 Địa chỉ nhận hàng
                              </p>
                              <p className='w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600'>
                                 {data?.body?.data?.shippingAddress}
                              </p>
                           </div>
                           <div className='flex justify-center md:justify-start items-center md:items-start flex-col space-y-4'>
                              <p className='text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800'>
                                 Trạng thái đơn hàng
                              </p>
                              <p className='w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600'>
                                 {data?.body?.data?.status}
                              </p>
                           </div>
                        </div>
                        <div className='flex w-full justify-center items-center md:justify-start md:items-start'>
                           {/* <Link></Link> */}
                           <button className='mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base  leading-4 text-gray-800'>
                              Đã nhận được hàng
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OrderComplete;
