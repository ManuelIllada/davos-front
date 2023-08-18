import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, actions) => {
      return { ...state, ...actions.payload };
    },
    removeToken: (state, action) => {
      return {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, removeToken } = userSlice.actions;

export default userSlice;
