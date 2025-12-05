import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../AllStateAndFeature/Authentication/AuthSlice";
let store = {};

export default store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
