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
];

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

const testWeeksAgoCount = 0;

export const getDate = (index: number = 0) => {
  return new Date(new Date().getTime() + (index - testWeeksAgoCount * 7) * 24 * 60 * 60 * 1000).toLocaleDateString("ru-RU");
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
      let twoWeeksAgoMonday = -(state.weekDayIndex + 7 * 2);
      for (let i = 0; i < 3; i++) {
        const weekDaysList: IWeekDayData[] = [];

        for (let j = 0; j < weekDays.length; j++) {
          weekDaysList.push({
            ...weekDays[j],
            date: getDate(twoWeeksAgoMonday),
            time: 0,
            tomatosCount: 0,
            pauseTime: 0,
            stopsCount: 0,
          })
          twoWeeksAgoMonday++;
        }
        state.statsData.push(weekDaysList);
      }
    },
    update: (state) => {
      if (state.date === getDate()) return;
      state.date = getDate();
      state.weekDayIndex = getWeekDay();

      if (state.statsData.length === 0) return;

      const mondaysList = state.statsData.map(weekItem => weekItem[0].date ).reverse();
      let targetMonday = -state.weekDayIndex;
      let curDateIndexInMondaysList: number = 0;
      for (let i = 0; i < mondaysList.length; i++) {
        curDateIndexInMondaysList = mondaysList.findIndex(mondayDate =>
          mondayDate === getDate(targetMonday)
        ) + i;
        if (curDateIndexInMondaysList >= 0) break;
        targetMonday -= 7;
      }
      console.log(curDateIndexInMondaysList);
      if (curDateIndexInMondaysList !== 0) {
        let iterationsCount = curDateIndexInMondaysList < 0 ? state.statsData.length : curDateIndexInMondaysList;
        targetMonday = -(state.weekDayIndex + 7 * (iterationsCount - 1));
        for (let i = 0; i < iterationsCount; i++) {
          const weekDaysList: IWeekDayData[] = [];

          for (let j = 0; j < weekDays.length; j++) {
            weekDaysList.push({
              ...weekDays[j],
              date: getDate(targetMonday),
              time: 0,
              tomatosCount: 0,
              pauseTime: 0,
              stopsCount: 0,
            })
            console.log(targetMonday);
            targetMonday++;
          }
          state.statsData.push(weekDaysList);
          state.statsData.shift();
        }
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
