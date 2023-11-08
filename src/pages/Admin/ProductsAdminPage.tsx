import { Link } from 'react-router-dom';
import { useGetAllProductsQuery, useRemoveProductMutation } from '../../services/product.service';
const ProductsAdminPage = () => {
   const { data } = useGetAllProductsQuery();
   console.log(data);
   const [remove] = useRemoveProductMutation();
   const onHandleDelete = (id: any) => {
      const confirm = window.confirm('Bạn có chắc muốn xóa sản phẩm này không');
      if (confirm) {
         remove(id);
      }
   };
   return (
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg w-full'>
         <button className='bg-green-500 text-white px-2 h-8 rounded-md '>
            <Link to={'/admin/add-product'}>Thêm sản phẩm</Link>
         </button>

         <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 '>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
               <tr className='items-center text-center'>
                  <th className='px-6 py-3'>STT</th>
                  <th className='px-6 py-3'>Tên</th>
                  <th className='px-6 py-3'>Giá</th>
                  <th className='px-6 py-3'>Mô tả</th>
                  <th className='px-6 py-3'>Ảnh</th>
                  <th className='px-6 py-3'>Số lượng</th>
                  <th className='px-6 py-3'>Khuyến mãi</th>
                  <th className='px-6 py-3'>Danh mục</th>
                  <th className='px-6 py-3'>Action</th>
               </tr>
            </thead>
            <tbody>
               {data?.product.map((item: any, index) => (
                  <tr
                     key={index}
                     className='bg-white border-b dark:bg-gray-900 dark:border-gray-700 items-center text-center'
                  >
                     <td className='px-6 py-3'>{index + 1}</td>
                     <td className='px-6 py-3'>{item.name}</td>
                     <td className='px-6 py-3'>{item.price}</td>
                     <td className='px-6 py-3'>{item.desc}</td>
                     <td className='px-6 py-3'>
                        <img src={item?.image[0]?.url} alt='' />
                     </td>
                     <td className='px-6 py-3'>{item.maxQuantity}</td>
                     <td className='px-6 py-3'>{item.discount}</td>
                     <td className='px-6 py-3'>{item?.categoryId?.cateName}</td>
                     <td className='px-6 py-3'>
                        <button className='bg-blue-500 text-white w-[70px] h-8 rounded-md '>
                           <Link to={'/admin/update/' + item._id}>Cập Nhật</Link>
                        </button>
                        <button
                           className='bg-red-500 text-white w-[70px] h-8 rounded-md mt-1'
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
export default ProductsAdminPage;
