import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Layout } from 'antd';
import BellIcon from '../../Icons/BellIcon';
import MoonIcon from '../../Icons/MoonIcon';
import { useContext, ChangeEvent } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import CheckToken from '../../../pages/User/Homepage/components/CheckToken';

const { Header } = Layout;
const HeaderAdmin = () => {
   const { searchTerm, setSearchTerm } = useContext(SearchContext);

   const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
   };

   return (
      <Header
         style={{
            paddingLeft: 10,
            paddingRight: 10,
            background: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: '100',
            boxShadow: '0 3px 4px -2px rgba(0, 0, 0, 0.123)'
         }}
      >
         <div className='w-[40%] flex justify-start items-center gap-2 rounded-lg border-[1px] border-[rgba(0,0,0,0.1)] px-3 py-2'>
            <SearchOutlined width={'1.5rem'} height={'1.5rem'} color='rgba(0,0,0,0.2)' />
            <Input
               type='text'
               value={searchTerm}
               onChange={handleSearchChange}
               className='outline-none border-none'
               placeholder='Tìm kiếm'
            />
         </div>
         <div className='max-w-[50%] flex justify-end items-center gap-3'>
            <div className='flex justify-around items-center gap-2 border-[1px] border-[rgba(0,0,0,0.1)] p-2 rounded-lg overflow-hidden h-[3rem] w-[50%]'>
               <Button
                  className='pb-8 border-none hidden opacity-0 invisible md:block md:opacity-100 md:visible'
                  icon={<CheckToken />}
               />
            </div>
            <div className='w-[3rem] h-[3rem] flex justify-center items-center rounded-xl p-2 bg-[#dfdede] cursor-pointer'>
               <BellIcon />
            </div>
            <div className='w-[3rem] h-[3rem] flex justify-center items-center rounded-xl p-2 bg-[#2c2c2c] cursor-pointer'>
               <MoonIcon />
            </div>
         </div>
      </Header>
   );
};

export default HeaderAdmin;
