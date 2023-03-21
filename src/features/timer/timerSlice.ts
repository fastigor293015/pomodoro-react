import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setLongBreakInterval, setLongBreakTime, setShortBreakTime, setTomatoTime } from '../settings/settingsSlice';

export enum ESteps {
  work = "work",
  shortBreak = "shortBreak",
  longBreak = "longBreak",
}

export enum EStepsTime {
  work = 25,
  shortBreak = 5,
  longBreak = 15,
}

interface TimerState {
  tomatoTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  longBreakInterval: number;
  curTime: number;
  breakNumber: number;
  tomatoNumber: number;
  step: ESteps;
}

const initialState: TimerState = {
  tomatoTime: EStepsTime.work,
  shortBreakTime: EStepsTime.shortBreak,
  longBreakTime: EStepsTime.longBreak,
  longBreakInterval: 4,
  curTime: EStepsTime.work * 60,
  breakNumber: 1,
  tomatoNumber: 1,
  step: ESteps.work,
}

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    stop: (state) => {
      state.curTime = state.step === ESteps.work ? state.tomatoTime * 60 : state.step === ESteps.shortBreak ? state.shortBreakTime * 60 : state.longBreakTime * 60;
    },
    tick: (state) => {
      state.curTime = state.curTime - 1;
    },
    nextStep: (state) => {
      if (state.step === ESteps.work) state.tomatoNumber = state.tomatoNumber >= state.longBreakInterval ? 1 : state.tomatoNumber + 1;
      if (state.tomatoNumber === 1 && state.step === ESteps.work) {
        state.step = ESteps.longBreak;
        state.curTime = state.longBreakTime * 60;
      } else {
        if (state.step === ESteps.work) {
          state.step = ESteps.shortBreak;
          state.curTime =  state.shortBreakTime * 60;
        } else {
          state.step = ESteps.work;
          state.curTime =  state.tomatoTime * 60;
          state.breakNumber = state.breakNumber >= state.longBreakInterval ? 1 : state.breakNumber + 1;
        }
      }
    },
    increaseTime: (state) => {
      state.curTime += 60;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setTomatoTime, (state, action: PayloadAction<number>) => {
      state.tomatoTime = action.payload;
    });
    builder.addCase(setShortBreakTime, (state, action: PayloadAction<number>) => {
      state.shortBreakTime = action.payload;
    });
    builder.addCase(setLongBreakTime, (state, action: PayloadAction<number>) => {
      state.longBreakTime = action.payload;
    });
    builder.addCase(setLongBreakInterval, (state, action: PayloadAction<number>) => {
      state.longBreakInterval = action.payload;
    });
  },
});

export const { stop, tick, nextStep, increaseTime } = timerSlice.actions;
export default timerSlice.reducer;
