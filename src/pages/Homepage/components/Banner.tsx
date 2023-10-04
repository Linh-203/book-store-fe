import { Carousel } from 'antd';
const Banner = () => {
   return (
      <div>
         <Carousel autoplay>
            <div>
               <img
                  className='w-screen'
                  src='https://theme.hstatic.net/1000363117/1000911694/14/ms_banner_img1.jpg?v=471'
                  alt=''
               />
            </div>
            <div>
               <img
                  className='w-screen'
                  src='https://theme.hstatic.net/1000363117/1000911694/14/ms_banner_img2.jpg?v=471'
                  alt=''
               />
            </div>
            <div>
               <img
                  className='w-screen'
                  src='https://theme.hstatic.net/1000363117/1000911694/14/ms_banner_img3.jpg?v=471'
                  alt=''
               />
            </div>
            <div>
               <img
                  className='w-screen'
                  src='https://theme.hstatic.net/1000363117/1000911694/14/ms_banner_img5.jpg?v=471'
                  alt=''
               />
            </div>
         </Carousel>
      </div>
   );
};

export default Banner;
