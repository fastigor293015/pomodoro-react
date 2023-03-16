import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { timerDecrement } from '../tasks/tasksSlice';
import { stop, tick } from '../timer/timerSlice';

const weekDays = [
  {
    weekDay: "Понедельник",
    weekDayLabel: "Пн",
  },
  {
    weekDay: "Вторник",
    weekDayLabel: "Вт",
  },
  {
    weekDay: "Среда",
    weekDayLabel: "Ср",
  },
  {
    weekDay: "Четверг",
    weekDayLabel: "Чт",
  },
  {
    weekDay: "Пятница",
    weekDayLabel: "Пт",
  },
  {
    weekDay: "Суббота",
    weekDayLabel: "Сб",
  },
  {
    weekDay: "Воскресенье",
    weekDayLabel: "Вс",
  },
]

export interface IWeekDayData {
  weekDay: string,
  weekDayLabel: string,
  date: string;
  time: number,
  tomatosCount: number;
  pauseTime: number;
  stopsCount: number;
}

interface StatsState {
  statsData: IWeekDayData[][];
  weekDayIndex: number;
  date: string;
}

const getWeekDay = () => {
  const dayIndex = new Date().getDay();

  return dayIndex === 0 ? 6 : dayIndex - 1;
}

const getDate = () => {
  return new Date().toLocaleDateString("ru-RU");
}

const initialState: StatsState = {
  statsData: [],
  weekDayIndex: getWeekDay(),
  date: getDate(),
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
      const date = getDate();
      if (state.date !== date) {
        state.date = date;
        state.weekDayIndex = getWeekDay();
      }
    },
    pauseTick: (state) => {
      state.statsData[state.statsData.length - 1][state.weekDayIndex].pauseTime++;
    },
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
    builder.addCase(timerDecrement, (state) => {
      state.statsData[state.statsData.length - 1][state.weekDayIndex].tomatosCount++;
    });
  }
});

export const { init, update, pauseTick } = statsSlice.actions;
export default statsSlice.reducer;
