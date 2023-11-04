import { Helmet } from 'react-helmet';
import Banner from './components/Banner';
import Delivery from './components/Delivery';
import Card from './components/Card';
import BtnFilter from './components/BtnFilter';
import { IProduct } from '../../../interfaces/product';
import { useEffect, useState } from 'react';
import SubBanner from './components/SubBanner';
import ThuongHieu from './components/ThuongHieu';
import { useGetAllProductsQuery } from '../../../services/product.service';
import SlideCateHomePage from './components/SlideCategoriesHomePage';
// import FlashSaleCard from './components/FlashSaleCard';
const HomePage = () => {
   const { data, isLoading } = useGetAllProductsQuery();
   // console.log(data);
   const discountedProducts = data?.product?.filter((product: any) => product.discount > 0);
   // console.log(discountedProducts);
   const NoDiscountedProducts = data?.product?.filter((product: any) => product.discount == 0);
   const [item, setItems] = useState<IProduct[]>(data?.product || []);
   const btnFilter = [...new Set(data?.product.map((val: any) => val.categoryId?.cateName))];
   const filterItems = (cate: any) => {
      const newItems = data?.product.filter((data: any) => data.categoryId.cateName === cate);
      setItems(newItems!);
   };
   useEffect(() => {
      if (data && !isLoading) {
         filterItems(data.product[0].categoryId.cateName);
      }
   }, [data]);
   return (
      <div>
         <Helmet>
            <title>Trang chủ</title>
         </Helmet>
         <SlideCateHomePage />
         <Banner />
         <div className='text-center p-5'>
            <h1 className='font-bold text-4xl mt-4 text-red-500'>Flash Sale</h1>
         </div>
         <section className='w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-2 mb-5'>
            {discountedProducts && discountedProducts?.length > 0 ? (
               discountedProducts.map((prd, index) => <Card key={index} product={prd} link='/' />)
            ) : (
               <></>
            )}
         </section>
         {/* <FlashSaleCard /> */}
         <Delivery />
         <div className='lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 grid grid-cols-1 px-40 gap-10 bg-gray-50 '>
            {NoDiscountedProducts && !isLoading ? (
               NoDiscountedProducts.map((prd: any, index: any) => <Card key={index} product={prd} link='/' />)
            ) : (
               <></>
            )}
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
         <div className='lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 grid grid-cols-1 px-40 gap-10 bg-gray-50 '>
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
