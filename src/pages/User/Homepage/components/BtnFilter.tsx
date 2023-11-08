const BtnFilter = ({ btnFilter, filterItems }: any) => {
   return (
      <div className='flex justify-center mb-10'>
         <div>
            {btnFilter.map((data: any, index: number) => (
               // <button
               //    key={index}
               //    className='btn  hover:text-[#00ab9f] hover:underline hover:bo	focus:underline focus:text-[#00ab9f] p-1 px-2 mx-5 text-lg font-bold'
               //    onClick={() => filterItems(data)}
               // >
               //    {data}
               // </button>
               <button
                  key={index}
                  onClick={() => filterItems(data)}
                  className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800'
               >
                  <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                     {data}
                  </span>
               </button>
            ))}
            {/* <button className='text-[#6AAD12] p-1 px-2 mx-5 text-lg font-bold' onClick={() => refetch()}>
               All
            </button> */}
         </div>
      </div>
   );
};

export default BtnFilter;
