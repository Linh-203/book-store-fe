import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/auth';
export interface IAuth {
   accessToken: string;
   user: IUser;
}
const initState: IAuth = {
   accessToken: '',
   user: {} as IUser
};

const authReducer = createSlice({
   name: 'auth',
   initialState: initState,
   reducers: {
      saveTokenAndUser: (state, action) => {
         state.accessToken = action.payload.accessToken;
         state.user = action.payload.user;
      },
      deleteTokenAndUser: (state) => {
         state.accessToken = '';
         state.user = {} as IUser;
      }
   }
});

export const { saveTokenAndUser, deleteTokenAndUser } = authReducer.actions;

export default authReducer.reducer;
