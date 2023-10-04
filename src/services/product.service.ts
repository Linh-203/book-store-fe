import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../interfaces/product';

const productApi = createApi({
   reducerPath: 'products',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/api'
   }),
   tagTypes: ['products'],
   endpoints: (builder) => ({
      getAllProducts: builder.query<{ product: IProduct[] }, void>({
         query: () => ({
            url: '/products',
            method: 'GET'
         }),
         providesTags: ['products']
      }),
      getProductById: builder.query({
         query: (id) => ({
            url: '/products/' + id,
            method: 'GET'
         }),
         providesTags: ['products']
      }),
      removeProduct: builder.mutation({
         query: (id: any) => ({
            url: '/products/' + id,
            method: 'DELETE'
         }),
         invalidatesTags: ['products']
      }),
      addProduct: builder.mutation({
         query: (item: any) => ({
            url: '/products',
            body: item,
            method: 'POST'
         }),
         invalidatesTags: ['products']
      }),
      updateProduct: builder.mutation({
         query: ({ id, item }) => ({
            url: '/products/' + id,
            body: item,
            method: 'PATCH'
         }),
         invalidatesTags: ['products']
      })
   })
});

export const {
   useGetAllProductsQuery,
   useGetProductByIdQuery,
   useAddProductMutation,
   useUpdateProductMutation,
   useRemoveProductMutation
} = productApi;

export default productApi;
