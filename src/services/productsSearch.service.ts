import { IResponseHasPaginate } from '../interfaces/base';
import { IProduct } from '../interfaces/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const product = createApi({
   reducerPath: 'products',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/api'
   }),
   tagTypes: ['products'],
   endpoints: (builder) => ({
      searchProduct: builder.mutation<IResponseHasPaginate<IProduct>, string>({
         query: (option) => ({
            url: '/products?_expand' + option,
            method: 'GET'
         }),
         invalidatesTags: ['products']
      })
   })
});

export const { useSearchProductMutation } = product;
export default product;
