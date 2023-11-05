import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import chatSlice from "./chat/chat.slice";
import productSlice from "./product/product.slice";
import commonSlice from "./common/common.slice";
import voucherSlice from "./voucher/voucher.slice";
import userSlice from "./user/user.slice";
import authSlice from "./auth/auth.slice";

const persistConfig = { key: "root", version: 1, storage };

const rootReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    common: commonSlice,
    auth: rootReducer,
    chat: chatSlice,
    product: productSlice,
    voucher: voucherSlice,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [
      //     FLUSH,
      //     REHYDRATE,
      //     PAUSE,
      //     PERSIST,
      //     PURGE,
      //     REGISTER,
      //     "chat",
      //   ],
      // },
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
export default store;
