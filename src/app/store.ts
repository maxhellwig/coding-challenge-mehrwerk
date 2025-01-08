import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { shopApi } from "./services/shopApi.ts";
import authenticationReducer from "../feature/authentication/authenticationSlice";
import shopReducer from "../feature/shop/shopSlice";

const rootReducer = combineReducers({
  [shopApi.reducerPath]: shopApi.reducer,
  auth: authenticationReducer,
  shop: shopReducer,
});

export function setupStore(preloadedState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(shopApi.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
