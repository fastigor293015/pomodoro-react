import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EStepsTime } from '../timer/timerSlice';

interface SettingsState {
  playSound: boolean;
  tomatoTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakInterval: number;
}

const initialState: SettingsState = {
  playSound: true,
  tomatoTime: EStepsTime.work,
  shortBreakTime: EStepsTime.shortBreak,
  longBreakTime: EStepsTime.longBreak,
  longBreakInterval: 4,
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
    setLongBreakInterval: (state, action: PayloadAction<number>) => {
      state.longBreakInterval = action.payload;
    },
  }
});

export const { setPlaySound, setTomatoTime, setShortBreakTime, setLongBreakTime, setLongBreakInterval } = settingsSlice.actions;
export default settingsSlice.reducer;
