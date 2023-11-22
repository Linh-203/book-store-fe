import { useState } from 'react';
import { Button, ConfigProvider, Form, Input, Modal, Rate, Space } from 'antd';
import TextQuill from '../../../../components/TextQuill/TextQuill';
import { IProductOrder } from '../../../../interfaces/order';
type Props = {
   product: IProductOrder;
};

const ProductInOrder = ({ product }: Props) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   return (
      <div className='one-product flex justify-between items-center w-full'>
         <div className='flex justify-start gap-2 items-center'>
            <img src={product.image} alt='product' className='max-w-[100px] aspect-square rounded-lg' />
            <span className='text-black font-semibold'>{product.name}</span>
         </div>
         <div className='flex justify-start gap-2 items-center'>
            <span>{product.quantity}x</span>
            <span className='text-lg text-black'>{product.price}</span>
            <button
               onClick={() => setIsOpen(true)}
               className='rounded-sm ml-3 hover:bg-[#5ac471] py-2 px-5 text-white bg-greenP500 duration-300'
            >
               Đánh giá
            </button>
         </div>
         <ConfigProvider
            theme={{
               components: {
                  Modal: {
                     colorPrimary: '#80b235',
                     colorPrimaryBorder: '#80b235'
                  }
               }
            }}
         >
            <Modal
               title='Đánh giá sản phẩm'
               open={isOpen}
               width={800}
               onCancel={() => setIsOpen(false)}
               footer={[
                  <Button className='bg-white' onClick={() => setIsOpen(false)}>
                     Hủy
                  </Button>,
                  <Button
                     type='default'
                     className='bg-greenPrimary text-white hover:!text-white hover:!border-0'
                     onClick={() => {}}
                  >
                     Gửi
                  </Button>
               ]}
            >
               <div className='one-product w-full'>
                  <div className='flex justify-start gap-2 items-center'>
                     <img src={product.image} alt='product' className='max-w-[100px] aspect-square rounded-lg' />
                     <span className='text-black font-semibold'>{product.name}</span>
                  </div>
                  <Form layout='vertical' className='w-full'>
                     <Space className='w-full' size={'large'}>
                        <Form.Item
                           label='Tên quý khách'
                           rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}
                           name='customerName'
                        >
                           <Input type='text' />
                        </Form.Item>
                        <Form.Item
                           label='Số điện thoại'
                           rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}
                           name='customerName'
                        >
                           <Input type='text' />
                        </Form.Item>
                     </Space>
                     <Form.Item
                        name='content'
                        label='Nội dung'
                        rules={[{ required: true, message: 'Vui lòng điền thông tin' }]}
                     >
                        <TextQuill getValue={(value) => console.log(value)} />
                     </Form.Item>
                     <Form.Item
                        name='rate'
                        label='Đánh giá'
                        rules={[{ required: true, message: 'Vui lòng đánh giá chất lượng' }]}
                     >
                        <Rate />
                     </Form.Item>
                  </Form>
               </div>
            </Modal>
         </ConfigProvider>
      </div>
   );
};

export default ProductInOrder;
