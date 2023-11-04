const SubBanner = () => {
   return (
      <div className='grid grid-cols-3 px-40 gap-12 py-10'>
         <div className='flex items-center bg-cover h-[110px] bg-[url("https://theme.hstatic.net/1000363117/1000911694/14/hfcategories2_mini_img1.png?v=471")]'>
            <div className=''>
               <p className='text-lg font-medium'>Sách Văn Học</p>
               <button>Tìm cuốn sách của bạn</button>
            </div>
         </div>

         <div className='flex items-center bg-cover h-[110px] bg-[url("//theme.hstatic.net/1000363117/1000911694/14/hfcategories2_mini_img4.png?v=471")]'>
            <div className=''>
               <p className='text-lg font-medium'>Sách Lịch Sử</p>
               <button>Tìm cuốn sách của bạn</button>
            </div>
         </div>

         <div className='flex items-center bg-cover h-[110px] bg-[url("//theme.hstatic.net/1000363117/1000911694/14/hfcategories2_mini_img2.png?v=471")]'>
            <div className=''>
               <p className='text-lg font-medium'>Sách Thiếu Nhi</p>
               <button>Tìm cuốn sách của bạn</button>
            </div>
         </div>

         <div className='flex items-center bg-cover h-[110px] bg-[url("//theme.hstatic.net/1000363117/1000911694/14/hfcategories2_mini_img5.png?v=471")]'>
            <div className=''>
               <p className='text-lg font-medium'>Sách Trinh Thám</p>
               <button>Tìm cuốn sách của bạn</button>
            </div>
         </div>

         <div className='flex items-center bg-cover h-[110px] bg-[url("//theme.hstatic.net/1000363117/1000911694/14/hfcategories2_mini_img3.png?v=471")]'>
            <div className=''>
               <p className='text-lg font-medium'>Sách Ngoại Văn</p>
               <button>Tìm cuốn sách của bạn</button>
            </div>
         </div>
         <div className='flex items-center bg-cover h-[110px] bg-[url("//theme.hstatic.net/1000363117/1000911694/14/hfcategories2_mini_img6.png?v=471")]'>
            <div className=''>
               <p className='text-lg font-medium'>Sách Khác</p>
               <button>Tìm cuốn sách của bạn</button>
            </div>
         </div>
      </div>
   );
};

export default SubBanner;
