import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { AuthRequestCredentials, TokenResponse } from "../../types";
import { Shop, ShopListResponse } from "../../types";
import { demo_credentials } from "../../credentials.ts";

export const shopApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://testapi.mehrwerk.de/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.access_token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        headers.set("X-Api-Key", demo_credentials.xApiKey);
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 600,
  tagTypes: ["ShopList", "ShopItem"],
  endpoints: (builder) => ({
    authenticate: builder.mutation<TokenResponse, AuthRequestCredentials>({
      invalidatesTags: ["ShopList", "ShopItem"],
      query: (credentials) => ({
        url: "v2/iam/oauth/token",
        method: "POST",
        body: credentials,
        headers: {
          "X-Api-Key": demo_credentials.xApiKey,
        },
      }),
    }),
    shopList: builder.query<Shop[], void>({
      providesTags: ["ShopList"],
      query: () => {
        return {
          url: "v3/cashback/shops",
          method: "GET",
        };
      },
      transformResponse: (response: ShopListResponse) => {
        return response.items.map((item) => ({
          id: item.id,
          description: item.description,
          isFavorite: item.isFavorite,
          name: item.name,
          logo: item.logo,
          link: item.link,
          cashbackRates: item.cashbackRates,
          categories: item.categories,
        }));
      },
    }),
    shopItem: builder.query<Shop, string>({
      providesTags: ["ShopItem"],
      query: (id) => {
        return {
          url: `v3/cashback/shops/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: Shop): Shop => {
        return {
          id: response.id,
          description: response.description,
          isFavorite: response.isFavorite,
          name: response.name,
          logo: response.logo,
          link: response.link,
          cashbackRates: response.cashbackRates,
          categories: response.categories,
        };
      },
    }),
  }),
});

export const { useAuthenticateMutation, useShopListQuery, useShopItemQuery } =
  shopApi;
