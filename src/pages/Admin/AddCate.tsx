import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAddCateMutation } from '../../services/cate.service';
import { message } from 'antd';
const AddCate = () => {
   // console.log(data);
   const {
      handleSubmit,
      register,
      formState: { errors }
   } = useForm();
   const [add] = useAddCateMutation();
   const navigate = useNavigate();
   const onHandleSubmit = (item: any) => {
      add(item);
      message.success('Add category successfully');
      navigate('/admin/categories');
   };
   return (
      <div className='w-full px-20 py-5'>
         <Helmet>
            <title>Thêm danh mục</title>
         </Helmet>
         <div className=''>
            <form onSubmit={handleSubmit(onHandleSubmit)} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
               <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                  <input
                     {...register('cateName', { required: true, minLength: 3 })}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     type='text'
                     placeholder='name'
                  />
                  {errors.cateName && <span>This field is required</span>}
               </div>
               <div className='flex items-center justify-between'>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                     Thêm
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddCate;
