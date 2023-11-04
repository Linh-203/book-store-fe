import { Link } from 'react-router-dom';
import { useGetAllUsersQuery, useRemoveUserMutation } from '../../services/user.service';
const UsersAdminPage = () => {
   const { data } = useGetAllUsersQuery();
   // console.log(data);
   const [remove] = useRemoveUserMutation();
   const onHandleDelete = (id: any) => {
      remove(id);
   };
   return (
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-full'>
         <button className='bg-green-500 text-white w-[70px] h-8 rounded-md '>
            <Link to={'/signup'}>Add</Link>
         </button>

         <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
               <tr className='items-center text-center'>
                  <th className='px-6 py-3'>STT</th>
                  <th className='px-6 py-3'>Name</th>
                  <th className='px-6 py-3'>Email</th>
                  <th className='px-6 py-3'>Phone</th>
                  <th className='px-6 py-3'>Avatar</th>
                  <th className='px-6 py-3'>Role</th>
                  <th className='px-6 py-3'>Action</th>
               </tr>
            </thead>
            <tbody>
               {data?.user?.map((item: any, index: any) => (
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
                           <Link to={'/admin/detailUser/' + item._id}>Detail</Link>
                        </button>
                        <button className='bg-blue-500 text-white w-[70px] h-8 rounded-md '>
                           <Link to={'/admin/updateUser/' + item._id}>Update</Link>
                        </button>
                        <button
                           className='bg-red-500 text-white w-[70px] h-8 rounded-md ml-1'
                           onClick={() => onHandleDelete(item._id)}
                        >
                           Delete
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
