import { createSlice } from "@reduxjs/toolkit";

const initialState = { backDrop: false, mobileNav: false, form: false };

const backDrop = createSlice({
  name: "backDrop",
  initialState: initialState,
  reducers: {
    backDropHandler(state, action) {
      state.backDrop = action.payload;
    },
    mobileNavHandler(state, action) {
      state.backDrop = action.payload;
      state.mobileNav = action.payload;
    },
    formHandler(state, action) {
      state.backDrop = action.payload;
      state.form = action.payload;
    },
  },
});

export const backDropActions = backDrop.actions;
export default backDrop.reducer;
