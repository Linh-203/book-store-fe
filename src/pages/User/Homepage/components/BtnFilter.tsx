const BtnFilter = ({ btnFilter, filterItems }: any) => {
   return (
      <div className='flex justify-center mb-10'>
         <div>
            {btnFilter.map((data: any, index: number) => (
               <button
                  key={index}
                  className='btn  hover:text-[#00ab9f] hover:underline	focus:underline focus:text-[#00ab9f] p-1 px-2 mx-5 text-lg font-bold'
                  onClick={() => filterItems(data)}
               >
                  {data}
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
