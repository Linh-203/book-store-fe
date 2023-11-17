import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategories } from '../interfaces/category';

const category = createApi({
   reducerPath: 'category',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/api',
      credentials: 'include'
   }),
   tagTypes: ['category'],
   endpoints: (builder) => ({
      getAllCate: builder.query<{ data: ICategories[] }, void>({
         query: () => ({
            url: '/categories',
            method: 'GET'
         }),
         providesTags: ['category']
      }),
      getAllCateById: builder.query({
         query: (id) => ({
            url: '/categories/' + id,
            method: 'GET'
         }),
         providesTags: ['category']
      }),
      removeCate: builder.mutation({
         query: (id: any) => ({
            url: '/categories/' + id,
            method: 'DELETE',
            credentials: 'include'
         }),
         invalidatesTags: ['category']
      }),
      addCate: builder.mutation({
         query: (item: any) => ({
            url: '/categories',
            body: item,
            method: 'POST',
            credentials: 'include'
         }),
         invalidatesTags: ['category']
      }),
      updateCate: builder.mutation({
         query: ({ id, item }) => ({
            url: '/categories/' + id,
            body: item,
            method: 'PATCH',
            credentials: 'include'
         }),
         invalidatesTags: ['category']
      })
   })
});

export const {
   useGetAllCateByIdQuery,
   useGetAllCateQuery,
   useRemoveCateMutation,
   useUpdateCateMutation,
   useAddCateMutation
} = category;
export default category;
