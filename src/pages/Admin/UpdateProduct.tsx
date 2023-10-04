import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Divider, Form, Image } from 'antd';
import { useGetAllCateQuery } from '../../services/cate.service';
import { useGetProductByIdQuery, useUpdateProductMutation } from '../../services/product.service';
import { uploadImages } from '../../api/upload';
import UploadButton from '../../components/UploadButton/UploadButton';
import { InputProduct } from '../../interfaces/product';
const UpdateProduct = () => {
   const [form] = Form.useForm();
   const { data: cateData } = useGetAllCateQuery();
   const [files, setFiles] = useState<File[]>([]);
   const {
      handleSubmit,
      register,
      reset,
      formState: { errors }
   } = useForm();
   const [update] = useUpdateProductMutation();
   const navigate = useNavigate();
   const { id } = useParams();
   const { data } = useGetProductByIdQuery(id);
   useEffect(() => {
      reset({
         name: data?.product?.name,
         price: data?.product?.price,
         desc: data?.product?.desc,
         author: data?.product?.author,
         discount: data?.product?.discount,
         image: data?.product?.image[0].url,
         categoryId: data?.product?.categoryId._id
      });
   }, [data]);
   const onHandleSubmit = async (item: any) => {
      try {
         const {
            data: { data }
         } = await uploadImages(files);
         const imagesUploaded = data.map((image) => image.url);
         form.setFieldValue('images', imagesUploaded);
         item.image = data;
      } catch (error) {
         console.log(error);
      }
      update({ id, item });
      navigate('/');
   };
   const handleGetFiles = (files: File[]) => {
      form.setFieldValue('images', files);
      setFiles(files);
   };
   return (
      <div>
         <Helmet>
            <title>Update sản phẩm</title>
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
                  <label className='block text-gray-700 text-sm font-bold mb-2'>author</label>
                  <input
                     {...register('author', { required: true, minLength: 3 })}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     type='text'
                     placeholder='author'
                  />
                  {errors.author && <span>This field is required</span>}
               </div>
               <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Price</label>
                  <input
                     {...register('price', { required: true, min: 1 })}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     type='text'
                     placeholder='Price'
                  />
                  {errors.price && <span>This field is required</span>}
               </div>
               <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Discount</label>
                  <input
                     {...register('discount', { required: true, min: 1 })}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                     type='text'
                     placeholder='Discount'
                  />
                  {errors.discount && <span>This field is required</span>}
               </div>
               <div className='mb-6'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Desc</label>
                  <textarea
                     {...register('desc', {
                        required: true,
                        minLength: 10,
                        maxLength: 999
                     })}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                     placeholder='MiÃªu táº£'
                  />
                  {errors.desc && <span>This field is required</span>}
               </div>
               <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Current Image</label>
                  <Image width={200} src={data?.product?.image[0].url} />
               </div>
               <div className='bg-white mt-10 rounded-lg p-5'>
                  <p className='text-[1.5rem] font-semibold'>Hình ảnh sản phẩm</p>
                  <Divider />
                  <Form.Item<InputProduct>
                     className='image'
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
               <div className='mb-6'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Danh muc</label>
                  <select
                     {...register('categoryId', { required: true })}
                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                  >
                     <option value=''>Chon danh muc</option>
                     {cateData?.data?.map((danhMuc: any) => (
                        <option key={danhMuc._id} value={danhMuc._id}>
                           {danhMuc.cateName}
                        </option>
                     ))}
                  </select>
                  {errors.nxb ? <span>This field is required</span> : ''}
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

export default UpdateProduct;
