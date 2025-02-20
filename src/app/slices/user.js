import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoggedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      const newUser = action.payload;
      if (newUser) {
        state.user = newUser;
        state.isLoggedIn = true;
      } else {
        state.user = null;
        state.isLoggedIn = false;
      }
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
