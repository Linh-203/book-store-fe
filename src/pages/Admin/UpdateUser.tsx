import { useForm } from 'react-hook-form';
import { Divider, Form, Image, message } from 'antd';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useGetOneUserQuery, useUpdateUserMutation } from '../../services/user.service';
import { uploadImages } from '../../api/upload';
import { InputProduct } from '../../interfaces/product';
import UploadButton from '../../components/UploadButton/UploadButton';
import Loading from '../../components/Loading/Loading';
const UpdateUser = () => {
   const [form] = Form.useForm();
   const [files, setFiles] = useState<File[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const {
      handleSubmit,
      register,
      reset,
      formState: { errors }
   } = useForm();
   const [update] = useUpdateUserMutation();
   const navigate = useNavigate();
   const { id } = useParams();
   const { data } = useGetOneUserQuery(id!);
   // console.log(data);

   useEffect(() => {
      reset({
         name: data?.user?.name,
         email: data?.user?.email,
         role: data?.user?.role,
         avatar: data?.user?.avatar,
         phoneNumber: data?.user?.phoneNumber
      });
   }, [data]);
   const onHandleSubmit = async (item: any) => {
      try {
         setLoading(true);
         const {
            data: { data }
         } = await uploadImages(files);
         const imagesUploaded = data.map((image) => image.url);
         form.setFieldValue('images', imagesUploaded);
         item.avatar = data[0].url;
      } catch (error) {
         console.log(error);
      }
      update({ id: id!, item });
      message.success('User updated successfully');
      setLoading(false);
      navigate('/admin/user');
   };
   const handleGetFiles = (files: File[]) => {
      form.setFieldValue('images', files);
      setFiles(files);
   };
   if (loading) return <Loading sreenSize='lg' />;
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
                     {...register('name', { required: true, minLength: 3 })}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     type='text'
                     placeholder='name'
                  />
                  {errors.name && <span>This field is required</span>}
               </div>

               <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Email</label>
                  <input
                     {...register('email', { required: true, minLength: 3 })}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     type='text'
                     placeholder='email'
                  />
                  {errors.email && <span>This field is required</span>}
               </div>

               <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Phone Number</label>
                  <input
                     {...register('phoneNumber', { required: true, minLength: 3 })}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     type='text'
                     placeholder='phoneNumber'
                  />
                  {errors.phoneNumber && <span>This field is required</span>}
               </div>

               <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Password</label>
                  <input
                     {...register('password', { required: true, minLength: 3 })}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     type='text'
                     placeholder='password'
                  />
                  {errors.password && <span>This field is required</span>}
               </div>
               <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Current Image</label>
                  <Image width={200} src={data?.user?.avatar} />
               </div>

               <div className='bg-white mt-10 rounded-lg p-5'>
                  <p className='text-[1.5rem] font-semibold'>Hình ảnh sản phẩm</p>
                  <Divider />
                  <Form.Item<InputProduct>
                     className='avatar'
                     hasFeedback
                     rules={[{ required: true, message: 'Please choose images' }]}
                  >
                     <UploadButton
                        maxCount={3}
                        multiple
                        listStyle='picture-card'
                        getListFiles={handleGetFiles}
                        name='avatar'
                     />
                  </Form.Item>
               </div>
               <div className='mb-6'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Role</label>
                  <select
                     {...register('role')}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  >
                     <option value='member'>Chon Role</option>
                     <option value='member'>Member</option>
                     <option value='admin'>Admin</option>
                  </select>
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

export default UpdateUser;
