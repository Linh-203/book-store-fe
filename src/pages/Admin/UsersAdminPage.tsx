import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useGetAllUsersQuery, useRemoveUserMutation } from '../../services/user.service';
import { SearchContext } from '../../context/SearchContext';
const UsersAdminPage = () => {
   const { data } = useGetAllUsersQuery();
   // console.log(data);
   const { searchTerm } = useContext(SearchContext);
   const [remove] = useRemoveUserMutation();
   const onHandleDelete = (id: any) => {
      const confirm = window.confirm('Bạn có chắc muốn xóa sản phẩm này không');
      if (confirm) {
         remove(id);
      }
   };
   const filteredProducts = data?.user?.filter((product: any) => {
      return (
         product.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
         product.email.toLowerCase().includes(searchTerm?.toLowerCase()) ||
         product.phoneNumber.toString().includes(searchTerm) ||
         product.role.toLowerCase().includes(searchTerm?.toLowerCase())
      );
   });
   return (
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-full'>
         <button className='bg-green-500 text-white  h-8 rounded-md px-2'>
            <Link to={'/signup'}>Thêm người dùng</Link>
         </button>

         <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
               <tr className='items-center text-center'>
                  <th className='px-6 py-3'>STT</th>
                  <th className='px-6 py-3'>Tên</th>
                  <th className='px-6 py-3'>Email</th>
                  <th className='px-6 py-3'>Số điện thoại</th>
                  <th className='px-6 py-3'>Ảnh</th>
                  <th className='px-6 py-3'>Vai trò</th>
                  <th className='px-6 py-3'>Action</th>
               </tr>
            </thead>
            <tbody>
               {filteredProducts?.map((item: any, index: any) => (
                  <tr
                     key={index}
                     className='bg-white border-b dark:bg-gray-900 dark:border-gray-700 items-center text-center'
                  >
                     <td className='px-6 py-3'>{index + 1}</td>
                     <td className='px-6 py-3'>{item.name}</td>
                     <td className='px-6 py-3'>{item.email}</td>
                     <td className='px-6 py-3'>{item.phoneNumber}</td>
                     <td className='px-6 py-3'>
                        <img className='w-[150px] h-24 items-center text-center' src={item.avatar} alt='' />
                     </td>
                     <td className='px-6 py-3'>{item.role}</td>
                     <td className='px-6 py-3'>
                        <button className='bg-blue-500 text-white w-[70px] h-8 rounded-md '>
                           <Link to={'/admin/detailUser/' + item._id}>Chi tiết</Link>
                        </button>
                        <button className='bg-blue-500 text-white w-[70px] h-8 rounded-md ml-1 '>
                           <Link to={'/admin/updateUser/' + item._id}>Sửa</Link>
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
export default UsersAdminPage;
