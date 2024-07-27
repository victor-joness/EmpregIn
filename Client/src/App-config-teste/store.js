import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import authReducer, { loadUser } from '../Features/authSlice.js';

const store = configureStore({
  reducer: { 
    user: userSlice,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

//store.dispatch(loadUser(null));

export default store;