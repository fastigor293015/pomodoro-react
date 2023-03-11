import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITask {
  id: string;
  name: string;
  tomatosCount: number;
}

interface TasksState {
  list: Array<ITask>,
}

const initialState: TasksState = {
  list: [],
}

const generateRandomString = () => Math.random().toString(36).substring(2, 15);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const newTask: ITask = {
        id: generateRandomString(),
        name: action.payload,
        tomatosCount: 1,
      }
      state.list.push(newTask);
    },
    edit: (state, action: PayloadAction<{ id: string, newName: string }>) => {
      const taskIndex = state.list.findIndex(item => item.id === action.payload.id);
      state.list[taskIndex].name = action.payload.newName;
    },
    remove: (state, action: PayloadAction<string>) => {
      const taskIndex = state.list.findIndex(item => item.id === action.payload);
      state.list.splice(taskIndex, 1);
    },
    increment: (state, action: PayloadAction<string>) => {
      const taskIndex = state.list.findIndex(item => item.id === action.payload);
      state.list[taskIndex].tomatosCount++;
    },
    decrement: (state, action: PayloadAction<string>) => {
      const taskIndex = state.list.findIndex(item => item.id === action.payload);
      state.list[taskIndex].tomatosCount--;

      if (state.list[taskIndex].tomatosCount <= 0) {
        state.list.splice(taskIndex, 1);
      }
    },
  },
});

export const { add, edit, remove, increment, decrement } = tasksSlice.actions;
export default tasksSlice.reducer;
