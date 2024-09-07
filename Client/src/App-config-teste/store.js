import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";

const store = configureStore({
  reducer: { 
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

//store.dispatch(loadUser(null));

export default store;