import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './services/auth.service';
import categoryReducer from './services/cate.service';
import productReducer from './services/product.service';
// import userSlice from './services/user.service';
// import userReducer from './slices/authSlice';
export const store = configureStore({
   reducer: {
      // [authReducer.reducerPath]: authReducer.reducer,
      [categoryReducer.reducerPath]: categoryReducer.reducer,
      [productReducer.reducerPath]: productReducer.reducer
      // [userSlice.reducerPath]: userSlice.reducer,
      // userReducer: userReducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([categoryReducer.middleware, productReducer.middleware])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
