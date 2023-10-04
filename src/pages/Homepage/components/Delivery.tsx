const Delivery = () => {
   return (
      <div className='delivery'>
         <div className='lg:grid lg:grid-cols-4 grid grid-cols-2 lg:mx-20 lg:my-10 lg:gap-8 mx-20 my-10 gap-8 place-content-center'>
            <div className=' flex justify-center items-center shadow-md h-40'>
               <img src='https://theme.hstatic.net/1000363117/1000911694/14/hpolicy_img3.jpg?v=471' alt='' />
               <div className='delivery-text pl-5'>
                  <h2 className='text-center font-bold pr-10 text-slate-900'>Free delivery</h2>
                  <p>Orders over $99.00</p>
               </div>
            </div>
            <div className=' flex justify-center items-center shadow-md h-35'>
               <img src='https://theme.hstatic.net/1000363117/1000911694/14/hpolicy_img4.jpg?v=471' alt='' />
               <div className='delivery-text pl-5'>
                  <h2 className='text-center font-bold pr-12 text-slate-900'>Back guarantee</h2>
                  <p>Money back guarantee.</p>
               </div>
            </div>
            <div className=' flex justify-center items-center shadow-md h-35'>
               <img src='https://theme.hstatic.net/1000363117/1000911694/14/hpolicy_img1.jpg?v=471' alt='' />
               <div className='delivery-text pl-5'>
                  <h2 className='text-center font-bold pr-12 text-slate-900'>Online support 24/7</h2>
                  <p>Delicated client support</p>
               </div>
            </div>
            <div className=' flex justify-center items-center shadow-md h-35'>
               <img src='https://theme.hstatic.net/1000363117/1000911694/14/hpolicy_img4.jpg?v=471' alt='' />
               <div className='delivery-text pl-5'>
                  <h4 className='text-center font-bold pr-12 text-slate-900'>90 Days return!!</h4>
                  <p>If goods have problems</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Delivery;
