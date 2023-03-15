import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { decrement } from '../tasks/tasksSlice';
import { stop, tick } from '../timer/timerSlice';

const weekDays = [
  {
    weekDay: "Пн",
    label: "Понедельник",
  },
  {
    weekDay: "Вт",
    label: "Вторник",
  },
  {
    weekDay: "Ср",
    label: "Среда",
  },
  {
    weekDay: "Чт",
    label: "Четверг",
  },
  {
    weekDay: "Пт",
    label: "Пятница",
  },
  {
    weekDay: "Сб",
    label: "Суббота",
  },
  {
    weekDay: "Вс",
    label: "Воскресенье",
  },
]

export interface IWeekDayData {
  weekDay: string,
  date: string;
  label: string,
  time: number,
  tomatosCount: number;
  pauseTime: number;
  stopsCount: number;
}

interface StatsState {
  statsData: IWeekDayData[][];
  weekDayIndex: number;
}

const getWeekDay = () => {
  const dayIndex = new Date().getDay();

  return dayIndex === 0 ? 6 : dayIndex - 1;
}

const initialState: StatsState = {
  statsData: [],
  weekDayIndex: getWeekDay(),
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    init: (state) => {
      for (let i = 0; i < 3; i++) {
        const weekDaysList: IWeekDayData[] = [];

        for (let j = 0; j < weekDays.length; j++) {
          weekDaysList.push({
            ...weekDays[j],
            date: "",
            time: 0,
            tomatosCount: 0,
            pauseTime: 0,
            stopsCount: 0,
          })
        }
        state.statsData.push(weekDaysList);
      }
    },
    update: (state) => {
      state.weekDayIndex = getWeekDay();
    },
    pauseTick: (state) => {
      state.statsData[state.statsData.length - 1][state.weekDayIndex].pauseTime++;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(tick, (state) => {
      state.statsData[state.statsData.length - 1][state.weekDayIndex].time++;
      const today = new Date();
      console.log(today.getDay());
    });
    builder.addCase(stop, (state) => {
      state.statsData[state.statsData.length - 1][state.weekDayIndex].stopsCount++;
    });
    builder.addCase(decrement, (state) => {
      state.statsData[state.statsData.length - 1][state.weekDayIndex].tomatosCount++;
    });
  }
});

export const { init, update, pauseTick } = statsSlice.actions;
export default statsSlice.reducer;
