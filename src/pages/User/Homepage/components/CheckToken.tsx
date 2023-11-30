import { Link } from 'react-router-dom';
import { Popover } from 'antd';
import { CiUser } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { IAuth, deleteTokenAndUser } from '../../../../slices/authSlice';
import { useClearTokenMutation } from '../../../../services/auth.service';
import { PiUserListBold } from 'react-icons/pi';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { RiBillLine } from 'react-icons/ri';
const CheckToken = () => {
   const auth = useSelector((state: { userReducer: IAuth }) => state.userReducer);
   // console.log(auth?.user?._id);

   const [clearToken] = useClearTokenMutation();
   const dispatch = useDispatch();
   const onHandleLogout = () => {
      dispatch(deleteTokenAndUser());
      clearToken();
   };
   return (
      <div>
         {!auth?.accessToken ? (
            <Popover
               placement='bottom'
               content={
                  <>
                     <Link to={'/login'} className='flex items-center gap-[5px] py-[5px]'>
                        <FiLogIn></FiLogIn>Đăng nhập
                     </Link>
                     <Link to={'/signup'} className='flex items-center gap-[5px] py-[5px]'>
                        <AiOutlineUserAdd></AiOutlineUserAdd> Đăng ký
                     </Link>
                  </>
               }
               trigger='click'
            >
               <span>
                  <CiUser className='w-7 h-7' />
               </span>
            </Popover>
         ) : (
            <>
               <div className='w-[5%] h-full'></div>
               <Popover
                  placement='bottom'
                  content={
                     <>
                        {auth.user.role === 'member' ? (
                           <div>
                              <Link
                                 to={'/userPage/' + auth?.user?._id}
                                 className='flex items-center gap-[5px] py-[5px]'
                              >
                                 <PiUserListBold></PiUserListBold> Hồ sơ của bạn
                              </Link>
                              <button className='flex items-center gap-[5px] py-[5px]' onClick={() => onHandleLogout()}>
                                 <FiLogOut></FiLogOut>Đăng xuất
                              </button>
                              <Link to='/order' className='flex items-center gap-[5px] py-[5px]'>
                                 <RiBillLine></RiBillLine> Lịch sử mua hàng
                              </Link>
                           </div>
                        ) : (
                           <div>
                              <Link to='/admin' className='flex items-center gap-[5px] py-[5px]'>
                                 <PiUserListBold></PiUserListBold> Quản lý cửa hàng
                              </Link>
                              <Link
                                 to={'/userPage/' + auth?.user?._id}
                                 className='flex items-center gap-[5px] py-[5px]'
                              >
                                 <PiUserListBold></PiUserListBold> Hồ sơ của bạn
                              </Link>
                              <Link to='/order' className='flex items-center gap-[5px] py-[5px]'>
                                 <RiBillLine></RiBillLine> Lịch sử mua hàng
                              </Link>
                              <button className='flex items-center gap-[5px] py-[5px]' onClick={() => onHandleLogout()}>
                                 <FiLogOut></FiLogOut>Đăng xuất
                              </button>
                           </div>
                        )}
                     </>
                  }
                  trigger='click'
               >
                  <img src={auth?.user?.avatar} className='w-8  aspect-square m-0  cursor-pointer' />
               </Popover>
            </>
         )}
      </div>
   );
};

export default CheckToken;
