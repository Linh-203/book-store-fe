import { Helmet } from 'react-helmet';
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/auth.service';
import { saveTokenAndUser } from '../../slices/authSlice';
// import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { AuthLoginInput } from '../../interfaces/auth';

const LoginPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [login, { data, isLoading, error }] = useLoginMutation();
   // console.log(data);

   useEffect(() => {
      if (error && 'data' in error) {
         const data = error.data as { message: string };
         if ('message' in data) message.error(data?.message);
      }
   }, [error]);

   useEffect(() => {
      if (!isLoading && data) {
         dispatch(saveTokenAndUser({ accessToken: data.accessToken, user: data.data }));
         if (data.data?.role == 'admin') return navigate('/admin');
         navigate('/');
      }
   }, [data, dispatch, isLoading, navigate]);

   const onFinish = (values: AuthLoginInput) => {
      try {
         login(values);
         message.success('Login successfully');
         return;
      } catch (error) {
         alert(`Login failed with ${error}`);
         message.error(`${error}`);
      }
   };
   return (
      <div className='m-auto w-[300px] max-w-[97%]'>
         <Helmet>
            <title>Đăng nhập</title>
         </Helmet>
         <h3 style={{ textAlign: 'center', marginTop: '30px' }}>Đăng nhập</h3>
         <div id='formLogin' className='m-auto'>
            <Form layout='vertical' initialValues={{ remember: true }} onFinish={onFinish}>
               <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                     { required: true, message: 'Please input your email!' },
                     { type: 'email', message: 'Please enter a valid email address!' }
                  ]}
                  hasFeedback
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label='Password'
                  name='password'
                  rules={[
                     { required: true, message: 'Please input your password!' },
                     { min: 6, message: 'The password must be at least 6 characters long!' }
                  ]}
                  hasFeedback
               >
                  <Input.Password />
               </Form.Item>
               <Form.Item style={{ textAlign: 'center' }}>
                  <Button className='w-full bg-blue-500 text-white' size='large' htmlType='submit'>
                     Đăng nhập
                  </Button>
                  {/* <p style={{ textAlign: 'center' }}>Or</p>
                  <div className='flex gap-1 items-center justify-between'>
                     <Link className='w-full' to={'/'}>
                        <Button
                           size='large'
                           className='w-full bg-blue-500 text-white'
                           htmlType='button'
                           icon={<GoogleOutlined />}
                        >
                           Google
                        </Button>
                     </Link>
                     <Link className='w-full' to={'/'}>
                        <Button
                           className='w-full bg-blue-500 text-white'
                           size='large'
                           htmlType='button'
                           icon={<FacebookOutlined />}
                        >
                           FaceBook
                        </Button>
                     </Link>
                  </div> */}
               </Form.Item>
               <Form.Item style={{ textAlign: 'center' }}>
                  <p>
                     Do not have an account?
                     <Link className='text-blue-400' to='/signup'>
                        {' '}
                        Đăng ký ngay
                     </Link>
                  </p>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
};

export default LoginPage;
