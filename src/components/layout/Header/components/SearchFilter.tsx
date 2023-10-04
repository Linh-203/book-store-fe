import { useState } from 'react';
import { Button, Drawer, Space } from 'antd';

const SearchFilter = ({ children, icon }: any) => {
   const [open, setOpen] = useState(false);
   const showDrawer = () => {
      setOpen(true);
   };

   const onClose = () => {
      setOpen(false);
   };
   return (
      <div>
         <Space>
            <Button icon={icon} className='text-black border-none ' onClick={showDrawer}>
               {children}
            </Button>
         </Space>
         <Drawer placement='top' title='Basic Drawer' closable={false} onClose={onClose} open={open}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
         </Drawer>
      </div>
   );
};

export default SearchFilter;
