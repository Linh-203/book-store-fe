import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { IAuth } from '../../../../slices/authSlice';
import { useEffect } from 'react';

const OrderDetail = () => {
   const {
      register,
      formState: { errors },
      setValue
   } = useFormContext();
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer.user);
   useEffect(() => {
      setValue('customerName', auth.name);
      setValue('email', auth.email);
      setValue('phoneNumber', auth.phoneNumber);
      setValue('shippingAddress', auth.address);
   }, [auth]);

   return (
      <>
         <div className='order-detail'>
            <form action=''>
               <h2 className='form-title text-[26px] text-[#333333] font-bold max-sm:text-[22px]'>
                  Thông tin đơn hàng
               </h2>
               <div className='order-form mt-[24px]'>
                  <div className='order-form-item mt-[15px]'>
                     <label>
                        Họ và tên
                        <input
                           type='text'
                           {...register('customerName', { required: 'Họ và tên là trường bắt buộc' })}
                           className='w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[5px]'
                           placeholder='Họ và tên'
                        />
                     </label>
                     {errors.customerName && (
                        <p className='error-message text-[13px] text-red-500'>
                           {errors?.customerName?.message?.toString()}
                        </p>
                     )}
                  </div>
                  <div className='order-form-item  double-input flex justify-between max-sm:flex-wrap'>
                     <div className='form-item mt-[15px] sm:w-[calc(50%-7px)] max-sm:w-full'>
                        <label>
                           Email
                           <input
                              type='text'
                              {...register('email', { required: 'Email là trường bắt buộc' })}
                              className='w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[5px]'
                              placeholder='Email'
                           />
                        </label>
                        {errors.email && (
                           <p className='error-message text-[13px] text-red-500'>
                              {errors?.email?.message?.toString()}
                           </p>
                        )}
                     </div>
                     <div className='form-item mt-[15px] sm:w-[calc(50%-7px)] max-sm:w-full'>
                        <label>
                           Số điện thoại
                           <input
                              {...register('phoneNumber', {
                                 required: 'Số điện thoại là trường bắt buộc',
                                 pattern: {
                                    value: /^0\d{9,10}$/,
                                    message: 'Vui lòng nhập đúng định dạng số điện thoại'
                                 }
                              })}
                              type='text'
                              className='w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[5px]'
                              placeholder='Số điện thoại'
                           />
                        </label>
                        {errors.phoneNumber && (
                           <p className='error-message text-[13px] text-red-500'>
                              {errors?.phoneNumber?.message?.toString()}
                           </p>
                        )}
                     </div>
                  </div>
                  <div className='order-form-item mt-[15px]'>
                     <label>
                        Địa chỉ
                        <input
                           {...register('shippingAddress', { required: 'Địa chỉ là trường bắt buộc' })}
                           type='text'
                           className='w-full mt-[10px] py-[10px] px-[15px] outline-none border border-[#e2e2e2] rounded-[5px]'
                           placeholder='Địa chỉ'
                        />
                     </label>
                     {errors.shippingAddress && (
                        <p className='error-message text-[13px] text-red-500'>
                           {errors?.shippingAddress?.message?.toString()}
                        </p>
                     )}
                  </div>
               </div>
            </form>
         </div>
      </>
   );
};
export default OrderDetail;
