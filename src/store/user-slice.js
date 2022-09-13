import { createSlice } from "@reduxjs/toolkit";
import jeremy from "../images/image-jeremy.png";

const initialUser = {
  name: "Jeremy Robson",
  image: jeremy,
  egImage: jeremy,
  egName: "Jeremy Robson",
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    replaceUser(state, action) {
      state.name = action.payload.name;
      state.image = action.payload.image;
    },
    userLogOut(state) {
      state.name = state.egName;
      state.image = state.egImage;
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
