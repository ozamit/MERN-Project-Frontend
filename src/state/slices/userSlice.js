import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      if (action.payload.newUser !== undefined) {
        console.log("setUser", action);
        const { _id, username, manager } = action.payload.newUser;
        const user = {
          id: _id,
          username,
          manager,
        };
        state.data = user;
      } else {
        console.log("No login user");
      }
    },
  },
  logoutUserSlice(state) {
    state.data = {};
  },
});

export const { setUser, logoutUserSlice } = userSlice.actions;
export default userSlice.reducer;
