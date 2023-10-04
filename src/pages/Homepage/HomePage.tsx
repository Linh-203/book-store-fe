import { Helmet } from 'react-helmet';
import Banner from './components/Banner';
import Delivery from './components/Delivery';
import Card from './components/Card';
import BtnFilter from './components/BtnFilter';
import { IProduct } from '../../interfaces/product';
import { useEffect, useState } from 'react';
import SubBanner from './components/SubBanner';
import ThuongHieu from './components/ThuongHieu';
import { useGetAllProductsQuery, useRemoveProductMutation } from '../../services/product.service';
const HomePage = () => {
   const { data, isLoading } = useGetAllProductsQuery();
   console.log(data);
   const [item, setItems] = useState<IProduct[]>(data?.product || []);
   // console.log(item);

   const btnFilter = [...new Set(data?.product.map((val: any) => val.categoryId?.cateName))];
   const filterItems = (cate: any) => {
      const newItems = data?.product.filter((data: any) => data.categoryId.cateName === cate);
      setItems(newItems);
   };
   useEffect(() => {
      if (data && !isLoading) {
         filterItems(data.product[0].categoryId.cateName);
      }
   }, [data]);
   // const refetch = () => {
   //    setItems(products);
   // };
   // console.log(item);
   const [remove] = useRemoveProductMutation();

   return (
      <div>
         <Helmet>
            <title>Trang chủ</title>
         </Helmet>
         <Banner />
         <Delivery />
         <div className='lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 grid grid-cols-1 px-40 gap-10 bg-gray-50 '>
            {data && !isLoading ? data.product.map((prd, index) => <Card key={index} product={prd} link='/' />) : <></>}
         </div>
         <div>
            <p className='text-lg font-bold px-40 pt-10'>CÁC DÒNG SẢN PHẨM</p>
            <p className='px-40'>Tìm cuốn sách theo chủ đề mà bạn quan tâm</p>
         </div>
         <SubBanner />
         <div className='img-top px-40 py-10'>
            <img className='' src='https://theme.hstatic.net/1000363117/1000911694/14/hhori_img1.png?v=471' alt='' />
         </div>
         <BtnFilter btnFilter={btnFilter} filterItems={filterItems} />
         <div className='lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 grid grid-cols-1 px-40 gap-10 bg-gray-50 '>
            {item && item?.length > 0 ? item.map((prd, index) => <Card key={index} product={prd} link='/' />) : <></>}
         </div>
         <div className='px-40 py-7'>
            <img src='https://theme.hstatic.net/1000363117/1000911694/14/hhori_img2.png?v=471' alt='' />
         </div>
         <ThuongHieu />
      </div>
   );
};

export default HomePage;
