import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  playSound: boolean;
  tomatoTime: number;
  shortBreakTime: number;
  longBreakTime: number;
}

const initialState: SettingsState = {
  playSound: true,
  tomatoTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPlaySound: (state) => {
      state.playSound = !state.playSound;
    },
    setTomatoTime: (state, action: PayloadAction<number>) => {
      state.tomatoTime = action.payload;
    },
    setShortBreakTime: (state, action: PayloadAction<number>) => {
      state.shortBreakTime = action.payload;
    },
    setLongBreakTime: (state, action: PayloadAction<number>) => {
      state.longBreakTime = action.payload;
    },
  }
});

export const { setPlaySound, setTomatoTime, setShortBreakTime, setLongBreakTime } = settingsSlice.actions;
export default settingsSlice.reducer;
