import { useState, useEffect } from 'react';
import { Drawer, Input, Image, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IProduct } from '../../../../interfaces/product';
import { AiOutlineClose } from 'react-icons/ai';
import { useSearchProductMutation } from '../../../../services/product.service';
import { Link } from 'react-router-dom';
import Loading from '../../../Loading/Loading';

const SearchFilter = ({ children }: any) => {
   const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
   const [searchValue, setSearchValue] = useState<string>('');
   const [search, { data, isLoading }] = useSearchProductMutation();
   const [items, setItems] = useState<IProduct[]>([]);
   const [searchHistory, setSearchHistory] = useState<string[]>([]);

   useEffect(() => {
      const savedSearchHistory = localStorage.getItem('searchHistory');
      if (savedSearchHistory) {
         setSearchHistory(JSON.parse(savedSearchHistory));
      }
   }, []);

   useEffect(() => {
      if (!isLoading && data?.product) {
         setItems(data?.product);
      }
   }, [data, isLoading]);

   const showDrawer = () => {
      setIsDrawerOpen(true);
   };

   const onClose = () => {
      setItems([]);
      setSearchValue('');
      setIsDrawerOpen(false);
   };
   useEffect(() => {
      handleSearch(undefined);
   }, [searchValue]);

   const handleSearch = (e: any | undefined) => {
      if (!searchValue || searchValue.trim() === '') {
         setItems([]);
      } else {
         if (e && e.key === 'Enter') {
            const newSearchHistory = [searchValue, ...searchHistory];
            const histories = newSearchHistory.filter((_, index) => index < 5);
            setSearchHistory(histories);
            localStorage.setItem('searchHistory', JSON.stringify(histories));
         }

         search(`${searchValue}`);
      }
   };

   const handleRemoveKeyword = (keyword: string) => {
      const newSearchHistory = searchHistory.filter((item) => item !== keyword);
      setSearchHistory(newSearchHistory);
   };

   const handleKeywordClick = (keyword: string) => {
      setSearchValue(keyword);
   };

   return (
      <>
         <span onClick={showDrawer}>{children}</span>
         <Drawer title='Search Products' placement='top' closable={true} onClose={onClose} visible={isDrawerOpen}>
            <div className='items-center text-center relative'>
               <Input
                  onKeyDown={handleSearch}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder='Tìm kiếm sản phẩm...'
                  className='w-full outline-none border-b-[1px] border-[#e2e2e2] py-[10px] text-[#6f6f6f] focus:border-sky-400'
               />
               <SearchOutlined className='border-none absolute right-10 translate-y-[50%] bottom-[50%] text-[20px] text-black'></SearchOutlined>
            </div>
            <div className='items-center flex justify-center my-5 gap-5'>
               <h2>Search History:</h2>
               <div className='flex justify-center gap-5'>
                  {searchHistory.map((keyword, index) => (
                     <div
                        key={index}
                        className='search-history flex justify-center items-center cursor-pointer'
                        onClick={() => handleKeywordClick(keyword)}
                     >
                        <Tag color='cyan' className='px-5 py-1'>
                           <span className=' transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0'>
                              {keyword}
                           </span>
                        </Tag>
                        <span className='text-red-400' onClick={() => handleRemoveKeyword(keyword)}>
                           <AiOutlineClose />
                        </span>
                     </div>
                  ))}
               </div>
            </div>
            <div className='w-fit grid grid-cols-6  mx-10 items-center '>
               {isLoading ? (
                  <div className='flex justify-center'>
                     <Loading sreenSize='lg' />
                  </div>
               ) : (
                  items.map((item: IProduct, index: number) => (
                     <div className='items-center flex-wrap justify-center gap-2 mx-auto py-4' key={index}>
                        <div className='flex'>
                           <Image src={item.image[0].url} width={120} />
                           <div className=''>
                              <Link to={`/productDetail/${item._id}`}>
                                 <h2 className='flex-wrap w-[100px]'>{item.name}</h2>
                              </Link>
                              <h1>
                                 {item?.discount > 0 ? (
                                    <div className='flex-wrap '>
                                       <span>
                                          {item?.discount > 0
                                             ? (item?.price - (item?.price * item?.discount) / 100).toLocaleString(
                                                  'vi-VN',
                                                  {
                                                     style: 'currency',
                                                     currency: 'VND'
                                                  }
                                               )
                                             : ''}
                                       </span>
                                       <span className='align-bottom text-base font-normal text-gray-500 line-through dark:text-gray-400'>
                                          {item?.price?.toLocaleString('vi-VN', {
                                             style: 'currency',
                                             currency: 'VND'
                                          })}
                                       </span>
                                    </div>
                                 ) : (
                                    <span>
                                       {item?.price?.toLocaleString('vi-VN', {
                                          style: 'currency',
                                          currency: 'VND'
                                       })}
                                    </span>
                                 )}
                              </h1>
                           </div>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </Drawer>
      </>
   );
};

export default SearchFilter;
