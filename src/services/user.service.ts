import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IResponse, IResponseUser } from '../interfaces/base';
import { IUser } from '../interfaces/auth';

const userApi = createApi({
   reducerPath: 'userApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://bookstore-be-h2gu.onrender.com/api',
      credentials: 'include'
   }),
   tagTypes: ['user'],
   endpoints: (builder) => ({
      createUser: builder.mutation<IResponse<IUser>, IUser>({
         query: (info) => {
            return {
               url: '/user',
               method: 'POST',
               body: info,
               credentials: 'include'
            };
         },
         invalidatesTags: ['user']
      }),
      getAllUsers: builder.query<{ user: IUser[] }, void>({
         query: () => {
            return {
               url: '/user',
               method: 'GET',
               credentials: 'include'
            };
         },
         providesTags: ['user']
      }),
      getOneUser: builder.query<IResponseUser<IUser>, string>({
         query: (id) => ({
            url: '/user/' + id,
            method: 'GET',
            credentials: 'include'
         }),
         providesTags: ['user']
      }),
      updateUser: builder.mutation<IResponse<IUser>, { id: string; item: IUser }>({
         query: ({ id, item }) => ({
            url: '/user/' + id,
            method: 'PATCH',
            body: item,
            credentials: 'include'
         }),
         invalidatesTags: ['user']
      }),
      removeUser: builder.mutation<IResponse<IUser>, string>({
         query: (id) => ({
            url: '/user/' + id,
            method: 'Delete',
            credentials: 'include'
         }),
         invalidatesTags: ['user']
      })
   })
});

export const {
   useCreateUserMutation,
   useGetAllUsersQuery,
   useGetOneUserQuery,
   useUpdateUserMutation,
   useRemoveUserMutation
} = userApi;
export default userApi;
