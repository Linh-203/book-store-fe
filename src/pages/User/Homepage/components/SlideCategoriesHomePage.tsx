// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay } from 'swiper/modules';

export default function SlideCateHomePage() {
   return (
      <>
         <div className=' mx-auto px-[15px] 3xl:w-[1380px] 2xl:w-[1320px] xl:w-[1170px]   lg:w-[970px]  md:w-[750px]'>
            <Swiper
               slidesPerView={4}
               spaceBetween={30}
               loop={true}
               autoplay={{
                  delay: 2000,
                  disableOnInteraction: false
               }}
               breakpoints={{
                  1201: {
                     slidesPerView: 4
                  },
                  1200: {
                     slidesPerView: 3
                  },
                  767: {
                     slidesPerView: 3
                  },
                  766: {
                     slidesPerView: 2
                  },
                  400: {
                     slidesPerView: 2
                  },
                  1: {
                     slidesPerView: 1
                  }
               }}
               modules={[Autoplay]}
               className='mySwiper py-[30px] h-[140px]'
            >
               <SwiperSlide>
                  <div className='cate-wrap group'>
                     <a href='#' className='cate-item flex items-center'>
                        <span className='cate-icon rounded-[50%] bg-[#F8F8F8] mr-[30px] h-[80px] w-[80px] block'>
                           <img
                              className='h-[80px] w-[80px]'
                              src='https://cdn0.fahasa.com/media/wysiwyg/Duy-VHDT/Danh-muc-san-pham/T_m_linh.jpg'
                              alt=''
                           />
                        </span>
                        <div className='cate-content text-left'>
                           <p className='cate-title font-bold text-[#51A55C] text-[16px]'>Cam Trung Quốc</p>
                           <p className='cate-count text-[#333333] pt-[5px] text-[16px] group-hover:text-[#51A55C] transition-colors duration-300'>
                              20 sản phẩm
                           </p>
                        </div>
                     </a>
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className='cate-wrap group'>
                     <a href='#' className='cate-item flex items-center'>
                        <span className='cate-icon rounded-[50%] bg-[#F8F8F8] mr-[30px] h-[80px] w-[80px] block'>
                           <img
                              className='h-[80px] w-[80px]'
                              src='https://khothietke.net/wp-content/uploads/2021/04/PNGKhovector.net-02049d7b9f985c6412588.png'
                              alt=''
                           />
                        </span>
                        <div className='cate-content text-left'>
                           <p className='cate-title font-bold text-[#51A55C] text-[16px]'>Cam Trung Quốc</p>
                           <p className='cate-count text-[#333333] pt-[5px] text-[16px] group-hover:text-[#51A55C] transition-colors duration-300'>
                              20 sản phẩm
                           </p>
                        </div>
                     </a>
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className='cate-wrap group'>
                     <a href='#' className='cate-item flex items-center'>
                        <span className='cate-icon rounded-[50%] bg-[#F8F8F8] mr-[30px] h-[80px] w-[80px] block'>
                           <img
                              className='h-[80px] w-[80px]'
                              src='https://khothietke.net/wp-content/uploads/2021/04/PNGKhovector.net-02049d7b9f985c6412588.png'
                              alt=''
                           />
                        </span>
                        <div className='cate-content text-left'>
                           <p className='cate-title font-bold text-[#51A55C] text-[16px]'>Cam Trung Quốc</p>
                           <p className='cate-count text-[#333333] pt-[5px] text-[16px] group-hover:text-[#51A55C] transition-colors duration-300'>
                              20 sản phẩm
                           </p>
                        </div>
                     </a>
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className='cate-wrap group'>
                     <a href='#' className='cate-item flex items-center'>
                        <span className='cate-icon rounded-[50%] bg-[#F8F8F8] mr-[30px] h-[80px] w-[80px] block'>
                           <img
                              className='h-[80px] w-[80px]'
                              src='https://khothietke.net/wp-content/uploads/2021/04/PNGKhovector.net-02049d7b9f985c6412588.png'
                              alt=''
                           />
                        </span>
                        <div className='cate-content text-left'>
                           <p className='cate-title font-bold text-[#51A55C] text-[16px]'>Cam Trung Quốc</p>
                           <p className='cate-count text-[#333333] pt-[5px] text-[16px] group-hover:text-[#51A55C] transition-colors duration-300'>
                              20 sản phẩm
                           </p>
                        </div>
                     </a>
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className='cate-wrap group'>
                     <a href='#' className='cate-item flex items-center'>
                        <span className='cate-icon rounded-[50%] bg-[#F8F8F8] mr-[30px] h-[80px] w-[80px] block'>
                           <img
                              className='h-[80px] w-[80px]'
                              src='https://khothietke.net/wp-content/uploads/2021/04/PNGKhovector.net-02049d7b9f985c6412588.png'
                              alt=''
                           />
                        </span>
                        <div className='cate-content text-left'>
                           <p className='cate-title font-bold text-[#51A55C] text-[16px]'>Cam Trung Quốc</p>
                           <p className='cate-count text-[#333333] pt-[5px] text-[16px] group-hover:text-[#51A55C] transition-colors duration-300'>
                              20 sản phẩm
                           </p>
                        </div>
                     </a>
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className='cate-wrap group'>
                     <a href='#' className='cate-item flex items-center'>
                        <span className='cate-icon rounded-[50%] bg-[#F8F8F8] mr-[30px] h-[80px] w-[80px] block'>
                           <img
                              className='h-[80px] w-[80px]'
                              src='https://khothietke.net/wp-content/uploads/2021/04/PNGKhovector.net-02049d7b9f985c6412588.png'
                              alt=''
                           />
                        </span>
                        <div className='cate-content text-left'>
                           <p className='cate-title font-bold text-[#51A55C] text-[16px]'>Cam Trung Quốc</p>
                           <p className='cate-count text-[#333333] pt-[5px] text-[16px] group-hover:text-[#51A55C] transition-colors duration-300'>
                              20 sản phẩm
                           </p>
                        </div>
                     </a>
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className='cate-wrap group'>
                     <a href='#' className='cate-item flex items-center'>
                        <span className='cate-icon rounded-[50%] bg-[#F8F8F8] mr-[30px] h-[80px] w-[80px] block'>
                           <img
                              className='h-[80px] w-[80px]'
                              src='https://khothietke.net/wp-content/uploads/2021/04/PNGKhovector.net-02049d7b9f985c6412588.png'
                              alt=''
                           />
                        </span>
                        <div className='cate-content text-left'>
                           <p className='cate-title font-bold text-[#51A55C] text-[16px]'>Cam Trung Quốc</p>
                           <p className='cate-count text-[#333333] pt-[5px] text-[16px] group-hover:text-[#51A55C] transition-colors duration-300'>
                              20 sản phẩm
                           </p>
                        </div>
                     </a>
                  </div>
               </SwiperSlide>
               <SwiperSlide>
                  <div className='cate-wrap group'>
                     <a href='#' className='cate-item flex items-center'>
                        <span className='cate-icon rounded-[50%] bg-[#F8F8F8] mr-[30px] h-[80px] w-[80px] block'>
                           <img
                              className='h-[80px] w-[80px]'
                              src='https://khothietke.net/wp-content/uploads/2021/04/PNGKhovector.net-02049d7b9f985c6412588.png'
                              alt=''
                           />
                        </span>
                        <div className='cate-content text-left'>
                           <p className='cate-title font-bold text-[#51A55C] text-[16px]'>Cam Trung Quốc</p>
                           <p className='cate-count text-[#333333] pt-[5px] text-[16px] group-hover:text-[#51A55C] transition-colors duration-300'>
                              20 sản phẩm
                           </p>
                        </div>
                     </a>
                  </div>
               </SwiperSlide>
            </Swiper>
         </div>
      </>
   );
}
