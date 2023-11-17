import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAddProductMutation } from '../../services/product.service';
import { useGetAllCateQuery } from '../../services/cate.service';
import { Divider, Form, message } from 'antd';
import UploadButton from '../../components/UploadButton/UploadButton';
import { InputProduct } from '../../interfaces/product';
import { useState } from 'react';
import { uploadImages } from '../../api/upload';
import Loading from '../../components/Loading/Loading';
const AddProduct = () => {
   const { data } = useGetAllCateQuery();
   const [loading, setLoading] = useState<boolean>(false);
   // console.log(data);
   const [form] = Form.useForm();
   const [files, setFiles] = useState<File[]>([]);
   const {
      handleSubmit,
      register,
      formState: { errors }
   } = useForm();
   const [add] = useAddProductMutation();
   const navigate = useNavigate();
   const onHandleSubmit = async (item: any) => {
      try {
         setLoading(true);
         const {
            data: { data }
         } = await uploadImages(files);
         const imagesUploaded = data.map((image) => image.url);
         form.setFieldValue('images', imagesUploaded);
         item.image = data;
      } catch (error) {
         console.log(error);
      }
      add(item);
      message.success('Add product successfully');
      setLoading(false);
      navigate('/admin/products');
   };
   const handleGetFiles = (files: File[]) => {
      form.setFieldValue('images', files);
      setFiles(files);
   };
   if (loading) return <Loading sreenSize='lg' />;
   return (
      <div className='w-full'>
         <Helmet>
            <title>Thêm sản phẩm</title>
         </Helmet>
         <section className='bg-white dark:bg-gray-900'>
            <div className='py-8 px-4 mx-auto max-w-2xl lg:py-16'>
               <h2 className='mb-14 text-center text-4xl font-bold text-gray-900 dark:text-white'>Thêm sản phẩm</h2>
               <form onSubmit={handleSubmit(onHandleSubmit)}>
                  <div className='grid gap-4 sm:grid-cols-2 sm:gap-6'>
                     <div className='w-full'>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                           Product Name
                        </label>
                        <input
                           {...register('name', { required: true, minLength: 3 })}
                           type='text'
                           name='name'
                           id='name'
                           className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                           placeholder='Type product name'
                        />
                        {errors.name && <span className='text-red-500 '>Vui lòng không bỏ trống</span>}
                     </div>
                     <div className='w-full'>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Discount</label>
                        <input
                           {...register('discount', { required: true, min: 0 })}
                           type='text'
                           name='discount'
                           id='discount'
                           className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                           placeholder='10%'
                        />
                        {errors.name && <span className='text-red-500 '>Vui lòng không bỏ trống</span>}
                     </div>
                     <div className='w-full'>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Author</label>
                        <input
                           {...register('author', { required: true, minLength: 3 })}
                           type='text'
                           name='author'
                           id='brand'
                           className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                           placeholder='Product author'
                        />
                        {errors.author && <span className='text-red-500 '>Vui lòng không bỏ trống</span>}
                     </div>
                     <div className='w-full'>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Price</label>
                        <input
                           {...register('price', { required: true, min: 1 })}
                           type='number'
                           name='price'
                           id='price'
                           className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                           placeholder='$2999'
                        />
                        {errors.price && <span className='text-red-500 '>Vui lòng không bỏ trống</span>}
                     </div>
                     <div>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Category</label>
                        <select
                           {...register('categoryId', { required: true })}
                           id='category'
                           className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                        >
                           <option value=''>Chon danh muc</option>
                           {data?.data?.map((danhMuc: any) => (
                              <option key={danhMuc._id} value={danhMuc._id}>
                                 {danhMuc.cateName}
                              </option>
                           ))}
                        </select>
                     </div>
                     <div>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                           Max quantity
                        </label>
                        <input
                           {...register('maxQuantity', { required: true, min: 0 })}
                           type='number'
                           name='maxQuantity'
                           id='maxQuantity'
                           className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                           placeholder='0'
                        />
                        {errors.maxQuantity && <span className='text-red-500 '>Vui lòng không bỏ trống</span>}
                     </div>
                     <div className='sm:col-span-2'>
                        <p className='text-[1.5rem] font-semibold'>Hình ảnh sản phẩm</p>
                        <Divider />
                        <Form.Item<InputProduct>
                           className='images'
                           hasFeedback
                           rules={[{ required: true, message: 'Please choose images' }]}
                        >
                           <UploadButton
                              maxCount={3}
                              multiple
                              listStyle='picture-card'
                              getListFiles={handleGetFiles}
                              name='images'
                           />
                        </Form.Item>
                     </div>
                     <div className='sm:col-span-2'>
                        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                           Description
                        </label>
                        <textarea
                           {...register('desc', {
                              required: true,
                              minLength: 10,
                              maxLength: 999
                           })}
                           id='description'
                           className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                           placeholder='Your description here'
                        />
                        {errors.desc && <span className='text-red-500 '>Vui lòng không bỏ trống</span>}
                     </div>
                  </div>
                  <button
                     // type='submit'
                     className='bg-blue-500 hover:bg-blue-700 text-white font-bold   focus:outline-none focus:shadow-outline inline-flex items-center px-5 py-3 mt-4 sm:mt-6 text-sm  text-center bg-primary-700 rounded focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800'
                  >
                     Thêm
                  </button>
               </form>
            </div>
         </section>
      </div>
   );
};

export default AddProduct;
