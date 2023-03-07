import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  mode: PaletteMode,
}

const initialState: ThemeState = {
  mode: "light",
}

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = themeSlice.actions;
export default themeSlice.reducer;
