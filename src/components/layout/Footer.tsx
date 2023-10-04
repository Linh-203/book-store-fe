import { Col, Row } from 'antd';
import FacebookIcon from '../../assets/icons/Fb';
import Gg from '../../assets/icons/Gg';
import Twitter from '../../assets/icons/Twitter';
import PaypallIcon from '../../assets/icons/PaypalIcon';
import VisaIcon from '../../assets/icons/VisaIcon';
import SkrillIcon from '../../assets/icons/SkrillIcon';

const Footer = () => {
   return (
      <div className='bg-[#F0F0F0] my-10 py-10 items-center  shadow-lg rounded-lg'>
         <div className='md:mx-24 mx-10'>
            <Row justify='space-evenly' className='lg:flex lg:justify-between md:grid md:grid-cols-2 md:gap-x-32'>
               <Col span={24} lg={4}>
                  <div className='lg:text-left '>
                     <h1 className='text-[#6AAD12] text-xl pb-5 flex justify-start'>Về chúng tôi</h1>
                     <h4 className='flex justify-start items-start leading-6'>
                        Fresh Mart cung cấp thực phẩm sạch, an toàn, đảm bảo chất lượng hàng đầu. Xóa đi nỗi lo về an
                        toàn thực phẩm
                     </h4>
                  </div>
               </Col>

               <Col span={24} lg={4}>
                  <div className='lg:text-left'>
                     <h1 className='text-[#6AAD12] text-xl pb-5 flex justify-start'>Thông Tin</h1>
                     <h4 className='flex justify-start items-start leading-6'>Chính sách giao hàng</h4>
                     <h4 className='flex justify-start items-start leading-6'>Trung tâm hỗ trợ</h4>
                     <h4 className='flex justify-start items-start leading-6'>Chính sách bảo mật</h4>
                     <h4 className='flex justify-start items-start leading-6'>Chính sách thanh toán</h4>
                  </div>
               </Col>

               <Col span={24} lg={4}>
                  <div className='lg:text-left'>
                     <h1 className='text-[#6AAD12] text-xl pb-5 flex justify-start'>Liên hệ</h1>
                     <div className=' flex lg:justify-start mb-4'>
                        <div className='pr-6'>
                           <FacebookIcon className='w-5 h-5' />
                        </div>
                        <div className='pr-6'>
                           <Gg className='w-5 h-5' />
                        </div>
                        <div className=''>
                           <Twitter className='w-5 h-5' />
                        </div>
                     </div>
                     <h1 className='text-[#6AAD12] text-xl pb-3 flex justify-start'>Thanh toán</h1>
                     <div className='flex lg:justify-start mb-7'>
                        <div className='pr-4'>
                           <PaypallIcon className='w-10 h-10' />
                        </div>
                        <div className='pr-4'>
                           <VisaIcon className='w-8 h-8' />
                        </div>
                        <div className=''>
                           <SkrillIcon className='w-8 h-8' />
                        </div>
                     </div>
                  </div>
               </Col>

               <Col span={24} lg={4}>
                  <div className='lg:text-left'>
                     <h1 className='text-[#6AAD12] text-xl pb-5 flex justify-start'>Hỗ trợ</h1>
                     <h4 className='pb-5 flex justify-start'>Điền email của bạn vào đây</h4>
                     <input type='text' className='flex justify-start rounded-xl p-3 h-7 ' placeholder='Nhập email' />
                     <button className='bg-[#6AAD12] mt-3 w-20 h-7 text-white rounded-xl'>Send</button>
                  </div>
               </Col>
            </Row>

            <div className='flex justify-between  py-8 '>
               <h2 className='md:text-lg text-base '>© 2023 spacingtech all rights reserved</h2>
               <div className='md:grid md:grid-cols-4 hidden opacity-0 invisible md:opacity-100 md:visible'>
                  <img src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/payment-icon/american.svg' alt='' />
                  <img src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/payment-icon/master.svg' alt='' />
                  <img src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/payment-icon/paypal.svg' alt='' />
                  <img src='https://spacingtech.com/html/tm/freozy/freezy-ltr/image/payment-icon/visa.svg' alt='' />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Footer;
