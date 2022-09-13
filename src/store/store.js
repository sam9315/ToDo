import { configureStore } from "@reduxjs/toolkit";
import Auth from "./auth-slice";
import backDrop from "./backdrop-slice";
import activity from "./activity-slice";
import user from "./user-slice";

const store = configureStore({
  reducer: {
    Auth: Auth,
    backdrop: backDrop,
    activity: activity,
    user: user,
  },
});

export default store;
