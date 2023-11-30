import { Helmet } from 'react-helmet';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '../../services/auth.service';
import { saveTokenAndUser } from '../../slices/authSlice';
// import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { RuleObject } from 'antd/es/form';
import { AuthSignupInput } from '../../interfaces/auth';

const SignupPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [signup, { data, isLoading, error }] = useSignupMutation();

   useEffect(() => {
      if (error && 'data' in error) {
         const data = error.data as { message: string };
         if ('message' in data) message.error(data?.message);
      }
   }, [error]);

   useEffect(() => {
      if (!isLoading && data) {
         dispatch(saveTokenAndUser({ accessToken: data.accessToken, user: data.data }));
         navigate('/');
      }
   }, [data, isLoading, error, dispatch, navigate]);

   const onFinish = (values: AuthSignupInput) => {
      try {
         // setLoading(true);
         signup({
            ...values,
            avatar:
               'https://res.cloudinary.com/dpwto5xyv/image/upload/v1692587346/learnECMAS/t%E1%BA%A3i_xu%E1%BB%91ng_zdwt9p.png'
         });

         message.success('Signup successfully');
         return;
      } catch (error) {
         alert();
         message.error(`signup failed with ${error}`);
      }
   };

   const validatePhoneNumber = (_: RuleObject, value: string) => {
      const phoneRegex = /^0\d{9}$/; // Regex để kiểm tra số điện thoại bắt đầu bằng số 0 và có tổng 10 số
      if (value && !phoneRegex.test(value)) {
         return Promise.reject('Please enter a valid phone number!');
      }
      return Promise.resolve();
   };

   return (
      <div className='m-auto w-[600px] max-w-[97%] '>
         <Helmet>
            <title>Đăng ký</title>
         </Helmet>
         <h3 className='text-4xl font-bold mb-5' style={{ textAlign: 'center', marginTop: '30px' }}>
            Đăng ký
         </h3>
         <div id='formLogin' className='m-auto'>
            <Form layout='vertical' initialValues={{ remember: true }} onFinish={onFinish}>
               <Form.Item
                  label='name'
                  name='name'
                  rules={[{ required: true, message: 'Please input your username!' }]}
                  hasFeedback
               >
                  <Input />
               </Form.Item>
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
               <Form.Item hasFeedback label='Phone' name='phoneNumber' rules={[{ validator: validatePhoneNumber }]}>
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
               <Form.Item
                  label='ConfirmPassword'
                  name='confirmPassword'
                  hasFeedback
                  rules={[
                     {
                        required: true,
                        message: 'Please confirm your password!'
                     }
                  ]}
               >
                  <Input.Password />
               </Form.Item>
               <Form.Item style={{ textAlign: 'center' }}>
                  <Button className='w-full bg-blue-500 text-white' size='large' htmlType='submit'>
                     Đăng ký
                  </Button>
                  {/* <p style={{ textAlign: 'center' }}>Or</p>
                  <div className='flex gap-1 items-center justify-between'>
                     <Link className='w-full' to={'http://localhost:8000/api/auth/google/login'}>
                        <Button
                           size='large'
                           className='w-full'
                           htmlType='button'
                           type='primary'
                           icon={<GoogleOutlined />}
                        >
                           Google
                        </Button>
                     </Link>
                     <Link className='w-full' to={'http://localhost:8000/api/auth/facebook/login'}>
                        <Button
                           className='w-full'
                           size='large'
                           htmlType='button'
                           type='primary'
                           icon={<FacebookOutlined />}
                        >
                           FaceBook
                        </Button>
                     </Link>
                  </div> */}
               </Form.Item>
               <Form.Item style={{ textAlign: 'center' }}>
                  <p>
                     Do you already have an account?{' '}
                     <Link className='text-blue-400' to='/login'>
                        {' '}
                        Đăng nhập
                     </Link>
                  </p>
               </Form.Item>
            </Form>
         </div>
      </div>
   );
};

export default SignupPage;
