import { useState, useEffect } from 'react';
import { Drawer, Input, Button, Spin, Image } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { IProduct } from '../../../../interfaces/product';
import { AiOutlineClose } from 'react-icons/ai';
import { useSearchProductMutation } from '../../../../services/product.service';
import { Link } from 'react-router-dom';

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

   useEffect(() => {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
   }, [searchHistory]);

   const showDrawer = () => {
      setIsDrawerOpen(true);
   };

   const onClose = () => {
      setItems([]);
      setSearchValue('');
      setIsDrawerOpen(false);
   };

   const handleSearch = () => {
      if (searchValue === '') {
         setItems([]);
         search('');
      } else {
         const newSearchHistory = [searchValue, ...searchHistory];
         const histories = newSearchHistory.filter((_, index) => index < 5);
         setSearchHistory(histories);
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
            <div className='items-center text-center'>
               <Input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder=' text...'
                  className='w-[500px] border-5 focus:border-sky-400'
               />
               <Button onClick={handleSearch} icon={<SearchOutlined />} />
            </div>
            <div className='items-center flex justify-center my-5 gap-5'>
               <h2>Search History:</h2>
               <div className='flex justify-center gap-5'>
                  {searchHistory.map((keyword, index) => (
                     <div
                        key={index}
                        className='search-history flex justify-center items-center'
                        onClick={() => handleKeywordClick(keyword)}
                     >
                        <span className=''>{keyword}</span>
                        <span onClick={() => handleRemoveKeyword(keyword)}>
                           <AiOutlineClose />
                        </span>
                     </div>
                  ))}
               </div>
            </div>
            <div className='flex flex-wrap items-center justify-center'>
               {isLoading ? (
                  <div className='flex justify-center'>
                     <Spin />
                  </div>
               ) : (
                  items.map((item: IProduct, index: number) => (
                     <div className='w-[30%] flex justify-center' key={index}>
                        <div className='flex'>
                           <Image src={item.image[0].url} width={120} />
                           <div className='w-[50%]'>
                              <Link to={`/productDetail/${item._id}`}>
                                 <h2 className=''>{item.name}</h2>
                              </Link>
                              <h1>{item.price}</h1>
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
