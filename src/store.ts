import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/auth.service';
import categoryReducer from './services/cate.service';
import productReducer from './services/product.service';
import userSlice from './services/user.service';
import ordersReducer from './services/order.service';
import userReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import wishListSlice from './slices/wishListSlice';
export const store = configureStore({
   reducer: {
      [authReducer.reducerPath]: authReducer.reducer,
      [categoryReducer.reducerPath]: categoryReducer.reducer,
      [productReducer.reducerPath]: productReducer.reducer,
      [ordersReducer.reducerPath]: ordersReducer.reducer,
      [userSlice.reducerPath]: userSlice.reducer,
      wishList: wishListSlice.reducer,
      userReducer: userReducer,
      cart: cartReducer.reducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
         userSlice.middleware,
         categoryReducer.middleware,
         productReducer.middleware,
         authReducer.middleware,
         ordersReducer.middleware
      ])
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
