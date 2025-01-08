import { createSlice } from "@reduxjs/toolkit";
import { shopApi } from "../../app/services/shopApi.ts";

type AuthState = {
  access_token: string | null;
  expires_in: number | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { expires_in: null, access_token: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      shopApi.endpoints.authenticate.matchFulfilled,
      (state, { payload }) => {
        const date = new Date();
        date.setDate(date.getDate() + payload.expires_in);
        state.expires_in = date.getTime(); // Convert seconds to milliseconds;
        state.access_token = payload.access_token;
      },
    );
  },
});

export default slice.reducer;
