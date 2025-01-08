import { createSlice } from "@reduxjs/toolkit";
import { shopApi } from "../../app/services/shopApi.ts";
import { Shop } from "../../types";

export interface ShopListState {
  shops: Shop[];
  shopItem: Shop | null;
}

const slice = createSlice({
  name: "shop",
  initialState: { shops: [], shopItem: null } as ShopListState,
  reducers: {
    updateIsFavorite(state, action) {
      const { id, isFavorite } = action.payload;
      const shop = state.shops.find((shop) => shop.id === id);
      if (shop) {
        shop.isFavorite = !isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      shopApi.endpoints.shopList.matchFulfilled,
      (state, { payload }) => {
        state.shops = payload;
      },
    );
    builder.addMatcher(
      shopApi.endpoints.shopItem.matchFulfilled,
      (state, { payload }) => {
        state.shopItem = payload;
      },
    );
  },
});

export const { updateIsFavorite } = slice.actions;
export default slice.reducer;
