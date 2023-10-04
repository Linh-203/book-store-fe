// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { IResponse, IResponseHasPaginate } from '../interfaces/base';
// import { IUser } from '../interfaces/auth';

// const userApi = createApi({
//    reducerPath: 'userApi',
//    baseQuery: fetchBaseQuery({
//       baseUrl: 'http://localhost:8000/api',
//       credentials: 'include'
//    }),
//    tagTypes: ['user'],
//    endpoints: (builder) => ({
//       createAccount: builder.mutation<IResponse<IUser>, IUser>({
//          query: (info) => {
//             return {
//                url: '/users',
//                method: 'POST',
//                body: info,
//                credentials: 'include'
//             };
//          },
//          invalidatesTags: ['user']
//       }),
//       getAll: builder.query<IResponseHasPaginate<IUser>, void>({
//          query: () => {
//             return {
//                url: '/users',
//                method: 'GET',
//                credentials: 'include'
//             };
//          },
//          providesTags: ['user']
//       }),
//       getOne: builder.query<IResponse<IUser>, string>({
//          query: (id) => ({
//             url: '/users/' + id,
//             method: 'GET',
//             credentials: 'include'
//          }),
//          providesTags: ['user']
//       }),
//       updateUser: builder.mutation<IResponse<IUser>, { id: string; data: IUser }>({
//          query: ({ id, data }) => ({
//             url: '/users/' + id,
//             method: 'PATCH',
//             body: data,
//             credentials: 'include'
//          }),
//          invalidatesTags: ['user']
//       }),
//       removeUser: builder.mutation<IResponse<IUser>, string>({
//          query: (id) => ({
//             url: '/users/' + id,
//             method: 'Delete',
//             credentials: 'include'
//          }),
//          invalidatesTags: ['user']
//       })
//    })
// });

// export const {
//    useCreateAccountMutation,
//    useGetAllQuery,
//    useGetOneQuery,
//    useUpdateUserMutation,
//    useRemoveUserMutation
// } = userApi;
// export default userApi;
