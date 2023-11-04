import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthSignupInput, DataAuthResponse, TokenResponse } from '../interfaces/auth';
import { AuthLoginInput } from '../interfaces/auth';

const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/api',
      credentials: 'include'
   }),
   tagTypes: ['auth'],
   endpoints: (builder) => ({
      login: builder.mutation<DataAuthResponse, AuthLoginInput>({
         query: (info) => {
            return {
               url: '/login',
               method: 'POST',
               body: info
            };
         },
         invalidatesTags: ['auth']
      }),
      signup: builder.mutation<DataAuthResponse, AuthSignupInput>({
         query: (info) => {
            return {
               url: '/signup',
               method: 'POST',
               body: info
            };
         },
         invalidatesTags: ['auth']
      }),
      getToken: builder.query<TokenResponse, void>({
         query: () => ({
            url: '/token',
            method: 'GET',
            credentials: 'include'
         }),
         providesTags: ['auth']
      }),
      clearToken: builder.mutation<void, void>({
         query: () => ({
            url: '/token',
            method: 'DELETE',
            credentials: 'include'
         })
      })
   })
});

export const { useLoginMutation, useSignupMutation, useGetTokenQuery, useClearTokenMutation } = authApi;
export default authApi;
