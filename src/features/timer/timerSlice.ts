import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  curTime: number;
  breakNumber: number;
  tomatoNumber: number;
  step: ESteps;
}

const initialState: TimerState = {
  curTime: EStepsTime.work * 60,
  breakNumber: 1,
  tomatoNumber: 1,
  step: ESteps.work,
}

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    tick: (state) => {
      state.curTime = state.curTime - 1;
    },
    nextStep: (state) => {
      if (state.step === ESteps.work) state.tomatoNumber = state.tomatoNumber >= 4 ? 1 : state.tomatoNumber + 1;
      if (state.tomatoNumber === 1 && state.step === ESteps.work) {
        state.step = ESteps.longBreak;
        state.curTime = EStepsTime.longBreak * 60;
      } else {
        if (state.step === ESteps.work) {
          state.step = ESteps.shortBreak;
          state.curTime = EStepsTime.shortBreak * 60;
        } else {
          state.step = ESteps.work;
          state.curTime = EStepsTime.work * 60;
          state.breakNumber = state.breakNumber >= 4 ? 1 : state.breakNumber + 1;
        }
      }
    }
  },
});

export const { tick, nextStep } = timerSlice.actions;
export default timerSlice.reducer;
