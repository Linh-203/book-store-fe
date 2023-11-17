import { Link } from 'react-router-dom';
import { useGetAllCateQuery, useRemoveCateMutation } from '../../services/cate.service';
import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
const CategoriesAdminPage = () => {
   const { data } = useGetAllCateQuery();
   console.log(data);

   const { searchTerm } = useContext(SearchContext);
   const [remove] = useRemoveCateMutation();
   const onHandleDelete = (id: any) => {
      const confirm = window.confirm('Bạn có chắc muốn xóa danh mục này không');
      if (confirm) {
         remove(id);
      }
   };
   const filteredCategories = data?.data?.filter((cate: any) => {
      return cate.cateName?.toLowerCase().includes(searchTerm?.toLowerCase());
   });
   return (
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-full'>
         <button className='bg-green-500 text-white h-8 px-2 rounded-md '>
            <Link to={'/admin/add-category'}>Thêm danh mục</Link>
         </button>

         <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
               <tr className='items-center text-center'>
                  <th className='px-6 py-3'>STT</th>
                  <th className='px-6 py-3'>Tên</th>
                  <th className='px-6 py-3'>Action</th>
               </tr>
            </thead>
            <tbody>
               {filteredCategories?.map((item: any, index: any) => (
                  <tr
                     key={index}
                     className='bg-white border-b dark:bg-gray-900 dark:border-gray-700 items-center text-center'
                  >
                     <td className='px-6 py-3'>{index + 1}</td>
                     <td className='px-6 py-3'>{item.cateName}</td>
                     <td className='px-6 py-3 '>
                        <button className='bg-blue-500 text-white w-[70px] h-8 rounded-md '>
                           <Link to={'/admin/updateCate/' + item._id}>Cập nhật</Link>
                        </button>
                        <button
                           className='bg-red-500 text-white w-[70px] h-8 rounded-md ml-1'
                           onClick={() => onHandleDelete(item._id)}
                        >
                           Xóa
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
export default CategoriesAdminPage;
