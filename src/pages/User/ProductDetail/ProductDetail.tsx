import { Col, Image, Row, Spin, message } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../services/product.service';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../slices/cartSlice';
import { useState } from 'react';
const DetailProduct = () => {
   const [inputQuantity, setinputQuantity] = useState<any>(1);
   const { id } = useParams();
   const { data, isLoading } = useGetProductByIdQuery(id);
   const handleinputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (/^[\d.]+$/.test(e.target.value)) {
         const value = e.target.value;
         if (value.endsWith('.') && !/\.\d+$/.test(value)) {
            setinputQuantity(value);
         } else {
            const rounded = Math.floor(Number(e.target.value));
            const result = Number(e.target.value) - rounded;
            if (result >= 1) {
               setinputQuantity(rounded + 1);
            } else {
               setinputQuantity(rounded);
            }
         }
      } else {
         setinputQuantity('');
      }
   };
   const dispatch = useDispatch();
   const add_to_cart = () => {
      if (inputQuantity > data?.product?.maxQuantity) {
         message.error('Số lượng đã vượt quá số lượng hiện có');
      } else if (inputQuantity != '') {
         const product = {
            _id: data?.product?._id,
            name: data?.product?.name,
            image: data?.product?.image[0].url,
            price: data?.product?.price,
            discount: data?.product?.discount,
            quantity: inputQuantity,
            maxQuantity: data?.product?.maxQuantity
         };
         dispatch(addItem(product));
      } else {
         setinputQuantity(1);
         message.error('Số lượng không hợp lệ');
      }
   };
   const dec = () => {
      setinputQuantity(inputQuantity + 1);
   };
   const inc = () => {
      if (inputQuantity > 1) {
         setinputQuantity(inputQuantity - 1);
      }
   };
   return (
      <div>
         {isLoading && !data ? (
            <Spin />
         ) : (
            <div>
               <Row className='pt-10 pl-20 bg-white'>
                  <Col span={10} className=''>
                     <Image src={data.product.image[0].url} alt='productImage' preview={true} />
                     <div>
                        <Row style={{ marginRight: '85px', paddingTop: '10px' }}>
                           <Col span={7}>
                              <Image src={data.product.image[0]?.url} alt='product Image small' preview={true} />
                           </Col>
                           <Col span={7}>
                              <Image src={data.product.image[0]?.url} alt='product Image small' preview={true} />
                           </Col>
                           <Col span={7}>
                              <Image src={data.product.image[0]?.url} alt='product Image small' preview={true} />
                           </Col>
                        </Row>
                     </div>
                  </Col>
                  <Col span={14}>
                     <div style={{ display: 'inline-block' }}>
                        <h3 className='text-[30px] font-bold'>{data.product.name}</h3>
                        <span className='text-[25px] font-bold text-[#00ab9f]'>
                           {data.product?.discount > 0
                              ? (
                                   data.product?.price -
                                   (data.product?.price * data.product?.discount) / 100
                                ).toLocaleString('vi-VN', {
                                   style: 'currency',
                                   currency: 'VND'
                                })
                              : data.product?.price}
                        </span>
                        <span className='line-through text-gray-500 text-[16px] pl-2'>
                           {data.product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </span>
                     </div>
                     <div className='pb-5'>
                        <StarFilled
                           style={{
                              fontSize: '17px',
                              color: '#ffc107',
                              alignItems: 'center',
                              paddingTop: '20px'
                           }}
                        />

                        <StarFilled
                           style={{
                              fontSize: '17px',
                              color: '#ffc107',
                              alignItems: 'center'
                           }}
                        />
                        <StarFilled
                           style={{
                              fontSize: '17px',
                              color: '#ffc107',
                              alignItems: 'center',
                              paddingTop: '20px'
                           }}
                        />
                        <StarFilled
                           style={{
                              fontSize: '17px',
                              color: '#ffc107',
                              alignItems: 'center',
                              paddingTop: '20px'
                           }}
                        />
                        <StarFilled
                           style={{
                              fontSize: '17px',
                              color: '#ffc107',
                              alignItems: 'center',
                              paddingTop: '20px'
                           }}
                        />
                     </div>
                     <hr className='pb-5' />
                     <p className='w-[550px] text-[18px] pb-7'>{data.product.desc}</p>
                     <div>
                        <span className='font-bold text-[16px]'>
                           Tác Giả
                           <span className='pl-1 text-[#00ab9f] text-[14px]'>{data.product.author}</span>
                        </span>
                     </div>
                     <div className=' py-3'>
                        <span className='font-bold text-[16px]'>
                           Availablity:
                           <span className='pl-1 text-[#00ab9f] text-[14px] '>In Stock</span>
                        </span>
                     </div>
                     <div className='pb-5'>
                        <span className='font-bold text-[16px]'>
                           Tags:
                           <span className=' text-[#00ab9f] text-[14px] pl-2 underline'>
                              {' '}
                              {data.product.categoryId.cateName}
                           </span>
                        </span>
                     </div>
                     <div className='pb-5'>
                        <span className='font-bold text-[16px]'>
                           Số lượng hiện có:
                           <span className=' text-[#00ab9f] text-[14px] pl-2 '> {data.product.maxQuantity}</span>
                        </span>
                     </div>
                     <hr />
                     <div className='product-info md:mt-[30px] max-md:mt-[20px] flex items-center'>
                        <div className='stock-qty-title text-[20px] text-[#333333] font-bold'>Số lượng:</div>

                        <div className='stock-qty-value text-[16px] ml-[15px] text-[#198754] font-bold'>
                           <div className='product-quantity-action flex lg:justify-center'>
                              <div className='product-quantity flex  '>
                                 <input
                                    type='text'
                                    value={inputQuantity}
                                    onChange={handleinputQuantity}
                                    className='input-quantity text-center text-[#6f6f6f] w-[calc(100%-25px)] outline-none border-[#e2e2e2] max-w-[50px] h-[50px]  border-[1px] rounded-[5px]'
                                 />
                                 <div className='flex flex-col'>
                                    <button
                                       disabled={data?.product?.maxQuantity >= 0}
                                       onClick={dec}
                                       type='button'
                                       className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                    >
                                       +
                                    </button>
                                    <button
                                       disabled={data?.product?.maxQuantity <= 0}
                                       onClick={inc}
                                       type='button'
                                       className='inc qty-btn text-[15px] text-[#232323] flex items-center justify-center cursor-pointer border-[1px] border-[#e2e2e2] rounded-[5px] w-[25px] h-[25px]'
                                    >
                                       -
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className='btn-add-card-wrap group/btn-add-cart max-sm:w-full'>
                        <button
                           type='button'
                           onClick={add_to_cart}
                           className='btn-add-cart py-[12px] text-[#333333] w-[200px] transition-colors duration-300 z-[3] before:z-[-1] px-[30px] text-center rounded-[5px] group-hover/btn-add-cart:text-white font-bold bg-[#333333] border-[2px] border-[#333333] before-content-[""] before:absolute relative before:w-full before:h-full overflow-hidden before:bg-white before:transition-all before:duration-300 before:group-hover/btn-add-cart:scale-y-[0] before:origin-right   before:right-0 before:left-[0px] before:top-0'
                           disabled={data?.product?.maxQuantity <= 0}
                        >
                           {data?.product?.maxQuantity > 0 ? 'THÊM VÀO GIỎ HÀNG' : 'HẾT HÀNG'}
                        </button>
                     </div>
                  </Col>
                  <section className='bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased w-full'>
                     <div className='max-w-2xl mx-auto px-4'>
                        <div className='flex justify-between items-center mb-6'>
                           <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
                              Discussion (20)
                           </h2>
                        </div>
                        <form className='mb-6'>
                           <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
                              <label className='sr-only'>Your comment</label>
                              <textarea
                                 id='comment'
                                 className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
                                 placeholder='Write a comment...'
                                 required
                              ></textarea>
                           </div>
                           <button
                              // type='submit'
                              className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 bg-blue-500'
                           >
                              Post comment
                           </button>
                        </form>
                        <article className='p-6 text-base bg-white rounded-lg dark:bg-gray-900'>
                           <footer className='flex justify-between items-center mb-2'>
                              <div className='flex items-center'>
                                 <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
                                    <img
                                       className='mr-2 w-6 h-6 rounded-full'
                                       src='https://flowbite.com/docs/images/people/profile-picture-2.jpg'
                                       alt='Michael Gough'
                                    />
                                    Michael Gough
                                 </p>
                                 <p className='text-sm text-gray-600 dark:text-gray-400'>
                                    <time title='February 8th, 2022'>Feb. 8, 2022</time>
                                 </p>
                              </div>
                              <button
                                 id='dropdownComment1Button'
                                 data-dropdown-toggle='dropdownComment1'
                                 className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                                 type='button'
                              >
                                 <svg
                                    className='w-4 h-4'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 16 3'
                                 >
                                    <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                                 </svg>
                                 <span className='sr-only'>Comment settings</span>
                              </button>
                              {/* <!-- Dropdown menu --> */}
                              <div
                                 id='dropdownComment1'
                                 className='hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
                              >
                                 <ul
                                    className='py-1 text-sm text-gray-700 dark:text-gray-200'
                                    aria-labelledby='dropdownMenuIconHorizontalButton'
                                 >
                                    <li>
                                       <a
                                          href='#'
                                          className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                       >
                                          Edit
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          href='#'
                                          className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                       >
                                          Remove
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          href='#'
                                          className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                       >
                                          Report
                                       </a>
                                    </li>
                                 </ul>
                              </div>
                           </footer>
                           <p className='text-gray-500 dark:text-gray-400'>
                              Very straight-to-point article. Really worth time reading. Thank you! But tools are just
                              the instruments for the UX designers. The knowledge of the design tools are as important
                              as the creation of the design strategy.
                           </p>
                           <div className='flex items-center mt-4 space-x-4'>
                              <button
                                 type='button'
                                 className='flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium'
                              >
                                 <svg
                                    className='mr-1.5 w-3.5 h-3.5'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 20 18'
                                 >
                                    <path
                                       stroke='currentColor'
                                       stroke-linecap='round'
                                       stroke-linejoin='round'
                                       stroke-width='2'
                                       d='M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z'
                                    />
                                 </svg>
                                 Reply
                              </button>
                           </div>
                        </article>
                        <article className='p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900'>
                           <footer className='flex justify-between items-center mb-2'>
                              <div className='flex items-center'>
                                 <p className='inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold'>
                                    <img
                                       className='mr-2 w-6 h-6 rounded-full'
                                       src='https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                                       alt='Jese Leos'
                                    />
                                    Jese Leos
                                 </p>
                                 <p className='text-sm text-gray-600 dark:text-gray-400'>
                                    <time title='February 12th, 2022'>Feb. 12, 2022</time>
                                 </p>
                              </div>
                              <button
                                 id='dropdownComment2Button'
                                 data-dropdown-toggle='dropdownComment2'
                                 className='inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                                 type='button'
                              >
                                 <svg
                                    className='w-4 h-4'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 16 3'
                                 >
                                    <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                                 </svg>
                                 <span className='sr-only'>Comment settings</span>
                              </button>
                              {/* <!-- Dropdown menu --> */}
                              <div
                                 id='dropdownComment2'
                                 className='hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600'
                              >
                                 <ul
                                    className='py-1 text-sm text-gray-700 dark:text-gray-200'
                                    aria-labelledby='dropdownMenuIconHorizontalButton'
                                 >
                                    <li>
                                       <a
                                          href='#'
                                          className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                       >
                                          Edit
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          href='#'
                                          className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                       >
                                          Remove
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          href='#'
                                          className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                                       >
                                          Report
                                       </a>
                                    </li>
                                 </ul>
                              </div>
                           </footer>
                           <p className='text-gray-500 dark:text-gray-400'>Much appreciated! Glad you liked it ☺️</p>
                           <div className='flex items-center mt-4 space-x-4'>
                              <button
                                 type='button'
                                 className='flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium'
                              >
                                 <svg
                                    className='mr-1.5 w-3.5 h-3.5'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 20 18'
                                 >
                                    <path
                                       stroke='currentColor'
                                       stroke-linecap='round'
                                       stroke-linejoin='round'
                                       stroke-width='2'
                                       d='M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z'
                                    />
                                 </svg>
                                 Reply
                              </button>
                           </div>
                        </article>
                     </div>
                  </section>
               </Row>
            </div>
         )}
      </div>
   );
};

export default DetailProduct;
