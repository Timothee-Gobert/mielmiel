import { configureStore } from "@reduxjs/toolkit";
import utilsSlice from "@/redux/utilsSlice";

export default configureStore({
  reducer: {
    utils: utilsSlice,
  },
});
