import { createSlice } from "@reduxjs/toolkit";
const storeUser=JSON.parse(localStorage.getItem("user"));
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData:storeUser
  },
  reducers: {
    addUser: (state, action) => {
     state.userData= action.payload;
     localStorage.setItem("user",JSON.stringify(action.payload));
    },
    removeUser: (state, action) => {
      state.userData= null;
      localStorage.removeItem("user"); 
    },
  },
});
export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
