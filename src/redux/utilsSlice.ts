import { createSlice } from "@reduxjs/toolkit";

export const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    trigger: true,
  },
  reducers: {
    changementEtat: (state) => {
      state.trigger = !state.trigger;
    },
  },
});

export const { changementEtat } = utilsSlice.actions;

export default utilsSlice.reducer;
