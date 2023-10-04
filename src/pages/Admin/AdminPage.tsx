import { Link } from 'react-router-dom';
import { useGetAllProductsQuery, useRemoveProductMutation } from '../../services/product.service';
const AdminPage = () => {
   const { data } = useGetAllProductsQuery();
   console.log(data);
   const [remove] = useRemoveProductMutation();
   const onHandleDelete = (id: any) => {
      remove(id);
   };
   return (
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
         <Link to={'/add'}>Add</Link>
         <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
               <tr>
                  <th className='px-6 py-3'>ID</th>
                  <th className='px-6 py-3'>Name</th>
                  <th className='px-6 py-3'>Price</th>
                  <th className='px-6 py-3'>Desc</th>
                  <th className='px-6 py-3'>Image</th>
                  <th className='px-6 py-3'>Category</th>
                  <th className='px-6 py-3'>Action</th>
               </tr>
            </thead>
            <tbody>
               {data?.product.map((item: any) => (
                  <tr key={item._id} className='bg-white border-b dark:bg-gray-900 dark:border-gray-700'>
                     <td className='px-6 py-3'>{item._id}</td>
                     <td className='px-6 py-3'>{item.name}</td>
                     <td className='px-6 py-3'>{item.price}</td>
                     <td className='px-6 py-3'>{item.desc}</td>
                     <td className='px-6 py-3'>
                        <img src={item.image[0].url} alt='' />
                     </td>
                     <td className='px-6 py-3'>{item?.categoryId?.cateName}</td>
                     <td className='px-6 py-3'>
                        <button>
                           <Link to={'/update/' + item._id}>Update</Link>
                        </button>
                        <button onClick={() => onHandleDelete(item._id)}>delete</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};
export default AdminPage;
