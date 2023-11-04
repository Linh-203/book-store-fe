import { Link, useParams } from 'react-router-dom';
import { useGetOneUserQuery } from '../../services/user.service';
import { Helmet } from 'react-helmet';
import { Button, Spin, Tabs } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import type { TabsProps } from 'antd';
import EditAccount from './UpdateUser';

const items: TabsProps['items'] = [
   {
      key: '1',
      label: 'Hoạt động tương tác',
      children: (
         <div className='bg-white rounded-md p-5'>
            <h1>Tương tác gần đây</h1>
         </div>
      )
   },
   {
      key: '2',
      label: 'Đơn hàng',
      children: 'Đơn hàng'
   }
];

function UserDetail() {
   const { id } = useParams();
   const { data, isLoading } = useGetOneUserQuery(id!);
   const onChange = (key: string) => {
      console.log(key);
   };

   return (
      <>
         <Helmet>
            <title>{data?.user ? data?.user?.email : 'Người dùng'}</title>
         </Helmet>
         <div className='w-full flex justify-start items-center min-h-screen flex-col '>
            <div className='w-[90%] rounded-lg mt-5'>
               {isLoading && !data ? (
                  <Spin />
               ) : (
                  <div>
                     <h1 className='text-3xl my-3 flex items-center font-semibold text-[rgba(0,0,0,0.7)]'>
                        <Link to={'/admin/user'}>
                           <Button icon={<ArrowLeftOutlined />} className='bg-transparent border-transparent'></Button>
                        </Link>
                        {data?.user ? data?.user?.name : 'Người dùng'}
                     </h1>
                     <header className='flex flex-col gap-4 p-5 bg-white rounded-lg justify-between'>
                        <div className='flex justify-center items-center gap-2'>
                           <div className='min-w-[80px] w-[80px] min-h-[80px] h-[80px] rounded-full relative'>
                              <img
                                 src={data?.user?.avatar}
                                 alt='user avatar'
                                 className='rounded-full w-full h-full object-cover'
                              />
                           </div>
                           <div>
                              <h1 className='font-bold text-[1.4rem] lg:w-[400px] break-words'>{data?.user?.name}</h1>
                              <p>{data?.user?.email}</p>
                           </div>
                           <div className='self-end w-full md:w-auto'>
                              <EditAccount></EditAccount>
                           </div>
                        </div>
                     </header>
                     <div className='flex justify-between gap-4'>
                        <Tabs className='flex-1' defaultActiveKey='1' items={items} onChange={onChange} />
                        <div className='pt-16'>
                           <div className='bg-white p-5 w-[400px] rounded-md'>
                              <h1>Hộp thư đến</h1>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </>
   );
}

export default UserDetail;
