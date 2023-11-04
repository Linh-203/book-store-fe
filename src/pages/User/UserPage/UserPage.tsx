import { useNavigate, useParams } from 'react-router-dom';
import { useGetOneUserQuery } from '../../../services/user.service';
import { Helmet } from 'react-helmet';
import { Button, Spin } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import UpdateUser from '../../Admin/UpdateUser';
const UserPage = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const { data, isLoading } = useGetOneUserQuery(id!);
   console.log(data);
   const onHandleCheckRole = () => {
      if (data?.user?.role == 'admin') {
         navigate('/admin/user');
      } else {
         navigate('/');
      }
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
                        <Button
                           onClick={() => onHandleCheckRole()}
                           icon={<ArrowLeftOutlined />}
                           className='bg-transparent border-transparent'
                        ></Button>
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
                              <UpdateUser></UpdateUser>
                           </div>
                        </div>
                     </header>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default UserPage;
