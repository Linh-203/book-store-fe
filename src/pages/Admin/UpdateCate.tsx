import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGetAllCateByIdQuery, useUpdateCateMutation } from '../../services/cate.service';
import { message } from 'antd';
const UpdateCate = () => {
   const {
      handleSubmit,
      register,
      reset,
      formState: { errors }
   } = useForm();
   const [update] = useUpdateCateMutation();
   const navigate = useNavigate();
   const { id } = useParams();
   const { data } = useGetAllCateByIdQuery(id);
   // console.log(data);

   useEffect(() => {
      reset({
         cateName: data?.data?.cateName
      });
   }, [data]);
   const onHandleSubmit = (item: any) => {
      update({ id, item });
      message.success('Category updated successfully');
      navigate('/admin/categories');
   };
   return (
      <div>
         <Helmet>
            <title>Update danh mục</title>
         </Helmet>
         <div className='w-full max-w-xs'>
            <form onSubmit={handleSubmit(onHandleSubmit)} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
               <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Name</label>
                  <input
                     {...register('cateName', { required: true, minLength: 3 })}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     type='text'
                     placeholder='cateName'
                  />
                  {errors.name && <span>This field is required</span>}
               </div>
               <div className='flex items-center justify-between'>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                     Submit
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default UpdateCate;
