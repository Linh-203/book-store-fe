import { Image, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery, useGetRelatedProductsQuery } from '../../../services/product.service';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../slices/cartSlice';
import { useState } from 'react';
import { addToWishList } from '../../../slices/wishListSlice';
import HeartIcon from '../../../assets/icons/HeartIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import styles from '../Homepage/components/CardProduct.module.css';
import CartIcon from '../../../assets/icons/CartIcon';
import EyeIcon from '../../../assets/icons/EyeIcon';
import Quickview from '../Homepage/components/Quickview';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Loading from '../../../components/Loading/Loading';
const DetailProduct = () => {
   const [inputQuantity, setinputQuantity] = useState<any>(1);
   const { id } = useParams();
   const { data, isLoading } = useGetProductByIdQuery(id);
   const [toggle, setToggle] = useState<boolean>(false);
   // console.log(data);
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
            price:
               data?.product?.discount > 0
                  ? data?.product?.price - (data?.product?.price * data?.product?.discount) / 100
                  : data?.product?.price,
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
   const add_to_wishList = () => {
      const product = {
         _id: data?.product?._id,
         name: data?.product?.name,
         image: data?.product?.image[0].url,
         price: data?.product?.price
      };
      dispatch(addToWishList(product));
   };
   const isAdded = useSelector((state: any) =>
      state?.wishList?.items?.find((item: any) => item?._id === data?.product?._id)
   );
   const objId = {
      idCategory: data?.product?.categoryId?._id,
      idProduct: id
   };
   const { data: relatedProductsData } = useGetRelatedProductsQuery(objId!, {
      skip: !objId.idCategory || !objId.idProduct
   });
   const add_product_to_wishList = (product: any) => {
      dispatch(addToWishList({ ...product, image: product?.image[0]?.url }));
   };
   return (
      <div>
         {isLoading && !data ? (
            <Loading />
         ) : (
            <div>
               <section className='py-10 font-poppins dark:bg-gray-800'>
                  <div className='max-w-6xl px-4 mx-auto'>
                     <div className='flex flex-wrap mb-24 -mx-4'>
                        <div className='w-full px-4 mb-8 md:w-1/2 md:mb-0'>
                           <div className='sticky top-0 overflow-hidden '>
                              <div className='relative mb-6 lg:mb-10 lg:h-96'>
                                 <a className='absolute left-0 transform lg:ml-2 top-1/2 translate-1/2' href='#'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       width='16'
                                       height='16'
                                       fill='currentColor'
                                       className='w-5 h-5 text-blue-500 bi bi-chevron-left dark:text-blue-200'
                                       viewBox='0 0 16 16'
                                    >
                                       <path
                                          fill-rule='evenodd'
                                          d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
                                       ></path>
                                    </svg>
                                 </a>
                                 <img
                                    className='object-contain w-full lg:h-full'
                                    src={data?.product?.image[0]?.url}
                                    alt=''
                                 />
                                 <a className='absolute right-0 transform lg:mr-2 top-1/2 translate-1/2' href='#'>
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       width='16'
                                       height='16'
                                       fill='currentColor'
                                       className='w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200'
                                       viewBox='0 0 16 16'
                                    >
                                       <path
                                          fill-rule='evenodd'
                                          d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                                       ></path>
                                    </svg>
                                 </a>
                              </div>
                              <div className='flex-wrap hidden -mx-2 md:flex'>
                                 <div className='w-1/2 p-2 sm:w-1/4'>
                                    <a
                                       className='block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300'
                                       href='#'
                                    >
                                       <Image
                                          preview={true}
                                          className='object-contain w-full lg:h-28'
                                          src={data?.product?.image[1]?.url}
                                          alt=''
                                       />
                                    </a>
                                 </div>
                                 <div className='w-1/2 p-2 sm:w-1/4'>
                                    <a
                                       className='block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300'
                                       href='#'
                                    >
                                       <Image
                                          preview={true}
                                          className='object-contain w-full lg:h-28'
                                          src={data?.product?.image[2]?.url}
                                          alt=''
                                       />
                                    </a>
                                 </div>
                                 <div className='w-1/2 p-2 sm:w-1/4'>
                                    <a
                                       className='block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300'
                                       href='#'
                                    >
                                       <Image
                                          preview={true}
                                          className='object-contain w-full lg:h-28'
                                          src={data?.product?.image[1]?.url}
                                          alt=''
                                       />
                                    </a>
                                 </div>
                                 <div className='w-1/2 p-2 sm:w-1/4'>
                                    <a
                                       className='block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300'
                                       href='#'
                                    >
                                       <img
                                          className='object-contain w-full lg:h-28'
                                          src={data?.product?.image[2]?.url}
                                          alt=''
                                       />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className='w-full px-4 md:w-1/2'>
                           <div className='lg:pl-20'>
                              <div className='mb-6 '>
                                 <span className='px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200'>
                                    In Stock
                                 </span>
                                 <h2 className='max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300'>
                                    {data?.product?.name}
                                 </h2>
                                 <div className='flex flex-wrap items-center mb-6'>
                                    <ul className='flex mb-4 mr-2 lg:mb-0'>
                                       <li>
                                          <a href='#'>
                                             <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star '
                                                viewBox='0 0 16 16'
                                             >
                                                <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'></path>
                                             </svg>
                                          </a>
                                       </li>
                                       <li>
                                          <a href='#'>
                                             <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star '
                                                viewBox='0 0 16 16'
                                             >
                                                <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'></path>
                                             </svg>
                                          </a>
                                       </li>
                                       <li>
                                          <a href='#'>
                                             <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star '
                                                viewBox='0 0 16 16'
                                             >
                                                <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'></path>
                                             </svg>
                                          </a>
                                       </li>
                                       <li>
                                          <a href='#'>
                                             <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                width='16'
                                                height='16'
                                                fill='currentColor'
                                                className='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star '
                                                viewBox='0 0 16 16'
                                             >
                                                <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z'></path>
                                             </svg>
                                          </a>
                                       </li>
                                    </ul>
                                    {/* <a
                                       className='mb-4 text-xs underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0'
                                       href='#'
                                    >
                                       View the acer store
                                    </a> */}
                                 </div>
                                 <p className='inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400 '>
                                    {data?.product?.discount > 0 ? (
                                       <div>
                                          <span>
                                             {data?.product?.discount > 0
                                                ? (
                                                     data?.product?.price -
                                                     (data?.product?.price * data?.product?.discount) / 100
                                                  ).toLocaleString('vi-VN', {
                                                     style: 'currency',
                                                     currency: 'VND'
                                                  })
                                                : ''}
                                          </span>
                                          <span className='ml-3 text-base font-normal text-gray-500 line-through dark:text-gray-400'>
                                             {data?.product?.price?.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND'
                                             })}
                                          </span>
                                       </div>
                                    ) : (
                                       <span>
                                          {data?.product?.price?.toLocaleString('vi-VN', {
                                             style: 'currency',
                                             currency: 'VND'
                                          })}
                                       </span>
                                    )}
                                 </p>
                              </div>

                              <div className='py-6 mb-6 border-t border-b border-gray-200 dark:border-gray-700'>
                                 <span className='text-base text-blue-500 dark:text-gray-400'>
                                    Sản phẩm còn lại: {data?.product?.maxQuantity}
                                 </span>
                                 <p className='mt-2 text-sm text-blue-500 dark:text-blue-200'>
                                    <span className='text-gray-600 dark:text-gray-400'>{data?.product?.desc}</span>
                                 </p>
                              </div>
                              <div className='mb-6 '></div>
                              <div className='flex flex-wrap items-center mb-6'>
                                 <div className='mb-4 mr-4 lg:mb-0'>
                                    <div className='w-28'>
                                       <div className='relative flex flex-row w-full h-10 bg-transparent rounded-lg'>
                                          <button
                                             disabled={data?.product?.maxQuantity <= 0}
                                             onClick={inc}
                                             type='button'
                                             className='w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300'
                                          >
                                             <span className='m-auto text-2xl font-thin'>-</span>
                                          </button>
                                          <input
                                             type='text'
                                             value={inputQuantity}
                                             onChange={handleinputQuantity}
                                             className='flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black'
                                          />
                                          <button
                                             disabled={inputQuantity >= data?.product?.maxQuantity}
                                             onClick={dec}
                                             type='button'
                                             className='w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-300'
                                          >
                                             <span className='m-auto text-2xl font-thin'>+</span>
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                                 <div className='mb-4 lg:mb-0'>
                                    <button
                                       type='button'
                                       onClick={add_to_wishList}
                                       className='flex items-center justify-center w-full h-10 p-2 mr-4 text-gray-700 border border-gray-300 lg:w-11 hover:text-gray-50 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-gray-100'
                                    >
                                       {isAdded ? (
                                          <svg
                                             color='red'
                                             xmlns='http://www.w3.org/2000/svg'
                                             width='16'
                                             height='16'
                                             fill='currentColor'
                                             className=' bi bi-heart'
                                             viewBox='0 0 16 16'
                                          >
                                             <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'></path>
                                          </svg>
                                       ) : (
                                          <svg
                                             xmlns='http://www.w3.org/2000/svg'
                                             width='16'
                                             height='16'
                                             fill='currentColor'
                                             className=' bi bi-heart'
                                             viewBox='0 0 16 16'
                                          >
                                             <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z'></path>
                                          </svg>
                                       )}
                                    </button>
                                 </div>
                                 <button
                                    type='button'
                                    onClick={add_to_cart}
                                    className='w-full px-4 py-3 text-center text-blue-600 bg-blue-100 border border-blue-600 dark:hover:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:bg-gray-700 hover:bg-blue-600 hover:text-gray-100 lg:w-1/2 rounded-xl'
                                 >
                                    Add to cart
                                 </button>
                              </div>
                              <div className='flex gap-4 mb-6'>
                                 <Link
                                    to={'/cart'}
                                    className='w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl'
                                 >
                                    Buy now
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
               <h1 className='text-center text-4xl font-bold'>Sản phẩm liên quan</h1>
               <div className=' mx-auto px-[15px] 3xl:w-[100%] 2xl:w-[100%] xl:w-[100%] lg:w-[100%]  md:w-[100%]'>
                  <Swiper
                     slidesPerView={4}
                     spaceBetween={30}
                     loop={true}
                     autoplay={{
                        delay: 2000,
                        disableOnInteraction: false
                     }}
                     breakpoints={{
                        1201: {
                           slidesPerView: 4
                        },
                        1200: {
                           slidesPerView: 3
                        },
                        767: {
                           slidesPerView: 3
                        },
                        766: {
                           slidesPerView: 2
                        },
                        400: {
                           slidesPerView: 2
                        },
                        1: {
                           slidesPerView: 1
                        }
                     }}
                     modules={[Autoplay, Navigation, Pagination]}
                     className='mySwiper py-[30px] w-[100%] items-center'
                  >
                     {relatedProductsData?.products?.map((product: any, index: any) => (
                        <SwiperSlide key={index}>
                           {toggle && <Quickview product={product} changeToggle={setToggle} />}
                           <div className={`${styles['wrapper']}`}>
                              <Link
                                 to={'/productDetail/' + product._id}
                                 className={` block relative text-center`}
                                 onClick={() => window.scroll(0, 0)}
                              >
                                 {product?.discount > 0 && (
                                    <p
                                       className={`${styles['tail']} absolute top-5 left-5 w-11 py-3 items-center text-center text-[0.8rem] text-white rounded-full bg-[#00ab9f]`}
                                    >
                                       -{product?.discount}%
                                    </p>
                                 )}
                                 <div className='relative'>
                                    <div className='w-full rounded-lg  sm:h-72 lg:h-96 bg-white flex justify-center items-center'>
                                       <Link to={'/productDetail/' + product._id}>
                                          <img
                                             alt='Art'
                                             src={product?.image[0]?.url}
                                             className=' w-full object-cover scale-[1] aspect-auto '
                                          />
                                       </Link>
                                    </div>
                                 </div>
                                 <h3 className='mt-4 text-[1.1rem] font-semibold text-colorText hover:text-[#00ab9f] '>
                                    <Link to={'/productDetail/' + product._id}>{product?.name}</Link>
                                 </h3>
                                 <div className='flex justify-center items-center w-full gap-3 mt-2'>
                                    <p className=' text-greenCus text-[#00ab9f] text-lg font-semibold '>
                                       {product?.discount > 0
                                          ? (
                                               product?.price -
                                               (product?.price * product?.discount) / 100
                                            ).toLocaleString('vi-VN', {
                                               style: 'currency',
                                               currency: 'VND'
                                            })
                                          : product?.price.toLocaleString('vi-VN', {
                                               style: 'currency',
                                               currency: 'VND'
                                            })}
                                    </p>
                                    {product?.discount > 0 && (
                                       <del className='text-grayLight100  font-semibold text-lg '>
                                          {product?.price.toLocaleString('vi-VN', {
                                             style: 'currency',
                                             currency: 'VND'
                                          })}
                                       </del>
                                    )}
                                 </div>
                              </Link>
                              <div className={`${styles['mark']}  sm:h-72 lg:h-96`}>
                                 <div className='flex justify-center items-center w-[50%] gap-3 '>
                                    <button
                                       className={`${styles['sub-btn']} p-3 rounded-full bg-greenCus text-white hover:bg-hightLigh duration-200 `}
                                    >
                                       <span
                                          className={`${styles['tooltip-arrow']} absolute min-w-[100px] bg-colorText py-1 top-[-2.5rem] left-[-2rem] text-[#00ab9f]`}
                                       >
                                          Add to cart
                                       </span>
                                       <Link to={'/productDetail/' + product._id}>
                                          <CartIcon className='text-[#00ab9f]' />
                                       </Link>
                                    </button>
                                    <button
                                       className={`${styles['sub-btn']} p-3 rounded-full bg-greenCus text-white hover:bg-hightLigh duration-200`}
                                       onClick={() => setToggle(true)}
                                    >
                                       <span
                                          className={`${styles['tooltip-arrow']} absolute min-w-[100px] bg-colorText py-1 top-[-2.5rem] left-[-2rem] text-[#00ab9f]`}
                                       >
                                          Quick view
                                       </span>
                                       <EyeIcon className='text-[#00ab9f]' />
                                    </button>
                                    <button
                                       onClick={() => add_product_to_wishList(product)}
                                       className={`${styles['sub-btn']} p-3 rounded-full bg-greenCus text-white hover:bg-hightLigh duration-200`}
                                    >
                                       <span
                                          className={`${styles['tooltip-arrow']} absolute min-w-[100px] bg-colorText py-1 top-[-2.5rem] left-[-2rem] text-[#00ab9f]`}
                                       >
                                          Wishlist
                                       </span>
                                       <HeartIcon className='text-[#00ab9f]' />
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </div>
            </div>
         )}
      </div>
   );
};

export default DetailProduct;
