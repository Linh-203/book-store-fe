import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ICartSlice, removeAllProductFromCart } from '../../../slices/cartSlice';
import { removeFromCart, updateItem } from '../../../slices/cartSlice';
import { message } from 'antd';
const CartPage = () => {
   const dispatch = useDispatch();
   const cart = useSelector((state: { cart: ICartSlice }) => state?.cart);
   // console.log(cart.items);

   const totalProductInCart = useSelector((state: { cart: ICartSlice }) => state?.cart?.items.length);
   const handleInputSize = (e: React.ChangeEvent<HTMLInputElement>, id: string, maxQuantity: number) => {
      if (e.target.value === '') {
         return dispatch(updateItem({ id: id, quantity: '' }));
      }
      if (/^[\d.]+$/.test(e.target.value)) {
         const value = e.target.value;
         if (Number(value) <= maxQuantity) {
            if (value.endsWith('.') && !/\.\d+$/.test(value)) {
               dispatch(updateItem({ id: id, quantity: value }));
            } else {
               const rounded = Math.floor(Number(e.target.value));
               const result = Number(e.target.value) - rounded;
               console.log(result);
               console.log(rounded);
               if (result >= 1) {
                  dispatch(updateItem({ id: id, quantity: rounded + 1 }));
               } else {
                  dispatch(updateItem({ id: id, quantity: rounded }));
               }
            }
         }
      } else {
         dispatch(updateItem({ id: id, quantity: Number(e.target.value.replace(/\./g, ',')) }));
      }
   };
   return (
      <div>
         <body>
            <div className='h-fit bg-gray-100 pt-20'>
               <h1 className='mb-3 text-center text-2xl font-bold'>Giỏ hàng:</h1>
               <span className=' flex justify-center font-bold text-center pb-5 border-[#6f6f6f] text-[#d65151ae]'>
                  {totalProductInCart} sản phẩm
               </span>
               <div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
                  {cart?.items?.length === 0 ? (
                     <div className='cart-emty'>
                        <p className='cart-title xl:text-[30px]  border-[#e2e2e2] max-xl:text-[18px] text-[#51A55C] font-bold items-center text-center pb-[12px]'>
                           Không có sản phẩm trong giỏ hàng
                        </p>
                        <div className='start-shopping cart-title xl:text-[17px]  border-[#e2e2e2] max-xl:text-[18px] text-[#51A55C] font-bold flex justify-center items-center text-center pb-[12px]'>
                           <Link to={'/'}>
                              <button
                                 type='button'
                                 className=' bg-[#00ab9f]  text-white py-[10px] px-[15px] rounded-[5px] mt-[25px]'
                              >
                                 Tiếp tục mua hàng
                              </button>
                           </Link>
                        </div>
                     </div>
                  ) : (
                     <div className='rounded-lg md:w-2/3'>
                        {cart?.items?.map((item: any, index: number) => (
                           <div
                              key={index}
                              className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'
                           >
                              <img src={item.image} alt='product-image' className='w-full rounded-lg sm:w-40' />
                              <div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
                                 <div className='mt-5 sm:mt-0'>
                                    <h2 className='text-lg font-bold text-gray-900'>{item.name}</h2>
                                    <p className='mt-1 text-xs text-gray-700'>{item?.maxQuantity}</p>
                                 </div>
                                 <div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
                                    <div className='product-quantity-action flex lg:justify-center'>
                                       <div className='product-quantity flex  '>
                                          <input
                                             type='text'
                                             value={item?.quantity?.toString()}
                                             onChange={(e) => handleInputSize(e, item._id, item.maxQuantity)}
                                             className={`outline-none border ${
                                                item.quantity == '' || item.quantity === item.maxQuantity
                                                   ? 'border-red-500'
                                                   : ''
                                             } pl-[10px] ml-[10px] input-quantity text-center text-[#6f6f6f] w-[calc(100%-25px)] outline-none border-[#e2e2e2] max-w-[50px] h-[50px]  border-[1px] rounded-[5px]`}
                                          />
                                          <div className='flex flex-col'>
                                             <button
                                                onClick={() => {
                                                   if (item.quantity >= item.maxQuantity) {
                                                      message.error('Số lượng Không đủ để cung cấp');
                                                   } else {
                                                      dispatch(
                                                         updateItem({
                                                            id: item._id,
                                                            quantity:
                                                               item.quantity == item.maxQuantity &&
                                                               item.quantity + 1 >= item.maxQuantity
                                                                  ? item.quantity
                                                                  : item.quantity + 1
                                                         })
                                                      );
                                                   }
                                                }}
                                                type='button'
                                                className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                             >
                                                +
                                             </button>
                                             <button
                                                onClick={() => {
                                                   if (item.quantity <= 0) {
                                                      message.error('Không đủ sản phẩm để trừ');
                                                   } else {
                                                      dispatch(
                                                         updateItem({
                                                            id: item._id,
                                                            quantity:
                                                               item.quantity == 0 && item.quantity - 1 <= 0
                                                                  ? item.quantity
                                                                  : item.quantity - 1
                                                         })
                                                      );
                                                   }
                                                }}
                                                type='button'
                                                className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                             >
                                                -
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                    <div className='flex items-center space-x-4'>
                                       <p className='text-sm'>
                                          {item.price.toLocaleString('vi-VN', {
                                             style: 'currency',
                                             currency: 'VND'
                                          })}
                                       </p>
                                       <button
                                          className='text-[#dc3545] transition-all duration-300 hover:text-[#ffc107] underline'
                                          type='button'
                                          onClick={() => dispatch(removeFromCart({ id: item._id }))}
                                       >
                                          <svg
                                             xmlns='http://www.w3.org/2000/svg'
                                             fill='none'
                                             viewBox='0 0 24 24'
                                             stroke-width='1.5'
                                             stroke='currentColor'
                                             className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
                                          >
                                             <path
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                d='M6 18L18 6M6 6l12 12'
                                             />
                                          </svg>
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                        <div className='cart-footer flex justify-between py-[13px] flex-wrap gap-[15px]'>
                           <a
                              href='/'
                              className='link-to-homepage px-[30px] py-[10px] bg-[#00ab9f] text-white rounded-[5px] transition-colors duration-300 hover:bg-[#333]'
                           >
                              Tiếp Tục Mua Hàng
                           </a>
                           <button
                              onClick={() => dispatch(removeAllProductFromCart())}
                              className='link-to-homepage px-[30px] py-[10px] bg-[#FF0000] text-white rounded-[5px] transition-colors duration-300 hover:bg-[#333333]'
                           >
                              Xóa Giỏ Hàng
                           </button>
                        </div>
                     </div>
                  )}
                  {/* <!-- Sub total --> */}
                  <div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
                     <div className='mb-2 flex justify-between'>
                        <p className='text-gray-700'>Tính tạm</p>
                        <p className='text-gray-700'>
                           {' '}
                           {cart.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </p>
                     </div>
                     <div className='flex justify-between'>
                        <p className='text-gray-700'>Phí ship</p>
                        <p className='text-gray-700'>$4.99</p>
                     </div>
                     <hr className='my-4' />
                     <div className='flex justify-between'>
                        <p className='text-lg font-bold'>Tổng tiền</p>
                        <div className=''>
                           <p className='mb-1 text-lg font-bold'>$134.98 USD</p>
                           {/* <p className='text-sm text-gray-700'>including VAT</p> */}
                        </div>
                     </div>
                     <button className='mt-6 w-full rounded-md bg-[#51A55C] py-1.5 font-medium text-blue-50 hover:bg-[#00ab9f]'>
                        Thanh toán
                     </button>
                  </div>
               </div>
            </div>
         </body>
      </div>
   );
};

export default CartPage;
